import React from 'react';
import Head from 'next/head';
import { Si6maLayout } from 'src/layouts/Si6maLayout';
import { useTranslation } from 'react-i18next';
import { DataInjestor } from 'src/content/DataInjestor';
import { Authenticated } from 'src/components/Authenticated';

function DataIngestor() {
	const { t } = useTranslation();

	return (
		<>
			<Head>
				<title>Lyceum - {t('Data Ingestor')}</title>
			</Head>
			<DataInjestor />
		</>
	);
}

DataIngestor.getLayout = function getLayout(page) {
	return (
		<Authenticated>
			<Si6maLayout>{page}</Si6maLayout>
		</Authenticated>
	);
};

export default DataIngestor;
