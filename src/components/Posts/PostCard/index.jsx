import PropTypes from 'prop-types';
import { useTheme, styled, Box, Avatar, Typography } from '@mui/material';
import PostReactionsPanel from '../Common/PostActions';
import CreatePostComment from '../CreateComment';

const PostCardWrapper = styled(Box)(
	({ theme }) => `
        margin-top: ${theme.spacing(2)};
        width: 100%;
        display: flex;
        flex-direction: column;
        border-radius: ${theme.general.borderRadiusSm};
        border: 1px solid ${theme.colors.alpha.black[10]};
        background: ${theme.colors.alpha.black[10]};
    `
);

const PostCard = ({ postId, userLiked }) => {
	const theme = useTheme();
	const user = {
		avatar: '/static/images/avatars/1.jpg',
		name: 'Rachael Simons',
		jobtitle: 'Lead Developer',
	};

	return (
		<PostCardWrapper>
			<Box p={theme.spacing(2)}>
				<Box sx={{ display: 'flex', width: '100%', alignItems: 'self-start' }}>
					<Avatar alt={user.name} src={user.avatar} />
					<Box sx={{ marginLeft: theme.spacing(1) }}>
						<Typography sx={theme.typography.h5}>New User</Typography>
						<Typography
							sx={{
								color: theme.colors.alpha.black[70],
								fontSize: 12,
								mt: 0.5,
							}}
						>
							QUESTION - 23 hrs ago
						</Typography>
					</Box>
				</Box>
				<Box
					sx={{
						display: 'flex',
						width: '100%',
						alignItems: 'center',
						justifyContent: 'space-between',
						padding: theme.spacing(4, 0, 2, 0),
					}}
				>
					<Typography sx={theme.typography.h6}>
						What happens when two surface acoustic waves (SAWs) of same
						frequency orthogonal to each other interference
					</Typography>
				</Box>
			</Box>
			<Box
				sx={{
					borderTop: `1px solid ${theme.colors.alpha.black[10]}`,
					borderBottom: `1px solid ${theme.colors.alpha.black[10]}`,
				}}
			>
				<PostReactionsPanel postId={postId} userLiked={userLiked} />
			</Box>
			<CreatePostComment postId="1" />
		</PostCardWrapper>
	);
};

PostCard.propTypes = {
	postId: PropTypes.string.isRequired,
	userLiked: PropTypes.bool.isRequired,
};

export default PostCard;
