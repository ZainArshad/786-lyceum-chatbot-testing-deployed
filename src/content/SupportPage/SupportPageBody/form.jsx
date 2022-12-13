import { useFormik } from 'formik';
import * as Yup from 'yup';
import {
	CircularProgress,
	TextField,
	FormLabel,
	styled,
	TextareaAutosize as MuiTextArea,
} from '@mui/material';
import { useTranslation } from 'react-i18next';
import { useMutation } from '@tanstack/react-query';
import { emailService } from 'src/services/api/emailService';
import { useSnackbarNotifications } from 'src/hooks/useSnackbarNotifications';
import { LandingPageButtonBlack } from 'src/components/LandingPagesButton';

const TextArea = styled(MuiTextArea)(
	({ theme }) => `
    width: 100%;
    height: 100%;
    border: 3px solid lightgrey;
		border-radius: 0;
		color:white;
    padding: ${theme.spacing(1)};
		background: rgba(10, 66, 79, 0.75);
		margin-top:5%;`
);

const SupportFormBody = (props) => {
	const { t } = useTranslation();

	const { showErrorSnackbar, showSuccessSnackbar } = useSnackbarNotifications();

	const { mutate: sendEmail, isLoading } = useMutation(
		(obj) => {
			return emailService.sendEmail(obj);
		},
		{
			onSuccess: () => {
				showSuccessSnackbar('Email Has Been Sent');
			},
			onError: () => {
				showErrorSnackbar('Something Went Wrong! Please Try Again');
			},
		}
	);

	const formik = useFormik({
		initialValues: {
			email: '',
			submit: null,
			description: '',
		},
		validationSchema: Yup.object({
			email: Yup.string()
				.email(t('The email provided should be a valid email address'))
				.max(255)
				.required(t('The email field is required')),
		}),
		onSubmit: async (values) => {
			sendEmail({
				email: values.email,
				subject: 'Email for asking support',
				message: values.description,
				service_type: 'support',
			});
		},
	});

	return (
		<form noValidate onSubmit={formik.handleSubmit} {...props}>
			<FormLabel sx={{ color: 'lightgrey' }}>
				{t('Enter Your Email Address')}
			</FormLabel>
			<TextField
				sx={{
					'& .MuiOutlinedInput-root': {
						borderRadius: 0,
						color: 'lightgrey',
						borderWidth: 0,
						background: 'rgba(10, 66, 79, 0.75)',
						'& fieldset': {
							borderColor: 'lightgrey',
							borderRadius: 0,
							borderWidth: '3px',
						},
						'&:hover fieldset': {
							borderColor: 'lightgrey',
							borderRadius: 0,
							borderWidth: '3px',
						},
					},
				}}
				error={Boolean(formik.touched.email && formik.errors.email)}
				fullWidth
				margin="normal"
				helperText={formik.touched.email && formik.errors.email}
				name="email"
				onBlur={formik.handleBlur}
				onChange={formik.handleChange}
				type="email"
				value={formik.values.email}
				variant="outlined"
			/>
			<FormLabel sx={{ color: 'lightgrey' }}>{t('Enter Your Email')}</FormLabel>
			<TextArea
				rows={5}
				minRows={7}
				name="description"
				onBlur={formik.handleBlur}
				onChange={formik.handleChange}
				value={formik.values.description}
			/>
			<LandingPageButtonBlack
				startIcon={isLoading ? <CircularProgress size="1rem" /> : null}
				disabled={isLoading}
				type="submit"
				size="large"
			>
				{t('Send')}
			</LandingPageButtonBlack>
		</form>
	);
};

export default SupportFormBody;
