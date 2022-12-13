import { Grid, Card } from '@mui/material';
import { PageHeading } from 'src/components/shared/Typography';
import { TestTubeContent } from '../TestTubeContent';

const TestTubeFeed = () => {
	return (
		<Grid
			container
			sx={{
				m: 3,
			}}
		>
			<PageHeading>Test Tube - Not Yet Working... COMING SOON!!</PageHeading>
			<Grid item xs={12}>
				<Card sx={{ p: 1.5 }}>
					<TestTubeContent />
				</Card>
			</Grid>
		</Grid>
	);
};

export default TestTubeFeed;
