import { useContext, useState } from 'react';
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
import Scrollbar from 'src/components/Scrollbar';
import { ReloadButton } from 'src/components/shared/Buttons/RealoadButton';
import Expander from 'src/components/shared/Expander';
import { Si6maLoader } from 'src/components/shared/Loaders';
import { Center, FlexApart } from 'src/components/shared/wrappers';
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
import {
	INSTANCE_TYPE_MASTER,
	INSTANCE_TYPE_SLAVE,
	INSTANCE_TYPE_TO_STORE_NAME_NODE,
} from 'src/content/PostProcess/constants';
import {
	selectAllowedUnits,
	addOrRemoveStatNodes,
	selectPPStatBoxNodes,
} from 'src/slices/postProcessing/statistics';
import { StatInstanceContext } from 'src/content/PostProcess/context';

const StatNodeItem = ({
	categoryId,
	heading,
	projectId,
	instanceType,
	categoryUnits,
}) => {
	const theme = useTheme();
	const { t } = useTranslation();
	const { isOwner } = useSession();
	const { statId } = useContext(StatInstanceContext);
	const dispatch = useDispatch();
	const [isCardExpanded, setIsCardExpanded] = useState(false);

	const allowedSelectionUnits = useSelector((state) =>
		selectAllowedUnits(state, statId)
	);

	const pinnedSelectedNodes = useSelector(
		selectPPStatBoxNodes,
		(left, right) => {
			return shallowEqual(left[statId], right[statId]);
		}
	);

	const alreadyHasNodes = _.hasIn(pinnedSelectedNodes, [
		statId,
		'nodes',
		INSTANCE_TYPE_TO_STORE_NAME_NODE[instanceType],
	]);

	const getSeletedNodesStateDefaultVal = () => {
		if (alreadyHasNodes) {
			const k =
				pinnedSelectedNodes[statId].nodes[
					INSTANCE_TYPE_TO_STORE_NAME_NODE[instanceType]
				];
			const fk = _.filter(
				k,
				(o) => o.categoryId === categoryId && o.projectId === projectId
			);
			return fk;
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
			select: (res) => {
				const { data } = res;
				const units = { x_units: data[0]?.x_units, y_units: data[0]?.y_units };
				return { nodes: data, units };
			},
		}
	);

	const expandCard = () => setIsCardExpanded((prev) => !prev);
	const noMasterSelected =
		_.isUndefined(allowedSelectionUnits.x_units) &&
		_.isUndefined(allowedSelectionUnits.y_units);

	const toggleDisabledFunc = () => {
		if (instanceType === INSTANCE_TYPE_SLAVE) return noMasterSelected;
		return false;
	};
	const toggleDisabled = toggleDisabledFunc();

	const categoryNotAllowed = () => {
		if (instanceType === INSTANCE_TYPE_MASTER && noMasterSelected) return false;
		return (
			allowedSelectionUnits.x_units !== categoryUnits.xUnits ||
			allowedSelectionUnits.y_units !== categoryUnits.yUnits
		);
	};
	const isCategoryNotAllowed = categoryNotAllowed();

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

	const generateNodeObj = (node) => {
		return {
			id: node.device.id,
			name: node.device.name,
			nodeId: node.id,
			categoryId,
			projectId,
			x_units: node.x_units,
			y_units: node.y_units,
		};
	};

	const handleNodeSelectionSubmit = () => {
		const payload = {
			statBoxId: statId,
			instanceType,
			nodes: selectedNodes,
			categoryId,
		};
		dispatch(addOrRemoveStatNodes(payload));
	};

	const handleReset = () => {
		setSelectedNodes([]);
		const payload = {
			statBoxId: statId,
			instanceType,
			categoryId,
			nodes: [],
		};
		dispatch(addOrRemoveStatNodes(payload));
	};

	const handleSelectAll = () => {
		setSelectedNodes(data.nodes.map((node) => generateNodeObj(node)));
	};

	if (toggleDisabled || isCategoryNotAllowed) {
		return null;
	}

	return (
		<NodeOptionWrapper>
			<FlexApart sx={{ padding: theme.spacing(1) }}>
				<Typography
					variant="body1"
					sx={{ width: '90%', ...theme.general.utils.truncate }}
				>
					{heading}
				</Typography>
				<Expander
					onClick={expandCard}
					expandState={isCardExpanded}
					btnSize="small"
					togglerProps={{ disabled: toggleDisabled }}
				/>
			</FlexApart>
			<Collapse in={isCardExpanded} timeout="auto">
				{isLoading ? (
					<Si6maLoader size={24} />
				) : isError ? (
					<Center my={theme.spacing(0.5)}>
						<ReloadButton onClick={refetch} variant="outlined" />
					</Center>
				) : (
					<>
						<Box sx={{ padding: theme.spacing(0, 1, 1, 1), height: '245px' }}>
							<Scrollbar>
								<FormGroup
									sx={{ width: '90%', ...theme.general.utils.truncate }}
								>
									{data.nodes.map((node) => (
										<FormControlLabel
											onChange={(e) =>
												handleCheckboxChange(e, generateNodeObj(node))
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
											disabled={isCategoryNotAllowed}
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
								disabled={!isOwner || isCategoryNotAllowed}
							>
								{t('All')}
							</SmallButton>
							<SmallButton
								variant="outlined"
								onClick={handleReset}
								disabled={!isOwner || isCategoryNotAllowed}
							>
								{t('Reset')}
							</SmallButton>
							<SmallButton
								variant="contained"
								onClick={handleNodeSelectionSubmit}
								disabled={
									!isOwner || isCategoryNotAllowed || selectedNodes.length === 0
								}
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

StatNodeItem.propTypes = {
	heading: PropTypes.string.isRequired,
	projectId: PropTypes.string.isRequired,
	categoryId: PropTypes.string.isRequired,
	instanceType: PropTypes.oneOf([INSTANCE_TYPE_MASTER, INSTANCE_TYPE_SLAVE])
		.isRequired,
	categoryUnits: PropTypes.shape({
		xUnits: PropTypes.string.isRequired,
		yUnits: PropTypes.string.isRequired,
	}).isRequired,
};

export default StatNodeItem;
