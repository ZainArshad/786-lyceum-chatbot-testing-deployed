import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { Box, IconButton, Typography, useTheme } from '@mui/material';
import PropTypes from 'prop-types';

export const Expander = ({
	onClick = () => {},
	expandState,
	showText = false,
	btnSize = 'small',
	togglerProps = {},
}) => {
	const theme = useTheme();

	return (
		<Box
			sx={{
				display: 'flex',
				justifyContent: 'flex-end',
				alignItems: 'center',
			}}
		>
			<IconButton
				onClick={onClick}
				sx={{ backgroundColor: theme.colors.rawColors.secondaryL }}
				size={btnSize}
				{...togglerProps}
			>
				<Typography
					sx={{
						fontSize: theme.typography.body2,
						color: theme.colors.alpha.black[50],
						display: 'flex',
						alignItems: 'center',
					}}
				>
					{showText && (expandState ? 'Hide' : 'Expand')}
					{expandState ? <ExpandLessIcon /> : <ExpandMoreIcon />}
				</Typography>
			</IconButton>
		</Box>
	);
};

Expander.propTypes = {
	onClick: PropTypes.func.isRequired,
	expandState: PropTypes.bool.isRequired,
	showText: PropTypes.bool,
	btnSize: PropTypes.oneOf(['small', 'medium', 'large']),
	togglerProps: PropTypes.object,
};

export default Expander;
