import Head from 'next/head';
import { useTranslation } from 'react-i18next';
import { Authenticated } from 'src/components/Authenticated';
import { ShareSession as ShareSessionContent } from 'src/content/ShareSession';
import { SigmaLayoutWithoutPinboard } from 'src/layouts/Si6maLayout';

function SharedSession() {
	const { t } = useTranslation();

	return (
		<>
			<Head>
				<title>Lyceum - {t('Session Share')}</title>
			</Head>
			<ShareSessionContent />
		</>
	);
}

SharedSession.getLayout = function getLayout(page) {
	return (
		<Authenticated>
			<SigmaLayoutWithoutPinboard>{page}</SigmaLayoutWithoutPinboard>
		</Authenticated>
	);
};

export default SharedSession;
