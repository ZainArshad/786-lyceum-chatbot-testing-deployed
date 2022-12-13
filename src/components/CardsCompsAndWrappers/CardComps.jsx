import PropTypes from 'prop-types';
import { styled, useTheme } from '@mui/material';
import { useTranslation } from 'next-i18next';
import { LoadingButton } from 'src/components/shared/Buttons';

export const CardButton = styled(LoadingButton)(() => ({
	minWidth: '90px',
	height: '36px',
	displat: 'flex',
	alignItems: 'center',
	justifyContent: 'center',
}));

export const CardIconButton = ({
	text,
	color = 'secondary',
	icon,
	...rest
}) => {
	const theme = useTheme();
	const { t } = useTranslation();
	return (
		<CardButton
			startIcon={icon}
			variant="outlined"
			color={color}
			size="small"
			sx={{
				fontSize: {
					lg: theme.typography.boody1,
					xs: theme.typography.subtitle1,
				},
				mx: theme.spacing(0.2),
				my: { xs: theme.spacing(0.5) },
			}}
			{...rest}
		>
			{t(text)}
		</CardButton>
	);
};

CardIconButton.propTypes = {
	text: PropTypes.string.isRequired,
	color: PropTypes.string,
	icon: PropTypes.element,
};
