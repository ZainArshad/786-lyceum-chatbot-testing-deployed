import React from 'react';
import PropTypes from 'prop-types';
import { useTranslation } from 'next-i18next';
import { Modal, ModalBody } from 'src/components/shared/Modal';
import { Typography } from '@mui/material';
import { CustomDescriptorForm } from 'src/components/DataCollection/CustomDescriptorForm';

export const CUDescriptorModal = ({ open, handleClose = () => {} }) => {
	const { t } = useTranslation();
	return (
		<Modal open={open} onClose={handleClose}>
			<ModalBody
				sx={{
					width: {
						xs: '90%',
						md: '60%',
						lg: '40%',
					},
				}}
			>
				<Typography mb={2} variant="h2" component="h2">
					{t('Create Descriptor')}
				</Typography>
				<CustomDescriptorForm onCancel={handleClose} onSuccess={handleClose} />
			</ModalBody>
		</Modal>
	);
};

CUDescriptorModal.propTypes = {
	open: PropTypes.bool.isRequired,
	handleClose: PropTypes.func.isRequired,
};
