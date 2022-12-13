import { styled, Box, darken } from '@mui/material';

export const WorkBookWrapper = styled(Box)(
	({ theme }) => `
    .rdg {
        background-color: ${theme.colors.rawColors.trueWhite};
        height: auto;
        max-height: 80vh;
    }

    .rdg-row {
        background-color: ${theme.colors.rawColors.trueWhite};
        color: ${theme.colors.rawColors.fontPrimary};
    }
    
    .rdg-header-row {
        background-color: ${darken(theme.forms.colors.inputsBg, 0.02)};
        color: ${theme.colors.rawColors.fontPrimary};
    }

    .rdg-editor-container {
        background-color: green !important;
    }

    & div[aria-selected="true"] {
        background-color: ${darken(theme.forms.colors.inputsBg, 0.04)};
    }

    .rdg::-webkit-scrollbar {
        width: 0.5em;
        height: 0.5em;
    }

    // Track
    .rdg::-webkit-scrollbar-track {
    background: #f1f1f1;
    }

    // Handle 
    .rdg::-webkit-scrollbar-thumb {
    background: #888;
    }

    // Handle on hover
    .rdg::-webkit-scrollbar-thumb:hover {
    background: #555;
    }

`
);
