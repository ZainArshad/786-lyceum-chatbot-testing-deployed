import PropTypes from 'prop-types';
import { Box } from '@mui/material';
import _ from 'lodash';
import Scrollbar from 'src/components/Scrollbar';
import { selectPinboardDataCategories } from 'src/slices/pinboard/dataProcessing/pinnedDataSlice';
import { selectPPMetaData } from 'src/slices/postProcessing/graphs';
import { useSelector } from 'src/store';
import { OperationsPanelCtn } from 'src/content/PostProcess/components';
import { DottedDivider } from 'src/components/shared';
import {
	ALLOWED_DATA_TYPES,
	MEASUREMENT_TYPE,
	SIMULATION_TYPE,
	STATISTICS_TYPE,
} from 'src/content/Analyzer/constants';
import {
	INSTANCE_TYPE_MASTER,
	INSTANCE_TYPE_SLAVE,
} from 'src/content/PostProcess/constants';
import React from 'react';
import StatNodeItem from './StatNodeItem';

export const NodesInstance = ({
	filterOps = [SIMULATION_TYPE, MEASUREMENT_TYPE, STATISTICS_TYPE],
	allowAll = false,
	instanceType,
}) => {
	const categories = useSelector(selectPinboardDataCategories);
	const metaData = useSelector(selectPPMetaData); // nodes from the shared session

	return (
		<Scrollbar>
			<OperationsPanelCtn>
				<Box>
					{_.keys(metaData.categories)?.map((projectId) => {
						const project = metaData.categories[projectId];
						return project.pinnedCategories.map((category) => {
							if (allowAll || filterOps.includes(category.dataType)) {
								return (
									<StatNodeItem
										heading={category.categoryName}
										key={category.categoryId}
										categoryId={category.categoryId}
										projectId={projectId}
										instanceType={instanceType}
										categoryUnits={category.units}
									/>
								);
							}
							return null;
						});
					})}
					{!_.isEmpty(metaData.categories) && <DottedDivider sx={{ my: 1 }} />}
					{_.keys(categories)?.map((projectId) => {
						const project = categories[projectId];
						return project.pinnedCategories.map((category) => {
							if (allowAll || filterOps.includes(category.dataType)) {
								return (
									<StatNodeItem
										heading={category.categoryName}
										key={category.categoryId}
										categoryId={category.categoryId}
										categoryUnits={category.units}
										projectId={projectId}
										instanceType={instanceType}
									/>
								);
							}
							return null;
						});
					})}
				</Box>
			</OperationsPanelCtn>
		</Scrollbar>
	);
};

export const MemNodesInstance = React.memo(NodesInstance);

NodesInstance.propTypes = {
	filterOps: PropTypes.arrayOf(PropTypes.oneOf(ALLOWED_DATA_TYPES)),
	allowAll: PropTypes.bool,
	instanceType: PropTypes.oneOf([INSTANCE_TYPE_MASTER, INSTANCE_TYPE_SLAVE])
		.isRequired,
};
