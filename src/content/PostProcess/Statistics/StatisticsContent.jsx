import React from 'react';
import { useSelector, useDispatch } from 'src/store';
import { useTranslation } from 'next-i18next';
import { Center } from 'src/components/shared/wrappers';
import _ from 'lodash';
import { useTheme } from '@mui/material';
import { Button } from 'src/components/shared/Buttons';
import {
	selectPPStatBoxNames,
	addDefaultStatBox,
} from 'src/slices/postProcessing/statistics';
import { selectIsProcessing } from 'src/slices/pinboard/dataProcessing/pinnedDataSlice';
import { StatFlowProvider, StatInstanceProvider } from '../context';
import { StatSession } from './StatSession';
import { useSession } from '../hooks/useSession';

export const StatisticsContent = React.memo(() => {
	const dispatch = useDispatch();
	const { t } = useTranslation();
	const { isOwner } = useSession();
	const theme = useTheme();

	const isProcessing = useSelector(selectIsProcessing);
	const statBoxNames = useSelector(selectPPStatBoxNames, (a, b) => {
		return _.keys(a).length === _.keys(b).length;
	});

	const handleAddDefaultStatBox = () => dispatch(addDefaultStatBox());

	const sortedStatBoxNames = _.sortBy(
		_.entries(statBoxNames),
		(a) => a[1].createdAt
	);

	return (
		<>
			{sortedStatBoxNames.map(([statId]) => (
				<StatInstanceProvider key={statId} statBoxId={statId}>
					<StatFlowProvider>
						<StatSession />
					</StatFlowProvider>
				</StatInstanceProvider>
			))}
			{isOwner && (
				<Center>
					<Button
						onClick={handleAddDefaultStatBox}
						sx={{ my: theme.spacing(2) }}
						disabled={!isProcessing}
					>
						{t('Add Stat Box')}
					</Button>
				</Center>
			)}
		</>
	);
});
