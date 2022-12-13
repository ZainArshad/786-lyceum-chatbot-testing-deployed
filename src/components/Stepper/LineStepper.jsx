import Check from '@mui/icons-material/Check';
import Stack from '@mui/material/Stack';
import Step from '@mui/material/Step';
import StepConnector, {
	stepConnectorClasses,
} from '@mui/material/StepConnector';
import StepLabel from '@mui/material/StepLabel';
import Stepper from '@mui/material/Stepper';
import { styled } from '@mui/material/styles';
import PropTypes from 'prop-types';
import * as React from 'react';

const QontoConnector = styled(StepConnector)(({ theme }) => ({
	[`&.${stepConnectorClasses.alternativeLabel}`]: {
		top: 10,
		left: 'calc(-50% + 16px)',
		right: 'calc(50% + 16px)',
	},
	[`&.${stepConnectorClasses.active}`]: {
		[`& .${stepConnectorClasses.line}`]: {
			borderColor: '#784af4',
		},
	},
	[`&.${stepConnectorClasses.completed}`]: {
		[`& .${stepConnectorClasses.line}`]: {
			borderColor: '#784af4',
		},
	},
	[`& .${stepConnectorClasses.line}`]: {
		borderColor:
			theme.palette.mode === 'dark' ? theme.palette.grey[800] : '#eaeaf0',
		borderTopWidth: 3,
		borderRadius: 1,
	},
}));

const QontoStepIconRoot = styled('div')(({ theme, ownerState }) => ({
	color: theme.palette.mode === 'dark' ? theme.palette.grey[700] : '#eaeaf0',
	display: 'flex',
	height: 22,
	alignItems: 'center',
	...(ownerState.active && {
		color: '#784af4',
	}),
	'& .QontoStepIcon-completedIcon': {
		color: '#784af4',
		zIndex: 1,
		fontSize: 18,
	},
	'& .QontoStepIcon-circle': {
		width: 8,
		height: 8,
		borderRadius: '50%',
		backgroundColor: 'currentColor',
	},
}));

function QontoStepIcon(props) {
	const { active, completed, className } = props;

	return (
		<QontoStepIconRoot ownerState={{ active }} className={className}>
			{completed ? (
				<Check className="QontoStepIcon-completedIcon" />
			) : (
				<div className="QontoStepIcon-circle" />
			)}
		</QontoStepIconRoot>
	);
}

QontoStepIcon.propTypes = {
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
};

export function LineStepper({
	activeStep,
	steps,
	renderIcons = false,
	...rest
}) {
	return (
		<Stack sx={{ width: '100%', backgroundColor: 'transparent' }} spacing={4}>
			<Stepper
				alternativeLabel
				activeStep={activeStep}
				connector={<QontoConnector />}
				{...rest}
			>
				{steps.map((step) => (
					<Step key={step.label}>
						<StepLabel
							icon={renderIcons ? step.icon : null}
							StepIconComponent={QontoStepIcon}
						>
							{step.label}
						</StepLabel>
					</Step>
				))}
			</Stepper>
		</Stack>
	);
}

LineStepper.propTypes = {
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
	 * @default false
	 */
	renderIcons: PropTypes.bool,
};
