import { Box, Card, Typography, Container, styled } from '@mui/material';
import Head from 'next/head';
import { Guest } from 'src/components/Guest';
import { LoginJWT } from 'src/content/Auth/Login/LoginJWT';
import { useTranslation } from 'next-i18next';
import BaseLayout from 'src/layouts/BaseLayout';
import Link from 'src/components/Link';
import { Si6maLogo } from 'src/assets/svgs';

const MainContent = styled(Box)(
	() => `
    height: 100%;
    display: flex;
		align-items: center;
		justify-content: center;
    flex: 1;
`
);

const TopWrapper = styled(Box)(
	() => `
  display: flex;
  width: 100%;
  flex: 1;
  padding: 20px;
`
);

function LoginBasic() {
	const { t } = useTranslation();
	return (
		<>
			<Head>
				<title>{t('Login')}</title>
			</Head>
			<MainContent>
				<TopWrapper>
					<Container maxWidth="sm">
						<Si6maLogo />
						<Card sx={{ mt: 3, px: 4, py: 2 }}>
							<LoginJWT />
							<Box my={4}>
								<Typography
									component="span"
									variant="subtitle2"
									color="text.primary"
									fontWeight="bold"
								>
									{t('Don’t have an account, yet?')}
								</Typography>{' '}
								<Link href="/auth/register">
									<b>{t('Sign up here')}</b>
								</Link>
							</Box>
						</Card>
					</Container>
				</TopWrapper>
			</MainContent>
		</>
	);
}

LoginBasic.getLayout = (page) => (
	<Guest>
		<BaseLayout>{page}</BaseLayout>
	</Guest>
);

export default LoginBasic;
