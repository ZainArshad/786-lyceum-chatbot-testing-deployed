import { PageContentWrapper } from 'src/components/styled';
import { Grid } from '@mui/material';
import Pinboard from 'src/components/Pinboard/Pinboard';
import UsersManagementTable from './UsersManagementTable';

function UsersManagementPage() {
	return (
		<PageContentWrapper>
			<Grid
				sx={{ px: 4 }}
				container
				direction="row"
				justifyContent="center"
				alignItems="stretch"
				spacing={3}
			>
				<Grid item xs={12}>
					<UsersManagementTable />
				</Grid>
			</Grid>
			<Pinboard />
		</PageContentWrapper>
	);
}

export default UsersManagementPage;
