/* eslint-disable jsx-a11y/label-has-associated-control */
import { useState } from 'react';
import {
	Box,
	Card,
	Button,
	Typography,
	styled,
	useTheme,
	TextField,
	Grid,
	FormControl,
	CircularProgress,
} from '@mui/material';

import { useTranslation } from 'react-i18next';
import * as Yup from 'yup';
import { useFormik } from 'formik';
import { TagsForm } from 'src/components/Tags';

const PrivateOrgFormCard = styled(Card)(
	({ theme }) => `
      margin-left:4.5%; 
      margin-right:4.5%;  
      margin-top:2.5%;
      margin-bottom:2.5%;
      height:100%;
      width:98%;
      overflow-y:overlay;
      border-radius: ${theme.general.borderRadiusSm};
      border: 1px solid ${theme.colors.alpha.black[10]};
`
);

const CancelButton = styled(Button)(
	({ theme }) => `
        background:#E8EAF1;
        border-radius: ${theme.general.borderRadiusSm};
        border: 1px solid #7B8092;
        color:#7B8092;
        &:hover{
            color:#E8EAF1;
            background:#7B8092;
        }
  `
);

function PrivateOrganizationForm() {
	const { t } = useTranslation();
	const [tags, setTags] = useState([]);
	const theme = useTheme();
	const formik = useFormik({
		initialValues: {
			org_name: '',
			org_desc: '',
			tags: [],
			admin_tags: [],
			members_tags: [],
			space_allocation: '',
			submit: null,
		},
		validationSchema: Yup.object({
			//   email: Yup.string()
			//     .email(t('The email provided should be a valid email address'))
			//     .max(255)
			//     .required(t('The email field is required')),
			org_name: Yup.string()
				.max(255)
				.required(t('The organization name field is required')),
			org_desc: Yup.string()
				.max(1000)
				.required(t('The organization description field is required')),
			space_allocation: Yup.string()
				.max(25)
				.required(t('Alocate space to new private organization')),
		}),
		onSubmit: async (_values) => {
			try {
				// const response = await makeAuthRequest.login({
				//   email: values.email,
				//   password: values.password
				// });
				// const userTokens = response.data;
				// await saveAsyncUserTokens(userTokens.access, userTokens.refresh);
				// const meResponse = await makeAccountRequest.getMe();
				// dispatch(login(meResponse.data));
				// if (isMountedRef()) {
				//   const backTo = router.query.backTo || '/';
				//   router.push(backTo);
				// }
			} catch (err) {
				console.error(err);
				// if (isMountedRef()) {
				//   helpers.setStatus({ success: false });
				//   helpers.setErrors({ submit: err.message });
				//   helpers.setSubmitting(false);
				// }
			}
		},
	});

	return (
		<PrivateOrgFormCard>
			<form noValidate onSubmit={formik.handleSubmit}>
				<p style={{ fontSize: '30px', marginLeft: '2.5%' }}>
					{t('New Private Organization')}
				</p>
				<hr style={{ border: `0.5px solid ${theme.colors.alpha.black[10]}` }} />
				<Box sx={{ marginLeft: '2.5%' }}>
					<FormControl
						sx={{
							display: 'flex',
							alignItems: 'center',
							'& > :not(style)': { m: 1 },
						}}
					>
						<Grid container spacing={1}>
							<Grid item xs={3} style={{ textAlign: 'end' }}>
								<label style={{ fontSize: '18px', fontWeight: '400' }}>
									{t('Organization Name')}:{' '}
								</label>
							</Grid>
							<Grid item xs={9}>
								<TextField
									type="text"
									sx={{
										border: `2px solid ${theme.colors.alpha.black[10]}`,
										width: '95%',
										borderRadius: '11px',
										height: '57px',
									}}
									name="org_name"
									autoFocus={false}
									variant="outlined"
									onBlur={formik.handleBlur}
									onChange={formik.handleChange}
									value={formik.values.org_name}
									error={Boolean(
										formik.touched.org_name && formik.errors.org_name
									)}
									helperText={formik.touched.org_name && formik.errors.org_name}
								/>
							</Grid>
						</Grid>
						<Grid container spacing={1}>
							<Grid item xs={3} style={{ textAlign: 'end' }}>
								<label style={{ fontSize: '18px', fontWeight: '400' }}>
									{t('Organization Description')}:{' '}
								</label>
							</Grid>
							<Grid item xs={9}>
								<TextField
									minRows={7}
									maxRows={7}
									sx={{
										border: `2px solid ${theme.colors.alpha.black[10]}`,
										width: '95%',
										borderRadius: '11px',
										height: '177px',
									}}
									multiline
									variant="outlined"
									// disableUnderline={true}
									name="org_desc"
									autoFocus={false}
									onBlur={formik.handleBlur}
									onChange={formik.handleChange}
									value={formik.values.org_desc}
									error={Boolean(
										formik.touched.org_desc && formik.errors.org_desc
									)}
									helperText={formik.touched.org_desc && formik.errors.org_desc}
								>
									{' '}
								</TextField>
							</Grid>
						</Grid>
						<Grid container spacing={1}>
							<Grid item xs={3} style={{ textAlign: 'end' }}>
								<label style={{ fontSize: '18px', fontWeight: '400' }}>
									{t('Tags')}:{' '}
								</label>
							</Grid>
							<Grid item xs={9}>
								<TagsForm tags={tags} setTags={setTags} numoftags={5} />
							</Grid>
						</Grid>
						<Grid container spacing={1}>
							<Grid item xs={3} style={{ textAlign: 'end' }}>
								<label style={{ fontSize: '18px', fontWeight: '400' }}>
									{t('Space Allocation')}:{' '}
								</label>
							</Grid>
							<Grid item xs={2}>
								<TextField
									type="text"
									sx={{
										border: `2px solid ${theme.colors.alpha.black[10]}`,
										width: '100%',
										borderRadius: '11px',
										height: '57px',
										textAlign: 'center',
									}}
									variant="outlined"
									name="space_allocation"
									autoFocus={false}
									onBlur={formik.handleBlur}
									onChange={formik.handleChange}
									value={formik.values.space_allocation}
									error={Boolean(
										formik.touched.space_allocation &&
											formik.errors.space_allocation
									)}
									helperText={
										formik.touched.space_allocation &&
										formik.errors.space_allocation
									}
								/>
							</Grid>
							<Grid
								item
								xs={1}
								style={{ textAlign: 'start', marginTop: 'inherit' }}
							>
								<label style={{ fontSize: '16px', fontWeight: '400' }}>
									{' '}
									GB{' '}
								</label>
							</Grid>
							<Grid
								item
								xs={5}
								style={{ textAlign: 'start', marginTop: 'inherit' }}
							>
								<label style={{ fontSize: '16px', fontWeight: '400' }}>
									{' '}
									{t(
										'*This allocation will come from the organization creator’s' +
											' budget, and will remain allocated to the organization until' +
											' the organization is deleted'
									)}
									<br />
									<br />
									{t('*Minimum space for private organization is 10GB')}{' '}
								</label>
							</Grid>
						</Grid>
						<Grid container spacing={1}>
							<Grid item xs={3} style={{ textAlign: 'end' }}>
								<label style={{ fontSize: '18px', fontWeight: '400' }}>
									{t('Creators Budget')}:{' '}
								</label>
							</Grid>
							<Grid item xs={1.5}>
								<Box display="inline-flex" position="relative">
									<Box
										sx={{
											animationDuration: '550ms',
											position: 'absolute',
											left: 0,
											top: 0,
											bottom: 0,
											right: 0,
											display: 'flex',
											alignItems: 'center',
											justifyContent: 'center',
										}}
									>
										<Typography
											sx={{
												color: `${theme.colors.success.main}`,
											}}
											variant="h5"
										>
											43%
										</Typography>
									</Box>
									<CircularProgress
										variant="determinate"
										sx={{
											color: theme.colors.success.lighter,
										}}
										size={70}
										thickness={5}
										value={100}
									/>
									<CircularProgress
										size={70}
										sx={{
											animationDuration: '550ms',
											position: 'absolute',
											left: 0,
											color: theme.colors.success.main,
											top: 0,
										}}
										thickness={5}
										variant="determinate"
										value={25}
									/>
								</Box>
							</Grid>
							<Grid item xs={6}>
								<label style={{ fontSize: '30px' }}>Storage Usage</label>
								<br />
								<label style={{ fontSize: '16px' }}>7.5GB Free Space</label>
							</Grid>
						</Grid>
						<Grid container sx={{ justifyContent: 'end' }}>
							<Button
								variant="contained"
								sx={{ mr: '1.5%' }}
								href="/storage-plan"
							>
								{t('Increase Storage')}
							</Button>
							<Button
								variant="contained"
								sx={{ mr: '1.5%' }}
								startIcon={
									formik.isSubmitting ? <CircularProgress size="1rem" /> : null
								}
								disabled={formik.isSubmitting}
								type="submit"
							>
								{t('Create Organization')}
							</Button>
							<CancelButton sx={{ mr: '1.5%' }}>Cancel</CancelButton>
						</Grid>
					</FormControl>
				</Box>
			</form>
		</PrivateOrgFormCard>
	);
}

export default PrivateOrganizationForm;
