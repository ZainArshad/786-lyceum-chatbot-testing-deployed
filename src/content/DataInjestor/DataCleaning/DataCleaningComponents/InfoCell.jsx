import { Box, darken, Typography, useTheme } from '@mui/material';
import PropTypes from 'prop-types';

export function InfoCell({ boxContent, contentTitle, ...rest }) {
	const theme = useTheme();

	return (
		<Box
			sx={{
				display: 'flex',
				alignItem: 'center',
				backgroundColor: darken(theme.forms.colors.inputsBg, 0.02),
				borderRadius: theme.general.borderRadiusXl,
				padding: theme.spacing(0, 1.5),
			}}
			{...rest}
		>
			<Box
				sx={{
					my: 'auto',
					padding: theme.spacing(0.5, 1.5),
					backgroundColor: theme.colors.rawColors.trueWhite,
					borderRadius: theme.general.borderRadiusSm,
				}}
			>
				<Typography>{boxContent}</Typography>
			</Box>
			<Box
				sx={{
					padding: theme.spacing(1.3),
					my: 'auto',
				}}
			>
				<Typography
					sx={{
						fontSize: 16,
						color: theme.colors.rawColors.fontSecondary,
					}}
				>
					{contentTitle}
				</Typography>
			</Box>
		</Box>
	);
}

InfoCell.propTypes = {
	boxContent: PropTypes.string,
	contentTitle: PropTypes.string,
};
