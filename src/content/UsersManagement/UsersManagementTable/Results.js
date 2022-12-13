/* eslint react/prop-types: 0 */ // --> OFF | @Zain please take care of this
import { useState, forwardRef, useCallback } from 'react';

import { useRouter } from 'next/router';
import PropTypes from 'prop-types';
import {
	Avatar,
	Box,
	Card,
	Slide,
	Menu,
	MenuItem,
	Divider,
	Tooltip,
	IconButton,
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableContainer,
	TableRow,
	Tab,
	Tabs,
	Button,
	Typography,
	Dialog,
	Zoom,
	styled,
} from '@mui/material';
import Link from 'src/components/Link';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';

import CloseIcon from '@mui/icons-material/Close';

import { useTranslation } from 'react-i18next';
import LaunchTwoToneIcon from '@mui/icons-material/LaunchTwoTone';
import Label from 'src/components/Label';
import DeleteTwoToneIcon from '@mui/icons-material/DeleteTwoTone';
import { useSnackbar } from 'notistack';
import { SearchBar as SearchBarComponent } from 'src/components/Forms/SearchBar';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { makeGroupsRequest } from 'src/services/api/groups';
import { queryKeys } from 'src/lib/constants/queries';
import Pagination from '@mui/material/Pagination';

const DialogWrapper = styled(Dialog)(
	() => `
      .MuiDialog-paper {
        overflow: visible;
      }
`
);

const AvatarError = styled(Avatar)(
	({ theme }) => `
      background-color: ${theme.colors.error.lighter};
      color: ${theme.colors.error.main};
      width: ${theme.spacing(12)};
      height: ${theme.spacing(12)};

      .MuiSvgIcon-root {
        font-size: ${theme.typography.pxToRem(45)};
      }
`
);

const ButtonError = styled(Button)(
	({ theme }) => `
     background: ${theme.colors.error.main};
     color: ${theme.palette.error.contrastText};

     &:hover {
        background: ${theme.colors.error.dark};
     }
    `
);

const TabsWrapper = styled(Tabs)(
	({ theme }) => `
    @media (max-width: ${theme.breakpoints.values.md}px) {
      .MuiTabs-scrollableX {
        overflow-x: auto !important;
      }

      .MuiTabs-indicator {
          box-shadow: none;
      }
    }
    `
);

const Transition = forwardRef(function Transition(props, ref) {
	return <Slide direction="down" ref={ref} {...props} />;
});

const getUserRoleLabel = (userRole) => {
	const map = {
		ADMIN: {
			text: 'Administrator',
			color: 'error',
		},
		MEMBER: {
			text: 'Member',
			color: 'success',
		},
		OWNER: {
			text: 'Owner',
			color: 'warning',
		},
	};

	const { text, color } = map[userRole];

	return <Label color={color}>{text}</Label>;
};

const Results = ({
	users,
	groupRole,
	setGroupRole,
	isLoading,
	setPageNo,
	page,
	setSearchTerm,
	count,
	group_id,
	visitingUserRole,
}) => {
	const [userId, setRemovingUserId] = useState('');
	const [selectedTab, setSelectedTab] = useState(groupRole);
	const { t } = useTranslation();
	const { enqueueSnackbar } = useSnackbar();
	const router = useRouter();
	const queryClient = useQueryClient();

	const { mutate: removeMember } = useMutation(
		() => {
			return makeGroupsRequest.remove_user_from_group(group_id, userId);
		},
		{
			onSuccess: () => {
				setOpenConfirmDelete(false);
				enqueueSnackbar(t('The user has been removed successfully'), {
					variant: 'success',
					anchorOrigin: {
						vertical: 'bottom',
						horizontal: 'right',
					},
					TransitionComponent: Zoom,
				});
				return queryClient.invalidateQueries([queryKeys.GET_GROUP_USERS_LIST]);
			},
			onError: () => {
				enqueueSnackbar(t('Something went wrong!'), {
					variant: 'error',
					anchorOrigin: {
						vertical: 'bottom',
						horizontal: 'right',
					},
					TransitionComponent: Zoom,
				});
				setOpenConfirmDelete(false);
			},
		}
	);

	const { mutate: changeMemberRole } = useMutation(
		(obj) => {
			return makeGroupsRequest.change_user_role_in_group(
				group_id,
				obj.user_id,
				obj.role
			);
		},
		{
			onSuccess: () => {
				setOpenConfirmDelete(false);
				enqueueSnackbar(t('The user role has been changed successfully'), {
					variant: 'success',
					anchorOrigin: {
						vertical: 'bottom',
						horizontal: 'right',
					},
					TransitionComponent: Zoom,
				});
				return queryClient.invalidateQueries([queryKeys.GET_GROUP_USERS_LIST]);
			},
			onError: () => {
				enqueueSnackbar(t('Something went wrong!'), {
					variant: 'error',
					anchorOrigin: {
						vertical: 'bottom',
						horizontal: 'right',
					},
					TransitionComponent: Zoom,
				});
				setOpenConfirmDelete(false);
			},
		}
	);

	const changeUserRoleFunc = (user_id, role) => {
		changeMemberRole({ user_id, role: { group_role: role } });
	};

	const handleDeleteCompleted = () => {
		removeMember();
	};

	const checkUserRole = (role) => {
		if (role.localeCompare('ADMIN') === 0) {
			return true;
		}
		return false;
	};

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

	const tabs = [
		{
			value: '',
			label: t('All users'),
		},
		{
			value: 'ADMIN',
			label: t('Administrators'),
		},
		{
			value: 'MEMBER',
			label: t('Members'),
		},
	];

	const [anchorEl, setAnchorEl] = useState([null]);

	const handleActionClick = (id, event) => {
		const anchorEls = [...anchorEl];
		anchorEls[id] = event.target;
		setAnchorEl(anchorEls);
	};

	const handleClose = (id) => {
		const anchorEls = [...anchorEl];
		anchorEls[id] = null;
		setAnchorEl(anchorEls);
	};

	const handlePageChange = (_event, newPage) => {
		setPageNo(newPage);
	};

	const [openConfirmDelete, setOpenConfirmDelete] = useState(false);

	const handleConfirmDelete = (id) => {
		setOpenConfirmDelete(true);
		setRemovingUserId(id);
	};

	const closeConfirmDelete = () => {
		setOpenConfirmDelete(false);
	};

	const CheckPermissions = (role) => {
		if (
			visitingUserRole.localeCompare('OWNER') === 0 &&
			visitingUserRole.localeCompare(role) !== 0
		) {
			return 0;
		}
		if (
			visitingUserRole.localeCompare('ADMIN') === 0 &&
			role.localeCompare('MEMBER') === 0
		) {
			return 0;
		}

		return 1;
	};

	return (
		<>
			<Box
				display="flex"
				alignItems="center"
				flexDirection={{ xs: 'column', sm: 'row' }}
				justifyContent={{ xs: 'center', sm: 'space-between' }}
				pb={3}
				mt={5}
			>
				<TabsWrapper
					onChange={(e, tab) => {
						setPageNo(1);
						setSelectedTab(tab);
						setGroupRole(tab);
						router.push(`${window.location.href.split('?')[0]}?tab=${tab}`);
					}}
					scrollButtons="auto"
					textColor="secondary"
					value={selectedTab}
					variant="scrollable"
				>
					{tabs.map((tab) => (
						<Tab key={tab.value} value={tab.value} label={tab.label} />
					))}
				</TabsWrapper>
			</Box>
			<Card>
				<Box p={2}>
					<SearchBarComponent
						onSearch={handleSearch}
						defaultValue=""
						handleBlur={handleBlur}
						enableReturn
					/>
				</Box>

				<Divider />

				{!isLoading &&
					(users.length === 0 ? (
						<Typography
							sx={{
								py: 10,
							}}
							variant="h4"
							fontWeight="normal"
							color="text.secondary"
							align="center"
						>
							{t("We couldn't find any users matching your search criteria")}
						</Typography>
					) : (
						<>
							<TableContainer>
								<Table>
									<TableHead>
										<TableRow>
											<TableCell>{t('Username')}</TableCell>
											<TableCell>{t('Name')}</TableCell>
											<TableCell>{t('Email')}</TableCell>
											<TableCell>{t('Role')}</TableCell>
											<TableCell align="center">{t('Actions')}</TableCell>
										</TableRow>
									</TableHead>
									<TableBody>
										{users.map((user) => {
											return (
												<TableRow hover key={user?.user?.id}>
													<TableCell>
														<Typography variant="h5">
															{user?.user?.first_name}
														</Typography>
													</TableCell>
													<TableCell>
														<Box display="flex" alignItems="center">
															<Avatar
																sx={{
																	mr: 1,
																}}
																src={user?.user?.profile_image}
															/>
															<Box>
																<Link
																	variant="h5"
																	href={`/user/${user?.user?.id}`}
																	target="_blank"
																>
																	{user?.user?.first_name}
																</Link>
															</Box>
														</Box>
													</TableCell>
													<TableCell>
														<Typography>{user?.user?.email}</Typography>
													</TableCell>
													<TableCell>
														{getUserRoleLabel(user?.group_role)}
													</TableCell>
													<TableCell align="center">
														<Typography noWrap>
															{user?.group_role.localeCompare('OWNER') !== 0 &&
																CheckPermissions(user?.group_role) !== 1 && (
																	<Tooltip title={t('Change Role')} arrow>
																		<IconButton
																			key={user?.user?.id}
																			onClick={(e) =>
																				handleActionClick(user?.user?.id, e)
																			}
																			aria-controls={
																				anchorEl[user?.user?.id]
																					? 'demo-positioned-menu'
																					: undefined
																			}
																			aria-haspopup="true"
																			aria-expanded={
																				anchorEl[user?.user?.id]
																					? 'true'
																					: undefined
																			}
																		>
																			<MoreHorizIcon fontSize="small" />
																		</IconButton>
																	</Tooltip>
																)}
															<Tooltip title={t('View')} arrow>
																<Link
																	variant="h5"
																	href={`/user/${user?.user?.id}`}
																	target="_blank"
																>
																	<IconButton color="primary">
																		<LaunchTwoToneIcon fontSize="small" />
																	</IconButton>
																</Link>
															</Tooltip>
															{user?.group_role.localeCompare('OWNER') !== 0 &&
																CheckPermissions(user?.group_role) !== 1 && (
																	<Tooltip title={t('Delete')} arrow>
																		<IconButton
																			onClick={() => {
																				handleConfirmDelete(user?.user?.id);
																			}}
																			color="error"
																		>
																			<DeleteTwoToneIcon fontSize="small" />
																		</IconButton>
																	</Tooltip>
																)}
														</Typography>
														<Menu
															id="demo-positioned-menu"
															key={user?.user?.id}
															aria-labelledby="demo-positioned-button"
															anchorEl={anchorEl[user?.user?.id]}
															open={Boolean(anchorEl[user?.user?.id])}
															onClose={(e) => handleClose(user?.user?.id, e)}
															getContentAnchorEl={null}
															anchorOrigin={{
																vertical: 'top',
																horizontal: 'right',
															}}
															transformOrigin={{
																vertical: 'top',
																horizontal: 'right',
															}}
														>
															{!checkUserRole(user?.group_role, user) && (
																<MenuItem
																	sx={{ position: 'relative' }}
																	key={`${user?.user?.id} Admin`}
																	onClick={(e) => {
																		handleClose(user?.user?.id, e);
																		changeUserRoleFunc(user?.user?.id, 'ADMIN');
																	}}
																>
																	{t('Admin')}
																</MenuItem>
															)}
															{checkUserRole(user?.group_role, user) && (
																<MenuItem
																	onClick={(e) => {
																		handleClose(user?.user?.id, e);
																		changeUserRoleFunc(
																			user?.user?.id,
																			'MEMBER'
																		);
																	}}
																	key={`${user?.user?.id} Member`}
																>
																	{t('Member')}
																</MenuItem>
															)}
														</Menu>
													</TableCell>
												</TableRow>
											);
										})}
									</TableBody>
								</Table>
							</TableContainer>
							<Box p={2} sx={{ justifyContent: 'center', display: 'flex' }}>
								<Pagination
									count={Math.ceil(count / 5)}
									onChange={handlePageChange}
									page={page}
								/>
							</Box>
						</>
					))}
			</Card>
			<DialogWrapper
				open={openConfirmDelete}
				maxWidth="sm"
				fullWidth
				TransitionComponent={Transition}
				keepMounted
				onClose={closeConfirmDelete}
			>
				<Box
					display="flex"
					alignItems="center"
					justifyContent="center"
					flexDirection="column"
					p={5}
				>
					<AvatarError>
						<CloseIcon />
					</AvatarError>

					<Typography
						align="center"
						sx={{
							py: 4,
							px: 6,
						}}
						variant="h3"
					>
						{t('Are you sure you want to remove this user account')}?
					</Typography>

					<Box>
						<Button
							variant="text"
							size="large"
							sx={{
								mx: 1,
							}}
							onClick={closeConfirmDelete}
						>
							{t('Cancel')}
						</Button>
						<ButtonError
							onClick={handleDeleteCompleted}
							size="large"
							sx={{
								mx: 1,
								px: 3,
							}}
							variant="contained"
						>
							{t('Delete')}
						</ButtonError>
					</Box>
				</Box>
			</DialogWrapper>
		</>
	);
};

Results.propTypes = {
	users: PropTypes.array.isRequired,
};

Results.defaultProps = {
	users: [],
};

export default Results;
