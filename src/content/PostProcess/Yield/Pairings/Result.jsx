import { Box, Stack, Tab, Tabs, useTheme } from '@mui/material';
import React, { useState, useContext } from 'react';
import { useTranslation } from 'next-i18next';
import { shallowEqual, useSelector } from 'react-redux';
import {
	selectPairingForGroup,
	selectResultForGroup,
} from 'src/slices/postProcessing/yield';
import { YieldInstanceContext } from '../../context';
import { YieldBarGraph } from './YieldBarGraph';
import { CpkGraph } from './CpkGraph';

export const Result = React.memo(() => {
	const [tabValue, setTabValue] = useState(0);
	const { t } = useTranslation();
	const { yieldId } = useContext(YieldInstanceContext);
	const theme = useTheme();

	const pairings = useSelector((state) => {
		const p = selectPairingForGroup(state, yieldId);
		const valid = p.filter((pp) => pp.inputs.category && pp.inputs.limit);
		const r = {};
		valid.forEach((v) => {
			r[v.id] = v;
		});
		return r;
	}, shallowEqual);

	const results = useSelector(
		(state) => selectResultForGroup(state, yieldId),
		shallowEqual
	);

	if (!results || results.length === 0) {
		return null;
	}

	return (
		<Box
			flex={1.25}
			sx={{
				background: '#F8F9FE',
				p: theme.spacing(2),
				borderRadius: theme.general.borderRadius,
			}}
		>
			<Stack spacing={2}>
				<Tabs onChange={(_, newVal) => setTabValue(newVal)} value={tabValue}>
					<Tab label={t('Yield')} />
					<Tab label={t('Cpk')} />
				</Tabs>
				<Box>
					{tabValue === 0 && (
						<YieldBarGraph results={results} pairings={pairings} />
					)}
					{tabValue === 1 && <CpkGraph results={results} pairings={pairings} />}
				</Box>
			</Stack>
		</Box>
	);
});
