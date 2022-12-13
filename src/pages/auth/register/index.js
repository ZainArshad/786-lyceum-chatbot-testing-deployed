/* eslint-disable no-unused-vars */
/* eslint react/prop-types: 0 */ // --> OFF | @Zain please take care of this
import { useState, Children } from 'react';
import {
	Typography,
	Container,
	Card,
	Grid,
	Box,
	Step,
	StepLabel,
	Stepper,
	Collapse,
	Alert,
	Avatar,
	IconButton,
	styled,
	Stack,
} from '@mui/material';
import { useSnackbarNotifications } from 'src/hooks/useSnackbarNotifications';
import { makeAuthRequest } from 'src/services/api/auth/auth.request';

import BaseLayout from 'src/layouts/BaseLayout';
import { Field, Form, Formik } from 'formik';
import { CheckboxWithLabel, TextField } from 'formik-mui';
import * as Yup from 'yup';
import CloseIcon from '@mui/icons-material/Close';
import CheckTwoToneIcon from '@mui/icons-material/CheckTwoTone';
import { Guest } from 'src/components/Guest';
import Link from 'src/components/Link';
import Head from 'next/head';
import { useTranslation } from 'react-i18next';
import { FlexEnd } from 'src/components/shared/wrappers';
import { Button, LoadingButton } from 'src/components/shared/Buttons';
import { useMutation } from '@tanstack/react-query';
import { makeAccountRequest } from 'src/services/api/account';
import { Si6maLogo } from 'src/assets/svgs';

const MainContent = styled(Box)(
	() => `
    height: 100%;
    overflow: auto;
    flex: 1;
		display: flex;
		align-items: center;
		justify-content: center;
`
);

const BoxActions = styled(Box)(
	({ theme }) => `
    background: ${theme.colors.alpha.black[5]}
`
);

const AvatarSuccess = styled(Avatar)(
	({ theme }) => `
      background-color: ${theme.colors.success.main};
      color: ${theme.palette.success.contrastText};
      width: ${theme.spacing(12)};
      height: ${theme.spacing(12)};
      box-shadow: ${theme.colors.shadows.success};
      margin-left: auto;
      margin-right: auto;

      .MuiSvgIcon-root {
        font-size: ${theme.typography.pxToRem(45)};
      }
`
);

// eslint-disable-next-line no-promise-executor-return
const sleep = (time) => new Promise((acc) => setTimeout(acc, time));

function RegisterWizard() {
	const { t } = useTranslation();
	const [openAlert, setOpenAlert] = useState(true);

	return (
		<>
			<Head>
				<title>Register</title>
			</Head>
			<MainContent>
				<Container
					sx={{
						my: 4,
					}}
					maxWidth="md"
				>
					<Si6maLogo />
					<Card sx={{ mt: 3, pt: 2 }}>
						<Stack px={4} spacing={1} pb={1}>
							<Typography variant="h2">{t('Create an account')}</Typography>
							<Typography
								variant="h4"
								color="text.secondary"
								fontWeight="normal"
							>
								{t('Fill in the fields below. It only takes a few minutes')}
							</Typography>
						</Stack>
						<FormikStepper
							initialValues={{
								first_name: '',
								last_name: '',
								terms: false,
								promo: true,
								password: '',
								password_confirm: '',
								email: '',
								phone: '',
								company_name: '',
								company_size: '',
								company_role: '',
							}}
							onSubmit={async (_values) => {
								await sleep(3000);
							}}
						>
							<FormikStep
								validationSchema={Yup.object().shape({
									email: Yup.string()
										.email(
											t('The email provided should be a valid email address')
										)
										.max(255)
										.required(t('The email field is required')),
									first_name: Yup.string()
										.max(255)
										.required(t('The first name field is required')),
									last_name: Yup.string()
										.max(255)
										.required(t('The last name field is required')),
									password: Yup.string()
										.min(8)
										.max(255)
										.required(t('The password field is required')),
									password_confirm: Yup.string()
										.oneOf(
											[Yup.ref('password')],
											t('Both password fields need to be the same')
										)
										.required(t('This field is required')),
									terms: Yup.boolean().oneOf(
										[true],
										t('You must agree to our terms and conditions')
									),
								})}
								label={t('Personal Informations')}
							>
								<Box
									py={4}
									sx={{
										px: {
											xs: 2,
											md: 4,
										},
									}}
								>
									<Grid container style={{ marginBottom: '36px' }}>
										<Typography
											style={{
												fontStyle: 'normal',
												fontSize: '18px',
												fontWeight: '400, Regular',
											}}
										>
											{t("Let's start with some basic informations")}
										</Typography>
									</Grid>
									<Grid container spacing={2.5}>
										<Grid item xs={12} md={6}>
											<Field
												fullWidth
												name="first_name"
												component={TextField}
												label={t('First name')}
												placeholder={t('Write your first name here...')}
											/>
										</Grid>
										<Grid item xs={12} md={6}>
											<Field
												fullWidth
												name="last_name"
												component={TextField}
												label={t('Last name')}
												placeholder={t('Write your last name here...')}
											/>
										</Grid>
										<Grid item xs={12}>
											<Field
												fullWidth
												name="email"
												component={TextField}
												label={t('Email')}
												placeholder={t('Write your email here...')}
											/>
										</Grid>
										<Grid item xs={12} md={6}>
											<Field
												fullWidth
												type="password"
												name="password"
												component={TextField}
												label={t('Password')}
												placeholder={t('Write a password here...')}
											/>
										</Grid>
										<Grid item xs={12} md={6}>
											<Field
												fullWidth
												type="password"
												name="password_confirm"
												component={TextField}
												label={t('Confirm password')}
												placeholder={t('Confirm password here...')}
											/>
										</Grid>
										<Grid item xs={12} md={6}>
											<Field
												name="terms"
												type="checkbox"
												component={CheckboxWithLabel}
												Label={{
													label: (
														<Typography
															sx={{
																fontSize: {
																	xs: '15px',
																	md: 'body2.fontSize',
																},
															}}
														>
															{t('I accept the')}{' '}
															<Link href="#">{t('terms and conditions')}</Link>.
														</Typography>
													),
												}}
											/>
										</Grid>
										<Grid item xs={12} md={6} component={FlexEnd}>
											<Typography variant="body2">
												<Link href="/auth/login">
													{t('Already have account?')}
												</Link>
											</Typography>
										</Grid>
									</Grid>
								</Box>
							</FormikStep>
							<FormikStep
								validationSchema={Yup.object().shape({
									company_size: Yup.string().max(55),
									company_name: Yup.string().max(255),
									company_role: Yup.string().max(255),
								})}
								label={t('Role Details')}
							>
								<Box p={4}>
									<Grid container spacing={2.5}>
										<Grid item xs={12} md={6}>
											<Field
												fullWidth
												name="company_name"
												component={TextField}
												label={t('Company name')}
											/>
										</Grid>
										<Grid item xs={12} md={6}>
											<Field
												fullWidth
												name="company_size"
												type="number"
												component={TextField}
												label={t('Company size')}
											/>
										</Grid>
										<Grid item xs={12} md={6}>
											<Field
												fullWidth
												name="company_role"
												component={TextField}
												label={t('Your role')}
											/>
										</Grid>
									</Grid>
								</Box>
							</FormikStep>
							<FormikStep label={t('Complete Registration')}>
								<Box px={3} py={5}>
									<Container maxWidth="sm">
										<AvatarSuccess>
											<CheckTwoToneIcon />
										</AvatarSuccess>
										<Collapse in={openAlert}>
											<Alert
												style={{ background: '#EBF9FF' }}
												sx={{ mt: 2 }}
												action={
													<IconButton
														aria-label="close"
														color="inherit"
														size="small"
														onClick={() => setOpenAlert(false)}
													>
														<CloseIcon fontSize="inherit" />
													</IconButton>
												}
												severity="info"
											>
												{t(
													'A confirmation has been sent to your email address'
												)}
											</Alert>
										</Collapse>

										<Typography
											align="center"
											sx={{ pt: 2 }}
											style={{ fontSize: '25px' }}
											variant="h2"
										>
											{t(
												'Check your email to confirm your email and start using your account'
											)}
										</Typography>
									</Container>
								</Box>
							</FormikStep>
						</FormikStepper>
					</Card>
				</Container>
			</MainContent>
		</>
	);
}

export function FormikStep({ children }) {
	return children;
}

export function FormikStepper({ children, ...props }) {
	const childrenArray = Children.toArray(children);
	const [step, setStep] = useState(0);
	const currentChild = childrenArray[step];
	const [completed, setCompleted] = useState(false);
	const { t } = useTranslation();

	const checkEmailAvailibilty = useMutation({
		mutationFn: makeAccountRequest.checkEmailAvailibilty,
		retry: 5,
	});

	function isLastStep() {
		return step === childrenArray.length - 2;
	}

	const { showErrorSnackbar } = useSnackbarNotifications();

	return (
		<Formik
			{...props}
			validationSchema={currentChild.props.validationSchema}
			onSubmit={async (values, helpers) => {
				if (step === 0) {
					const { data } = await checkEmailAvailibilty.mutateAsync(
						values.email
					);
					if (data.user_availability === false) {
						helpers.setFieldError('email', t('Email already exists'));
						return;
					}
				}
				if (isLastStep()) {
					await props.onSubmit(values, helpers);
					const response = await makeAuthRequest
						.signup({
							first_name: values.first_name,
							last_name: values.last_name,
							organization_name: values.company_name,
							email: values.email,
							password: values.password,
							organization_size: values.company_size,
						})
						.catch(() => {
							showErrorSnackbar(
								'Something went wrong! Information provided is not correct'
							);
						});
					if (response.status === 201) {
						setCompleted(true);
						setStep((s) => s + 1);
					}
				} else {
					setStep((s) => s + 1);
					helpers.setTouched({});
				}
			}}
		>
			{({ isSubmitting, resetForm }) => (
				<Form autoComplete="off">
					<Stepper alternativeLabel activeStep={step}>
						{childrenArray.map((child, index) => (
							<Step
								key={child.props.label}
								completed={step > index || completed}
								style={{ fill: 'green' }}
							>
								<StepLabel>{child.props.label}</StepLabel>
							</Step>
						))}
					</Stepper>

					{currentChild}
					{!completed ? (
						<BoxActions
							p={4}
							display="flex"
							alignItems="center"
							justifyContent={step === 0 ? 'flex-end' : 'space-between'}
						>
							{step !== 0 && (
								<Button
									disabled={isSubmitting}
									variant="outlined"
									onClick={() => setStep((s) => s - 1)}
								>
									{t('Previous')}
								</Button>
							)}
							<LoadingButton
								loading={isSubmitting}
								disabled={isSubmitting}
								type="submit"
							>
								{isLastStep() ? t('Complete registration') : t('Next')}
							</LoadingButton>
						</BoxActions>
					) : (
						<BoxActions
							p={4}
							display="flex"
							alignItems="center"
							justifyContent="space-between"
						>
							<Button
								variant="outlined"
								onClick={() => {
									setStep(0);
									resetForm();
									setCompleted(false);
								}}
							>
								{t('Reset')}
							</Button>
							<Button>
								<Link
									href="/auth/login"
									color="white"
									fontSize={13}
									style={{ textDecoration: 'none' }}
								>
									{t('Continue to login')}
								</Link>
							</Button>
						</BoxActions>
					)}
				</Form>
			)}
		</Formik>
	);
}

RegisterWizard.getLayout = (page) => (
	<Guest>
		<BaseLayout>{page}</BaseLayout>
	</Guest>
);

export default RegisterWizard;
