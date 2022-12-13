import { useTheme, Typography } from '@mui/material';
import PropTypes from 'prop-types';

export function InputTitle({ children }) {
	const theme = useTheme();
	if (!children) return null;
	return (
		<Typography
			sx={{
				mb: theme.spacing(1),
				fontSize: theme.typography.body2,
				color: theme.colors.rawColors.fontPrimary,
			}}
		>
			{children}
		</Typography>
	);
}

InputTitle.propTypes = {
	children: PropTypes.node,
};
