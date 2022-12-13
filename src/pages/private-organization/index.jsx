import React from 'react';
import Head from 'next/head';
import { Si6maLayout } from 'src/layouts/Si6maLayout';
import { useTranslation } from 'react-i18next';
import PrivateOrganizationPage from 'src/content/CreatePrivateOrganization';
import { Authenticated } from 'src/components/Authenticated';

function PrivateOrganizationFormPage() {
	const { t } = useTranslation();
	return (
		<>
			<Head>
				<title>Lyceum - {t('Create Private Organization')}</title>
			</Head>
			<PrivateOrganizationPage />
		</>
	);
}

PrivateOrganizationFormPage.getLayout = function getLayout(page) {
	return (
		<Authenticated>
			<Si6maLayout>{page}</Si6maLayout>
		</Authenticated>
	);
};

export default PrivateOrganizationFormPage;
