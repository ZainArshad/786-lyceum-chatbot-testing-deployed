import { Box, Tab, Tabs, useTheme } from '@mui/material';
import { useTranslation } from 'next-i18next';
import { useState } from 'react';
import { DottedDivider } from 'src/components/shared';
import { Center, FlexApart } from 'src/components/shared/wrappers';
import { StatisticsContent } from './Statistics';
import { GraphContent } from './Graphs';
import { YieldContent } from './Yield';

export const PostProcessBody = () => {
	const { t } = useTranslation();
	const theme = useTheme();
	const [tabValue, setTabValue] = useState(0);

	return (
		<>
			<FlexApart>
				<Tabs
					variant="scrollable"
					value={tabValue}
					onChange={(_, newVal) => setTabValue(newVal)}
					scrollButtons
				>
					<Tab label={t('Graphs')} />
					<Tab label={t('Statistics')} />
					<Tab label={t('Gage R&R')} />
					<Tab label={t('Yield')} />
				</Tabs>
			</FlexApart>
			<DottedDivider sx={{ my: theme.spacing(2) }} />
			{/* Graphs Tab */}
			<Box
				component="section"
				sx={{ display: tabValue === 0 ? 'block' : 'none' }}
			>
				<GraphContent />
			</Box>
			{/* Statistics Tab */}
			<Box
				component="section"
				sx={{ display: tabValue === 1 ? 'block' : 'none' }}
			>
				<StatisticsContent />
			</Box>
			{/* Gage R&R Tab */}
			<Box
				component="section"
				sx={{
					display: tabValue === 2 ? 'block' : 'none',
				}}
			>
				<Center>
					<h1>{t('Gage R&R Coming Soon')}</h1>
				</Center>
			</Box>
			{/* Yield Tab */}
			<Box
				component="section"
				sx={{
					display: tabValue === 3 ? 'block' : 'none',
				}}
			>
				<YieldContent />
			</Box>
		</>
	);
};
