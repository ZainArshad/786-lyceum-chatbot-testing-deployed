import React from 'react';
import Head from 'next/head';
import { Si6maLayout } from 'src/layouts/Si6maLayout';
import { useTranslation } from 'react-i18next';
import { Authenticated } from 'src/components/Authenticated';
import UserHomePage from 'src/content/UserHomePage';

function HomePage() {
	const { t } = useTranslation();
	return (
		<>
			<Head>
				<title>Lyceum - {t('Home')}</title>
			</Head>
			<UserHomePage />
		</>
	);
}

HomePage.getLayout = function getLayout(page) {
	return (
		<Authenticated>
			<Si6maLayout>{page}</Si6maLayout>
		</Authenticated>
	);
};

export default HomePage;
