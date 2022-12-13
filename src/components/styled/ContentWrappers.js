import { styled, Box } from '@mui/material';

export const PageContentWrapper = styled(Box)(
	({ theme }) => `
    background: ${theme.palette.secondary};
    display: flex;
    align-items: flex-start;
    width: 100%;
  `
);
