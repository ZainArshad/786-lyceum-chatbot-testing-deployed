import React from 'react';
import PropTypes from 'prop-types';
import { Box, Stack } from '@mui/material';
import { Input } from 'src/components/Forms';
import { useTranslation } from 'next-i18next';
import { useFormik } from 'formik';
import { LoadingButton } from 'src/components/shared/Buttons';
import { FlexEnd } from 'src/components/shared/wrappers';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import * as Yup from 'yup';
import { makeConfigRequest } from 'src/services/api/configs';
import { queryKeys } from 'src/lib/constants/queries';
import { useSnackbarNotifications } from 'src/hooks/useSnackbarNotifications';

export function CustomDescriptorForm({
	onSuccess = () => {},
	onCancel = () => {},
	onError = () => {},
	containerStyle = {},
}) {
	const { t } = useTranslation();
	const { showErrorSnackbar, showSuccessSnackbar } = useSnackbarNotifications();
	const queryClient = useQueryClient();
	const formik = useFormik({
		initialValues: {
			name: '',
			data_type: 'descriptor',
		},
		validationSchema: Yup.object({
			name: Yup.string()
				.min(3, t('This field must be at least 3 characters long.'))
				.max(24, t('This field must be at most 24 characters long.'))
				.required(t('Field Required')),
		}),
		onSubmit: (values) => {
			createDescriptor.mutate(values);
		},
	});
	const createDescriptor = useMutation(makeConfigRequest.createConfig, {
		onSuccess: () => {
			onSuccess();
			queryClient.invalidateQueries([queryKeys.GET_PROJECT_METADATA]);
			showSuccessSnackbar(t('Success'));
		},
		onError: () => {
			onError();
			showErrorSnackbar(t('Error! Please try again.'));
		},
		onSettled: () => {
			formik.setSubmitting(false);
		},
	});

	return (
		<Box sx={{ ...containerStyle }}>
			<form onSubmit={formik.handleSubmit}>
				<Stack spacing={1}>
					<Input
						name="name"
						fullWidth
						onChange={formik.handleChange}
						value={formik.values.name}
						placeholder={t('Descriptor Group Name')}
						error={formik.touched.name && Boolean(formik.errors.name)}
						helperText={formik.errors.name}
					/>
					<FlexEnd gap={2}>
						<LoadingButton
							onClick={onCancel}
							variant="outlined"
							color="secondary"
							loading={formik.isSubmitting}
						>
							{t('Cancel')}
						</LoadingButton>
						<LoadingButton
							onClick={formik.submitForm}
							loading={formik.isSubmitting}
							type="submit"
						>
							{t('Save')}
						</LoadingButton>
					</FlexEnd>
				</Stack>
			</form>
		</Box>
	);
}

CustomDescriptorForm.propTypes = {
	onSuccess: PropTypes.func,
	onCancel: PropTypes.func,
	onError: PropTypes.func,
	containerStyle: PropTypes.object,
};
