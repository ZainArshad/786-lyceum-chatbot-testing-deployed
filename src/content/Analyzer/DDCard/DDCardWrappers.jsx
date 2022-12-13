import { Box, styled } from '@mui/material';

export const DDMainWrapper = styled(Box)(({ theme }) => ({
	backgroundColor: theme.colors.rawColors.secondaryXL,
	border: `1px solid ${theme.colors.rawColors.secondaryL}`,
	borderRadius: theme.general.borderRadiusXl,
	padding: theme.spacing(1),
	margin: theme.spacing(1.2, 0),
}));

export const DDContentCardWrapper = styled(Box)(({ theme }) => ({
	backgroundColor: theme.colors.rawColors.trueWhite,
	border: `1px solid ${theme.colors.rawColors.secondaryL}`,
	borderRadius: theme.general.borderRadiusXl,
	width: '100%',
	height: '100%',
	padding: theme.spacing(1.5),
	margin: theme.spacing(1.2, 0),
}));
