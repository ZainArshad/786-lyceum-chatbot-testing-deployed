import { Box, styled } from '@mui/material';

export const PinbaordWrapper = styled(Box)(
	({ theme }) => `
      width: ${theme.pinboard.width};
      min-width: ${theme.pinboard.width};
      color: ${theme.sidebar.textColor};
      background: ${theme.sidebar.background};
      border-right: 1px solid ${theme.colors.rawColors.secondaryL};
      position: relative;
      z-index: 7;
      height: 100%;
      @media (min-width: ${theme.breakpoints.values.lg}px) {
        height: 100%;
        margin-top: 0;
    }
  `
);
