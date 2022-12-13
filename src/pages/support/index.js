import { Guest } from 'src/components/Guest';
import SupportPage from 'src/content/SupportPage';

function Support() {
	return null;
}

Support.getLayout = () => (
	<Guest>
		<SupportPage />
	</Guest>
);

export default Support;
