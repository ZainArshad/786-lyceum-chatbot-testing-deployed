/* eslint react/prop-types: 0 */ // --> OFF | @Zain please take care of this
import { useState, forwardRef } from 'react';
import {
	Typography,
	Box,
	Grid,
	Link,
	IconButton,
	styled,
	lighten,
	Dialog,
	Avatar,
	Slide,
	Zoom,
} from '@mui/material';
import { useTranslation } from 'react-i18next';
import PeopleAltOutlinedIcon from '@mui/icons-material/PeopleAltOutlined';
import { Interweave } from 'interweave';
import ProfileCover from 'src/components/CardCover';

import DeleteTwoToneIcon from '@mui/icons-material/DeleteTwoTone';
import { useMutation } from '@tanstack/react-query';
import { makeGroupsRequest } from 'src/services/api/groups';
import { useRouter } from 'next/router';
import { useSnackbar } from 'notistack';
import CloseIcon from '@mui/icons-material/Close';
import { Button } from 'src/components/shared/Buttons';
import ArrowRightAltIcon from '@mui/icons-material/ArrowRightAlt';

const Transition = forwardRef(function Transition(props, ref) {
	return <Slide direction="down" ref={ref} {...props} />;
});

function GroupInfo({ setModalOpen, data, id, user_role }) {
	const owner = data?.members.filter((d) => {
		return d.group_role.localeCompare('OWNER') === 0;
	});

	const { t } = useTranslation();
	const router = useRouter();

	const DialogWrapper = styled(Dialog)(
		() => `
        .MuiDialog-paper {
          overflow: visible;
        }
  `
	);

	const IconButtonError = styled(IconButton)(
		({ theme }) => `
       background: ${theme.colors.error.lighter};
       color: ${theme.colors.error.main};
       padding: ${theme.spacing(0.75)};
       margin-right: 1.5%;
       font-weight: 400;
       font-size: 12px;
       width: 111px;
       height: 40px;
  
       &:hover {
        background: ${lighten(theme.colors.error.lighter, 0.4)};
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

	const [openConfirmDelete, setOpenConfirmDelete] = useState(false);
	const { enqueueSnackbar } = useSnackbar();

	const {
		mutate: deletGroupFunction,
		isLoading: hasDeleted,
		isError,
	} = useMutation(
		(id) => {
			return makeGroupsRequest.delete_group(id);
		},
		{
			onSuccess: () => {
				router.push('/groups');
			},
		}
	);

	const handleConfirmDelete = () => {
		setOpenConfirmDelete(true);
	};

	const closeConfirmDelete = () => {
		setOpenConfirmDelete(false);
	};

	const handleDeleteCompleted = () => {
		deletGroupFunction(id);

		if (!hasDeleted && !isError) {
			enqueueSnackbar(t('The group has been deleted successfully'), {
				variant: 'success',
				anchorOrigin: {
					vertical: 'bottom',
					horizontal: 'right',
				},
				TransitionComponent: Zoom,
			});
			setOpenConfirmDelete(false);
		}

		if (isError) {
			enqueueSnackbar(t('Something went wrong!'), {
				variant: 'error',
				anchorOrigin: {
					vertical: 'bottom',
					horizontal: 'right',
				},
				TransitionComponent: Zoom,
			});
			setOpenConfirmDelete(false);
		}
	};

	return (
		<>
			<Box>
				<Grid container>
					<Grid item xs={12}>
						<ProfileCover user={{ data }} />
					</Grid>
					<Grid item xs={12}>
						<Box
							sx={{
								display: 'flex',
								justifyContent: 'space-between',
								alignItems: 'center',
							}}
						>
							<Typography
								variant="h2"
								component="h2"
								gutterBottom
								sx={{ fontWeight: '400' }}
							>
								{/* eslint-disable-next-line no-unsafe-optional-chaining */}
								{data?.group_name}
							</Typography>
							<Link href={`/users-management/${id}?tab=`} target="_blank">
								<Button
									size="small"
									variant="contained"
									sx={{ fontWeight: '400', fontSize: '12px', height: '40px' }}
									endIcon={<ArrowRightAltIcon />}
								>
									{t('View All Members')}
								</Button>
							</Link>
						</Box>
					</Grid>
					<Grid item xs={12}>
						<Typography
							variant="subtitle2"
							sx={{
								color: '#141414',
								fontSize: '14px',
								fontWeight: '400',
							}}
						>
							{/* eslint-disable-next-line no-unsafe-optional-chaining */}
							{t('Total Members ') + data?.members.length}
						</Typography>
						<Box sx={{ width: '100%', display: 'flex', justifyContent: 'end' }}>
							{user_role.localeCompare('MEMBER') !== 0 ? (
								<Box
									sx={{ width: '100%', display: 'flex', justifyContent: 'end' }}
								>
									{user_role.localeCompare('OWNER') === 0 ? (
										<IconButtonError onClick={handleConfirmDelete}>
											<DeleteTwoToneIcon fontSize="small" />
											{t('Delete')}
										</IconButtonError>
									) : null}
									<Button
										size="small"
										sx={{
											fontWeight: '400',
											fontSize: '12px',
											width: '111px',
											height: '40px',
											justifyContent: 'center !important',
										}}
										onClick={() => {
											setModalOpen(true);
										}}
										startIcon={<PeopleAltOutlinedIcon />}
									>
										{t('Add')}
									</Button>
									<Button
										size="small"
										sx={{
											fontWeight: '400',
											fontSize: '12px',
											width: '111px',
											height: '40px',
											marginLeft: '9.5%',
											justifyContent: 'center !important',
										}}
										href={`/manage-group/${data?.id}`}
									>
										{t('Manage')}
									</Button>
								</Box>
							) : null}
						</Box>
					</Grid>
				</Grid>
				<Typography
					noWrap
					variant="subtitle2"
					sx={{
						color: '#7B8092 !important',
						fontSize: '14px !important',
					}}
				>
					{t('Owner')}
					{'  '}
					<Link
						href={owner[0] !== undefined ? `/user/${owner[0].user.id}` : '#'}
						style={{
							fontSize: '14px !important',
						}}
						target="_blank"
					>
						<b>{owner[0] !== undefined ? owner[0].user.first_name : ''}</b>
					</Link>
				</Typography>

				<Typography
					noWrap
					variant="subtitle2"
					sx={{
						color: '#7B8092 !important',
						fontSize: '14px !important',
					}}
				>
					{t('About')}
					{'  '}
					<Interweave content={data?.description} />
				</Typography>
			</Box>
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
							pt: 4,
							px: 6,
						}}
						variant="h3"
					>
						{t('Do you really want to delete this group')}?
					</Typography>

					<Typography
						align="center"
						sx={{
							pt: 2,
							pb: 4,
							px: 6,
						}}
						fontWeight="normal"
						color="text.secondary"
						variant="h4"
					>
						{t("You won't be able to revert after deletion")}
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
}

export default GroupInfo;
