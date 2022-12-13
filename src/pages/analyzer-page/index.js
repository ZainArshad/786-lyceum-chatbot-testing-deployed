import { Guest } from 'src/components/Guest';
import AnalyzerPage from 'src/content/AnalyzerPage';

function Analyzer() {
	return null;
}

Analyzer.getLayout = () => (
	<Guest>
		<AnalyzerPage />
	</Guest>
);

export default Analyzer;
