import ArrowRightAltIcon from '@mui/icons-material/ArrowRightAlt';
import PropTypes from 'prop-types';
import KeyboardBackspaceIcon from '@mui/icons-material/KeyboardBackspace';
import { Box, useTheme } from '@mui/material';
import _ from 'lodash';
import { useTranslation } from 'next-i18next';
import { useRouter } from 'next/router';
import { useContext } from 'react';
import { Button } from 'src/components/shared/Buttons';
import { steps as dataInjestorSteps } from 'src/components/Stepper/Items/DataInjestorStepper';
import { DataInjestorContext } from 'src/contexts/DataInjestorContext';

export const DataInjestorFormControls = ({
	disableNext = false,
	disableBack = false,
	onNext = () => {},
	onBack = () => {},
}) => {
	const theme = useTheme();
	const { t } = useTranslation();
	const router = useRouter();

	const { dataInjState, setActiveStep } = useContext(DataInjestorContext);
	const { formControls } = dataInjState;

	const isLastStep = formControls.activeStep === dataInjestorSteps.length - 1;

	const isNextDisabled = () => {
		if (formControls.activeStep === 0) {
			return (
				!dataInjState.fileUpload.file || !dataInjState.fileUpload.nameOrTitle
			);
		}
		if (formControls.activeStep === 1) {
			return (
				!dataInjState.documentType.fileType ||
				!dataInjState.documentType.dataType
			);
		}
		if (formControls.activeStep === 2) {
			return (
				!dataInjState.tags.length === 0 ||
				_.some(dataInjState.descriptors, function (descriptor) {
					return !descriptor.descriptor || !descriptor.value;
				})
			);
		}
	};

	return (
		<Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
			{formControls.activeStep !== 0 && (
				<Button
					sx={{ width: '119px', mr: theme.spacing(1) }}
					color="secondary"
					onClick={() => {
						onBack();
						setActiveStep((prev) => prev - 1);
					}}
					disabled={disableBack}
				>
					<KeyboardBackspaceIcon />
					{t('Back')}
				</Button>
			)}
			<Button
				sx={{ width: '180px', ml: theme.spacing(1) }}
				color="primary"
				disabled={disableNext || isNextDisabled()}
				variant="contained"
				onClick={() => {
					onNext();
					if (isLastStep) {
						router.push('/data-ingestor/?stage=clean', '/data-ingestor/clean');
					} else {
						setActiveStep((prev) => {
							if (prev === dataInjestorSteps.length - 1) return prev;
							return prev + 1;
						});
					}
				}}
				type="submit"
			>
				{isLastStep ? t('Clean Now') : t('Next')}
				<ArrowRightAltIcon />
			</Button>
		</Box>
	);
};

DataInjestorFormControls.propTypes = {
	disableNext: PropTypes.bool,
	disableBack: PropTypes.bool,
	onNext: PropTypes.func,
	onBack: PropTypes.func,
};
