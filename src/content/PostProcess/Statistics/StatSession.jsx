import { Box, Step, StepLabel, Stepper, Typography } from '@mui/material';
import React, { useContext } from 'react';
import { FlexApart } from 'src/components/shared/wrappers';
import { useTranslation } from 'next-i18next';
import { useSelector } from 'src/store';
import { selectPPStatBoxMath } from 'src/slices/postProcessing/statistics';
import { shallowEqual } from 'react-redux';
import { shouldShowArrangementStep } from 'src/lib/helpers/statistics';
import { GraphSessionContainer } from '../components';
import { StatBoxName } from './StatBoxName';
import { StatOptionsPanel } from './StatOptionsPanel';
import { MathsContent, NodesContent, SaveContent } from './StepsContent';
import { ArrangeContent } from './StepsContent/ArrangeContent';
import { ppgraphPanelHeight } from '../constants';
import { StatFlowContext } from '../context/StatFlowContext';
import { StatInstanceContext } from '../context';

export const StatSession = () => {
	const {
		statFlowState: { formControls },
	} = useContext(StatFlowContext);
	const { t } = useTranslation();
	const { statId } = useContext(StatInstanceContext);
	const mathsSelections = useSelector(selectPPStatBoxMath, (left, right) => {
		return shallowEqual(left[statId], right[statId]);
	})[statId];

	return (
		<GraphSessionContainer mb={2}>
			<FlexApart>
				<StatBoxName />
				<StatOptionsPanel />
			</FlexApart>
			<Stepper activeStep={formControls.activeStep} sx={{ my: 1, px: 2 }}>
				<Step>
					<StepLabel>
						<Typography variant="caption">{t('Math')}</Typography>
					</StepLabel>
				</Step>
				<Step>
					<StepLabel>
						<Typography variant="caption">{t('Nodes')}</Typography>
					</StepLabel>
				</Step>
				{shouldShowArrangementStep(
					mathsSelections.func,
					mathsSelections.operation
				) && (
					<Step>
						<StepLabel>
							<Typography variant="caption">{t('Arrange')}</Typography>
						</StepLabel>
					</Step>
				)}
				<Step>
					<StepLabel>
						<Typography variant="caption">{t('Save')}</Typography>
					</StepLabel>
				</Step>
			</Stepper>
			<Box sx={{ minHeight: ppgraphPanelHeight }}>
				{formControls.activeStep === 0 && <MathsContent />}
				{formControls.activeStep === 1 && <NodesContent />}
				{formControls.activeStep === 2 && <ArrangeContent />}
				{formControls.activeStep === 3 && <SaveContent />}
			</Box>
		</GraphSessionContainer>
	);
};
