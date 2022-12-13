import { Box, CircularProgress } from '@mui/material';

function Loader({ ...rest }) {
	return (
		<Box
			sx={{ position: 'fixed', left: 0, top: 0, width: '100%', height: '100%' }}
			display="flex"
			alignItems="center"
			justifyContent="center"
		>
			<CircularProgress size={64} disableShrink thickness={3} {...rest} />
		</Box>
	);
}

export default Loader;
