import { Box, styled, Typography, useTheme } from '@mui/material';
import PropTypes from 'prop-types';
import { FlexApart as _FlexApart } from 'src/components/shared/wrappers';

export const GraphSessionContainer = ({ children, ...rest }) => {
	const theme = useTheme();
	return (
		<Box
			sx={{
				padding: {
					xl: 2.5,
					lg: 2.2,
					md: 2,
					xs: 0.8,
				},
				backgroundColor: theme.palette.common.white,
				border: `1px solid ${theme.palette.secondary.lightest}`,
				borderRadius: theme.general.borderRadiusXl,
			}}
			{...rest}
		>
			{children}
		</Box>
	);
};

GraphSessionContainer.propTypes = {
	children: PropTypes.node.isRequired,
};

export const OperationsPanelCtn = styled(Box)(
	({ theme }) => `
    width: 100%;
    padding: ${theme.spacing(2, 1.5)}};
  `
);

export const HeadedContainer = ({
	heading = '',
	children,
	containerStyles = {},
	...rest
}) => {
	const theme = useTheme();
	return (
		<Box
			sx={{
				padding: theme.spacing(1),
				border: `2px solid #7B8092`,
				borderRadius: theme.general.borderRadius,
				mb: theme.spacing(2),
				...containerStyles,
			}}
			className="limit-setter-container"
			{...rest}
		>
			{heading && (
				<Typography
					sx={{
						backgroundColor: theme.palette.common.white,
						color: theme.palette.text.secondary,
						width: 'fit-content',
						px: theme.spacing(1),
						mt: theme.spacing(-2.9),
						borderRadius: theme.general.borderRadiusSm,
					}}
					my={0.5}
				>
					{heading}
				</Typography>
			)}
			{children}
		</Box>
	);
};

HeadedContainer.propTypes = {
	heading: PropTypes.string,
	containerStyles: PropTypes.object,
	children: PropTypes.node,
};

export const GraphPoprtiesFlexApart = styled(_FlexApart)(
	({ theme }) => `
    margin: ${theme.spacing(1, 0)};

    &:first-of-type {
      margin-top: 0;
    }
    &:last-of-type {
      margin-bottom: 0;
    }
  `
);
