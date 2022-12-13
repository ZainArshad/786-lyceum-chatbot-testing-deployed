import { Modal, ModalBody } from 'src/components/shared/Modal';
import PropTypes from 'prop-types';

function VideoModal({ url, open, handleClose }) {
	return (
		<Modal open={open} onClose={handleClose} sx={{ m: 0 }}>
			<ModalBody
				sx={{
					width: {
						xs: '90%',
						md: '60%',
						lg: '60%',
					},
					p: 0,
					height: { md: '31vw', xs: '55vw', sm: '45vw' },
					overflow: 'hidden',
				}}
			>
				<iframe
					width="100%"
					height="100%"
					src={url}
					frameBorder="0"
					title="Video"
					allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
					allowFullScreen="1"
				/>
			</ModalBody>
		</Modal>
	);
}

VideoModal.propTypes = {
	url: PropTypes.string.isRequired,
	open: PropTypes.bool.isRequired,
	handleClose: PropTypes.func.isRequired,
};

export default VideoModal;
