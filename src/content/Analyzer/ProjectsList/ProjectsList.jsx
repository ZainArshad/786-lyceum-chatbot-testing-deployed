import { Box } from '@mui/material';
import { useTranslation } from 'next-i18next';
import PropTypes from 'prop-types';
import React, { useEffect } from 'react';
import { useInView } from 'react-intersection-observer';
import { EmptyData } from 'src/components/EmptyData';
import { LoadingButton } from 'src/components/shared/Buttons';
import { Si6maLoader } from 'src/components/shared/Loaders';
import { Center } from 'src/components/shared/wrappers';
import { getQueryParamsFromURL } from 'src/lib/helpers/shared';
import { usePojectListQuery } from 'src/queries/project';
import { DDCard } from '../DDCard';

export const ProjectsList = ({
	tab,
	searchTerm,
	allowedAnalyzerTabs,
	groupId,
	forUser,
}) => {
	const {
		data: projects,
		isLoading: isProjectLoading,
		isError: isProjectLoadingError,
		fetchNextPage,
		hasNextPage,
		isFetchingNextPage,
	} = usePojectListQuery(
		{
			data_type: tab === 0 ? null : allowedAnalyzerTabs[tab],
			search: searchTerm,
			limit: 10,
			offset: 0,
			groups__id: groupId,
			for_user: forUser,
		},
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
		}
	);
	const { t } = useTranslation();
	const [ref, inView] = useInView();

	useEffect(() => {
		if (inView) {
			fetchNextPage();
		}
	}, [inView]);

	if (isProjectLoading) return <Si6maLoader />;
	if (isProjectLoadingError) return <Box>Error</Box>;
	if (projects.pages[0]?.data.results.length === 0) return <EmptyData />;

	return (
		<Box>
			{projects.pages?.map((page) => (
				<React.Fragment key={page?.data.next}>
					{page?.data.results.map((project) => (
						<DDCard key={project.id} projectDetails={project} />
					))}
				</React.Fragment>
			))}
			{hasNextPage && (
				<Center ref={ref}>
					<LoadingButton
						variant="contained"
						loading={isFetchingNextPage}
						color="primary"
						onClick={() => fetchNextPage()}
					>
						{t('Load More')}
					</LoadingButton>
				</Center>
			)}
		</Box>
	);
};

ProjectsList.propTypes = {
	tab: PropTypes.number.isRequired,
	searchTerm: PropTypes.string,
	allowedAnalyzerTabs: PropTypes.arrayOf(PropTypes.string).isRequired,
	groupId: PropTypes.string,
	forUser: PropTypes.string,
};
