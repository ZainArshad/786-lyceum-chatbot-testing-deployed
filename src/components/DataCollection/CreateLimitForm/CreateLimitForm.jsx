import PropTypes from 'prop-types';
import {
	MenuItem,
	Stack,
	TextField as MuiTextField,
	IconButton,
	Grid,
	FormLabel,
	FormHelperText,
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
import { isEmpty } from 'lodash';
import { DropDownSelect } from 'src/components/Forms';
import { CUUnitsModal } from 'src/components/Modals/CUUnitsModal';
import { useEffect, useState, useContext } from 'react';
import { GraphMitterContext } from 'src/content/PostProcess/context/GraphMitterContext';
import { serializeToServerPayload } from 'src/lib/helpers/graphs/postProcessing';
import { makeProjectRequest } from 'src/services/api/project';

/**
 * Since this form depends upon the limits from
 * the graph session, this component must be use
 * in the scope of the relative context.
 * i.e. it must be used in the scope of the graph session and mitter.
 * @param {*} param0
 * @returns
 */
export function CreateLimitForm({
	onSuccess = () => {},
	onCancel = () => {},
	onError = () => {},
	containerStyle = {},
	graphId,
}) {
	const { showErrorSnackbar, showSuccessSnackbar } = useSnackbarNotifications();
	const [createUnitModalOpen, setCreateUnitModalOpen] = useState(false);
	const { mitter } = useContext(GraphMitterContext);
	const [calcLimits, setCalcLimits] = useState([]);

	useEffect(() => {
		if (!mitter) {
			return;
		}
		mitter.on(`your-limits:${graphId}`, ({ limits }) => {
			setCalcLimits(limits);
		});
		mitter.emit(`get-limits:${graphId}`);
		return () => {
			mitter.off(`your-limits:${graphId}`);
		};
	}, [mitter]);

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
	const createLimit = useMutation(makeProjectRequest.createLimit, {
		onSuccess: (data) => {
			onSuccess(data.data);
			showSuccessSnackbar('Limits created successfully');
		},
		onError: () => {
			onError();
			showErrorSnackbar('Error creating limits');
		},
	});

	const { t } = useTranslation();

	return (
		<>
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
					x_units: '',
					y_units: '',
				}}
				validationSchema={Yup.object({
					name: Yup.string()
						.min(3, t('This field must be at least 3 characters long.'))
						.max(36, t('This field must be at most 36 characters long.'))
						.required(t('Field Required')),
					groups: Yup.array().min(1, t('Please select at least one group')),
					descriptors: Yup.array().of(
						Yup.object({
							descriptor: Yup.string().required(t('Field Required')),
							value: Yup.string()
								.min(3, t('This field must be at least 3 characters long.'))
								.max(36, t('This field must be at most 36 characters long.'))
								.required(t('Field Required')),
						})
					),
					x_units: Yup.string().required(t('Field Required')),
					y_units: Yup.string().required(t('Field Required')),
				})}
				onSubmit={async (values, { resetForm }) => {
					if (isEmpty(calcLimits)) {
						showErrorSnackbar('No valid limits found in the session');
						return;
					}
					const limits = [];
					calcLimits.forEach((l) => {
						limits.push({
							limit: serializeToServerPayload(l.data),
							limit_types: l.limitType,
							x_units: values.x_units,
							y_units: values.y_units,
						});
					});
					const g = values.groups.reduce((acc, g) => {
						acc.push(g.id);
						return acc;
					}, []);
					const payload = {
						name: values.name,
						tags: values.tags,
						is_public: values.is_public,
						groups: g,
						descriptors: values.descriptors,
						limits,
					};
					await createLimit
						.mutateAsync(payload, {
							onSuccess: () => {
								resetForm();
								onCancel();
							},
						})
						.catch();
				}}
			>
				{({
					submitForm,
					isSubmitting,
					setFieldValue,
					values,
					errors,
					touched,
				}) => (
					<Form>
						<Stack spacing={1}>
							<FormLabel>{t('Name')}</FormLabel>
							<Field name="name" component={TextField} fullWidth size="small" />

							<FormLabel>{t('Privacy')}</FormLabel>
							<Field name="is_public" component={Select} size="small">
								<MenuItem value>{t('Public')}</MenuItem>
								<MenuItem value={false} disabled>
									{t('Private')}
								</MenuItem>
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
								size="small"
								multiple
								loading={isLoading}
								options={groupsResponse || []}
								getOptionLabel={(group) => group.group_name}
								filterSelectedOptions
								disableCloseOnSelect
								renderInput={(params) => (
									<Stack>
										<Stack spacing={1} direction="row">
											<MuiTextField
												fullWidth
												{...params}
												variant="outlined"
												error={errors.groups && touched.groups}
											/>
											<IconButton onClick={() => refetch()} size="small">
												<ReplayIcon />
											</IconButton>
										</Stack>
										{errors.groups && touched.groups ? (
											<FormHelperText error>{errors.groups}</FormHelperText>
										) : null}
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
															size="small"
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
																size="small"
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
							<FormLabel>{t('Units')}</FormLabel>
							<Stack direction="row" spacing={2}>
								<DropDownSelect
									size="small"
									showNewItemButton
									handleChange={(e) => setFieldValue('x_units', e.target.value)}
									value={values.x_units}
									emptyPlaceHolder={t('X Units')}
									error={Boolean(touched.x_units && !!errors.x_units)}
									helperText={touched.x_units && errors.x_units}
									items={projMetaDataRes?.x_units || []}
									newItemButtonOnClick={() => setCreateUnitModalOpen(true)}
									disabled={isSubmitting}
								/>
								<DropDownSelect
									size="small"
									showNewItemButton
									handleChange={(e) => setFieldValue('y_units', e.target.value)}
									value={values.y_units}
									error={Boolean(touched.y_units && !!errors.y_units)}
									helperText={touched.y_units && errors.y_units}
									emptyPlaceHolder={t('Y Units')}
									items={projMetaDataRes?.y_units || []}
									newItemButtonOnClick={() => setCreateUnitModalOpen(true)}
									disabled={isSubmitting}
								/>
							</Stack>
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
			<CUUnitsModal
				open={createUnitModalOpen}
				handleClose={() => setCreateUnitModalOpen(false)}
			/>
		</>
	);
}

CreateLimitForm.propTypes = {
	onSuccess: PropTypes.func,
	onCancel: PropTypes.func,
	onError: PropTypes.func,
	containerStyle: PropTypes.object,
	graphId: PropTypes.string.isRequired,
};
