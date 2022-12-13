import { Box, styled, useTheme } from '@mui/material';
import PropTypes from 'prop-types';

const StyledPageBodyWrapper = styled(Box)(() => ({
	display: 'flex',
	flexDirection: 'column',
	width: '100%',
}));

export const PageBodyWrapper = ({ children, ...rest }) => {
	const theme = useTheme();
	return (
		<StyledPageBodyWrapper
			sx={{
				padding: {
					lg: theme.spacing(0, 2.7),
					md: theme.spacing(0, 2.3),
					xs: theme.spacing(0, 1.0),
				},
				mb: theme.spacing(3.3),
			}}
			{...rest}
		>
			{children}
		</StyledPageBodyWrapper>
	);
};

PageBodyWrapper.propTypes = {
	children: PropTypes.node,
};

const StyledBrickBodyCtn = styled(Box)(
	({ theme }) => `
    display: flex;
    flex-direction: column;
    width: 100%;
    margin-top: ${theme.spacing(4)};
    border: 1px solid ${theme.colors.rawColors.secondaryL};
    border-radius: ${theme.general.borderRadiusXl};
  `
);

export const BrickBodyCtn = ({ children, overRideStyles = {}, ...rest }) => {
	const theme = useTheme();
	return (
		<StyledBrickBodyCtn
			sx={{
				padding: {
					lg: theme.spacing(3, 3.0),
					md: theme.spacing(3, 1.0),
					xs: theme.spacing(1, 1),
				},
				...overRideStyles,
			}}
			{...rest}
		>
			{children}
		</StyledBrickBodyCtn>
	);
};

BrickBodyCtn.propTypes = {
	children: PropTypes.node,
	overRideStyles: PropTypes.object,
};
