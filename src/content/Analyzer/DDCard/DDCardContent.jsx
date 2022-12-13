import { Box, useTheme } from '@mui/material';
import PropTypes from 'prop-types';
import { DDAccessGroups } from './DDAccessGroups';
import { DDCategories } from './DDCategories';
import { DDDescriptors } from './DDDescriptors';
import { LIMIT_TYPE } from '../constants';
import { DDLimitsCard } from './DDLimitsCard';

export const DDCardContent = ({ projectDetails }) => {
	const theme = useTheme();
	const {
		descriptors,
		tags,
		categories,
		groups,
		is_public: isPublic,
		name: projectName,
		id: projectId,
		data_type: dataType,
	} = projectDetails;

	return (
		<Box
			sx={{
				display: 'grid',
				gridTemplateColumns: { lg: '1fr 1fr' },
				py: theme.spacing(1.2),
				gap: theme.spacing(1),
			}}
		>
			<DDDescriptors descriptors={descriptors} tags={tags} />
			{dataType === LIMIT_TYPE ? (
				<DDLimitsCard projectId={projectId} projectName={projectName} />
			) : (
				<DDCategories
					categories={categories}
					projectId={projectId}
					projectName={projectName}
					dataType={dataType}
				/>
			)}
			{isPublic && groups?.length > 0 && <DDAccessGroups groups={groups} />}
		</Box>
	);
};

DDCardContent.propTypes = {
	projectDetails: PropTypes.object.isRequired,
};
