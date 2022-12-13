/* eslint react/prop-types: 0 */ // --> OFF | @Zain please take care of this
import { Typography, useTheme } from '@mui/material';

export const ProjectViewSectionHeading = ({
	children,
	otherStyles,
	...rest
}) => {
	const theme = useTheme();
	return (
		<Typography
			sx={{
				fontSize: theme.typography.h4,
				fontWeight: 'bold',
				[theme.breakpoints.up('lg')]: {
					fontSize: theme.typography.h2,
				},
				...otherStyles,
			}}
			{...rest}
		>
			{children}
		</Typography>
	);
};
