import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import {
	Box,
	CircularProgress,
	styled,
	Typography,
	useTheme,
	Select,
	MenuItem,
	FormHelperText,
} from '@mui/material';
import { useTranslation } from 'next-i18next';
import PropTypes from 'prop-types';
import { Button } from 'src/components/shared/Buttons';
import { Center } from '../shared/wrappers';

const DropDownSelectWrapper = styled(Box)(
	() => `
        width: 100%;

        & .MuiSelect-select {
            width: 100%;
        }
        & .MuiOutlinedInput-root {
            width: 100%;
        }
    `
);

export function DropDownSelect({
	value,
	handleChange,
	items,
	emptyPlaceHolder,
	loading = false,
	showPlaceHolder = true,
	containerStyles = {},
	showNewItemButton = false,
	newItemButtonText = '',
	newItemButtonOnClick = () => {},
	newItemButtonStyles = {},
	newItemButtonProps = {},
	startComponent = null,
	endComponent = null,
	helperText = '',
	...rest
}) {
	const { t } = useTranslation();
	const theme = useTheme();
	const handleInnerChange = (event) => {
		handleChange?.(event);
	};

	return (
		<DropDownSelectWrapper sx={{ ...containerStyles }}>
			<Select
				IconComponent={KeyboardArrowDownIcon}
				value={value}
				onChange={handleInnerChange}
				displayEmpty
				renderValue={(selected) => {
					if (selected && items.length > 0) {
						const idx = items.findIndex((item) => item.value === selected);
						return items[idx].label;
					}
					return showPlaceHolder ? (
						<Typography
							sx={{
								fontSize: theme.typography.h4,
								color: theme.colors.rawColors.secondary,
							}}
						>
							{emptyPlaceHolder || t('Select an option')}
						</Typography>
					) : null;
				}}
				{...rest}
			>
				{startComponent}
				{showNewItemButton && (
					<Button
						sx={{
							width: '100%',
							justifyContent: 'center',
							mb: 1,
							...newItemButtonStyles,
						}}
						size="small"
						{...newItemButtonProps}
						onClick={newItemButtonOnClick}
					>
						{newItemButtonText || t('New')}
					</Button>
				)}
				{loading ? (
					<Center>
						<CircularProgress size={32} disableShrink thickness={2} />
					</Center>
				) : items ? (
					items.map((item) => (
						<MenuItem
							disabled={!!item.disabled}
							key={item.value}
							value={item.value}
						>
							{item.label}
						</MenuItem>
					))
				) : (
					<Typography sx={{ fontSize: theme.typography.body2 }}>
						{t('No Option..')}
					</Typography>
				)}
				{endComponent}
			</Select>
			<FormHelperText
				hidden={!helperText}
				sx={{ color: rest.error ? theme.colors.error.main : null }}
			>
				{helperText}
			</FormHelperText>
		</DropDownSelectWrapper>
	);
}

DropDownSelect.propTypes = {
	value: PropTypes.string.isRequired,
	handleChange: PropTypes.func,

	/* String value to show when nothing is selection */
	emptyPlaceHolder: PropTypes.string,
	loading: PropTypes.bool,
	showPlaceHolder: PropTypes.bool,
	containerStyles: PropTypes.object,
	items: PropTypes.arrayOf(
		PropTypes.shape({
			label: PropTypes.string.isRequired,
			value: PropTypes.string.isRequired,
			disabled: PropTypes.bool,
		})
	),
	showNewItemButton: PropTypes.bool,
	newItemButtonText: PropTypes.string,
	newItemButtonOnClick: PropTypes.func,
	newItemButtonStyles: PropTypes.object,
	newItemButtonProps: PropTypes.object,
	startComponent: PropTypes.element,
	endComponent: PropTypes.element,
	helperText: PropTypes.string,
};
