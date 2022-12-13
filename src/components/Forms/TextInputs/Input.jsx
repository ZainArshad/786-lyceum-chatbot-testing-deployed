import { styled, TextField, Typography, useTheme } from '@mui/material';
import PropTypes from 'prop-types';

const SearchInputWrapper = styled(TextField)(
	({ theme }) => `
      .MuiSvgIcon-root {
        opacity: .7;
      }
    
      .MuiInputBase-input {
        font-size: ${theme.typography.pxToRem(17)};
        border: 1px solid ${theme.colors.rawColors.secondaryL};
        border-radius: ${theme.general.borderRadius};
      }
      
      .MuiOutlinedInput-input {
        height: auto;
      }
        
    
      .MuiInputBase-adornedEnd {
        padding-right: ${theme.spacing(0.5)};
      }

    `
);

export function Input({ fieldLabel, labelStyles, ...rest }) {
	const theme = useTheme();
	return (
		<>
			{fieldLabel && (
				<Typography
					sx={{
						mb: theme.spacing(1),
						fontSize: theme.typography.body2,
						color: theme.colors.rawColors.fontPrimary,
						...labelStyles,
					}}
				>
					{fieldLabel}
				</Typography>
			)}
			<SearchInputWrapper {...rest} />
		</>
	);
}

Input.propTypes = {
	fieldLabel: PropTypes.string,
	labelStyles: PropTypes.object,
};
