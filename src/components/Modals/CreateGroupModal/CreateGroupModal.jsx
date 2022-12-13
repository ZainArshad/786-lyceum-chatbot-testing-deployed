import React from 'react';
import PropTypes from 'prop-types';
import { useTranslation } from 'next-i18next';
import { Modal, ModalBody } from 'src/components/shared/Modal';
import { Typography } from '@mui/material';
import { CreateGroupForm } from 'src/components/DataCollection/CreateGroupForm';

export const CreateGroupModal = ({
	open,
	handleClose = () => {},
	onSuccess = () => {},
}) => {
	const { t } = useTranslation();

	const handleSuccess = () => {
		onSuccess();
		handleClose();
	};

	return (
		<Modal open={open} onClose={handleClose}>
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
					{t('Create Group')}
				</Typography>
				<CreateGroupForm onCancel={handleClose} onSuccess={handleSuccess} />
			</ModalBody>
		</Modal>
	);
};

CreateGroupModal.propTypes = {
	open: PropTypes.bool.isRequired,
	handleClose: PropTypes.func.isRequired,
	onSuccess: PropTypes.func,
};
