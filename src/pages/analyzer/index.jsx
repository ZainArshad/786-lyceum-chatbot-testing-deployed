import React from 'react';
import Head from 'next/head';
import { Si6maLayout } from 'src/layouts/Si6maLayout';
import { useTranslation } from 'react-i18next';
import { Analyzer as AnalyzerContent } from 'src/content/Analyzer';
import { Authenticated } from 'src/components/Authenticated';

function Analyzer() {
	const { t } = useTranslation();

	return (
		<>
			<Head>
				<title>Lyceum - {t('Analyzer')}</title>
			</Head>
			<AnalyzerContent />
		</>
	);
}

Analyzer.getLayout = function getLayout(page) {
	return (
		<Authenticated>
			<Si6maLayout>{page}</Si6maLayout>
		</Authenticated>
	);
};

export default Analyzer;
