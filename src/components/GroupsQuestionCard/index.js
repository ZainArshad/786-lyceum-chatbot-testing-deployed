import PropTypes from 'prop-types';
import { useTheme, styled, Box, Avatar, Typography, Grid } from '@mui/material';
import { useTranslation } from 'next-i18next';
import PostReactionsPanel from './GroupQuestionPosts/Common/PostActions';

const GroupsQuestionCardWrapper = styled(Box)(
	({ theme }) => `
        margin-top: ${theme.spacing(2)};
        width: 100%;
        display: flex;
        flex-direction: column;
        border-radius: ${theme.general.borderRadiusSm};
        border: 1px solid ${theme.colors.alpha.black[10]};
    `
);

const GroupsQuestionCard = ({ postId, userLiked }) => {
	const theme = useTheme();
	const { t } = useTranslation();
	const user = {
		avatar: '/static/images/avatars/1.jpg',
		name: 'Rachael Simons',
		jobtitle: 'Lead Developer',
	};

	return (
		<GroupsQuestionCardWrapper>
			<Box p={theme.spacing(2)}>
				<Box sx={{ display: 'flex', width: '100%', alignItems: 'self-start' }}>
					<Avatar alt={user.name} src={user.avatar} />
					<Box sx={{ marginLeft: theme.spacing(1) }}>
						<Typography sx={theme.typography.h5}>{user.name}</Typography>
						<Typography
							sx={{
								color: theme.colors.alpha.black[70],
								fontSize: 12,
								mt: 0.5,
							}}
						>
							{t('Question')} - 23 {t('hrs ago')}
						</Typography>
					</Box>
				</Box>
				<Box
					sx={{
						display: 'flex',
						width: '100%',
						alignItems: 'center',
						justifyContent: 'space-between',
						padding: theme.spacing(2, 0, 2, 0),
					}}
				>
					<Typography
						sx={{
							fontFamily: theme.typography.h6,
							padding: theme.spacing(0, 0, 2, 5),
						}}
					>
						{t(
							'What happens when two surface acoustic waves (SAWs) of same frequency orthogonal to each other interference'
						)}
					</Typography>
				</Box>
			</Box>
			<Box sx={{ paddingBottom: theme.spacing(2), display: 'block' }}>
				<Grid container>
					<Grid item xs={12}>
						<PostReactionsPanel postId={postId} userLiked={userLiked} />
					</Grid>
				</Grid>
			</Box>
		</GroupsQuestionCardWrapper>
	);
};

GroupsQuestionCard.propTypes = {
	postId: PropTypes.string.isRequired,
	userLiked: PropTypes.bool.isRequired,
};

export default GroupsQuestionCard;
