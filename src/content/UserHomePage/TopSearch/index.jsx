import { useRef, useState } from 'react';
import { Box, TextField, InputAdornment, styled } from '@mui/material';
import SearchTwoToneIcon from '@mui/icons-material/SearchTwoTone';
import { useTranslation } from 'next-i18next';
import ExpandMoreTwoToneIcon from '@mui/icons-material/ExpandMoreTwoTone';
import AddCircleTwoToneIcon from '@mui/icons-material/AddCircleTwoTone';
import { Button } from 'src/components/shared/Buttons';

const TextfieldWrapper = styled(Box)(
	({ theme }) => `
      .MuiOutlinedInput-root {
        background: ${theme.colors.alpha.white[100]};
      }
  `
);

function TopSearch() {
	const { t } = useTranslation();
	const actionRef1 = useRef(null);

	const [sort] = useState('Sort by...');
	return (
		<Box
			display={{ xs: 'block', md: 'flex' }}
			alignItems="center"
			justifyContent="space-between"
			sx={{ pb: 3 }}
		>
			<Box display="flex" alignItems="center">
				<TextfieldWrapper>
					<TextField
						size="small"
						sx={{ width: '100%' }}
						InputProps={{
							startAdornment: (
								<InputAdornment position="start">
									<SearchTwoToneIcon />
								</InputAdornment>
							),
						}}
						placeholder={t('Search...')}
					/>
				</TextfieldWrapper>
			</Box>
			<Box
				sx={{
					pt: { xs: 2, md: 0 },
				}}
			>
				<Button
					ref={actionRef1}
					variant="outlined"
					endIcon={<ExpandMoreTwoToneIcon fontSize="small" />}
				>
					{sort}
				</Button>
				<Button
					sx={{
						ml: 1,
					}}
					startIcon={<AddCircleTwoToneIcon />}
				>
					{t('Create new organization')}
				</Button>
			</Box>
		</Box>
	);
}

export default TopSearch;
