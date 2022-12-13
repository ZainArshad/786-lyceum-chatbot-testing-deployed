import React from 'react';
import PropTypes from 'prop-types';
import { useTranslation } from 'next-i18next';
import { Modal, ModalBody } from 'src/components/shared/Modal';
import { Typography } from '@mui/material';
import { CreateLimitForm } from 'src/components/DataCollection/CreateLimitForm';

export const CreateLimitModal = ({
	open,
	handleClose = () => {},
	onSuccess = () => {},
	graphId,
}) => {
	const { t } = useTranslation();

	const handleSuccess = (successRes) => {
		onSuccess(successRes);
		handleClose();
	};

	const _handleClose = (_, reason) => {
		if (reason !== 'backdropClick') {
			handleClose();
		}
	};

	return (
		<Modal open={open} onClose={_handleClose}>
			<ModalBody
				overRideStyles={{
					width: {
						xs: '90%',
						md: '50%',
						lg: '60%',
					},
				}}
			>
				<Typography mb={2} variant="h2" component="h2">
					{t('Create Limit')}
				</Typography>
				<CreateLimitForm
					graphId={graphId}
					onCancel={handleClose}
					onSuccess={handleSuccess}
				/>
			</ModalBody>
		</Modal>
	);
};

CreateLimitModal.propTypes = {
	open: PropTypes.bool.isRequired,
	handleClose: PropTypes.func.isRequired,
	onSuccess: PropTypes.func,
	graphId: PropTypes.string.isRequired,
};
