/* eslint react/prop-types: 0 */ // --> OFF | @Zain please take care of this
import { Fragment, useState, useCallback } from 'react';
import {
	Box,
	ListItemAvatar,
	ListItemText,
	Divider,
	List,
	Card,
	Typography,
	Avatar,
	styled,
	ListItem,
	Grid,
} from '@mui/material';
import { LoadingButton } from 'src/components/shared/Buttons';
import { useTranslation } from 'react-i18next';
import Scrollbar from 'src/components/Scrollbar';
import ThumbUpOffAltIcon from '@mui/icons-material/ThumbUpOffAlt';
import ThumbDownOffAltIcon from '@mui/icons-material/ThumbDownOffAlt';
import { makeGroupsRequest } from 'src/services/api/groups/groups.request.js';
import { queryKeys } from 'src/lib/constants/queries';
import {
	useInfiniteQuery,
	useMutation,
	useQueryClient,
} from '@tanstack/react-query';
import { SearchBar as SearchBarComponent } from 'src/components/Forms/SearchBar';
import Pagination from '@mui/material/Pagination';
import Loader from 'src/components/Loader';
import { useSnackbarNotifications } from 'src/hooks/useSnackbarNotifications';

const GCard = styled(Card)(
	({ theme }) => `
      margin-left:1%;  
      margin-top:2.5%;
      margin-bottom:2.5%;
      height:425px;
      border-radius: ${theme.general.borderRadiusSm};
      border: 1px solid ${theme.colors.alpha.black[10]};
`
);

function InvitationRequestsListCard({ group_id }) {
	const { t } = useTranslation();
	const [page, setPageNo] = useState(1);
	const [searchTerm, setSearchTerm] = useState('');
	const { showSuccessSnackbar, showErrorSnackbar } = useSnackbarNotifications();
	const queryClient = useQueryClient();

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

	const handlePageChange = (_event, newPage) => {
		setPageNo(newPage);
	};

	const { isLoading, data } = useInfiniteQuery(
		[queryKeys.GET_INVITATION_LIST, page, searchTerm],
		() => {
			return makeGroupsRequest.private_group_joinning_requests_list(
				page - 1,
				searchTerm,
				group_id
			);
		}
	);

	const { mutate: acceptInvitation } = useMutation(
		(obj) => {
			return makeGroupsRequest.accept_private_group_invitation(
				obj.group_id,
				obj.invitaion_id
			);
		},
		{
			onSuccess: () => {
				showSuccessSnackbar('Request Accepted!');
				queryClient.invalidateQueries([queryKeys.GET_INVITATION_LIST]);
			},
			onError: () => {
				showErrorSnackbar('Error! Please Try Again');
			},
		}
	);

	const { mutate: rejectInvitation } = useMutation(
		(obj) => {
			return makeGroupsRequest.reject_private_group_invitation(
				obj.group_id,
				obj.invitaion_id
			);
		},
		{
			onSuccess: (_data) => {
				showSuccessSnackbar('Request Rejected!');
				queryClient.invalidateQueries([queryKeys.GET_INVITATION_LIST]);
			},
			onError: (_data) => {
				showErrorSnackbar('Error! Please Try Again');
			},
		}
	);

	return (
		<GCard>
			<Typography
				variant="h4"
				sx={{ fontWeight: '700', fontSize: '18px', mt: 3, ml: 3 }}
			>
				{`${data?.pages[0]?.data?.count} ${t('Requests')}`}
			</Typography>
			<Grid container spacing={2} mt={2} mb={2}>
				<Grid item xs={12}>
					<Box p={1}>
						<SearchBarComponent
							onSearch={handleSearch}
							defaultValue=""
							handleBlur={handleBlur}
							enableReturn
						/>
					</Box>
				</Grid>
			</Grid>
			{!isLoading ? (
				<Scrollbar>
					<List disablePadding>
						{data?.pages[0]?.data?.results?.map((item, i) => (
							<Fragment key={i}>
								<Divider />
								<ListItem
									sx={{
										justifyContent: 'space-between',
										display: 'flex',
										py: 2,
										px: 2.5,
									}}
								>
									<ListItemAvatar
										sx={{
											minWidth: 'auto',
											mr: 2,
											mb: { xs: 2, sm: 0 },
										}}
									>
										<Avatar
											sx={{
												width: 42,
												height: 42,
											}}
											alt={item?.user?.first_name}
											src={item?.user?.profile_image}
										/>
									</ListItemAvatar>
									<ListItemText
										disableTypography
										primary={
											<Typography
												color="text.primary"
												variant="h5"
												sx={{ fontWeight: '400 !important' }}
											>
												{`${item?.user?.first_name} ${item?.user?.last_name}`}
											</Typography>
										}
									/>
									<Box display="flex" alignItems="end">
										<LoadingButton
											size="small"
											startIcon={<ThumbUpOffAltIcon />}
											sx={{
												fontWeight: 'normal',
												fontSize: '14px',
											}}
											onClick={() => {
												acceptInvitation({
													group_id,
													invitaion_id: item?.id,
												});
											}}
										>
											{t('Accept')}
										</LoadingButton>
										<LoadingButton
											size="small"
											color="secondary"
											startIcon={<ThumbDownOffAltIcon />}
											sx={{
												fontWeight: 'normal',
												fontSize: '14px',
												ml: 1.5,
											}}
											onClick={() => {
												rejectInvitation({
													group_id,
													invitaion_id: item?.id,
												});
											}}
										>
											{t('Decline')}
										</LoadingButton>
									</Box>
								</ListItem>
							</Fragment>
						))}
					</List>
					<Box p={2} sx={{ display: 'flex', justifyContent: 'center' }}>
						<Pagination
							count={
								data?.pages[0]?.data?.count
									? Math.ceil(data.pages[0].data.count / 5)
									: 0
							}
							onChange={handlePageChange}
							page={page}
						/>
					</Box>
				</Scrollbar>
			) : (
				<Loader />
			)}
		</GCard>
	);
}

export default InvitationRequestsListCard;
