import PropTypes from 'prop-types';
import { useState } from 'react';
import { PageContentWrapper } from 'src/components/styled';
import Pinboard from 'src/components/Pinboard/Pinboard';
import { makeGroupsRequest } from 'src/services/api/groups/groups.request.js';
import { queryKeys } from 'src/lib/constants/queries/index.js';
import { useQuery } from '@tanstack/react-query';
import { Si6maLoader } from 'src/components/shared/Loaders';
import { Center } from 'src/components/shared/wrappers';
import { time } from 'src/lib/helpers/shared';
import { GroupsPageContent } from './GroupsContent';

export function GroupsPage({ me }) {
	const [pageNo, setPageNo] = useState(1);
	const [searchTerm, setSearchTerm] = useState('');

	const { isLoading, data, isError, isFetching } = useQuery(
		[queryKeys.GET_GROUPS_LIST, pageNo, searchTerm],
		() => {
			return makeGroupsRequest.get_groups_list(pageNo - 1, searchTerm, me);
		},
		{
			staleTime: time.secondsToMilliseconds(30),
			keepPreviousData: true,
		}
	);

	if (isError) {
		<Center>Error</Center>;
	}

	return (
		<PageContentWrapper>
			{!isLoading ? (
				<GroupsPageContent
					projects={data?.data}
					setPageNo={setPageNo}
					page={pageNo}
					setSearchTerm={setSearchTerm}
					isLoading={isFetching}
					me={me}
				/>
			) : (
				<Si6maLoader />
			)}
			<Pinboard />
		</PageContentWrapper>
	);
}

GroupsPage.propTypes = {
	me: PropTypes.bool,
};
