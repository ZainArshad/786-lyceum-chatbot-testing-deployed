import {
	selectPPStatBoxMath,
	selectPPStatBoxNodes,
} from 'src/slices/postProcessing/statistics';
import { useSelector } from 'src/store';
import _ from 'lodash';
import { useQuery } from '@tanstack/react-query';
import { queryKeys } from 'src/lib/constants/queries';
import { makeProjectRequest } from 'src/services/api/project';
import {
	isSlaveNodeInstanceAllowed,
	shouldShowArrangementStep,
} from 'src/lib/helpers/statistics';
import { optToFuncMap } from 'src/lib/helpers/statistics/post-processing';
import { INSTANCE_TYPE_MASTER, INSTANCE_TYPE_SLAVE } from '../constants';

/**
 * This hook is responsible for retrieving nodes and apply
 * specified stat operations to generate new nodes.
 * @param {string} statId
 * @return {{
 * 	process: () => Promise<any | null>,
 * }}
 */
export const useStatProcessing = (statId) => {
	const math = useSelector((state) => {
		const tm = selectPPStatBoxMath(state);
		return tm[statId];
	});

	const nodeOpts = useSelector((state) => {
		const nds = selectPPStatBoxNodes(state);
		return nds[statId];
	});

	const shapifyPayload = (slNodes = []) => {
		if (!slNodes.length) return null;
		const groupedByProjId = _.groupBy(slNodes, (n) => n.projectId);
		const payload = _.mapValues(groupedByProjId, (node) => {
			const nl = _.groupBy(node, (n) => n.categoryId);
			const vals = _.mapValues(nl, (n) => n.map((nn) => nn.id));
			return vals;
		});
		return payload;
	};

	const masterNodeQuery = useQuery(
		[
			queryKeys.GET_POSTPROCESS_GRAPH_DATA,
			statId,
			{
				payload: shapifyPayload(nodeOpts.nodes.masterNodes),
			},
		],
		makeProjectRequest.getDevicesNodes,
		{
			select: (res) => res.data,
			staleTime: Infinity,
			enabled: false,
		}
	);

	const slaveNodeQuery = useQuery(
		[
			queryKeys.GET_POSTPROCESS_GRAPH_DATA,
			statId,
			{
				payload: shapifyPayload(nodeOpts.nodes.slaveNodes),
			},
		],
		makeProjectRequest.getDevicesNodes,
		{
			select: (res) => res.data,
			staleTime: Infinity,
			enabled: false,
		}
	);

	const preProcessNodes = (data, type) => {
		if (!data) return null;
		if (
			type === INSTANCE_TYPE_MASTER &&
			shouldShowArrangementStep(math.func, math.operation)
		) {
			const msNodeToIndexMap = {};
			_.map(nodeOpts.nodes.masterNodes, (n, i) => (msNodeToIndexMap[n.id] = i));
			data = _.sortBy(data, (d) => msNodeToIndexMap[d.device.id]);
		}
		if (
			type === INSTANCE_TYPE_SLAVE &&
			shouldShowArrangementStep(math.func, math.operation)
		) {
			const msNodeToIndexMap = {};
			_.map(nodeOpts.nodes.slaveNodes, (n, i) => (msNodeToIndexMap[n.id] = i));
			data = _.sortBy(data, (d) => msNodeToIndexMap[d.device.id]);
		}
		const nodes = data.map((n) => {
			return {
				data: n.device_data,
				parentCategoryName: n.category.name,
				parentCategoryId: n.category.id,
			};
		});
		return nodes;
	};

	const shouldConsiderSlaveNodes = () => {
		return (
			isSlaveNodeInstanceAllowed(math.func, math.operation) &&
			_.get(nodeOpts, 'nodes.slaveNodes.length')
		);
	};

	const getOrFetchMasterNodes = async () =>
		masterNodeQuery.data ?? (await masterNodeQuery.refetch()).data;
	const getOrFetchSlaveNodes = async () =>
		slaveNodeQuery.data ?? (await slaveNodeQuery.refetch()).data;

	/**
	 * @returns {Promise<import('src/lib/helpers/statistics/post-processing/post-processing').ProcessStatResponse>}
	 */
	const process = async () => {
		const { x_units, y_units } = nodeOpts.nodes.masterNodes[0];
		const statFuncArg = {
			masterNodes: preProcessNodes(
				await getOrFetchMasterNodes(),
				INSTANCE_TYPE_MASTER
			),
			slaveNodes: shouldConsiderSlaveNodes()
				? preProcessNodes(await getOrFetchSlaveNodes(), INSTANCE_TYPE_SLAVE)
				: null,
			constant: nodeOpts.operatorConst || null,
			appendName: nodeOpts.appendName,
			units: { x_units, y_units },
			metaData: math,
		};
		const func = optToFuncMap[math.func + math.operation ?? 0];
		const res = func?.(statFuncArg) || null;
		return res;
	};

	return {
		process,
	};
};
