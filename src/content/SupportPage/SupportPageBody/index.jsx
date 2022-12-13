import Footer from 'src/components/Footer';
import Scrollbar from 'src/components/Scrollbar';
import SupportForm from './supportForm';

function SupportPageBody() {
	return (
		<Scrollbar>
			<SupportForm />
			<Footer />
		</Scrollbar>
	);
}

export default SupportPageBody;
