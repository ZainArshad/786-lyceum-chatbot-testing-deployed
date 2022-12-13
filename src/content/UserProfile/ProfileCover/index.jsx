import { useState } from 'react';
import PropTypes from 'prop-types';

import {
	Box,
	Typography,
	Card,
	Avatar,
	CardMedia,
	styled,
	IconButton,
} from '@mui/material';
import { useTranslation } from 'react-i18next';
import UploadTwoToneIcon from '@mui/icons-material/UploadTwoTone';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { uploadFileToS3 } from 'src/lib/helpers/content/fileUpload';
import { useAuth } from 'src/hooks/useAuth';
import { useDispatch } from 'src/store';
import { useSnackbarNotifications } from 'src/hooks/useSnackbarNotifications';
import { makeAccountRequest } from 'src/services/api/account';
import { refreshMyAuthProfile } from 'src/slices/auth/actions';
import { queryKeys } from 'src/lib/constants/queries';
import { LoadingButton } from 'src/components/shared/Buttons';
import { randomId } from 'src/utils/randomId';

const COVER = 'cover_image';
const PROFILE = 'profile_image';

const Input = styled('input')({
	display: 'none',
});

const AvatarWrapper = styled(Card)(
	({ theme }) => `
    position: relative;
    overflow: visible;
    display: inline-block;
    margin-top: -${theme.spacing(9)};
    margin-left: ${theme.spacing(2)};

    .MuiAvatar-root {
      width: ${theme.spacing(16)};
      height: ${theme.spacing(16)};
    }
`
);

const ButtonUploadWrapper = styled(Box)(
	({ theme }) => `
    position: absolute;
    width: ${theme.spacing(4)};
    height: ${theme.spacing(4)};
    bottom: -${theme.spacing(1)};
    right: -${theme.spacing(1)};

    .MuiIconButton-root {
      border-radius: 100%;
      background: ${theme.colors.primary.main};
      color: ${theme.palette.primary.contrastText};
      box-shadow: ${theme.colors.shadows.primary};
      width: ${theme.spacing(4)};
      height: ${theme.spacing(4)};
      padding: 0;
  
      &:hover {
        background: ${theme.colors.primary.dark};
      }
    }
`
);

const CardCover = styled(Card)(
	({ theme }) => `
    position: relative;

    .MuiCardMedia-root {
      height: ${theme.spacing(26)};
    }
`
);

const CardCoverAction = styled(Box)(
	({ theme }) => `
    position: absolute;
    right: ${theme.spacing(2)};
    bottom: ${theme.spacing(2)};
`
);

const ProfileCover = ({ user }) => {
	const { t } = useTranslation();
	const [loading, setLoading] = useState(false);
	const dispatch = useDispatch();
	const { user: authenticatedUser } = useAuth();
	const queryClient = useQueryClient();
	const isOwner = authenticatedUser?.id === user?.id;

	const { showErrorSnackbar, showSuccessSnackbar } = useSnackbarNotifications();
	const { mutateAsync: updateImageCall } = useMutation(
		async (obj) => {
			return makeAccountRequest.patchMyAccount(obj.payload, obj.id);
		},
		{
			onSuccess: () => {
				dispatch(
					refreshMyAuthProfile({
						onSuccess: () => {
							showSuccessSnackbar('Photo Updated!');
							queryClient.invalidateQueries([queryKeys.GET_USER_PROFILE]);
						},
					})
				);
			},
			onError: () => showErrorSnackbar('Something went wrong! Try Again'),
		}
	);

	const { mutateAsync: followUser, isLoading: userFollowed } = useMutation(
		() => makeAccountRequest.followUser(user.id),
		{
			onSuccess: () => showSuccessSnackbar('Following User!'),
			onError: () => showErrorSnackbar('Something went wrong! Try Again'),
		}
	);

	const updateImage = async (e, type) => {
		try {
			const file = e.target.files;
			if (!file.length) return;
			setLoading(true);
			const fileUrl = await uploadFileToS3(e.target.files, {
				basePath: `user/${randomId()}/${
					type.localeCompare('cover_image') === 0
						? 'cover_image'
						: 'profile_pic'
				}`,
			});
			await updateImageCall({
				payload: { [type]: fileUrl },
				id: authenticatedUser.id,
			});
		} catch (error) {
			showErrorSnackbar(
				'Something went wrong! Information provided is not correct'
			);
		} finally {
			setLoading(false);
		}
	};

	return (
		<>
			<CardCover>
				<CardMedia height="100%" image={user.cover_image} component="img" />
				{isOwner && (
					<CardCoverAction>
						<Input
							accept="image/*"
							id="change-cover"
							multiple
							type="file"
							onChange={(e) => updateImage(e, COVER)}
						/>
						<label htmlFor="change-cover">
							<LoadingButton
								startIcon={<UploadTwoToneIcon />}
								variant="contained"
								component="span"
								loading={loading}
								loadingPosition="end"
							>
								{t('Change cover')}
							</LoadingButton>
						</label>
					</CardCoverAction>
				)}
			</CardCover>
			<AvatarWrapper>
				<Avatar variant="rounded" alt={user.name} src={user.profile_image} />
				{isOwner && (
					<ButtonUploadWrapper>
						<Input
							accept="image/*"
							id="icon-button-file"
							name="icon-button-file"
							type="file"
							onChange={(e) => updateImage(e, PROFILE)}
						/>
						<Typography component="label" htmlFor="icon-button-file">
							<IconButton disabled={loading} component="span" color="primary">
								<UploadTwoToneIcon />
							</IconButton>
						</Typography>
					</ButtonUploadWrapper>
				)}
			</AvatarWrapper>
			<Box py={2} pl={2} mb={3}>
				<Typography gutterBottom variant="h4">
					{user?.first_name} {user?.last_name}
				</Typography>
				<Typography variant="subtitle2">{user?.description}</Typography>
				{!isOwner && (
					<Box
						display={{ xs: 'block', md: 'flex' }}
						alignItems="center"
						justifyContent="space-between"
					>
						<Box>
							{!user?.following ? (
								<LoadingButton
									variant="contained"
									component="span"
									loading={userFollowed}
									onClick={followUser}
								>
									{t('Follow')}
								</LoadingButton>
							) : (
								<Typography gutterBottom variant="h4" color="primary">
									{t('Following')}
								</Typography>
							)}
						</Box>
					</Box>
				)}
			</Box>
		</>
	);
};

ProfileCover.propTypes = {
	user: PropTypes.object.isRequired,
};

export default ProfileCover;
