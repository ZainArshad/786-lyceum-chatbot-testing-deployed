import { styled, Box, CircularProgress } from '@mui/material';
import PropTypes from 'prop-types';

const LoadingOverlayCtn = styled(Box)(() => ({
	position: 'fixed',
	top: 0,
	left: 0,
	width: '100%',
	height: '100%',
	display: 'flex',
	justifyContent: 'center',
	alignItems: 'center',
	zIndex: 1000,
	backgroundColor: 'rgba(255, 255, 255, 0.5)',
}));

export const LoadingOverlay = ({ loading = false }) => {
	return loading ? (
		<LoadingOverlayCtn>
			<CircularProgress />
		</LoadingOverlayCtn>
	) : null;
};

LoadingOverlay.propTypes = {
	loading: PropTypes.bool,
};
