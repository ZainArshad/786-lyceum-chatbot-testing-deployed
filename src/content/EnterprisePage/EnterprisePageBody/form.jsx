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
		background: #9abdc6;
		margin-top:5%;`
);

const EnterpriseFormBody = (props) => {
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
			name: '',
			company_name: '',
			company_size: 0,
			role: '',
			submit: null,
		},
		validationSchema: Yup.object({
			email: Yup.string()
				.email(t('The email provided should be a valid email address'))
				.max(255)
				.required(t('The email field is required')),
			company_name: Yup.string()
				.max(255)
				.required(t('The company name field is required')),
			role: Yup.string().max(255).required(t('The role field is required')),
			description: '',
		}),
		onSubmit: async (values) => {
			let new_description = `${values.name} working as ${values.role}\nCompany Name:${values.company_name}\nCompany Size: ${values.company_size}\n${values.description}`;
			sendEmail({
				email: values.email,
				subject: 'Quote Estimation',
				message: new_description,
				service_type: 'service_request',
			});
		},
	});

	return (
		<form
			noValidate
			onSubmit={formik.handleSubmit}
			{...props}
			id="enterpriseForm"
			style={{
				background: '#9abdc6',
				padding: 35,
				paddingBottom: '2%',
				display: 'grid',
				maxWidth: '601px',
				width: '100%',
				minWidth: '301px',
			}}
		>
			<TextField
				error={Boolean(formik.touched.email && formik.errors.email)}
				fullWidth
				margin="normal"
				helperText={formik.touched.email && formik.errors.email}
				label={t('Company Email address')}
				name="email"
				onBlur={formik.handleBlur}
				onChange={formik.handleChange}
				type="email"
				value={formik.values.email}
				variant="outlined"
				sx={{
					'& .MuiOutlinedInput-root': {
						borderRadius: 0,
						color: 'lightgrey',
						borderWidth: 0,
						background: '#9abdc6',
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
			/>
			<TextField
				error={Boolean(
					formik.touched.company_name && formik.errors.company_name
				)}
				fullWidth
				margin="normal"
				helperText={formik.touched.company_name && formik.errors.company_name}
				label={t('Company Name')}
				name="company_name"
				onBlur={formik.handleBlur}
				onChange={formik.handleChange}
				value={formik.values.company_name}
				variant="outlined"
				sx={{
					'& .MuiOutlinedInput-root': {
						borderRadius: 0,
						color: 'lightgrey',
						borderWidth: 0,
						background: '#9abdc6',
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
			/>
			<TextField
				error={Boolean(formik.touched.role && formik.errors.role)}
				fullWidth
				margin="normal"
				helperText={formik.touched.role && formik.errors.role}
				label={t('Your Role')}
				name="role"
				onBlur={formik.handleBlur}
				onChange={formik.handleChange}
				value={formik.values.role}
				variant="outlined"
				sx={{
					'& .MuiOutlinedInput-root': {
						borderRadius: 0,
						color: 'lightgrey',
						borderWidth: 0,
						background: '#9abdc6',
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
			/>
			<FormLabel>{t('Description')}</FormLabel>
			<TextArea
				rows={5}
				minRows={7}
				name="description"
				onBlur={formik.handleBlur}
				onChange={formik.handleChange}
				value={formik.values.description}
			/>
			<LandingPageButtonBlack
				icon={isLoading ? <CircularProgress size="1rem" /> : null}
				disabled={isLoading}
				type="submit"
				size="large"
				styleSx={{ justifyContent: 'center', mt: 3 }}
			>
				{t('Submit')}
			</LandingPageButtonBlack>
		</form>
	);
};

export default EnterpriseFormBody;
