import Footer from 'src/components/Footer';
import Scrollbar from 'src/components/Scrollbar';
import SupportForm from 'src/content/SupportPage/SupportPageBody/supportForm';
import CollaborationAnalysisPart from './collaborationAnalysis';

function CollaborationAnalysisPageBody() {
	return (
		<Scrollbar>
			<CollaborationAnalysisPart />
			<SupportForm />
			<Footer />
		</Scrollbar>
	);
}

export default CollaborationAnalysisPageBody;
