/* eslint react/prop-types: 0 */ // --> OFF | @Zain please take care of this
import { useState, useCallback } from 'react';
import PropTypes from 'prop-types';
import {
	Avatar,
	Box,
	Card,
	Divider,
	Tooltip,
	AvatarGroup,
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableContainer,
	TableRow,
	Typography,
	useTheme,
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import { useTranslation } from 'react-i18next';
import LaunchTwoToneIcon from '@mui/icons-material/LaunchTwoTone';
import { SearchBar as SearchBarComponent } from 'src/components/Forms/SearchBar';
import Loader from 'src/components/Loader';
import {
	Center,
	FlexApart,
	PageBodyWrapper,
} from 'src/components/shared/wrappers';
import { PageHeading } from 'src/components/shared/Typography';
import { EmptyData } from 'src/components/EmptyData';
import Link from 'src/components/Link';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { makeGroupsRequest } from 'src/services/api/groups';
import { useAuth } from 'src/hooks/useAuth';
import { queryKeys } from 'src/lib/constants/queries';
import { useSnackbarNotifications } from 'src/hooks/useSnackbarNotifications';
import { Button } from 'src/components/shared/Buttons';
import Pagination from '@mui/material/Pagination';

export const GroupsPageContent = ({
	projects,
	setPageNo,
	page,
	setSearchTerm,
	isLoading,
	me,
}) => {
	const [selectedItems] = useState([]);
	const { user } = useAuth();
	const { t } = useTranslation();
	const { showSuccessSnackbar, showErrorSnackbar } = useSnackbarNotifications();
	const queryClient = useQueryClient();
	const theme = useTheme();

	const handleSearch = useCallback((val) => {
		if (val) {
			setSearchTerm(val);
		} else {
			setSearchTerm('');
		}
	}, []);

	const { mutate: addMember, isLoading: addingMember } = useMutation(
		(id) => {
			return makeGroupsRequest.add_member(id, {
				members: [{ user: user.id, group_role: 'MEMBER' }],
			});
		},
		{
			onSuccess: () => {
				showSuccessSnackbar('Member Added!');
				return queryClient.invalidateQueries([queryKeys.GET_GROUPS_LIST]);
			},
			onError: () => {
				showErrorSnackbar('Something went wrong! Try again');
			},
		}
	);

	const { mutate: requestToJoin } = useMutation(
		(id) => {
			return makeGroupsRequest.request_to_join_private_group(id);
		},
		{
			onSuccess: () => {
				showSuccessSnackbar('Request Sent!');
				return queryClient.invalidateQueries([queryKeys.GET_GROUPS_LIST]);
			},
			onError: () => {
				showErrorSnackbar('Something went wrong! Try again');
			},
		}
	);

	const handleBlur = (currentVal) => {
		if (!currentVal) {
			handleSearch('');
		}
	};

	const handlePageChange = (_event, newPage) => {
		setPageNo(newPage);
	};

	return (
		<PageBodyWrapper>
			<FlexApart>
				{me ? (
					<PageHeading> {t('Groups')}</PageHeading>
				) : (
					<>
						<PageHeading> {t('Groups')}</PageHeading>
						<Link
							sx={{ textDecoration: 'none !important' }}
							href="/create-group"
						>
							<Button startIcon={<AddIcon />}>{t('Create Group')}</Button>
						</Link>
					</>
				)}
			</FlexApart>
			<Box mb={2}>
				<SearchBarComponent
					onSearch={handleSearch}
					defaultValue=""
					handleBlur={handleBlur}
					enableReturn
				/>
			</Box>
			{!isLoading ? (
				<Card>
					<Box p={2}>
						<Typography component="span" variant="subtitle1">
							{t('Showing ')}:{' '}
							<b>
								{projects?.results.length}
								{t(' group(s)')}
							</b>
						</Typography>
					</Box>
					<Divider />
					{projects?.results.length === 0 ? (
						<Center my={5}>
							<EmptyData />
						</Center>
					) : (
						<>
							<TableContainer>
								<Table>
									<TableHead>
										<TableRow>
											<TableCell>{t('Group Name')}</TableCell>
											<TableCell>{t('Tags')}</TableCell>
											<TableCell>{t('Administrator')}</TableCell>
											<TableCell>{t('Members')}</TableCell>
											<TableCell align="center">{t('Actions')}</TableCell>
										</TableRow>
									</TableHead>
									<TableBody>
										{projects?.results.map((project, i) => {
											const isProjectSelected = selectedItems.includes(
												project.id
											);
											return (
												<TableRow hover key={i} selected={isProjectSelected}>
													<TableCell>
														<Typography noWrap variant="h5">
															{project.group_name}
														</Typography>
													</TableCell>
													<TableCell>
														{project.tags !== undefined &&
															project.tags.length > 0 &&
															project.tags.map((value) => {
																return (
																	<span key={value.name}>
																		{value.name}
																		{', '}
																	</span>
																);
															})}
													</TableCell>
													<TableCell align="left">
														<Box display="flex" justifyContent="flex-start">
															{project.members.length > 0 && (
																<AvatarGroup max={5}>
																	{project.members.map((member, b) =>
																		member.group_role.localeCompare('ADMIN') ===
																			0 ||
																		member.group_role.localeCompare('OWNER') ===
																			0 ? (
																			<Tooltip
																				arrow
																				placement="top"
																				key={b}
																				title={member?.user?.first_name}
																			>
																				<Avatar
																					sx={{
																						width: 30,
																						height: 30,
																					}}
																					key={`${b} admin`}
																					alt={member?.user?.first_name}
																					src={member?.user?.profile_image}
																				/>
																			</Tooltip>
																		) : null
																	)}
																</AvatarGroup>
															)}
														</Box>
													</TableCell>
													<TableCell>
														{project.members.length > 0 && (
															<AvatarGroup max={5}>
																{project.members.map((member, b) =>
																	member.group_role.localeCompare('MEMBER') ===
																	0 ? (
																		<Tooltip
																			arrow
																			placement="top"
																			key={b}
																			title={member.user.first_name}
																		>
																			<Avatar
																				sx={{
																					width: 30,
																					height: 30,
																				}}
																				key={`${b} member`}
																				alt={member?.user?.first_name}
																				src={member?.user?.profile_image}
																			/>
																		</Tooltip>
																	) : null
																)}
															</AvatarGroup>
														)}
													</TableCell>
													<TableCell
														align="center"
														sx={{ display: 'flex', justifyContent: 'center' }}
													>
														<Typography noWrap>
															{project?.is_public && !project?.joined ? (
																<Button
																	onClick={() => {
																		addMember(project.id);
																	}}
																	disabled={addingMember}
																	sx={{ fontSize: theme.typography.body1 }}
																>
																	{t('Join')}
																</Button>
															) : !project?.is_public && !project?.joined ? (
																!project?.requested ? (
																	<Button
																		color="warning"
																		onClick={() => {
																			requestToJoin(project.id);
																		}}
																		sx={{ fontSize: theme.typography.body1 }}
																	>
																		{t('Request')}
																	</Button>
																) : (
																	<Button
																		color="secondary"
																		sx={{ fontSize: theme.typography.body1 }}
																	>
																		{t('Request Sent')}
																	</Button>
																)
															) : (
																<Tooltip title={t('View')} arrow>
																	<Link
																		href={{
																			pathname: `group/${project.id}`,
																		}}
																		target="_blank"
																	>
																		<Button
																			sx={{ fontSize: theme.typography.body1 }}
																		>
																			<LaunchTwoToneIcon fontSize="small" />
																		</Button>
																	</Link>
																</Tooltip>
															)}
														</Typography>
													</TableCell>
												</TableRow>
											);
										})}
									</TableBody>
								</Table>
							</TableContainer>
							<Box p={2} sx={{ display: 'flex', justifyContent: 'center' }}>
								<Pagination
									count={Math.ceil(projects.count / 5)}
									onChange={handlePageChange}
									page={page}
								/>
							</Box>
						</>
					)}
				</Card>
			) : (
				<Loader />
			)}
		</PageBodyWrapper>
	);
};

GroupsPageContent.propTypes = {
	projects: PropTypes.object.isRequired,
};

GroupsPageContent.defaultProps = {
	projects: {},
};
