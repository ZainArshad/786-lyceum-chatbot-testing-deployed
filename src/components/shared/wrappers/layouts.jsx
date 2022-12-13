import { Box, styled } from '@mui/material';

export const Center = styled(Box)(
	({ _theme }) => `
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
  `
);

export const FlexApart = styled(Box)(
	({ _theme }) => `
    width: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
  `
);

export const FlexEnd = styled(Box)(
	({ _theme }) => `
    width: 100%;
    display: flex;
    justify-content: flex-end;
    align-items: center;
  `
);
