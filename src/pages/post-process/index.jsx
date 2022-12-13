import Head from 'next/head';
import { useTranslation } from 'react-i18next';
import { Authenticated } from 'src/components/Authenticated';
import { PostProcess as PostProcessContent } from 'src/content/PostProcess';
import { Si6maLayout } from 'src/layouts/Si6maLayout';

function PostProcess() {
	const { t } = useTranslation();

	return (
		<>
			<Head>
				<title>Lyceum - {t('Post Process')}</title>
			</Head>
			<PostProcessContent />
		</>
	);
}

PostProcess.getLayout = function getLayout(page) {
	return (
		<Authenticated>
			<Si6maLayout>{page}</Si6maLayout>
		</Authenticated>
	);
};

export default PostProcess;
