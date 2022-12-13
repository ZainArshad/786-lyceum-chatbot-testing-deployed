import React from 'react';
import PropTypes from 'prop-types';
import { Box, MenuItem, Stack, FormLabel } from '@mui/material';
import { useTranslation } from 'next-i18next';
import { LoadingButton } from 'src/components/shared/Buttons';
import { FlexEnd } from 'src/components/shared/wrappers';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import * as Yup from 'yup';
import { queryKeys } from 'src/lib/constants/queries';
import { Formik, Form, Field } from 'formik';
import { Select, TextField } from 'formik-mui';
import { makeConstantsRequest } from 'src/services/api/constants';
import { useSnackbarNotifications } from 'src/hooks/useSnackbarNotifications';

const availableUnitOptions = [
	{ value: 'X Units', label: 'X Units' },
	{ value: 'Y Units', label: 'Y Units' },
];

export function CustomUnitsForm({
	onSuccess = () => {},
	onCancel = () => {},
	onError = () => {},
	containerStyle = {},
	defaultSelected = null,
}) {
	const { t } = useTranslation();
	const queryClient = useQueryClient();
	const { showErrorSnackbar, showSuccessSnackbar } = useSnackbarNotifications();
	const createUnits = useMutation(makeConstantsRequest.createConstant, {
		onSuccess: () => {
			onSuccess();
			queryClient.invalidateQueries([queryKeys.GET_PROJECT_METADATA]);
			showSuccessSnackbar(t('Success'));
		},
		onError: () => {
			onError();
			showErrorSnackbar(t('Error. Please try again.'));
		},
	});

	const selectDefaultUnitType = () => {
		if (!defaultSelected) return '';
		if (defaultSelected.toUpperCase() === 'X') {
			return 'X Units';
		}
		if (defaultSelected.toUpperCase() === 'Y') {
			return 'Y Units';
		}
		return '';
	};

	return (
		<Box sx={{ ...containerStyle }}>
			<Formik
				initialValues={{
					name: '',
					data_type: selectDefaultUnitType(),
				}}
				validationSchema={Yup.object({
					name: Yup.string()
						.min(3, t('This field must be at least 3 characters long.'))
						.max(24, t('This field must be at most 24 characters long.'))
						.required(t('Field Required')),
					data_type: Yup.string().required(t('Field Required')),
				})}
				onSubmit={async (values) => {
					await createUnits.mutateAsync(values).catch();
				}}
			>
				{({ submitForm, isSubmitting }) => (
					<Form>
						<Stack spacing={1}>
							<FormLabel>{t('Name')}</FormLabel>
							<Field name="name" component={TextField} fullWidth />
							<FormLabel>{t('Unit Type')}</FormLabel>
							<Field name="data_type" component={Select}>
								{availableUnitOptions.map((option) => (
									<MenuItem key={option.value} value={option.value}>
										{option.label}
									</MenuItem>
								))}
							</Field>
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
									{t('Save')}
								</LoadingButton>
							</FlexEnd>
						</Stack>
					</Form>
				)}
			</Formik>
		</Box>
	);
}

CustomUnitsForm.propTypes = {
	onSuccess: PropTypes.func,
	onCancel: PropTypes.func,
	onError: PropTypes.func,
	containerStyle: PropTypes.object,
	defaultSelected: PropTypes.oneOf([null, 'x', 'y']),
};
