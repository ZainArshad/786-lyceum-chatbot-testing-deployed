import PropTypes from 'prop-types';
import { Box, IconButton, useTheme } from '@mui/material';
import ThumbUpOutlinedIcon from '@mui/icons-material/ThumbUpOutlined';
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import PushPinOutlinedIcon from '@mui/icons-material/PushPinOutlined';
import ShareIcon from '@mui/icons-material/Share';

const PostReactionsPanel = ({ userLiked }) => {
	const theme = useTheme();
	return (
		<Box
			sx={{
				display: 'flex',
				alignItems: 'center',
				justifyContent: 'space-between',
				padding: theme.spacing(0.5, 3),
			}}
		>
			<IconButton color="secondary">
				{userLiked ? <ThumbUpIcon /> : <ThumbUpOutlinedIcon />}
			</IconButton>
			<IconButton color="secondary">
				<PushPinOutlinedIcon />
			</IconButton>
			<IconButton color="secondary">
				<ShareIcon />
			</IconButton>
		</Box>
	);
};

PostReactionsPanel.propTypes = {
	userLiked: PropTypes.bool.isRequired,
};

export default PostReactionsPanel;
