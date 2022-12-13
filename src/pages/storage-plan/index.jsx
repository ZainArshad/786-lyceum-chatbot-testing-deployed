import Head from 'next/head';
import { useTranslation } from 'react-i18next';
import { Authenticated } from 'src/components/Authenticated';
import StoragePlan from 'src/content/StoragePlan';
import { Si6maLayout } from 'src/layouts/Si6maLayout';

function StoragePage() {
	const { t } = useTranslation();
	return (
		<>
			<Head>
				<title>Lyceum - {t('Buy Storage Plans')}</title>
			</Head>
			<StoragePlan />
		</>
	);
}

StoragePage.getLayout = function getLayout(page) {
	return (
		<Authenticated>
			<Si6maLayout>{page}</Si6maLayout>
		</Authenticated>
	);
};

export default StoragePage;
