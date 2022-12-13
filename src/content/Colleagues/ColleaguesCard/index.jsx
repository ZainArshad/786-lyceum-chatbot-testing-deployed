import {
	Card,
	Typography,
	styled,
	CardMedia,
	CardContent,
	Stack,
} from '@mui/material';
import { Button, LoadingButton } from 'src/components/shared/Buttons';
import { useTranslation } from 'react-i18next';
import PropTypes from 'prop-types';
import { useMutation } from '@tanstack/react-query';
import { useSnackbarNotifications } from 'src/hooks/useSnackbarNotifications';
import { makeAccountRequest } from 'src/services/api/account';
import Link from 'src/components/Link';

const GCard = styled(Card)(
	({ theme }) => `
      border-radius: ${theme.general.borderRadiusSm};
      border: 1px solid ${theme.colors.alpha.black[10]};
			box-shadow: none;
`
);

const ColleaguesCard = ({ user }) => {
	const { t } = useTranslation();
	const { showErrorSnackbar } = useSnackbarNotifications();

	const {
		mutateAsync: followUser,
		isLoading,
		isSuccess,
	} = useMutation((obj) => makeAccountRequest.followUser(obj.id), {
		onError: () => showErrorSnackbar('Something went wrong! Try Again'),
	});

	const isFollowing = user?.following || isSuccess;

	return (
		<GCard>
			<CardMedia
				component="img"
				height="275"
				image={
					user?.profile_image != null
						? user?.profile_image
						: '/static/images/placeholders/placeholder.svg'
				}
				alt="request image"
				sx={{
					objectFit: user?.profile_image != null ? 'contian' : 'none',
				}}
			/>
			<CardContent>
				<Typography variant="h3">
					{user.first_name} {user.last_name}
				</Typography>

				<Stack spacing={0.5} mt={1}>
					<LoadingButton
						fullWidth
						onClick={() => {
							followUser({ id: user?.id });
						}}
						disabled={isFollowing}
						loading={isLoading}
					>
						{t(isFollowing ? 'Following' : 'Follow')}
					</LoadingButton>
					<Link
						href={{
							pathname: `user/${user.id}`,
						}}
						target="_blank"
					>
						<Button fullWidth variant="secondary">
							{t('View Profile')}
						</Button>
					</Link>
				</Stack>
			</CardContent>
		</GCard>
	);
};

ColleaguesCard.propTypes = {
	user: PropTypes.object,
};

export default ColleaguesCard;
