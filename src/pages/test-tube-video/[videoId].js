import { Si6maLayout } from 'src/layouts/Si6maLayout';
import TestTubeVideoHomeContent from 'src/content/TestTubeVideo';
import { Authenticated } from 'src/components/Authenticated';

function TestTube() {
	return <TestTubeVideoHomeContent />;
}

export default TestTube;

TestTube.getLayout = function getLayout(page) {
	return (
		<Authenticated>
			<Si6maLayout>{page}</Si6maLayout>
		</Authenticated>
	);
};
