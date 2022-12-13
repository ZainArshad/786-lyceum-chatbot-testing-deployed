import { useState, forwardRef } from 'react';
import * as Yup from 'yup';
import { Formik } from 'formik';
import {
	Box,
	Card,
	TextField,
	Typography,
	Container,
	Alert,
	Slide,
	Dialog,
	Collapse,
	Button,
	Avatar,
	IconButton,
	styled,
} from '@mui/material';
import Head from 'next/head';

import BaseLayout from 'src/layouts/BaseLayout';

import { useRefMounted } from 'src/hooks/useRefMounted';
import CloseIcon from '@mui/icons-material/Close';
import { Guest } from 'src/components/Guest';
import Link from 'src/components/Link';

import { useTranslation } from 'react-i18next';
import Logo from 'src/components/LogoSign';
import CheckTwoToneIcon from '@mui/icons-material/CheckTwoTone';
import { makeAuthRequest } from 'src/services/api/auth';
import { useSnackbarNotifications } from 'src/hooks/useSnackbarNotifications';

const Transition = forwardRef(function Transition(props, ref) {
	return <Slide direction="down" ref={ref} {...props} />;
});

const MainContent = styled(Box)(
	() => `
    height: 100%;
    display: flex;
    flex: 1;
    flex-direction: column;
    align-items: center;
    justify-content: center;
`
);

const DialogWrapper = styled(Dialog)(
	() => `
      .MuiDialog-paper {
        overflow: visible;
      }
`
);

const AvatarSuccess = styled(Avatar)(
	({ theme }) => `
      background-color: ${theme.colors.success.main};
      color: ${theme.palette.success.contrastText};
      width: ${theme.spacing(12)};
      height: ${theme.spacing(12)};
      box-shadow: ${theme.colors.shadows.success};
      top: -${theme.spacing(6)};
      position: absolute;
      left: 50%;
      margin-left: -${theme.spacing(6)};

      .MuiSvgIcon-root {
        font-size: ${theme.typography.pxToRem(45)};
      }
`
);

function RecoverPasswordBasic() {
	const { t } = useTranslation();
	const isMountedRef = useRefMounted();
	const { showErrorSnackbar } = useSnackbarNotifications();

	const [openAlert, setOpenAlert] = useState(true);

	const [openDialog, setOpenDialog] = useState(false);

	const handleOpenDialog = () => {
		setOpenDialog(true);
	};

	const handleCloseDialog = () => {
		setOpenDialog(false);
	};

	return (
		<>
			<Head>
				<title>{t('Change Password')}</title>
			</Head>
			<MainContent>
				<Container maxWidth="sm">
					<Logo />
					<Card
						sx={{
							mt: 3,
							p: 4,
						}}
					>
						<Box>
							<Typography
								variant="h2"
								sx={{
									mb: 1,
								}}
							>
								{t('Change Password')}
							</Typography>
							<Typography
								variant="h4"
								color="text.secondary"
								fontWeight="normal"
								sx={{
									mb: 3,
								}}
							>
								{t('Enter the new password.')}
							</Typography>
						</Box>

						<Formik
							initialValues={{
								password: '',
								confirm_password: '',
								submit: null,
							}}
							validationSchema={Yup.object().shape({
								password: Yup.string()
									.min(8)
									.max(255)
									.required(t('The password field is required')),
								confirm_password: Yup.string()
									.oneOf(
										[Yup.ref('password')],
										t('Both password fields need to be the same')
									)
									.required(t('This field is required')),
							})}
							onSubmit={async (
								_values,
								{ setErrors, setStatus, setSubmitting }
							) => {
								try {
									const href = window.location.href;
									const check = href.split('token')[1];
									const check_uuid = href.split('uid')[1];
									if (
										check !== undefined &&
										check_uuid !== undefined &&
										check.length > 1 &&
										check_uuid.length > 1
									) {
										const token = check.split('=')[1];
										const uid = check_uuid.split('=')[1].split('&')[0];
										const response = await makeAuthRequest
											.resetPassword({
												token,
												uid,
												password: _values.password,
											})
											.catch(() => {
												showErrorSnackbar(
													'Something went wrong! Information provided is not correct'
												);
												setSubmitting(true);
											});

										if (response !== undefined && response.status === 200) {
											handleOpenDialog();
											setSubmitting(true);
										}
									}
									if (isMountedRef()) {
										setStatus({ success: true });
										setSubmitting(false);
									}
								} catch (err) {
									console.error(err);
									if (isMountedRef()) {
										setStatus({ success: false });
										setErrors({ submit: err.message });
										setSubmitting(false);
									}
								}
							}}
						>
							{({
								errors,
								handleBlur,
								handleChange,
								handleSubmit,
								touched,
								values,
							}) => (
								<form noValidate onSubmit={handleSubmit}>
									<TextField
										error={Boolean(touched.password && errors.password)}
										fullWidth
										helperText={touched.password && errors.password}
										label={t('Password')}
										margin="normal"
										name="password"
										onBlur={handleBlur}
										onChange={handleChange}
										type="password"
										value={values.password}
										variant="outlined"
									/>
									<TextField
										error={Boolean(
											touched.confirm_password && errors.confirm_password
										)}
										fullWidth
										helperText={
											touched.confirm_password && errors.confirm_password
										}
										label={t('Confirm Password')}
										margin="normal"
										name="confirm_password"
										onBlur={handleBlur}
										onChange={handleChange}
										type="password"
										value={values.confirm_password}
										variant="outlined"
									/>

									<Button
										sx={{
											mt: 3,
										}}
										color="primary"
										type="submit"
										fullWidth
										size="large"
										variant="contained"
									>
										{t('Send me a new password')}
									</Button>
								</form>
							)}
						</Formik>
					</Card>
					<Box mt={3} textAlign="right">
						<Typography
							component="span"
							variant="subtitle2"
							color="text.primary"
							fontWeight="bold"
						>
							{t('Want to try to sign in again?')}
						</Typography>{' '}
						<Link href="/auth/login/basic">
							<b>{t('Click here')}</b>
						</Link>
					</Box>
				</Container>
			</MainContent>

			<DialogWrapper
				open={openDialog}
				maxWidth="sm"
				fullWidth
				TransitionComponent={Transition}
				keepMounted
				onClose={handleCloseDialog}
			>
				<Box
					sx={{
						px: 4,
						pb: 4,
						pt: 10,
					}}
				>
					<AvatarSuccess>
						<CheckTwoToneIcon />
					</AvatarSuccess>

					<Collapse in={openAlert}>
						<Alert
							action={
								<IconButton
									aria-label="close"
									color="inherit"
									size="small"
									onClick={() => {
										setOpenAlert(false);
									}}
								>
									<CloseIcon fontSize="inherit" />
								</IconButton>
							}
							severity="info"
						>
							{t('The password has been reset')}
						</Alert>
					</Collapse>

					<Typography
						align="center"
						sx={{
							py: 4,
							px: 10,
						}}
						variant="h3"
					>
						{t('Password has changed successfully')}
					</Typography>

					<Button
						fullWidth
						component={Link}
						size="large"
						variant="contained"
						onClick={handleCloseDialog}
						href="/auth/login/basic"
					>
						{t('Continue to login')}
					</Button>
				</Box>
			</DialogWrapper>
		</>
	);
}

RecoverPasswordBasic.getLayout = (page) => (
	<Guest>
		<BaseLayout>{page}</BaseLayout>
	</Guest>
);

export default RecoverPasswordBasic;
