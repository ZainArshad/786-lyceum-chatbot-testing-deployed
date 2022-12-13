import React from 'react';
import PropTypes from 'prop-types';
import { useTranslation } from 'next-i18next';
import { Modal, ModalBody } from 'src/components/shared/Modal';
import { Typography } from '@mui/material';
import { CustomUnitsForm } from 'src/components/DataCollection/CustomUnitsForm';

export const CUUnitsModal = ({
	open,
	handleClose = () => {},
	defaultUnit = null,
}) => {
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
					{t('Create Custom Units')}
				</Typography>
				<CustomUnitsForm
					onCancel={handleClose}
					onSuccess={handleClose}
					defaultSelected={defaultUnit}
				/>
			</ModalBody>
		</Modal>
	);
};

CUUnitsModal.propTypes = {
	open: PropTypes.bool.isRequired,
	handleClose: PropTypes.func.isRequired,
	defaultUnit: PropTypes.oneOf([null, 'x', 'y']),
};
