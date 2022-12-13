import ClearIcon from '@mui/icons-material/Clear';
import SearchIcon from '@mui/icons-material/Search';
import {
	IconButton,
	OutlinedInput,
	Stack,
	Typography,
	useTheme,
} from '@mui/material';
import { useTranslation } from 'next-i18next';
import PropTypes from 'prop-types';
import { useEffect, useState } from 'react';
import { Button } from 'src/components/shared/Buttons';

export function SearchBar({
	onSearch = () => {},
	handleBlur = () => {},
	enableReturn = false,
	defaultValue = '',
	...rest
}) {
	const [searchValue, setSearchValue] = useState(defaultValue);
	const { t } = useTranslation();
	const theme = useTheme();

	useEffect(() => {
		if (defaultValue) {
			onSearch(defaultValue);
		}
	}, []);

	const handleKeyDown = (event) => {
		if (!enableReturn) return;
		if (event.keyCode === 13 && searchValue) {
			onSearch(searchValue);
		}
	};

	return (
		<OutlinedInput
			onChange={(e) => setSearchValue(e.target.value)}
			onKeyDown={handleKeyDown}
			placeholder={t('Search')}
			fullWidth
			size="medium"
			value={searchValue}
			onBlur={() => handleBlur(searchValue)}
			endAdornment={
				searchValue && (
					<Stack direction="row" spacing={0.5}>
						<IconButton
							onClick={() => {
								onSearch('');
								setSearchValue('');
							}}
							size="small"
						>
							<ClearIcon />
						</IconButton>
						<Button
							disabled={!searchValue}
							onClick={() => onSearch(searchValue)}
							size="small"
						>
							<Typography>{t('Search')}</Typography>
						</Button>
					</Stack>
				)
			}
			startAdornment={<SearchIcon sx={{ mr: theme.spacing(1) }} />}
			{...rest}
		/>
	);
}

SearchBar.propTypes = {
	onSearch: PropTypes.func,
	handleBlur: PropTypes.func,
	enableReturn: PropTypes.bool,
	defaultValue: PropTypes.string,
};
