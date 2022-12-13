import Footer from 'src/components/Footer';
import Scrollbar from 'src/components/Scrollbar';
import SupportForm from 'src/content/SupportPage/SupportPageBody/supportForm';
import TestTubePart from './testTube';

function TestTubePageBody() {
	return (
		<Scrollbar>
			<TestTubePart />
			<SupportForm />
			<Footer />
		</Scrollbar>
	);
}

export default TestTubePageBody;
