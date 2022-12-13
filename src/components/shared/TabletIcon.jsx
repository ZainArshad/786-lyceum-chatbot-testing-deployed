import { useTheme, Box } from '@mui/material';
import PropTypes from 'prop-types';

export function TabletIcon({ icon }) {
	const theme = useTheme();

	return (
		<Box
			sx={{
				width: 50,
				height: '100%',
				backgroundColor: theme.sidebar.background,
				borderRadius: theme.general.borderRadius,
				display: 'flex',
				alignItems: 'center',
				justifyContent: 'center',
			}}
		>
			{icon}
		</Box>
	);
}

TabletIcon.propTypes = {
	icon: PropTypes.node,
};
