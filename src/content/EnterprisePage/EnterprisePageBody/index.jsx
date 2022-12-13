import { useEffect } from 'react';
import Footer from 'src/components/Footer';
import Scrollbar from 'src/components/Scrollbar';
import { useRouter } from 'next/router';
import EnterpriseForm from './enterpriseForm';
import EnterprisePart from './enterprise';

function EnterprisePageBody() {
	const router = useRouter();

	useEffect(() => {
		if (router.query?.scroll) {
			document.getElementById(router.query?.scroll).scrollIntoView();
		}
	}, []);
	return (
		<Scrollbar>
			<EnterprisePart />
			<EnterpriseForm />
			<Footer />
		</Scrollbar>
	);
}

export default EnterprisePageBody;
