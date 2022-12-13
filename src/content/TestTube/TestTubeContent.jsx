import { Box, Tab, Tabs, useTheme, Button } from '@mui/material';

import { useRouter } from 'next/router';
import { useCallback, useEffect, useState } from 'react';
import { SearchBar } from 'src/components/Forms/SearchBar';
import { BrickBodyCtn } from 'src/components/shared/wrappers';
import { useTranslation } from 'next-i18next';
import { VideosList } from './VideosList';

export const allowedTestTubeTabs = [
	'all',
	'procedures',
	'my procedures',
	'simulation',
	'sessions',
];

export const TestTubeContent = () => {
	const theme = useTheme();
	const { t } = useTranslation();

	const router = useRouter();
	const { tab, search } = router.query;
	const [tabValue, setTabValue] = useState(0);
	const [, setSearchTerm] = useState('');

	useEffect(() => {
		if (!router.isReady) return;
		if (!tab || !allowedTestTubeTabs.includes(tab)) {
			addOrUpdateRouterQueryParam({ tab: 'all' });
		} else {
			setTabValue(allowedTestTubeTabs.indexOf(tab));
		}
		if (search) setSearchTerm(search);
	}, [router.isReady, router.query.tab]);

	const handleTabChange = (_event, newValue) => {
		let q = 'all';
		switch (newValue) {
			case 1:
				q = 'procedures';
				break;
			case 2:
				q = 'my procedures';
				break;
			case 3:
				q = 'simulation';
				break;
			case 4:
				q = 'sessions';
				break;
			default:
				q = '';
		}
		setTabValue(newValue);
		addOrUpdateRouterQueryParam({ tab: q });
	};

	const handleSearch = useCallback((val) => {
		if (val) {
			setSearchTerm(val);
		} else {
			setSearchTerm('');
			removeRouterQueryParam('search');
		}
	}, []);

	const addOrUpdateRouterQueryParam = (queryParamObj) => {
		router.replace(
			{
				pathname: router.pathname,
				query: {
					...router.query,
					...queryParamObj,
				},
			},
			undefined,
			{ shallow: true }
		);
	};

	const removeRouterQueryParam = (queryParam) => {
		if (!router.query[queryParam]) return;
		const query = { ...router.query };
		delete query[queryParam];
		router.replace(
			{
				pathname: router.pathname,
				query,
			},
			undefined,
			{ shallow: true }
		);
	};

	const handleBlur = (currentVal) => {
		if (!currentVal) {
			handleSearch('');
		}
	};

	return (
		<>
			<SearchBar
				onSearch={handleSearch}
				defaultValue={search}
				handleBlur={handleBlur}
				enableReturn
			/>
			<BrickBodyCtn>
				<Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
					<Tabs
						sx={{ flex: 1 }}
						variant="scrollable"
						value={tabValue}
						onChange={handleTabChange}
						scrollButtons
					>
						<Tab label="All" />
						<Tab label="Procedures" />
						<Tab label="My Procedures" />
					</Tabs>
					<Button color="primary" variant="contained">
						{t('Create New')}
					</Button>
				</Box>
				<Box sx={{ py: theme.spacing(3) }}>
					{tabValue <= 3 && <VideosList tab={1} searchTerm="" />}
				</Box>
			</BrickBodyCtn>
		</>
	);
};
