import Footer from 'src/components/Footer';
import Scrollbar from 'src/components/Scrollbar';
import About from './about';

function AboutUsPageBody() {
	return (
		<Scrollbar>
			<About />
			<Footer />
		</Scrollbar>
	);
}

export default AboutUsPageBody;
