import { Box, Stack } from '@mui/material';
import React, { useContext } from 'react';
import { useSelector } from 'src/store';
import { selectPairingForGroup } from 'src/slices/postProcessing/yield';
import { YieldInstanceContext } from 'src/content/PostProcess/context';
import { GroupPairingContent } from './GroupPairingContent';

export const GroupPairings = React.memo(() => {
	const { yieldId } = useContext(YieldInstanceContext);
	const pairings = useSelector(
		(state) => selectPairingForGroup(state, yieldId),
		(a, b) => a.length === b.length
	);

	return (
		<Box my={2}>
			<Stack spacing={2}>
				{pairings.map((pair) => (
					<GroupPairingContent key={pair.id} pairingId={pair.id} />
				))}
			</Stack>
		</Box>
	);
});
