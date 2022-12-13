import PropTypes from 'prop-types';
import { Box, IconButton, useTheme, Typography, styled } from '@mui/material';
import ThumbUpOutlinedIcon from '@mui/icons-material/ThumbUpOutlined';
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import PushPinOutlinedIcon from '@mui/icons-material/PushPinOutlined';
import ShareIcon from '@mui/icons-material/Share';
import CommentTwoToneIcon from '@mui/icons-material/CommentTwoTone';
import ModeOutlinedIcon from '@mui/icons-material/ModeOutlined';
import DeleteOutlinedIcon from '@mui/icons-material/DeleteOutlined';
import { useTranslation } from 'next-i18next';

const StyledIconButton = styled(IconButton)(
	({ theme }) => `
  border-radius: ${theme.general.borderRadiusSm};
  border: 1px solid ${theme.colors.alpha.black[10]};
  display: flex;
  alignItems: center;
  margin: ${theme.spacing(0, 0.51)};
  width: 91px;
  `
);

const PostReactionsPanel = ({ userLiked }) => {
	const theme = useTheme();
	const { t } = useTranslation();
	return (
		<Box
			sx={{
				display: 'flex',
				alignItems: 'center',
				justifyContent: 'end',
				padding: theme.spacing(0.5, 3),
			}}
		>
			<StyledIconButton color="secondary">
				{userLiked ? <ThumbUpIcon /> : <ThumbUpOutlinedIcon />}
				<Typography
					sx={{
						padding: theme.spacing(0, 0, 0, 0.5),
						fontSize: theme.typography.h6,
					}}
				>
					{t('Like')}
				</Typography>
			</StyledIconButton>
			<StyledIconButton color="secondary">
				<CommentTwoToneIcon />
				<Typography
					sx={{
						padding: theme.spacing(0, 0, 0, 0.5),
						fontSize: theme.typography.h6,
					}}
				>
					{t('Reply')}
				</Typography>
			</StyledIconButton>
			<StyledIconButton color="secondary">
				<PushPinOutlinedIcon />
				<Typography
					sx={{
						padding: theme.spacing(0, 0, 0, 0.5),
						fontSize: theme.typography.h6,
					}}
				>
					{t('Pin')}
				</Typography>
			</StyledIconButton>
			<StyledIconButton color="secondary">
				<ShareIcon />
				<Typography
					sx={{
						padding: theme.spacing(0, 0, 0, 0.5),
						fontSize: theme.typography.h6,
					}}
				>
					{t('Share')}
				</Typography>
			</StyledIconButton>
			<StyledIconButton color="secondary">
				<ModeOutlinedIcon />
				<Typography
					sx={{
						padding: theme.spacing(0, 0, 0, 0.5),
						fontSize: theme.typography.h6,
					}}
				>
					{t('Edit')}
				</Typography>
			</StyledIconButton>
			<StyledIconButton color="secondary">
				<DeleteOutlinedIcon />
				<Typography
					sx={{
						padding: theme.spacing(0, 0, 0, 0.5),
						fontSize: theme.typography.h6,
					}}
				>
					{t('Delete')}
				</Typography>
			</StyledIconButton>
		</Box>
	);
};

PostReactionsPanel.propTypes = {
	userLiked: PropTypes.bool.isRequired,
};

export default PostReactionsPanel;
