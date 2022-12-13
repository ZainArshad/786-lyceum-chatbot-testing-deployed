import Footer from 'src/components/Footer';
import Scrollbar from 'src/components/Scrollbar';
import SupportForm from 'src/content/SupportPage/SupportPageBody/supportForm';
import DataIngestorPart from './dataIngestor';

function DataIngestorPageBody() {
	return (
		<Scrollbar>
			<DataIngestorPart />
			<SupportForm />
			<Footer />
		</Scrollbar>
	);
}

export default DataIngestorPageBody;
