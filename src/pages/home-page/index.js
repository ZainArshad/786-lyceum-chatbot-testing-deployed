import { Guest } from 'src/components/Guest';
import HomePage from 'src/content/HomePage';

function Home() {
	return null;
}

Home.getLayout = () => (
	<Guest>
		<HomePage />
	</Guest>
);

export default Home;
