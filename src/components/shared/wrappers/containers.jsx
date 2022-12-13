import { Box, styled } from '@mui/material';

export const UploadCtn = styled(Box)(
	({ theme }) => `
        border: 1px dashed ${theme.palette.secondary.lightest};
        min-height: ${theme.spacing(4)};
        border-radius: ${theme.general.borderRadius};
        background-color: ${theme.forms.colors.inputsBg};
        color: ${theme.palette.secondary.main};
        width: 100%;
        display: flex;
        align-items: center;
        justify-content: center;

        &:hover {
            cursor: pointer;
            border: 1px dashed ${theme.colors.primary.lighter};
        }
    `
);
