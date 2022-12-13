/* eslint react/prop-types: 0 */ // --> OFF | @Zain please take care of this
import { useTheme, Box, Typography } from '@mui/material';
import { useTranslation } from 'next-i18next';
import { Button } from 'src/components/shared/Buttons';
import KeyboardBackspaceIcon from '@mui/icons-material/KeyboardBackspace';
import { useRouter } from 'next/router';
import { ProjectViewSectionHeading } from './ProjectViewComps';

export const ProjectInfoTitle = ({ title, author, date }) => {
	const theme = useTheme();
	const { t } = useTranslation();
	const router = useRouter();

	return (
		<Box
			sx={{
				display: 'flex',
				my: theme.spacing(2),
				alignItem: 'center',
				justifyContent: 'space-between',
				flexWrap: 'wrap',
			}}
			fullWidth
		>
			<Box sx={{ display: 'flex', flexWrap: 'wrap' }}>
				<Box>
					<ProjectViewSectionHeading>{title}</ProjectViewSectionHeading>
					<Typography variant="h5" sx={{ fontWeight: 'normal' }}>
						{author}
					</Typography>
				</Box>
				<Typography
					variant="body1"
					sx={{
						color: theme.colors.rawColors.fontSecondary,
						fontWeight: 'normal',
						ml: { xs: theme.spacing(2) },
					}}
				>
					{date}
				</Typography>
			</Box>
			<Button
				color="secondary"
				variant="contained"
				size="small"
				startIcon={<KeyboardBackspaceIcon />}
				sx={{ my: { xs: theme.spacing(1) } }}
				onClick={() => router.back()}
			>
				{t('Back to Data')}
			</Button>
		</Box>
	);
};
