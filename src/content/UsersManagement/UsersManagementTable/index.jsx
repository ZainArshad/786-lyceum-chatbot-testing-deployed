import { useState, useEffect, useCallback } from 'react';
import { Grid, Typography, Button } from '@mui/material';
import { useTranslation } from 'react-i18next';
import { useRefMounted } from 'src/hooks/useRefMounted';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { usersApi } from 'src/mocks/users';
import { queryKeys } from 'src/lib/constants/queries/index.js';
import { makeGroupsRequest } from 'src/services/api/groups';
import { useQuery } from '@tanstack/react-query';
import Loader from 'src/components/Loader';
import { getSavedUserGroupRole } from 'src/lib/helpers/localStorage';
import Results from './Results';

function UsersManagementTable() {
	const [searchTerm, setSearchTerm] = useState('');
	const [pageNo, setPageNo] = useState(1);
	const [groupRole, setGroupRole] = useState('');
	const [visitingUserRole, setVisitingUserRole] = useState('MEMBER');
	const [waitForGettingValueLocally, setWaitForGettingValueLocally] =
		useState(true);
	let group_id = window.location.href.split('/');
	group_id = group_id[group_id.length - 1].split('?')[0];

	useEffect(() => {
		setGroupRole(window.location.href.split('=')[1]);
	}, []);

	const { data, isFetching } = useQuery(
		[queryKeys.GET_GROUP_USERS_LIST, pageNo, searchTerm, groupRole],
		() => {
			return makeGroupsRequest.get_group_users_list(
				pageNo - 1,
				searchTerm,
				groupRole,
				group_id
			);
		},
		{
			staleTime: 30000,
			keepPreviousData: true,
		}
	);

	const { t } = useTranslation();
	const isMountedRef = useRefMounted();
	const [, setUsers] = useState([]);

	const getUsers = useCallback(async () => {
		try {
			const response = await usersApi.getUsers();

			if (isMountedRef()) {
				setUsers(response);
			}
		} catch (err) {
			console.error(err);
		}
	}, [isMountedRef]);

	useEffect(() => {
		getUsers();
		setVisitingUserRole(getSavedUserGroupRole(group_id));
		setWaitForGettingValueLocally(false);
	}, [getUsers]);

	return (
		<Grid container justifyContent="space-between" alignItems="center">
			<Grid item>
				<Typography variant="h2" component="h2" gutterBottom>
					{t('Users Management')}
				</Typography>
				<Typography variant="subtitle1">
					{t('All aspects related to group users can be managed from here')}
				</Typography>
			</Grid>
			<Grid item>
				<Button
					sx={{
						mt: { xs: 2, sm: 0 },
						fontSize: 'small',
					}}
					variant="contained"
					size="medium"
					startIcon={<ArrowBackIcon fontSize="small" />}
					href={`/group/${group_id}`}
				>
					{t('Back to Group')}
				</Button>
			</Grid>

			<Grid item xs={12}>
				{!isFetching && !waitForGettingValueLocally ? (
					<Results
						users={data?.data?.results}
						count={data?.data?.count}
						groupRole={groupRole}
						setGroupRole={setGroupRole}
						isLoading={isFetching}
						setPageNo={setPageNo}
						page={pageNo}
						group_id={group_id}
						setSearchTerm={setSearchTerm}
						visitingUserRole={visitingUserRole}
					/>
				) : (
					<Loader />
				)}
			</Grid>
		</Grid>
	);
}

export default UsersManagementTable;
