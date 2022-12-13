import { styled, TextareaAutosize as MuiTextArea } from '@mui/material';

export const TextArea = styled(MuiTextArea)(
	({ theme }) => `
    width: 100%;
    height: 100%;
    border: 1px solid ${theme.palette.secondary.light};
    border-radius: ${theme.general.borderRadiusSm};
    padding: ${theme.spacing(1)};
    `
);
