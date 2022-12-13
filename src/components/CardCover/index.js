import { useState } from 'react';
import PropTypes from 'prop-types';
import { Box, Card, CardMedia, styled } from '@mui/material';
import { useTranslation } from 'react-i18next';
import UploadTwoToneIcon from '@mui/icons-material/UploadTwoTone';
import { useMutation } from '@tanstack/react-query';
import { makeGroupsRequest } from 'src/services/api/groups';
import { useSnackbarNotifications } from 'src/hooks/useSnackbarNotifications';
import { uploadFileToS3 } from 'src/lib/helpers/content/fileUpload';
import { LoadingButton } from '@mui/lab';

const Input = styled('input')({
	display: 'none',
});

const CardCover = styled(Card)(
	({ theme }) => `
    position: relative;
    margin-bottom:21px;
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
	const { showErrorSnackbar, showSuccessSnackbar } = useSnackbarNotifications();
	const [image, setImage] = useState(
		user?.data?.image !== undefined ? user?.data?.image : ''
	);
	const [loading, setLoading] = useState(false);
	const { mutate: updateImageCall } = useMutation(
		(obj) => {
			return makeGroupsRequest.update_group_partially(obj.payload, obj.id);
		},
		{
			onSuccess: (data) => {
				setImage(data?.data?.image);
				showSuccessSnackbar('Cover Photo Updated!');
			},
			onError: (_data) => {
				showErrorSnackbar('Something went wrong! Try again');
			},
		}
	);

	const updateImage = async (e) => {
		setLoading(true);
		const fileUrl = await uploadFileToS3(e.target.files, {
			basePath: 'group/cover_image',
		});
		if (fileUrl !== '') {
			updateImageCall({
				payload: {
					group_name: user?.data?.group_name,
					image_url: fileUrl,
				},
				id: user?.data?.id,
			});
		} else {
			showErrorSnackbar('Something went wrong! Try Again');
		}
		setLoading(false);
	};
	return (
		<CardCover>
			<CardMedia height="100%" image={image} component="img" />
			<CardCoverAction>
				<Input
					accept="image/*"
					id="change-cover"
					multiple
					type="file"
					onChange={updateImage}
				/>
				<label htmlFor="change-cover">
					<LoadingButton
						startIcon={<UploadTwoToneIcon />}
						variant="contained"
						component="span"
						loading={loading}
					>
						{t('Change cover')}
					</LoadingButton>
				</label>
			</CardCoverAction>
		</CardCover>
	);
};

ProfileCover.propTypes = {
	user: PropTypes.object.isRequired,
};

export default ProfileCover;
