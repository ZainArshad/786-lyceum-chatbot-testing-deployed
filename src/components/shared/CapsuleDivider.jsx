import PropsTypes from 'prop-types';
import { useTheme, Box, Divider, Chip } from '@mui/material';

export const CapsuleDivider = ({ capsuleText, capsuleProps = {} }) => {
	const theme = useTheme();
	return (
		<Box
			sx={{
				display: 'flex',
				width: '100%',
				justifyContent: 'space-between',
				alignItems: 'center',
				my: theme.spacing(0.75),
			}}
		>
			<Divider sx={{ color: theme.colors.alpha.black[50], flex: 1 }} />
			{capsuleText && (
				<Chip label={capsuleText} {...capsuleProps} variant="outlined" />
			)}
			<Divider sx={{ color: theme.colors.alpha.black[50], flex: 1 }} />
		</Box>
	);
};

CapsuleDivider.propTypes = {
	capsuleText: PropsTypes.string,
	capsuleProps: PropsTypes.object,
};
