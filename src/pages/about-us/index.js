import { Guest } from 'src/components/Guest';
import AboutUsPage from 'src/content/AboutUs';

function AboutUs() {
	return null;
}

AboutUs.getLayout = () => (
	<Guest>
		<AboutUsPage />
	</Guest>
);

export default AboutUs;
