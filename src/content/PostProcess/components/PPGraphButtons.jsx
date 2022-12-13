import { useTheme } from '@mui/material';
import PropTypes from 'prop-types';
import { Button } from 'src/components/shared/Buttons';

export const GraphLimitsButton = ({ btnStyles = {}, children, ...rest }) => {
	const theme = useTheme();
	return (
		<Button
			variant="contained"
			size="small"
			sx={{
				width: '98%',
				display: 'flex',
				alignItems: 'center',
				justifyContent: 'center',
				m: theme.spacing(0.5),
				...btnStyles,
			}}
			{...rest}
		>
			{children}
		</Button>
	);
};

GraphLimitsButton.propTypes = {
	btnStyles: PropTypes.object,
	children: PropTypes.node,
};
