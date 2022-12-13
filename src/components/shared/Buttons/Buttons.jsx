import KeyboardBackspaceIcon from '@mui/icons-material/KeyboardBackspace';
import MuiLoadingButton from '@mui/lab/LoadingButton';
import { Box, Button as MuiButton, styled, useTheme } from '@mui/material';
import PropsTypes from 'prop-types';

const StyledButtonWrapper = styled(Box)(
	({ theme }) => `
  & .MuiButton-containedSecondary {
    background-color: ${theme.colors.rawColors.secondaryL};
    color: ${theme.colors.rawColors.fontSecondary};

    &:hover {
      opacity: 0.8;
      background-color: ${theme.colors.rawColors.secondaryL};
    }
  }

  & .Mui-disabled {
    background-color: ${theme.colors.rawColors.secondaryL};
    border: ${theme.colors.rawColors.secondaryL} solid 1px;

  }
  `
);

const StyledButton = styled(MuiButton)(
	({ fullWidth }) => `
      display: flex;
      align-items: center;
      justify-content: ${fullWidth ? 'center' : 'space-between'};

      min-height: 23px;
      width: ${fullWidth ? '100%' : 'auto'};
      
      font-size: 16px;
      font-weight: 300;
      font-stretch: normal;
  `
);

const StyledLoadingButton = styled(MuiLoadingButton)(
	({ fullWidth }) => `
  display: flex;
  align-items: center;
  justify-content: ${fullWidth ? 'center' : 'space-between'};

  min-height: 23px;
  width: ${fullWidth ? '100%' : 'auto'};
  
  font-size: 16px;
  font-weight: 300;
  font-stretch: normal;
  `
);

export function Button({ children, ...rest }) {
	return (
		<StyledButtonWrapper>
			<StyledButton variant="contained" size="small" {...rest}>
				{children}
			</StyledButton>
		</StyledButtonWrapper>
	);
}

Button.propTypes = {
	children: PropsTypes.node,
};

export const LoadingButton = ({ children, ...rest }) => {
	return (
		<StyledButtonWrapper>
			<StyledLoadingButton variant="contained" size="small" {...rest}>
				{children}
			</StyledLoadingButton>
		</StyledButtonWrapper>
	);
};

export const BackButton = ({ children, iconProps = {}, ...rest }) => {
	const theme = useTheme();
	return (
		<Button
			color="secondary"
			variant="contained"
			startIcon={
				<KeyboardBackspaceIcon sx={{ mr: theme.spacing(2) }} {...iconProps} />
			}
			{...rest}
		>
			{children}
		</Button>
	);
};

BackButton.propTypes = {
	children: PropsTypes.node,
	iconProps: PropsTypes.object,
};

LoadingButton.propTypes = {
	children: PropsTypes.node,
};
