import * as React from 'react';
import PropTypes from 'prop-types';
import { styled } from '@mui/material/styles';
import Stack from '@mui/material/Stack';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';

import StepConnector, {
	stepConnectorClasses,
} from '@mui/material/StepConnector';

const ColorlibConnector = styled(StepConnector)(({ theme }) => ({
	[`&.${stepConnectorClasses.alternativeLabel}`]: {
		top: 22,
	},
	[`&.${stepConnectorClasses.active}`]: {
		[`& .${stepConnectorClasses.line}`]: {
			backgroundColor: theme.colors.primary.light,
		},
	},
	[`&.${stepConnectorClasses.completed}`]: {
		[`& .${stepConnectorClasses.line}`]: {
			backgroundColor: theme.colors.primary.light,
		},
	},
	[`& .${stepConnectorClasses.line}`]: {
		height: 3,
		border: 0,
		backgroundColor: theme.colors.rawColors.secondaryL,
		borderRadius: 1,
	},
}));

const ColorlibStepIconRoot = styled('div')(({ theme, ownerState }) => ({
	backgroundColor: theme.colors.rawColors.secondaryL,
	border: `2px solid ${theme.colors.rawColors.secondaryL}`,
	color: theme.colors.rawColors.secondary,
	zIndex: 1,
	width: 51,
	height: 51,
	display: 'flex',
	borderRadius: '50%',
	justifyContent: 'center',
	alignItems: 'center',
	...(ownerState.active && {
		border: `2px solid ${theme.colors.primary.light}`,
		backgroundColor: theme.colors.rawColors.trueWhite,
		color: theme.colors.primary.light,
	}),
	...(ownerState.completed && {
		border: `2px solid ${theme.colors.primary.light}`,
		backgroundColor: theme.colors.rawColors.trueWhite,
		color: theme.colors.primary.light,
	}),
}));

function ColorlibStepIcon(props) {
	const { active, completed, className, icon } = props;

	return (
		<ColorlibStepIconRoot
			ownerState={{ completed, active }}
			className={className}
		>
			{icon}
		</ColorlibStepIconRoot>
	);
}

ColorlibStepIcon.propTypes = {
	/**
	 * Whether this step is active.
	 * @default false
	 */
	active: PropTypes.bool,
	className: PropTypes.string,
	/**
	 * Mark the step as completed. Is passed to child components.
	 * @default false
	 */
	completed: PropTypes.bool,
	/**
	 * The label displayed in the step icon.
	 */
	icon: PropTypes.node,
};

export function IconStepper({ activeStep, steps, renderIcons = true }) {
	return (
		<Stack
			sx={{
				width: '100%',
			}}
			spacing={4}
		>
			<Stepper
				alternativeLabel
				activeStep={activeStep}
				connector={<ColorlibConnector />}
			>
				{steps.map((step) => (
					<Step key={step.label}>
						<StepLabel
							icon={renderIcons ? step.icon : null}
							StepIconComponent={ColorlibStepIcon}
						>
							{step.label}
						</StepLabel>
					</Step>
				))}
			</Stepper>
		</Stack>
	);
}

IconStepper.propTypes = {
	/**
	 * currently active step
	 */
	activeStep: PropTypes.number.isRequired,
	steps: PropTypes.arrayOf(
		PropTypes.shape({
			label: PropTypes.string.isRequired,
			icon: PropTypes.node,
		})
	).isRequired,
	/**
	 * Whether show icons or step number
	 * @default true
	 */
	renderIcons: PropTypes.bool,
};
