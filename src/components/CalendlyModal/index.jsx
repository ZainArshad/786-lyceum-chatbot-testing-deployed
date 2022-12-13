import { Modal, ModalBody } from 'src/components/shared/Modal';
import { InlineWidget } from 'react-calendly';
import PropTypes from 'prop-types';

function CalendlyModal({ open, handleClose }) {
	return (
		<Modal open={open} onClose={handleClose} sx={{ m: 0 }}>
			<ModalBody
				sx={{
					width: {
						xs: '90%',
						md: '70%',
						lg: '70%',
					},
					overflow: 'hidden',
					p: 0,
					height: { md: '43vw', xs: '125vw', sm: '90vw' },
				}}
			>
				<InlineWidget
					url="https://calendly.com/thelyceum"
					styles={{ height: '100%', width: '100%' }}
				/>
			</ModalBody>
		</Modal>
	);
}

CalendlyModal.propTypes = {
	open: PropTypes.bool.isRequired,
	handleClose: PropTypes.func.isRequired,
};

export default CalendlyModal;
