import { Si6maLayout } from 'src/layouts/Si6maLayout';
import Head from 'next/head';
import { useTranslation } from 'react-i18next';
import { Authenticated } from 'src/components/Authenticated';
import TestTubeHomeContent from 'src/content/TestTube/Home';

function TestTube() {
	const { t } = useTranslation();

	return (
		<>
			<Head>
				<title>Lyceum - {t('Test Tube')}</title>
			</Head>
			<TestTubeHomeContent />
		</>
	);
}

export default TestTube;

TestTube.getLayout = function getLayout(page) {
	return (
		<Authenticated>
			<Si6maLayout>{page}</Si6maLayout>
		</Authenticated>
	);
};
