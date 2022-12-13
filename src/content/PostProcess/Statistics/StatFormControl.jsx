import React, { useContext } from 'react';
import KeyboardBackspaceIcon from '@mui/icons-material/KeyboardBackspace';
import ArrowRightAltIcon from '@mui/icons-material/ArrowRightAlt';
import PropTypes from 'prop-types';
import { FlexEnd } from 'src/components/shared/wrappers';
import { Button } from 'src/components/shared/Buttons';
import { useTranslation } from 'next-i18next';
import _ from 'lodash';
import { StatFlowContext } from '../context/StatFlowContext';

export const StatFormControl = ({
	disableNext = false,
	disableBack = false,
	onNext = () => true,
	onBack = () => true,
}) => {
	const { t } = useTranslation();
	const {
		statFlowState: { formControls },
		setActiveStep,
	} = useContext(StatFlowContext);
	const isLastStep = formControls.activeStep === 3;

	return (
		<FlexEnd gap={3}>
			{formControls.activeStep !== 0 && (
				<Button
					sx={{ width: '119px' }}
					color="secondary"
					onClick={async () => {
						const goBack = await onBack();
						if (goBack) {
							setActiveStep(
								(prev) => prev + (_.isNumber(goBack) ? -1 * goBack : -1)
							);
						}
					}}
					disabled={disableBack}
				>
					<KeyboardBackspaceIcon />
					{t('Back')}
				</Button>
			)}
			{!isLastStep && (
				<Button
					sx={{ minWidth: '160px' }}
					onClick={async () => {
						const goNext = await onNext();
						if (goNext) {
							setActiveStep((prev) => prev + (_.isNumber(goNext) ? goNext : 1));
						}
					}}
					disabled={disableNext}
					type="submit"
				>
					{t('Next')} <ArrowRightAltIcon />
				</Button>
			)}
		</FlexEnd>
	);
};

StatFormControl.propTypes = {
	disableNext: PropTypes.bool,
	disableBack: PropTypes.bool,
	onNext: PropTypes.func,
	onBack: PropTypes.func,
};
