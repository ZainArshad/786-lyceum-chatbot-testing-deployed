import { Guest } from 'src/components/Guest';
import FeaturesPage from 'src/content/FeaturesPage';

function Features() {
	return null;
}

Features.getLayout = () => (
	<Guest>
		<FeaturesPage />
	</Guest>
);

export default Features;
