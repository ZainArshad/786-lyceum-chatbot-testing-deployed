import { Guest } from 'src/components/Guest';
import CollaborationAnalysisPage from 'src/content/CollaborationAnalysisPage';

function CollaborationAnalysis() {
	return null;
}

CollaborationAnalysis.getLayout = () => (
	<Guest>
		<CollaborationAnalysisPage />
	</Guest>
);

export default CollaborationAnalysis;
