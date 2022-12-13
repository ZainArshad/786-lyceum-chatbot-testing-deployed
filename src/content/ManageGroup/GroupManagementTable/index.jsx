import { Grid, Button, Typography } from '@mui/material';
import { useTranslation } from 'react-i18next';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { queryKeys } from 'src/lib/constants/queries/index.js';
import { makeGroupsRequest } from 'src/services/api/groups/groups.request.js';
import { useSnackbarNotifications } from 'src/hooks/useSnackbarNotifications';
import { useQuery } from '@tanstack/react-query';
import Loader from 'src/components/Loader';
import GroupSetup from '../GroupSetup';

function GroupManagementTable() {
	const { t } = useTranslation();
	const { showErrorSnackbar } = useSnackbarNotifications();

	const href = window.location.href;
	let group_id = href.split('/');
	group_id = group_id[group_id.length - 1];
	const { isLoading, data, isError } = useQuery(
		[queryKeys.GET_GROUP],
		() => {
			return makeGroupsRequest.get_group(group_id);
		},
		{
			staleTime: 30000,
		}
	);

	if (isError) {
		showErrorSnackbar(
			'Something went wrong! Information provided is not correct'
		);
	}

	return !isLoading ? (
		<Grid container justifyContent="space-between" alignItems="center">
			<Grid item>
				<Typography variant="h2" component="h2" gutterBottom>
					{t('Manage Group')}
				</Typography>
			</Grid>
			<Grid item>
				<Button
					sx={{
						mt: { xs: 2, sm: 0 },
					}}
					variant="contained"
					startIcon={<ArrowBackIcon fontSize="small" />}
					href={`/group/${data?.data?.id}`}
				>
					{t('Back to Group')}
				</Button>
			</Grid>
			<Grid item xs={12}>
				<GroupSetup data={data?.data} />
			</Grid>
		</Grid>
	) : (
		<Loader />
	);
}

export default GroupManagementTable;
