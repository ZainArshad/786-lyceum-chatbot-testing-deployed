import { Typography, useTheme } from '@mui/material';
import PropTypes from 'prop-types';

export const PageHeading = ({ children }) => {
	const theme = useTheme();
	return (
		<Typography
			sx={{
				my: theme.spacing(2),
				fontSize: theme.typography.h2,
				fontWeight: 400,
			}}
		>
			{children}
		</Typography>
	);
};

PageHeading.propTypes = {
	children: PropTypes.node,
};
