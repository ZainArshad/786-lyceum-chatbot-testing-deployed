import { useContext, useState } from 'react';
import { GraphInstanceContext } from 'src/content/PostProcess/context/GraphInstanceContext';
import {
	Box,
	Checkbox,
	Collapse,
	FormControlLabel,
	FormGroup,
	Typography,
	useTheme,
} from '@mui/material';
import { useTranslation } from 'next-i18next';
import PropTypes from 'prop-types';
import { useQueryClient } from '@tanstack/react-query';
import Scrollbar from 'src/components/Scrollbar';
import { ReloadButton } from 'src/components/shared/Buttons/RealoadButton';
import Expander from 'src/components/shared/Expander';
import { Si6maLoader } from 'src/components/shared/Loaders';
import { Center } from 'src/components/shared/wrappers';
import { queryKeys } from 'src/lib/constants/queries';
import {
	addOrRemoveNodes,
	selectPPNodes,
} from 'src/slices/postProcessing/graphs';
import { useDispatch, useSelector } from 'src/store';
import {
	HelperButtonCtn,
	NodeOptionWrapper,
	SmallButton,
} from 'src/components/common/Nodes';
import { shallowEqual } from 'react-redux';
import _ from 'lodash';
import { useSession } from 'src/content/PostProcess/hooks/useSession';
import { useGetDeviceNodesQuery } from 'src/queries/postProcess';

const truncate = () => {
	return {
		whiteSpace: 'nowrap',
		overflow: 'hidden',
		textOverflow: 'ellipsis',
	};
};

const NodesItem = ({ categoryId, heading, projectId }) => {
	const theme = useTheme();
	const { t } = useTranslation();
	const { isOwner } = useSession();
	const { graphId } = useContext(GraphInstanceContext);
	const dispatch = useDispatch();
	const queryClient = useQueryClient();
	const [isCardExpanded, setIsCardExpanded] = useState(false);
	const pinnedSelectedNodes = useSelector(selectPPNodes, (left, right) => {
		return shallowEqual(left[graphId], right[graphId]);
	});
	const categoryExist = _.hasIn(pinnedSelectedNodes, [
		graphId,
		projectId,
		categoryId,
	]);

	const getSeletedNodesStateDefaultVal = () => {
		if (categoryExist) {
			return (
				pinnedSelectedNodes[graphId][projectId][categoryId]?.selectedNodes || []
			);
		}
		return [];
	};

	const [selectedNodes, setSelectedNodes] = useState(
		getSeletedNodesStateDefaultVal()
	);

	const { data, isLoading, isError, refetch } = useGetDeviceNodesQuery(
		{
			project: projectId,
			category: categoryId,
		},
		{
			enabledFunc: () => isCardExpanded,
		}
	);

	const expandCard = () => setIsCardExpanded((prev) => !prev);

	const handleCheckboxChange = (_, deviceObj) => {
		const idx = selectedNodes.findIndex((node) => node.id === deviceObj.id);
		if (idx === -1) {
			setSelectedNodes((prev) => [...prev, deviceObj]);
		} else {
			setSelectedNodes((prev) =>
				prev.filter((node) => node.id !== deviceObj.id)
			);
		}
	};

	const handleDefaultChecked = (deviceId) => {
		const idx = selectedNodes.findIndex((node) => node.id === deviceId);
		return idx !== -1;
	};

	const resetGraphDataQuery = () =>
		queryClient.removeQueries([queryKeys.GET_POSTPROCESS_GRAPH_DATA, graphId]);

	const handleNodeSelectionSubmit = () => {
		const payload = {
			projectId,
			categoryId,
			graphId,
			selectedNodes,
		};
		dispatch(addOrRemoveNodes(payload));
		if (
			categoryExist &&
			!_.isEqual(
				selectedNodes,
				pinnedSelectedNodes[graphId][projectId][categoryId]?.selectedNodes
			)
		) {
			resetGraphDataQuery();
		}
	};

	const handleReset = () => {
		setSelectedNodes([]);
		const payload = {
			projectId,
			categoryId,
			graphId,
			selectedNodes: [],
		};
		dispatch(addOrRemoveNodes(payload));
		resetGraphDataQuery();
	};

	const handleSelectAll = () => {
		let selectedNodesPayload = [];
		data.forEach((node) =>
			selectedNodesPayload.push({
				id: node.device.id,
				name: node.device.name,
				nodeId: node.id,
			})
		);
		setSelectedNodes(selectedNodesPayload);
	};

	return (
		<NodeOptionWrapper>
			<Box
				sx={{
					padding: theme.spacing(1),
					display: 'flex',
					alignItems: 'center',
					justifyContent: 'space-between',
				}}
			>
				<Typography
					sx={{
						fontSize: theme.typography.body1,
						width: '90%',
						...truncate(),
					}}
				>
					{heading}
				</Typography>
				<Expander
					onClick={expandCard}
					expandState={isCardExpanded}
					btnSize="small"
				/>
			</Box>
			<Collapse in={isCardExpanded} timeout="auto">
				{isLoading ? (
					<Si6maLoader size={24} />
				) : isError ? (
					<Center my={theme.spacing(0.5)}>
						<ReloadButton onClick={refetch} />
					</Center>
				) : (
					<>
						<Box sx={{ padding: theme.spacing(0, 1, 1, 1), height: '245px' }}>
							<Scrollbar>
								<FormGroup sx={{ width: '90%', ...truncate() }}>
									{data.map((node) => (
										<FormControlLabel
											onChange={(e) =>
												handleCheckboxChange(e, {
													id: node.device.id,
													name: node.device.name,
													nodeId: node.id,
												})
											}
											key={node.id}
											sx={{ color: theme.colors.rawColors.fontSecondary }}
											control={
												<Checkbox
													checked={handleDefaultChecked(node.device.id)}
													disabled={!isOwner}
													color="primary"
												/>
											}
											label={node.device.name}
										/>
									))}
								</FormGroup>
							</Scrollbar>
						</Box>
						<HelperButtonCtn>
							<SmallButton
								variant="outlined"
								onClick={handleSelectAll}
								disabled={!isOwner}
							>
								{t('All')}
							</SmallButton>
							<SmallButton
								variant="outlined"
								onClick={handleReset}
								disabled={
									!isOwner ||
									!_.hasIn(pinnedSelectedNodes, [
										graphId,
										projectId,
										categoryId,
									])
								}
							>
								{t('Reset')}
							</SmallButton>
							<SmallButton
								variant="contained"
								onClick={handleNodeSelectionSubmit}
								disabled={!isOwner || selectedNodes.length === 0}
							>
								{t('Add')}
							</SmallButton>
						</HelperButtonCtn>
					</>
				)}
			</Collapse>
		</NodeOptionWrapper>
	);
};

NodesItem.propTypes = {
	heading: PropTypes.string.isRequired,
	projectId: PropTypes.string.isRequired,
	categoryId: PropTypes.string.isRequired,
};

export default NodesItem;
