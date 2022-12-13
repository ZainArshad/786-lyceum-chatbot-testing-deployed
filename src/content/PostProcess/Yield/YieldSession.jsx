import React, { useContext } from 'react';
import { Box, Stack, Typography, useTheme } from '@mui/material';
import { useTranslation } from 'next-i18next';
import { useDispatch } from 'src/store';
import { LoadingButton } from 'src/components/shared/Buttons';
import { Center, FlexApart, FlexEnd } from 'src/components/shared/wrappers';
import { addPairing } from 'src/slices/postProcessing/yield';
import { GraphSessionContainer } from '../components';
import { YieldOptionsPanel } from './YieldOptionsPanel';
import { YieldBoxName } from './YieldSessionName';
import { YieldInstanceContext } from '../context';
import { GroupPairings } from './Pairings';
import { useYieldProcessing } from '../hooks/useYieldProcessing';
import { Result } from './Pairings/Result';

export const YieldSession = () => {
	const theme = useTheme();
	const { yieldId } = useContext(YieldInstanceContext);
	const { processYield, loading, error } = useYieldProcessing(yieldId);
	const { t } = useTranslation();
	const dispatch = useDispatch();

	const handleAddNewPairing = () => {
		dispatch(addPairing({ yieldId }));
	};

	return (
		<Box as="section">
			<GraphSessionContainer mb={2}>
				<FlexApart>
					<YieldBoxName />
					<YieldOptionsPanel />
				</FlexApart>
				<Stack direction="row" width="100%" spacing={2}>
					<Box flex={1}>
						<GroupPairings />
					</Box>
					<Result />
				</Stack>
				<Center gap={2}>
					<LoadingButton
						onClick={handleAddNewPairing}
						sx={{ my: theme.spacing(2) }}
						size="small"
						loading={loading}
					>
						{t('Add Pairing')}
					</LoadingButton>
					<LoadingButton
						onClick={processYield}
						sx={{ my: theme.spacing(2) }}
						size="small"
						loading={loading}
					>
						{t('Calculate')}
					</LoadingButton>
				</Center>
				{error && (
					<FlexEnd>
						<Typography color="error" variant="caption">
							{error}
						</Typography>
					</FlexEnd>
				)}
			</GraphSessionContainer>
		</Box>
	);
};
