import React from 'react';
import { useSelector, useDispatch } from 'src/store';
import { useTranslation } from 'next-i18next';
import { Center } from 'src/components/shared/wrappers';
import _ from 'lodash';
import { useTheme } from '@mui/material';
import { Button } from 'src/components/shared/Buttons';
import { selectIsProcessing } from 'src/slices/pinboard/dataProcessing/pinnedDataSlice';
import {
	addDefaultGraph,
	selectPPGraphNames,
} from 'src/slices/postProcessing/graphs';
import { GraphInstanceProvider } from '../context';
import { GraphSession } from './GraphSession';
import { useSession } from '../hooks/useSession';

export const GraphContent = React.memo(() => {
	const dispatch = useDispatch();
	const { t } = useTranslation();
	const { isOwner } = useSession();
	const theme = useTheme();

	const isProcessing = useSelector(selectIsProcessing);
	const graphNames = useSelector(selectPPGraphNames, (a, b) => {
		return _.keys(a).length === _.keys(b).length;
	});

	const handleAddDefaultGraph = () => dispatch(addDefaultGraph());

	const sortedGraphNames = _.sortBy(
		_.entries(graphNames),
		(a) => a[1].createdAt
	);

	return (
		<>
			{sortedGraphNames.map(([graphId]) => (
				<GraphInstanceProvider key={graphId} gid={graphId}>
					<GraphSession />
				</GraphInstanceProvider>
			))}
			{isOwner && (
				<Center>
					<Button
						onClick={handleAddDefaultGraph}
						sx={{ my: theme.spacing(2) }}
						disabled={!isProcessing}
					>
						{t('Add Graph')}
					</Button>
				</Center>
			)}
		</>
	);
});
