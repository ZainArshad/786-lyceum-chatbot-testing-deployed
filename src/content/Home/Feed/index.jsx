import { Box, useTheme } from '@mui/material';
import CreatePost from 'src/components/Posts/CreatePost';
import { CapsuleDivider } from 'src/components/shared/CapsuleDivider';
import PostsFeed from './PostsFeed';

const Feed = () => {
	const theme = useTheme();

	return (
		<Box
			sx={{
				flex: 1,
				display: 'flex',
				justifyContent: 'center',
			}}
		>
			<Box
				sx={{
					width: `100%`,
					maxWidth: theme.general.maxBodyWidth,
				}}
			>
				<CreatePost />
				<CapsuleDivider capsuleText="Feed" />
				<PostsFeed />
			</Box>
		</Box>
	);
};

export default Feed;
