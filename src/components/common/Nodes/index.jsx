import { Box, styled } from '@mui/material';
import { Button } from 'src/components/shared/Buttons';

export const NodeOptionWrapper = styled(Box)(
	({ theme }) => `
            width: 100%;
            border-radius: ${theme.shape.borderRadius}px;
            background-color: ${theme.colors.rawColors.secondaryXL};
            border: 1px solid  ${theme.colors.rawColors.secondaryL};
            margin-bottom: ${theme.spacing(1)};
        `
);

export const HelperButtonCtn = styled(Box)(({ theme }) => ({
	position: 'sticky',
	bottom: 0,
	backgroundColor: theme.colors.rawColors.secondaryXL,
	padding: theme.spacing(1),
	borderRadius: `${theme.shape.borderRadius}px`,
	display: 'flex',
	alignItems: 'center',
	justifyContent: 'center',
	width: '100%',
}));

export const SmallButton = styled(Button)(
	({ theme }) => `
      width: 62px;
      height: 22px;
      font-size: 12px;
      border-radius: 3px;
      display: flex;
      justify-content: center;
      margin: ${theme.spacing(0, 0.3)}
    `
);

export const CardHeading = styled(Box)(
	({ theme }) => `
		display: flex;
		justify-content: space-between;
    align-items: center;
    padding: 0 0 ${theme.spacing(1)} 0;
	`
);

export const NodeDisplayWrapper = styled(Box)(
	({ theme }) => `
		display: flex;
		justify-content: space-between;
		flex-direction: column;
		margin-top: ${theme.spacing(2)};
    height: 245px;
    background-color: transparent;
	`
);
