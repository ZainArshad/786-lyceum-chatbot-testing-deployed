import { Guest } from 'src/components/Guest';
import DataIngestorPage from 'src/content/DataIngestorPage';

function DataIngestor() {
	return null;
}

DataIngestor.getLayout = () => (
	<Guest>
		<DataIngestorPage />
	</Guest>
);

export default DataIngestor;
