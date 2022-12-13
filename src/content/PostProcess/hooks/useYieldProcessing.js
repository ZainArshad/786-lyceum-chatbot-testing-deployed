import { useState } from 'react';
import { useQueryClient } from '@tanstack/react-query';
import { useDispatch, useSelector } from 'src/store';
import { useLimitQueries } from 'src/queries/postProcess';
import { generateNodeKey, useNodesQuery } from 'src/queries/postProcess/nodes';
import {
	addOrUpdateResults,
	selectPairingForGroup,
} from 'src/slices/postProcessing/yield';
import _ from 'lodash';
import { queryKeys } from 'src/lib/constants/queries';
import { LOWER_LIMIT_TYPE, UPPER_LIMIT_TYPE } from 'src/lib/constants/common';
import { generateAppPayload } from 'src/lib/helpers/graphs/postProcessing';
import Worker from '../workers/yield.worker';

/**
 * @typedef {{upperLimits: Object | null, lowerLimit: Object | null}} Limits
 * @typedef {Promise<{nodes: Array<any>, limits: Limits, uid: string}[]>} NodesAndLimits
 * @typedef {import('src/lib/helpers/yield/post-processing').Param} Param
 */

/**
 * This hook is responsible for making sure that all the data
 * required to perform the yield calculations is available and
 * expose functions to access the data in a convenient format.
 * @param {string} yieldId
 * @returns {{
 *  getRequiredNodesAndLimits: () => NodesAndLimits,
 * generatePreProcessPayload: () => Promise<Param>,
 * }}
 */
const useNodesAndLimits = (yieldId) => {
	const queryClient = useQueryClient();
	const pairings = useSelector((state) => {
		const p = selectPairingForGroup(state, yieldId);
		const valid = Object.values(p).filter(
			(pp) => pp.inputs.category && pp.inputs.limit
		);
		return valid;
	});

	const generateNodesPayload = () => {
		const payload = [];
		pairings.forEach((pairing) => {
			const inputs = pairing.inputs;
			if (_.isEmpty(inputs.category)) return;
			payload.push({
				projectId: inputs.category.projectId,
				categoryId: inputs.category.id,
				nodeIds: inputs.category.nodeIds,
			});
		});
		return payload;
	};

	const generateLimitsPayload = () => {
		const payload = [];
		for (const pairing of pairings) {
			const id = pairing.inputs.limit?.id;
			if (id) {
				payload.push(id);
			}
		}
		return payload;
	};

	const limitsQuery = useLimitQueries(generateLimitsPayload(), {
		enabled: false,
	});

	const nodesQuery = useNodesQuery(generateNodesPayload(), {
		enabled: false,
	});

	/**
	 * @returns {NodesAndLimits}
	 */
	const getRequiredNodesAndLimits = async () => {
		await nodesQuery.refetch();
		await limitsQuery.refetch();
		const res = [];
		// generating payload from query cache to avoid linear search against each pairing
		pairings.forEach((pairing) => {
			const inputs = pairing.inputs;
			const nodesData = [];
			inputs.category.nodeIds.forEach((nodeId) => {
				const key = generateNodeKey({
					project: inputs.category.projectId,
					category: inputs.category.id,
					node: nodeId,
				});
				const data = queryClient.getQueryData(key);
				if (data) {
					nodesData.push(data);
				}
			});
			const limitsData = queryClient.getQueryData([
				queryKeys.GET_PROJECT_DETAIL,
				inputs.limit.id,
			]);
			const limitsPayload = { upperLimits: null, lowerLimits: null };
			const { limits } = limitsData;
			limits.forEach((limit) => {
				if (limit.limit_types === UPPER_LIMIT_TYPE) {
					limitsPayload.upperLimits = limit;
				} else if (limit.limit_types === LOWER_LIMIT_TYPE) {
					limitsPayload.lowerLimits = limit;
				}
			});
			res.push({
				nodes: nodesData,
				limit: limitsPayload,
				uid: pairing.id,
			});
		});
		return res;
	};

	/**
	 * This function process the data to make it available in the format
	 * accepted by the yield calculation function.
	 */
	const generatePreProcessPayload = async () => {
		const payload = [];
		const nodesAndLimits = await getRequiredNodesAndLimits();
		nodesAndLimits.forEach((nal) => {
			const { nodes, limit, uid } = nal;
			const nodesPayload = [];
			nodes.forEach((node) => {
				nodesPayload.push({
					id: node.device.id,
					data: generateAppPayload(node.device_data),
				});
			});
			const limitPayload = {
				upperLimits: generateAppPayload(limit.upperLimits?.limit || {}),
				lowerLimits: generateAppPayload(limit.lowerLimits?.limit || {}),
			};
			payload.push({
				nodes: nodesPayload,
				limits: limitPayload,
				uid,
			});
		});
		return payload;
	};

	return { getRequiredNodesAndLimits, generatePreProcessPayload };
};

/**
 * This hook is responsible for retrieving nodes and limits
 * and apply yield operations
 * @param {string} yieldId
 * @return {{
 *   processYield: () => Promise<any | null>,
 *   loading: boolean,
 *   error: string
 * }}
 */
export const useYieldProcessing = (yieldId) => {
	const [processing, setProcessing] = useState(false);
	const [error, setError] = useState('');
	const { generatePreProcessPayload } = useNodesAndLimits(yieldId);
	const dispatch = useDispatch();

	const processYield = async () => {
		setProcessing(true);
		setError('');
		const p = await generatePreProcessPayload();
		const worker = new Worker();
		worker.postMessage({ param: p, uid: yieldId });
		worker.onmessage = (e) => {
			if (e.data.uid !== yieldId) return;
			if (e.data.status === 'success') {
				const { results } = e.data;
				dispatch(addOrUpdateResults(results));
			} else {
				console.error(e.data.error);
			}
			setProcessing(false);
		};
		worker.onerror = (e) => {
			console.error(e);
			setProcessing(false);
			setError('Something went wrong');
		};
	};

	return {
		processYield,
		loading: processing,
		error,
	};
};
