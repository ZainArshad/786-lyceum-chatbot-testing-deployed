import React from 'react';
import PropTypes from 'prop-types';
import { useTranslation } from 'next-i18next';
import { Modal, ModalBody } from 'src/components/shared/Modal';
import { Typography } from '@mui/material';
import { CreateStatNewUploadForm } from 'src/components/DataCollection/CreateStatNewUploadForm';

export const CreateNewUploadModal = ({
	open,
	handleClose = () => {},
	onSuccess = () => {},
	statBoxId,
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
					{t('New Upload')}
				</Typography>
				<CreateStatNewUploadForm
					statBoxId={statBoxId}
					onCancel={handleClose}
					onSuccess={handleSuccess}
				/>
			</ModalBody>
		</Modal>
	);
};

CreateNewUploadModal.propTypes = {
	open: PropTypes.bool.isRequired,
	handleClose: PropTypes.func.isRequired,
	onSuccess: PropTypes.func,
	statBoxId: PropTypes.string.isRequired,
};
