import { Guest } from 'src/components/Guest';
import TestTubePage from 'src/content/TestTubePage';

function TestTube() {
	return null;
}

TestTube.getLayout = () => (
	<Guest>
		<TestTubePage />
	</Guest>
);

export default TestTube;
