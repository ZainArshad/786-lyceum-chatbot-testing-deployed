import { Button, useTheme } from '@mui/material';
import PropTypes from 'prop-types';

export const TabButton = ({ label, disabled = false, selected, ...rest }) => {
	const theme = useTheme();
	return (
		<Button
			disabled={disabled}
			{...rest}
			size="small"
			variant={selected ? 'contained' : 'outlined'}
			color="primary"
			sx={{
				mx: theme.spacing(0.5),
				borderRadius: theme.general.borderRadiusSm,
			}}
		>
			{label}
		</Button>
	);
};

TabButton.propTypes = {
	label: PropTypes.string.isRequired,
	disabled: PropTypes.bool,
	selected: PropTypes.bool,
};
