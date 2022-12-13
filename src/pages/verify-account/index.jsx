import { useEffect } from 'react';
import { Typography } from '@mui/material';
import Head from 'next/head';
import { useTranslation } from 'react-i18next';
import { useRouter } from 'next/router';
import Loader from 'src/components/Loader';
import { makeAuthRequest } from 'src/services/api/auth';
import { useSnackbarNotifications } from 'src/hooks/useSnackbarNotifications';
import { useMutation } from '@tanstack/react-query';

function VerifyEmail() {
	const { t } = useTranslation();
	const router = useRouter();
	const { showErrorSnackbar, showSuccessSnackbar } = useSnackbarNotifications();

	const { mutate: verifyEmail } = useMutation(
		(token) => {
			return makeAuthRequest.verifyEmail({ token });
		},
		{
			onSuccess: () => {
				showSuccessSnackbar('Email Verified');
				router.push('/auth/login');
			},
			onError: () => {
				showErrorSnackbar('Something went wrong! Try again');
				router.push('/auth/login');
			},
		}
	);

	useEffect(() => {
		const href = window.location.href;
		const check = href.split('token')[1];
		if (check !== undefined && check.length > 1) {
			const token = check.split('=')[1];
			verifyEmail(token);
		}
	}, []);

	return (
		<>
			<Head>
				<title>{t('Verifying Email')}</title>
			</Head>
			<div style={{ position: 'relative' }}>
				<Typography
					variant="h1"
					sx={{
						mb: 1,
						fontSize: '51px',
						color: '#34596C',
						position: 'absolute',
						left: '35%',
					}}
				>
					{t('Verifying Email...')}
				</Typography>
			</div>
			<Loader />
		</>
	);
}

export default VerifyEmail;
