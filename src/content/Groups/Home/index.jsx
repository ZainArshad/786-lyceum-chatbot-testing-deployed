import { Grid, Card } from '@mui/material';
import PropTypes from 'prop-types';
import { useState, useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';
import InviteModal from 'src/components/Modals/InviteModal';
import Loader from 'src/components/Loader';
import CreatePostCard from 'src/components/Posts/CreatePostCard';
import { useSnackbarNotifications } from 'src/hooks/useSnackbarNotifications';
import { queryKeys } from 'src/lib/constants/queries/index.js';
import { saveAsyncUserRole } from 'src/lib/helpers/localStorage';
import { makeGroupsRequest } from 'src/services/api/groups/groups.request.js';
import { useRouter } from 'next/router';
import { AnalyzerContent } from 'src/content/Analyzer/AnalyzerContent';
import GroupInfo from '../GroupInfo';
import InvitationRequestsListCard from '../InvitationRequestsList';

export function GroupComponent({ setGroupname }) {
	const [modalOpen, setModalOpen] = useState(false);
	const { showErrorSnackbar } = useSnackbarNotifications();
	const [searchTerm, setSearchTerm] = useState('');
	const [waitForSavingLocally, setWaitForSavingLocally] = useState(true);

	const router = useRouter();
	let group_id = router.query.groupId;

	const { isLoading, data, isError } = useQuery([queryKeys.GET_GROUP], () => {
		return makeGroupsRequest.get_group(group_id);
	});

	const { isLoading: inviteListLoaded, data: inviteList } = useQuery(
		[queryKeys.GET_INVITE_LIST, searchTerm],
		() => {
			return makeGroupsRequest.get_invite_list(searchTerm, group_id);
		},
		{
			staleTime: 30000,
			keepPreviousData: true,
		}
	);

	if (isError) {
		showErrorSnackbar(
			'Something went wrong! Information provided is not correct'
		);
	}

	const handleClose = () => {
		setModalOpen(false);
	};

	useEffect(() => {
		if (!isLoading) {
			setGroupname(data?.data?.group_name);
			saveAsyncUserRole(
				data?.data?.user_role == null ? 'MEMBER' : data?.data?.user_role,
				group_id
			);
			setWaitForSavingLocally(false);
		}
	}, [data]);

	return !isLoading && !waitForSavingLocally ? (
		<Grid
			container
			spacing={0.25}
			sx={{ marginLeft: '1.5%', marginRight: '1.5%' }}
		>
			{!inviteListLoaded && (
				<InviteModal
					modalOpen={modalOpen}
					handleClose={handleClose}
					inviteList={inviteList?.data?.results}
					groupId={group_id}
					setSearchTerm={setSearchTerm}
				/>
			)}
			<Grid item xs={12}>
				<GroupInfo
					setModalOpen={setModalOpen}
					data={data?.data}
					id={group_id}
					user_role={
						data?.data?.user_role == null ? 'MEMBER' : data?.data?.user_role
					}
				/>
			</Grid>
			{/* <Grid item xs={6}>
				<GroupsCard
					title="Admins"
					members={data?.data?.members}
					check="ADMIN"
					owner="OWNER"
					group_id={group_id}
				/>
			</Grid>
			<Grid item xs={6}>
				<GroupsCard
					title="Members"
					members={data?.data?.members}
					check="MEMBER"
					owner=""
					group_id={group_id}
				/>
					</Grid> */}
			{data?.data?.user_role.localeCompare('OWNER') === 0 && (
				<Grid item xs={12}>
					<InvitationRequestsListCard group_id={group_id} />
				</Grid>
			)}
			<CreatePostCard />
			<Grid item xs={12} sx={{ mt: 3, mb: 3 }}>
				<Card sx={{ mb: 1 }}>
					<AnalyzerContent groupId={group_id} />
				</Card>
			</Grid>
			{/* <GroupTabs /> */}
		</Grid>
	) : (
		<Loader />
	);
}

GroupComponent.propTypes = {
	setGroupname: PropTypes.func.isRequired,
};
