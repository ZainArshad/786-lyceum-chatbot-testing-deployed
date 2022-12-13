import { Grid } from '@mui/material';
import { useTranslation } from 'next-i18next';
import { PageContentWrapper } from 'src/components/styled';
import { PageHeading } from 'src/components/shared/Typography';
import { GroupsPage } from '../SearchGroups';
import { AnalyzerContent } from '../Analyzer/AnalyzerContent';

function UserHomePage() {
	const { t } = useTranslation();
	return (
		<PageContentWrapper>
			<Grid
				container
				direction="row"
				justifyContent="start"
				alignItems="stretch"
			>
				<Grid item xs={12}>
					<GroupsPage me />
				</Grid>
				<Grid item xs={12} sx={{ mx: 3 }}>
					<PageHeading> {t('Data')}</PageHeading>
					<AnalyzerContent />
				</Grid>
			</Grid>
		</PageContentWrapper>
	);
}

export default UserHomePage;
