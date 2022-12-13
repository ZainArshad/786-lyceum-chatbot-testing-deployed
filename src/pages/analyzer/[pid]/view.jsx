import React from 'react';
import Head from 'next/head';
import { Si6maLayout } from 'src/layouts/Si6maLayout';
import { useTranslation } from 'react-i18next';
import { Authenticated } from 'src/components/Authenticated';
import { ProjectView as ProjectViewPage } from 'src/content/Project/ProjectView';

function ProjectView() {
	const { t } = useTranslation();

	return (
		<>
			<Head>
				<title>{t('Project')}</title>
			</Head>
			<ProjectViewPage />
		</>
	);
}

ProjectView.getLayout = function getLayout(page) {
	return (
		<Authenticated>
			<Si6maLayout>{page}</Si6maLayout>
		</Authenticated>
	);
};

export default ProjectView;
