import {
	useTheme,
	TextField,
	InputAdornment,
	IconButton,
	styled,
	Box,
} from '@mui/material';
import SearchTwoToneIcon from '@mui/icons-material/SearchTwoTone';

import { useTranslation } from 'react-i18next';

const SearchInputWrapper = styled(TextField)(
	({ theme }) => `
    .MuiSvgIcon-root {
      opacity: .7;
    }
  
    .MuiInputBase-input {
        font-size: ${theme.typography.pxToRem(17)};
        // color: ${theme.colors.alpha.white[100]};
    }
    
    .MuiInputBase-root {
        // background: ${theme.colors.alpha.trueWhite[70]};
    }
  
    .MuiInputBase-adornedEnd {
      padding-right: ${theme.spacing(0.5)};
    }
  `
);

function TestTubeSearch() {
	const { t } = useTranslation();
	const theme = useTheme();

	return (
		<SearchInputWrapper
			InputProps={{
				endAdornment: (
					<InputAdornment position="end">
						<IconButton>
							<Box
								sx={{
									width: 50,
									height: 35,
									backgroundColor: theme.sidebar.background,
									borderRadius: theme.general.borderRadius,
									display: 'flex',
									alignItems: 'center',
									justifyContent: 'center',
								}}
							>
								<SearchTwoToneIcon color="primary" />
							</Box>
						</IconButton>
					</InputAdornment>
				),
			}}
			placeholder={t('Search TestTube')}
			fullWidth
		/>
	);
}

export default TestTubeSearch;
