import { Box, Typography, useTheme } from '@mui/material';
import { useTranslation } from 'next-i18next';
import PropTypes from 'prop-types';
import { CardMainWrapper } from 'src/components/CardsCompsAndWrappers/CardWrappers';
import DownloadOutlinedIcon from '@mui/icons-material/DownloadOutlined';

import InsertDriveFileTwoToneIcon from '@mui/icons-material/InsertDriveFileTwoTone';
import { CardButton } from 'src/components/CardsCompsAndWrappers/CardComps';

export const FileCard = ({ file }) => {
	const theme = useTheme();
	const { t } = useTranslation();

	return (
		<CardMainWrapper>
			<Box
				sx={{
					display: 'grid',
					gridTemplateColumns: { lg: '1fr 1fr' },
					width: '100%',
				}}
			>
				<Box sx={{ display: 'flex', alignItems: 'center' }}>
					<Box
						sx={{
							p: 1,
							border: '1px solid rgba(163, 163, 163, 0.2)',
							background: 'white',
							borderRadius: '11px',
						}}
					>
						<InsertDriveFileTwoToneIcon />
					</Box>
					<Box sx={{ display: 'flex', flexWrap: 'wrap' }}>
						<Box sx={{ ml: theme.spacing(2) }}>
							<Typography variant="h4">{file.title}</Typography>
							<Typography variant="h5" sx={{ fontWeight: 'normal' }}>
								{file.uploader}
							</Typography>
						</Box>
						<Box sx={{ ml: theme.spacing(2) }}>
							<Typography variant="body1" color="text.secondary">
								{t('Created ') + file.date}
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
					<CardButton variant="outlined">
						<DownloadOutlinedIcon />
						<Typography variant="body1" color="text.secondary" sx={{ ml: 1 }}>
							{t('Download')}
						</Typography>
					</CardButton>
				</Box>
			</Box>
		</CardMainWrapper>
	);
};

FileCard.propTypes = {
	file: PropTypes.object.isRequired,
};
