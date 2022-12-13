import { Typography, styled, Box } from '@mui/material';

export const TypographyH2 = styled(Typography)(
	({ theme }) => `
    font-size: ${theme.typography.pxToRem(16)};
`
);

export const TypographyH1Primary = styled(Typography)(
	({ theme }) => `
    font-size: ${theme.typography.pxToRem(36)};
`
);

export const BoxWrapper = styled(Box)(
	() => `
    width:100%;
    min-height:101px;
    overflow:auto;
`
);

export const ImgWrapper = styled(Box)(
	() => `
    position: relative;
    z-index: 5;
    width: 100%;
    overflow: hidden;

    img {
      display: block;
      width: 100%;
    }
  `
);
