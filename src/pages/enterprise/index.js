import { Guest } from 'src/components/Guest';
import EnterprisePage from 'src/content/EnterprisePage';

function Enterprise() {
	return null;
}

Enterprise.getLayout = () => (
	<Guest>
		<EnterprisePage />
	</Guest>
);

export default Enterprise;
