import { Si6maLayout } from 'src/layouts/Si6maLayout';
import Head from 'next/head';
import dynamic from 'next/dynamic';
import { useTranslation } from 'react-i18next';
import HomePage from 'src/content/HomePage';
import { useAuth } from 'src/hooks/useAuth';

const UserHomePage = dynamic(() => import('src/content/UserHomePage'), {
	ssr: false,
});

function Home() {
	const { t } = useTranslation();
	const auth = useAuth();

	return (
		<>
			<Head>
				<title>Lyceum - {t('Home')}</title>
			</Head>
			{!auth.isAuthenticated ? (
				<HomePage />
			) : (
				<Si6maLayout>
					<UserHomePage />
				</Si6maLayout>
			)}
		</>
	);
}

export default Home;
