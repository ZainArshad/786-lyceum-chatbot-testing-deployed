import { Grid } from '@mui/material';
import OrganizationCard from 'src/components/OrganizationCard';
import NewOrganizationCard from '../NewOrganizationCard';
import TopSearch from '../TopSearch';

function OrganizationCards() {
	const arr = [0, 1, 2, 3, 4];
	return (
		<Grid
			container
			direction="row"
			justifyContent="start"
			alignItems="stretch"
			rowSpacing={2.5}
			columnSpacing={1.5}
		>
			<Grid item xs={12} key="searchbar">
				<TopSearch />
			</Grid>
			{arr.map((d, i) => {
				return (
					<Grid item xs={12} sm={6} md={4} key={i}>
						<OrganizationCard />
					</Grid>
				);
			})}
			<Grid item xs={12} sm={6} md={4} key="new1">
				<NewOrganizationCard />
			</Grid>
		</Grid>
	);
}

export default OrganizationCards;
