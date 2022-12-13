import { Box, IconButton, useTheme, Typography } from '@mui/material';
import ModeOutlinedIcon from '@mui/icons-material/ModeOutlined';
import DeleteOutlinedIcon from '@mui/icons-material/DeleteOutlined';
import VisibilityOutlinedIcon from '@mui/icons-material/VisibilityOutlined';
import CropFreeOutlinedIcon from '@mui/icons-material/CropFreeOutlined';
import { useTranslation } from 'next-i18next';

const PostReactionsPanel = () => {
	const { t } = useTranslation();
	const theme = useTheme();
	return (
		<Box
			sx={{
				display: 'flex',
				alignItems: 'center',
				justifyContent: 'end',
				padding: theme.spacing(0.5, 3),
			}}
		>
			<IconButton
				color="secondary"
				sx={{
					borderRadius: theme.general.borderRadiusSm,
					border: `1px solid ${theme.colors.alpha.black[10]}`,
					display: 'flex',
					alignItems: 'center',
					margin: theme.spacing(0, 0.51),
					width: '91px',
				}}
			>
				<VisibilityOutlinedIcon />
				<Typography
					sx={{
						padding: theme.spacing(0, 0, 0, 0.5),
						fontSize: theme.typography.h6,
					}}
				>
					{t('View')}
				</Typography>
			</IconButton>
			<IconButton
				color="secondary"
				sx={{
					borderRadius: theme.general.borderRadiusSm,
					border: `1px solid ${theme.colors.alpha.black[10]}`,
					display: 'flex',
					alignItems: 'center',
					margin: theme.spacing(0, 0.51),
					width: '91px',
				}}
			>
				<ModeOutlinedIcon />
				<Typography
					sx={{
						padding: theme.spacing(0, 0, 0, 0.5),
						fontSize: theme.typography.h6,
					}}
				>
					{t('Edit')}
				</Typography>
			</IconButton>
			<IconButton
				color="secondary"
				sx={{
					borderRadius: theme.general.borderRadiusSm,
					border: `1px solid ${theme.colors.alpha.black[10]}`,
					display: 'flex',
					alignItems: 'center',
					margin: theme.spacing(0, 0.51),
					width: '91px',
				}}
			>
				<DeleteOutlinedIcon />
				<Typography
					sx={{
						padding: theme.spacing(0, 0, 0, 0.5),
						fontSize: theme.typography.h6,
					}}
				>
					{t('Delete')}
				</Typography>
			</IconButton>
			<IconButton
				color="secondary"
				sx={{
					borderRadius: theme.general.borderRadiusSm,
					border: `1px solid ${theme.colors.alpha.black[10]}`,
					display: 'flex',
					alignItems: 'center',
					margin: theme.spacing(0, 0.51),
					width: '91px',
				}}
			>
				<CropFreeOutlinedIcon />
				<Typography
					sx={{
						padding: theme.spacing(0, 0, 0, 0.5),
						fontSize: theme.typography.h6,
					}}
				>
					{t('Expand')}
				</Typography>
			</IconButton>
		</Box>
	);
};

export default PostReactionsPanel;
