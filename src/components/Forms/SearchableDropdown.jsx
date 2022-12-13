import { styled, Autocomplete, TextField } from '@mui/material';
import PropTypes from 'prop-types';
import CircularProgress from '@mui/material/CircularProgress';

export const SearchableAutocompleteWrapper = styled(Autocomplete)(
	({ theme }) => `
    .MuiInputBase-input {
        font-size: ${theme.typography.pxToRem(17)};
    }
    
    .MuiInputBase-root {
        background-color: ${theme.forms.colors.inputsBg};
    }
    .MuiFormControl-root {
        border: 1px solid ${theme.colors.rawColors.secondaryL};
        border-radius: ${theme.general.borderRadius};
        height: ${theme.typography.pxToRem(60)};
    }
    .MuiAutocomplete-clearIndicator {
        background-color: ${theme.colors.rawColors.secondaryL};
        color: ${theme.colors.rawColors.secondary};
        & :hover {
            color: ${theme.colors.warning.main};
        }
    }
    `
);

export function SearchableDropdown({
	open,
	setOpen,
	options,
	loading,
	endComponent,
	startComponent,
	children,
	...rest
}) {
	return (
		<SearchableAutocompleteWrapper
			open={open}
			onOpen={() => {
				setOpen(true);
			}}
			onClose={() => {
				setOpen(false);
			}}
			isOptionEqualToValue={(option, value) => option.title === value.title}
			getOptionLabel={(option) => option.title}
			options={options}
			loading={loading}
			renderInput={(params) => (
				<TextField
					{...params}
					InputProps={{
						...params.InputProps,
						endAdornment: (
							<>
								{loading ? (
									<CircularProgress color="inherit" size={20} />
								) : (
									endComponent || null
								)}
								{params.InputProps.endAdornment}
							</>
						),
						startAdornment: (
							<>
								{startComponent || null}
								{params.InputProps.startAdornment}
							</>
						),
					}}
				/>
			)}
			{...rest}
		>
			{children}
		</SearchableAutocompleteWrapper>
	);
}

SearchableDropdown.propTypes = {
	open: PropTypes.bool.isRequired,
	setOpen: PropTypes.func.isRequired,
	options: PropTypes.array.isRequired,
	loading: PropTypes.bool.isRequired,
	startComponent: PropTypes.node,
	endComponent: PropTypes.node,
	children: PropTypes.node,
};
