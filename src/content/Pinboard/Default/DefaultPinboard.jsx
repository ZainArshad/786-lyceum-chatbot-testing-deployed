import { Box, Typography, useTheme } from '@mui/material';
import { useTranslation } from 'next-i18next';
// import ProcedureCard from 'src/components/ProcedureCard';
// import SavedPostsCard from 'src/components/SavedPostsCard';
import DataCard from 'src/content/Pinboard/Default/DataCard';

const DefaultPinbaordContent = () => {
	const theme = useTheme();
	const { t } = useTranslation();

	return (
		<Box px={1.15}>
			<Typography sx={{ fontSize: theme.typography.h3, my: theme.spacing(2) }}>
				{t('Pinboard')}
			</Typography>
			<DataCard />
			{/* <ProcedureCard /> */}
			{/* <SavedPostsCard /> */}
		</Box>
	);
};

export default DefaultPinbaordContent;
