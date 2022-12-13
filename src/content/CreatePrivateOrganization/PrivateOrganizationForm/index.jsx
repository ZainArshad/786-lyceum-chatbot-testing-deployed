import { useState } from 'react';
import {
	Box,
	Card,
	Button,
	styled,
	useTheme,
	TextField,
	Grid,
	FormControl,
	CircularProgress,
	Typography,
} from '@mui/material';

import { useTranslation } from 'react-i18next';
import * as Yup from 'yup';
import { useFormik } from 'formik';
import { useAuth } from 'src/hooks/useAuth';
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
	const { user } = useAuth();
	const formik = useFormik({
		initialValues: {
			org_name: '',
			org_desc: '',
			tags: [],
			admin_tags: [],
			members_tags: [],
			no_of_seats: 0,
			submit: null,
		},
		validationSchema: Yup.object({
			org_name: Yup.string()
				.max(255)
				.required(t('The organization name field is required')),
			org_desc: Yup.string()
				.max(1000)
				.required(t('The organization description field is required')),
			no_of_seats: Yup.number()
				.min(1, 'No of Seats should be atleast 1 or more')
				.required(t('Alocate seats to new private organization')),
		}),
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
								<Typography style={{ fontSize: '18px', fontWeight: '400' }}>
									{t('Organization Name')}:{' '}
								</Typography>
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
								<Typography style={{ fontSize: '18px', fontWeight: '400' }}>
									{t('Organization Description')}:{' '}
								</Typography>
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
								<Typography style={{ fontSize: '18px', fontWeight: '400' }}>
									{t('Tags')}:{' '}
								</Typography>
							</Grid>
							<Grid item xs={9}>
								<TagsForm tags={tags} setTags={setTags} numoftags={5} />
							</Grid>
						</Grid>
						<Grid container spacing={1}>
							<Grid item xs={3} style={{ textAlign: 'end' }}>
								<Typography style={{ fontSize: '18px', fontWeight: '400' }}>
									{t('No of Seats')}:{' '}
								</Typography>
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
									name="no_of_seats"
									autoFocus={false}
									onBlur={formik.handleBlur}
									onChange={formik.handleChange}
									value={formik.values.no_of_seats}
									error={Boolean(
										formik.touched.no_of_seats && formik.errors.no_of_seats
									)}
									helperText={
										formik.touched.no_of_seats && formik.errors.no_of_seats
									}
								/>
							</Grid>
							<Grid
								item
								xs={2}
								style={{ textAlign: 'start', marginTop: 'inherit' }}
							>
								<Typography style={{ fontSize: '16px', fontWeight: '400' }}>
									{' '}
									20$/month{' '}
								</Typography>
							</Grid>
						</Grid>
						<Grid
							container
							sx={{ justifyContent: 'end', paddingTop: '5%' }}
							spacing={1}
						>
							<Typography
								style={{
									fontSize: '18px',
									fontWeight: '400',
									display: 'flex',
									alignItems: 'center',
									marginRight: '1.1%',
								}}
							>
								{t('Total amount to pay: ')}
							</Typography>
							<TextField
								value={`${formik.values.no_of_seats * 20} $`}
								disabled
								sx={{ marginRight: '1.5%' }}
							/>
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
							<CancelButton sx={{ mr: '1.5%' }} href={`/home/${user.id}`}>
								{t('Cancel')}
							</CancelButton>
						</Grid>
					</FormControl>
				</Box>
			</form>
		</PrivateOrgFormCard>
	);
}

export default PrivateOrganizationForm;
