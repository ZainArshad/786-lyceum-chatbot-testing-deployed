import { useState, useCallback, Fragment } from 'react';
import { useTranslation } from 'react-i18next';
import { SearchBar as SearchBarComponent } from 'src/components/Forms/SearchBar';
import { PageBodyWrapper, Center } from 'src/components/shared/wrappers';
import { LoadingButton } from 'src/components/shared/Buttons';
import { getQueryParamsFromURL, time } from 'src/lib/helpers/shared';
import { Si6maLoader } from 'src/components/shared/Loaders';
import { useInfiniteQuery } from '@tanstack/react-query';
import { makeAccountRequest } from 'src/services/api/account';
import { queryKeys } from 'src/lib/constants/queries';
import { Box, Grid } from '@mui/material';
import { EmptyData } from 'src/components/EmptyData';
import ColleaguesCard from '../ColleaguesCard';

export const SearchColleagues = () => {
	const [searchTerm, setSearchTerm] = useState('');
	const {
		data,
		isError,
		isLoading,
		fetchStatus,
		fetchNextPage,
		hasNextPage,
		isFetchingNextPage,
	} = useInfiniteQuery(
		[
			queryKeys.SEARCH_USERS_TO_FOLLOW,
			{
				search: searchTerm,
				limit: 12,
				offset: 0,
			},
		],
		makeAccountRequest.searchUsers,
		{
			enabled: searchTerm.length > 0,
			getNextPageParam: (lastPage) => {
				const lastPageData = lastPage?.data;
				const nextPageUrl = lastPageData?.next;
				const nextPageUrlParams = getQueryParamsFromURL(nextPageUrl);
				return nextPageUrlParams ?? undefined;
			},
			getPreviousPageParam: (firstPage) => {
				const firstPageData = firstPage?.data;
				const prevPage = firstPageData?.previous;
				const prevPageParams = getQueryParamsFromURL(prevPage);
				return prevPageParams ?? undefined;
			},
			staleTime: time.minutesToMilliseconds(5),
			cacheTime: time.secondsToMilliseconds(30),
		}
	);

	const { t } = useTranslation();

	const handleSearch = useCallback((val) => {
		if (val) {
			setSearchTerm(val);
		} else {
			setSearchTerm('');
		}
	}, []);

	const handleBlur = (currentVal) => {
		if (!currentVal) {
			handleSearch('');
		}
	};

	const renderBody = () => {
		if (fetchStatus === 'idle' && !searchTerm) {
			return (
				<Center>
					<p>{t('Search for colleagues')}</p>
				</Center>
			);
		}
		if (isLoading && fetchStatus !== 'idle') {
			return (
				<Box my={2}>
					<Si6maLoader />
				</Box>
			);
		}
		if (isError) {
			return <Center>{t('error')}</Center>;
		}
		if (data?.pages[0]?.data.results.length === 0) {
			return (
				<Center my={3}>
					<EmptyData />
				</Center>
			);
		}

		return (
			<Grid container spacing={1.5}>
				{data?.pages?.map((page) => (
					<Fragment key={page?.data.next}>
						{page?.data.results.map((user) => (
							<Grid item key={user.email} xs={12} md={6} lg={3} xl={2.4}>
								<ColleaguesCard user={user} />
							</Grid>
						))}
					</Fragment>
				))}
			</Grid>
		);
	};

	return (
		<PageBodyWrapper>
			<SearchBarComponent
				onSearch={handleSearch}
				defaultValue=""
				placeholder={t('Search Collegues')}
				handleBlur={handleBlur}
				enableReturn
			/>
			<Box py={2}>{renderBody()}</Box>
			{hasNextPage && (
				<Center>
					<LoadingButton
						loading={isFetchingNextPage}
						onClick={() => fetchNextPage()}
					>
						{t('Load More')}
					</LoadingButton>
				</Center>
			)}
		</PageBodyWrapper>
	);
};
