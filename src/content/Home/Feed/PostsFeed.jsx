import { useState } from 'react';
import { Tabs, Tab, Box } from '@mui/material';
import PostCard from 'src/components/Posts/PostCard';

const PostsFeed = () => {
	const [tabValue, setTabValue] = useState(0);

	const handleTabChange = (event, newValue) => {
		setTabValue(newValue);
	};
	return (
		<Box sx={{ overflow: 'auto', py: '10px' }}>
			<Tabs
				value={tabValue}
				onChange={handleTabChange}
				variant="scrollable"
				scrollButtons={false}
			>
				<Tab label="All" />
				<Tab label="Questions" />
				<Tab label="Hypothesis" />
				<Tab label="Experiment" />
				<Tab label="Result" />
				<Tab label="Conclusion" />
			</Tabs>

			{tabValue === 0 && (
				<Box>
					<PostCard postId="1" userLiked />
					<PostCard postId="2" userLiked />
					<PostCard postId="3" userLiked={false} />
					<PostCard postId="4" userLiked />
				</Box>
			)}
		</Box>
	);
};

export default PostsFeed;
