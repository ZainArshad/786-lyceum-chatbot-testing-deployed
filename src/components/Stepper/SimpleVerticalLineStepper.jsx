import { useTheme } from '@mui/material';
import Box from '@mui/material/Box';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import Stepper from '@mui/material/Stepper';
import PropTypes from 'prop-types';

export function SimpleVerticalLineStepper({ activeStep, steps }) {
	const theme = useTheme();
	return (
		<Box
			sx={{
				maxWidth: 400,
				display: 'flex',
				alignItems: 'center',
				justfyContent: 'flex-start',
				ml: theme.spacing(2),
				backgroundColor: theme.colors.rawColors.trueWhite,
			}}
		>
			<Stepper
				sx={{
					backgroundColor: theme.colors.rawColors.trueWhite,
					px: theme.spacing(2),
				}}
				activeStep={activeStep}
				orientation="vertical"
			>
				{steps.map((step, index) => (
					<Step key={index}>
						<StepLabel>{step.label}</StepLabel>
					</Step>
				))}
			</Stepper>
		</Box>
	);
}

SimpleVerticalLineStepper.propTypes = {
	activeStep: PropTypes.number.isRequired,
	steps: PropTypes.arrayOf(
		PropTypes.shape({
			label: PropTypes.string.isRequired,
		})
	).isRequired,
};
