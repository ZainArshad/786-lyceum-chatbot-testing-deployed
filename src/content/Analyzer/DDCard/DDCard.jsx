import DeleteIcon from '@mui/icons-material/Delete';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import RemoveRedEyeOutlinedIcon from '@mui/icons-material/RemoveRedEyeOutlined';
import ZoomOutMapOutlinedIcon from '@mui/icons-material/ZoomOutMapOutlined';
import { Box, Typography, useTheme } from '@mui/material';
import { format, parseISO } from 'date-fns';
import { useTranslation } from 'next-i18next';
import { useRouter } from 'next/router';
import PropTypes from 'prop-types';
import { useState } from 'react';
import { STANDARD_DATE_FORMAT } from 'src/lib/constants/date-fns';
import { DDMainWrapper } from './DDCardWrappers';
import { DDCardContent } from './DDCardContent';
import { DDAnalyzeButton, DDSignalIcon } from './DDCardComps';

export const DDCard = ({ projectDetails, canEdit }) => {
	const theme = useTheme();
	const { t } = useTranslation();
	const [isCardExpanded, setIsCardExpanded] = useState(false);
	const router = useRouter();
	const expandCard = () => setIsCardExpanded((prev) => !prev);

	return (
		<DDMainWrapper>
			<Box
				sx={{
					display: 'grid',
					gridTemplateColumns: { lg: '1fr 1fr' },
					width: '100%',
				}}
			>
				<Box sx={{ display: 'flex', alignItems: 'center' }}>
					<DDSignalIcon type={projectDetails.data_type} />
					<Box sx={{ display: 'flex', flexWrap: 'wrap' }}>
						<Box sx={{ ml: theme.spacing(2) }}>
							<Typography variant="h4">{projectDetails.name}</Typography>
							<Typography variant="h5" sx={{ fontWeight: 'normal' }}>
								{projectDetails.owner}
							</Typography>
						</Box>
						<Box sx={{ ml: theme.spacing(2) }}>
							<Typography variant="body1" color="text.secondary">
								{t('Created ') +
									format(
										parseISO(projectDetails.created_at),
										STANDARD_DATE_FORMAT
									)}
							</Typography>
						</Box>
					</Box>
				</Box>
				<Box
					sx={{
						mt: { xs: theme.spacing(1) },
						display: 'flex',
						alignItems: 'center',
						justifyContent: { lg: 'flex-end' },
						flexWrap: 'wrap',
					}}
				>
					<DDAnalyzeButton
						text="View"
						disabled={projectDetails.status.toUpperCase() === 'IS_PROCESSING'}
						onClick={() => router.push(`/analyzer/${projectDetails.id}/view`)}
						icon={<RemoveRedEyeOutlinedIcon />}
					/>
					{canEdit === true && (
						<>
							<DDAnalyzeButton text="Edit" icon={<EditOutlinedIcon />} />
							<DDAnalyzeButton text="Delete" icon={<DeleteIcon />} />
						</>
					)}
					<DDAnalyzeButton
						text={isCardExpanded ? 'Unexpand' : 'Expand'}
						icon={<ZoomOutMapOutlinedIcon />}
						onClick={expandCard}
					/>
				</Box>
			</Box>
			{isCardExpanded && <DDCardContent projectDetails={projectDetails} />}
		</DDMainWrapper>
	);
};

DDCard.propTypes = {
	projectDetails: PropTypes.object.isRequired,
	canEdit: PropTypes.bool,
};

DDCard.defaultProps = {
	canEdit: true,
};
