import TuneIcon from '@mui/icons-material/Tune';
import PropTypes from 'prop-types';
import { Box, IconButton, Tab, Tabs, useTheme } from '@mui/material';
import { useRouter } from 'next/router';
import { useCallback, useEffect, useState } from 'react';
import { SearchBar } from 'src/components/Forms/SearchBar';
import { BrickBodyCtn } from 'src/components/shared/wrappers';
import { ProjectsList } from './ProjectsList';
import { SessionsList } from './SessionsList';

export const allowedAnalyzerTabs = [
	'all',
	'measurement',
	'limit',
	'simulation',
	'sessions',
];

export const AnalyzerContent = ({ groupId, forUser }) => {
	const theme = useTheme();
	const router = useRouter();
	const { tab, search } = router.query;
	const [tabValue, setTabValue] = useState(0);
	const [searchTerm, setSearchTerm] = useState('');

	useEffect(() => {
		if (!router.isReady) return;
		if (!tab || !allowedAnalyzerTabs.includes(tab)) {
			addOrUpdateRouterQueryParam({ tab: 'all' });
		} else {
			setTabValue(allowedAnalyzerTabs.indexOf(tab));
		}
		if (search) setSearchTerm(search);
	}, [router.isReady, router.query.tab]);

	const handleTabChange = (_event, newValue) => {
		let q;
		switch (newValue) {
			case 1:
				q = 'measurement';
				break;
			case 2:
				q = 'limit';
				break;
			case 3:
				q = 'simulation';
				break;
			case 4:
				q = 'sessions';
				break;
			default:
				q = 'all';
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
						<Tab label="Measurements" />
						<Tab label="Limits" />
						<Tab label="Simulations" />
						<Tab label="Sessions" />
					</Tabs>
					<IconButton
						sx={{
							color: theme.colors.alpha.black[50],
							backgroundColor: theme.colors.rawColors.secondaryL,
						}}
						aria-label="filter"
						onClick={() => {}}
					>
						<TuneIcon />
					</IconButton>
				</Box>
				<Box sx={{ py: theme.spacing(3) }}>
					{tabValue <= 3 ? (
						<ProjectsList
							tab={tabValue}
							searchTerm={searchTerm}
							allowedAnalyzerTabs={allowedAnalyzerTabs}
							groupId={groupId}
							forUser={forUser}
						/>
					) : (
						<SessionsList tab={tabValue} searchTerm={searchTerm} />
					)}
				</Box>
			</BrickBodyCtn>
		</>
	);
};

AnalyzerContent.defaultProps = {
	groupId: '',
	forUser: '',
};

AnalyzerContent.propTypes = {
	groupId: PropTypes.string,
	forUser: PropTypes.string,
};
