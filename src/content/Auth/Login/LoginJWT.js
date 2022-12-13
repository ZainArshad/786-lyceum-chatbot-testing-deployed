import * as Yup from 'yup';
import { useRouter } from 'next/router';
import { useFormik } from 'formik';
import Link from 'src/components/Link';
import { Input } from 'src/components/Forms';

import { Box, Grid, Typography } from '@mui/material';
import { useRefMounted } from 'src/hooks/useRefMounted';
import { useSnackbarNotifications } from 'src/hooks/useSnackbarNotifications';
import { makeAuthRequest } from 'src/services/api/auth/auth.request';
import { makeAccountRequest } from 'src/services/api/account/account.request';
import { useDispatch } from 'src/store';
import { saveAsyncUserTokens } from 'src/lib/helpers/localStorage';
import { useTranslation } from 'next-i18next';
import { login } from 'src/slices/auth/actions';
import { Button, LoadingButton } from 'src/components/shared/Buttons';
import { useState } from 'react';
import { useMutation } from '@tanstack/react-query';

export const LoginJWT = (props) => {
	const { t } = useTranslation();
	const isMountedRef = useRefMounted();
	const [step, setStep] = useState('email'); // 'password' or 'email_verification'
	const router = useRouter();
	const dispatch = useDispatch();
	const checkEmailAvailibility = useMutation({
		mutationFn: makeAccountRequest.checkEmailAvailibilty,
	});
	const { showErrorSnackbar } = useSnackbarNotifications();

	const formik = useFormik({
		initialValues: {
			email: '',
			password: '',
			submit: null,
		},
		validationSchema: Yup.object({
			email: Yup.string()
				.email(t('The email provided should be a valid email address'))
				.max(255)
				.required(t('The email field is required')),
			password: Yup.string()
				.max(64)
				.required(
					step === 'password' ? t('The password field is required') : null
				),
		}),
		onSubmit: async (values, helpers) => {
			if (step === 'email') {
				try {
					const response = await checkEmailAvailibility.mutateAsync(
						values.email
					);
					const data = response.data;
					if (!data.user_availability && !data.is_verified) {
						setStep('email_verification');
					} else {
						setStep('password');
					}
				} catch (error) {
					showErrorSnackbar('Something went wrong, please try again.');
				}
				return;
			}
			if (step === 'email_verification') {
				try {
					await makeAccountRequest.resendVerificationEmail(values.email);
					setStep('password');
				} catch (error) {
					showErrorSnackbar('Something went wrong, please try again.');
				}
				return;
			}
			try {
				const response = await makeAuthRequest
					.login({
						email: values.email,
						password: values.password,
					})
					.catch((_err) => {
						showErrorSnackbar(
							'Something went wrong! Information provided is not correct'
						);
					});
				const userTokens = response.data;
				await saveAsyncUserTokens(userTokens.access, userTokens.refresh);
				const meResponse = await makeAccountRequest.getMe().catch((_err) => {
					showErrorSnackbar('Something went wrong!');
				});
				dispatch(login(meResponse.data));
				if (isMountedRef()) {
					const backTo = router.query.backTo || '/';
					router.push(backTo);
				}
			} catch (err) {
				console.error(err);
				if (isMountedRef()) {
					helpers.setStatus({ success: false });
					helpers.setErrors({ submit: err.message });
					helpers.setSubmitting(false);
				}
			}
		},
	});

	if (step === 'email_verification') {
		return (
			<Box gap={1}>
				<Typography variant="h3" gutterBottom>
					{t('Email Verification')}
				</Typography>
				<Typography variant="body2" gutterBottom>
					{t(
						`Please verify your email address to continue. 
						If you have not received the email, 
						please check your spam folder or to resend the verification email.`
					)}
				</Typography>
				<Grid container sx={{ mt: 2 }} spacing={1}>
					<Grid item xs={12} md={6}>
						<Button
							variant="outlined"
							fullWidth
							onClick={() => setStep('email')}
						>
							{t('Back to Login')}
						</Button>
					</Grid>
					<Grid item xs={12} md={6}>
						<LoadingButton
							fullWidth
							onClick={formik.handleSubmit}
							loading={formik.isSubmitting}
						>
							{t('Resend Verification')}
						</LoadingButton>
					</Grid>
				</Grid>
			</Box>
		);
	}

	return (
		<>
			<Box>
				<Typography variant="h2" sx={{ mb: 1 }}>
					{t('Sign in')}
				</Typography>
				<Typography
					variant="h4"
					color="text.secondary"
					fontWeight="normal"
					sx={{ mb: 1 }}
				>
					{t('Fill in the fields below to sign into your account.')}
				</Typography>
			</Box>
			<form noValidate onSubmit={formik.handleSubmit} {...props}>
				<Input
					error={Boolean(formik.touched.email && formik.errors.email)}
					fullWidth
					margin="normal"
					autoFocus
					helperText={formik.touched.email && formik.errors.email}
					label={t('Email address')}
					name="email"
					onBlur={formik.handleBlur}
					onChange={(e) => {
						setStep('email');
						formik.handleChange(e);
					}}
					type="email"
					value={formik.values.email}
				/>
				{step === 'password' && (
					<>
						<Input
							error={Boolean(formik.touched.password && formik.errors.password)}
							fullWidth
							margin="normal"
							helperText={formik.touched.password && formik.errors.password}
							label={t('Password')}
							name="password"
							onBlur={formik.handleBlur}
							onChange={formik.handleChange}
							type="password"
							value={formik.values.password}
						/>
						<Typography variant="body2" my={2}>
							<Link href="/auth/recover-password">
								<b>{t('Forgot password?')}</b>
							</Link>
						</Typography>
					</>
				)}
				<LoadingButton
					sx={{ mt: 1 }}
					loading={formik.isSubmitting}
					type="submit"
					fullWidth
				>
					{step === 'email' ? t('Next') : t('Login')}
				</LoadingButton>
			</form>
		</>
	);
};
