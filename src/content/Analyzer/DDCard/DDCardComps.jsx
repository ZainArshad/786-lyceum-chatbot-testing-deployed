import { useTheme, styled, Typography } from '@mui/material';
import { useTranslation } from 'next-i18next';
import PropTypes from 'prop-types';
import { useState } from 'react';
import {
	MeasurementsIcon,
	LimitsIcon,
	SimulationIcon,
	SignalsIcon,
} from 'src/assets/svgs';
import { LoadingButton } from 'src/components/shared/Buttons';
import { Center } from 'src/components/shared/wrappers';
import { DATA_TYPES, ALLOWED_DATA_TYPES } from '../constants';

export const DDSignalIcon = ({ type }) => {
	const theme = useTheme();

	const getTypedIcon = () => {
		switch (type) {
			case DATA_TYPES.MEASUREMENT:
				return <MeasurementsIcon />;
			case DATA_TYPES.LIMIT:
				return <LimitsIcon />;
			case DATA_TYPES.SIMULATION:
				return <SimulationIcon />;
			default:
				return <SignalsIcon />;
		}
	};

	return (
		<Center
			sx={{
				backgroundColor: theme.palette.common.white,
				width: theme.typography.pxToRem(60),
				height: theme.typography.pxToRem(60),
				borderRadius: theme.general.borderRadiusLg,
				border: `1px solid ${theme.palette.secondary.lightest}`,
			}}
		>
			{getTypedIcon()}
		</Center>
	);
};

DDSignalIcon.propTypes = {
	type: PropTypes.oneOf(ALLOWED_DATA_TYPES),
};

export const DDCardButton = styled(LoadingButton)(() => ({
	minWidth: '90px',
	height: '36px',
	displat: 'flex',
	alignItems: 'center',
	justifyContent: 'center',
}));

export const DDAnalyzeButton = ({ text, icon, ...rest }) => {
	const theme = useTheme();
	const { t } = useTranslation();
	return (
		<DDCardButton
			startIcon={icon}
			variant="outlined"
			color="secondary"
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
		</DDCardButton>
	);
};

DDAnalyzeButton.propTypes = {
	text: PropTypes.string.isRequired,
	icon: PropTypes.node,
};

export const TruncatedList = ({ contentList, showMax = 3 }) => {
	const theme = useTheme();
	const { t } = useTranslation();
	const [showFull, setShowFull] = useState(false);
	let content = contentList;

	if (Array.isArray(contentList)) {
		const tags = contentList.slice(0, showMax);
		content = (
			<Typography
				variant="h4"
				sx={{
					display: 'flex',
					alignItems: 'center',
					flexWrap: 'wrap',
				}}
			>
				{showFull ? contentList.join(', ') : tags.join(', ')}
				{tags.length < contentList.length ? (
					<Typography
						variant="h4"
						sx={{
							color: theme.colors.rawColors.fontSecondary,
							'&:hover': {
								textDecoration: 'underline',
								cursor: 'pointer',
							},
							ml: theme.spacing(0.5),
						}}
						onClick={() => setShowFull((prev) => !prev)}
					>
						{!showFull
							? `, ... ${contentList.length - tags.length} ${t('more')}`
							: t('show less')}
					</Typography>
				) : (
					''
				)}
			</Typography>
		);
	}

	return content;
};
