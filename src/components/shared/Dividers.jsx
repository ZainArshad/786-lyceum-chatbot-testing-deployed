import { Divider, styled } from '@mui/material';

export const DottedDivider = styled(Divider)(
	({ theme }) => `
  margin: ${theme.spacing(1)}px 0;
  color: ${theme.colors.rawColors.secondaryL};
  border-top: 1px solid ${theme.colors.rawColors.secondaryL};
`
);
