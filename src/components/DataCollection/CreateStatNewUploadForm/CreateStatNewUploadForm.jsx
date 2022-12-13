import PropTypes from 'prop-types';
import {
	MenuItem,
	Stack,
	TextField as MuiTextField,
	IconButton,
	Grid,
	FormLabel,
} from '@mui/material';
import ReplayIcon from '@mui/icons-material/Replay';
import { useMutation, useQuery } from '@tanstack/react-query';
import { useTranslation } from 'react-i18next';
import * as Yup from 'yup';
import { useSnackbarNotifications } from 'src/hooks/useSnackbarNotifications';
import { TagsForm } from 'src/components/Tags';
import { FlexEnd } from 'src/components/shared/wrappers';
import { Button, LoadingButton } from 'src/components/shared/Buttons';
import ClearIcon from '@mui/icons-material/Clear';
import AddIcon from '@mui/icons-material/Add';
import { queryKeys } from 'src/lib/constants/queries';
import { makeOrganizationRequest } from 'src/services/api/organization';
import { Formik, Form, Field, FieldArray } from 'formik';
import { Select, Autocomplete, TextField } from 'formik-mui';
import { useProjectMetaDataQuery } from 'src/queries/project';
import { makeProjectRequest } from 'src/services/api/project';
import { StatInstanceContext } from 'src/content/PostProcess/context';
import { useContext } from 'react';
import { useStatProcessing } from 'src/content/PostProcess/hooks/useStatProcessing';

export function CreateStatNewUploadForm({
	onSuccess = () => {},
	onCancel = () => {},
	onError = () => {},
	containerStyle = {},
}) {
	const { showErrorSnackbar, showSuccessSnackbar } = useSnackbarNotifications();
	const { statId } = useContext(StatInstanceContext);
	const { process } = useStatProcessing(statId);

	const {
		data: groupsResponse,
		isLoading,
		refetch,
	} = useQuery(
		[queryKeys.GET_USER_GROUPS],
		makeOrganizationRequest.getGroupsList,
		{
			select: (data) => data.data,
		}
	);
	const { data: projMetaDataRes } = useProjectMetaDataQuery();
	const createNewUpload = useMutation(
		makeProjectRequest.createStatisticsNewUpload,
		{
			onSuccess: (data) => {
				onSuccess(data.data);
				showSuccessSnackbar('Success');
			},
			onError: () => {
				onError();
				showErrorSnackbar('Error');
			},
		}
	);

	const { t } = useTranslation();

	return (
		<Formik
			sx={{ ...containerStyle }}
			initialValues={{
				name: '',
				is_public: true,
				tags: [],
				groups: [],
				descriptors: [
					{
						descriptor: '',
						value: '',
					},
				],
			}}
			validationSchema={Yup.object({
				name: Yup.string()
					.min(3, t('This field must be at least 3 characters long.'))
					.max(36, t('This field must be at most 36 characters long.'))
					.required(t('Field Required')),
				descriptors: Yup.array().of(
					Yup.object({
						descriptor: Yup.string().required(t('Field Required')),
						value: Yup.string()
							.min(3, t('This field must be at least 3 characters long.'))
							.max(36, t('This field must be at most 36 characters long.'))
							.required(t('Field Required')),
					})
				),
			})}
			onSubmit={async (values, { resetForm }) => {
				try {
					const g = values.groups.map((g) => g.id);
					const statistics = await process();

					const payload = {
						name: values.name,
						tags: values.tags,
						is_public: values.is_public,
						groups: g,
						descriptors: values.descriptors,
						statistics,
					};
					await createNewUpload
						.mutateAsync(payload, {
							onSuccess: () => {
								resetForm();
								onCancel();
							},
						})
						.catch();
				} catch (error) {
					showErrorSnackbar('Error! Try again!');
				}
			}}
		>
			{({ submitForm, isSubmitting, setFieldValue, values, errors }) => (
				<Form>
					<Stack spacing={1}>
						<FormLabel>{t('Name')}</FormLabel>
						<Field name="name" component={TextField} fullWidth />

						<FormLabel>{t('Privacy')}</FormLabel>
						<Field name="is_public" component={Select}>
							<MenuItem value>{t('Public')}</MenuItem>
							<MenuItem value={false}>{t('Private')}</MenuItem>
						</Field>

						<FormLabel>{t('Tags')}</FormLabel>
						<Field
							name="tags"
							component={TagsForm}
							tags={values.tags}
							setTags={(newTags) => setFieldValue('tags', newTags)}
							numoftags={5}
							disabled={isSubmitting}
						/>

						<FormLabel>{t('Groups')}</FormLabel>
						<Field
							name="groups"
							component={Autocomplete}
							multiple
							loading={isLoading}
							options={groupsResponse || []}
							getOptionLabel={(group) => group.group_name}
							filterSelectedOptions
							disableCloseOnSelect
							renderInput={(params) => (
								<Stack spacing={1} direction="row">
									<MuiTextField fullWidth {...params} variant="outlined" />
									<IconButton onClick={() => refetch()} size="small">
										<ReplayIcon />
									</IconButton>
								</Stack>
							)}
						/>

						<FormLabel>{t('Descriptors')}</FormLabel>
						<Grid container>
							<FieldArray name="descriptors">
								{({ remove, push }) => (
									<>
										{values.descriptors.map((_descriptor, i) => (
											<Grid container spacing={2} key={i}>
												<Grid
													item
													xs={12}
													md={6}
													sx={{
														'.MuiFormControl-root': {
															width: '100%',
														},
													}}
												>
													<Field
														component={Select}
														name={`descriptors.${i}.descriptor`}
													>
														{projMetaDataRes?.descriptor.map((d) => (
															<MenuItem key={d.value} value={d.value}>
																{d.label}
															</MenuItem>
														))}
													</Field>
												</Grid>
												<Grid item xs={12} md={6}>
													<Stack spacing={1} direction="row">
														<Field
															name={`descriptors.${i}.value`}
															component={TextField}
															fullWidth
														/>
														{values.descriptors.length > 1 && (
															<IconButton onClick={() => remove(i)}>
																<ClearIcon />
															</IconButton>
														)}
													</Stack>
												</Grid>
											</Grid>
										))}
										<Button
											startIcon={<AddIcon />}
											onClick={() => push({ descriptor: '', value: '' })}
											disabled={
												values.descriptors.length ===
													projMetaDataRes?.descriptor.length ||
												!!errors.descriptors
											}
											variant="outlined"
											color="success"
											sx={{ mt: 1 }}
										>
											{t('Add New')}
										</Button>
									</>
								)}
							</FieldArray>
						</Grid>
						<FlexEnd gap={2}>
							<LoadingButton
								onClick={onCancel}
								variant="outlined"
								color="secondary"
								loading={isSubmitting}
							>
								{t('Cancel')}
							</LoadingButton>
							<LoadingButton
								onClick={submitForm}
								loading={isSubmitting}
								type="submit"
							>
								{t('Create')}
							</LoadingButton>
						</FlexEnd>
					</Stack>
				</Form>
			)}
		</Formik>
	);
}

CreateStatNewUploadForm.propTypes = {
	onSuccess: PropTypes.func,
	onCancel: PropTypes.func,
	onError: PropTypes.func,
	containerStyle: PropTypes.object,
};
