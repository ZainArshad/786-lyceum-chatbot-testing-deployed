import Footer from 'src/components/Footer';
import Scrollbar from 'src/components/Scrollbar';
import SupportForm from 'src/content/SupportPage/SupportPageBody/supportForm';
import FeaturesPart from 'src/content/HomePage/HomePageBody/FeaturesPart';
import Features from './features';

function FeaturesPageBody() {
	return (
		<Scrollbar>
			<Features />
			<FeaturesPart />
			<SupportForm />
			<Footer />
		</Scrollbar>
	);
}

export default FeaturesPageBody;
