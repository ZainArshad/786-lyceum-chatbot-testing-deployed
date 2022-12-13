import { Box } from '@mui/material';
import PropTypes from 'prop-types';
import React, { useEffect } from 'react';
import { useInView } from 'react-intersection-observer';
import { EmptyData } from 'src/components/EmptyData';
import { LoadingButton } from 'src/components/shared/Buttons';
import { Si6maLoader } from 'src/components/shared/Loaders';
import { Center } from 'src/components/shared/wrappers';
import { getQueryParamsFromURL, time } from 'src/lib/helpers/shared';
import { useInfiniteQuery } from '@tanstack/react-query';
import { queryKeys } from 'src/lib/constants/queries';
import { makeSessionRequest } from 'src/services/api/session';
import { useTranslation } from 'next-i18next';
import { SessionsCard } from './SessionsCard';

export const SessionsList = ({ searchTerm }) => {
	const { t } = useTranslation();
	const {
		data: sessions,
		isLoading: isSessionLoading,
		isError: isSessionLoadingError,
		fetchNextPage,
		hasNextPage,
		isFetchingNextPage,
	} = useInfiniteQuery(
		[
			queryKeys.LIST_USER_SESSIONS,
			{
				search: searchTerm,
				limit: 10,
				offset: 0,
			},
		],
		makeSessionRequest.listSessions,
		{
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
			staleTime: time.minutesToMilliseconds(2),
		}
	);
	const [ref, inView] = useInView();

	useEffect(() => {
		if (inView) {
			fetchNextPage();
		}
	}, [inView]);

	if (isSessionLoading) return <Si6maLoader />;
	if (isSessionLoadingError) return <Box>Error</Box>;
	if (sessions.pages[0]?.data.results.length === 0) return <EmptyData />;

	return (
		<Box>
			{sessions.pages?.map((page) => (
				<React.Fragment key={page?.data.next}>
					{page?.data.results.map((session) => (
						<SessionsCard key={session.id} session={session} />
					))}
				</React.Fragment>
			))}
			{hasNextPage && (
				<Center ref={ref}>
					<LoadingButton
						loading={isFetchingNextPage}
						onClick={() => fetchNextPage()}
					>
						{t('Load More')}
					</LoadingButton>
				</Center>
			)}
		</Box>
	);
};

SessionsList.propTypes = {
	searchTerm: PropTypes.string,
};
