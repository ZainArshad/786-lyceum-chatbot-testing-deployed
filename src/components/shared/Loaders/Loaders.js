import { Box, CircularProgress } from '@mui/material';

export const Si6maLoader = ({ ...rest }) => {
	return (
		<Box
			sx={{
				width: '100%',
				display: 'flex',
				alignItems: 'center',
				justifyContent: 'center',
			}}
		>
			<CircularProgress {...rest} />
		</Box>
	);
};
