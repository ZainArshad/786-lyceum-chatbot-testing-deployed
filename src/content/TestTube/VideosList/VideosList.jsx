import { Box } from '@mui/material';
import React from 'react';
import { TestTubeVideoCard } from '../TestTubeVideoCard';

const videos = [
	{
		title: 'How to stress test your loudspeaker',
		date: 'Sep 18, 2020',
		link: 'https://youtu.be/AVq2l5hAIE8',
		imageURl: '/static/images/homepage/Rectangle 182.png',
	},
	{
		title: 'Measuring noise floor of a mic',
		date: 'Sep 18, 2020',
		link: 'https://youtu.be/AVq2l5hAIE8',
		imageURl: '/static/images/homepage/Rectangle 183.png',
	},
	{
		title: 'Find coexistence affects of antenna',
		date: 'Sep 18, 2020',
		link: 'https://youtu.be/AVq2l5hAIE8',
		imageURl: '/static/images/homepage/Rectangle 184.png',
	},
	{
		title: 'Measuring amplifier response',
		date: 'Sep 18, 2020',
		link: 'https://youtu.be/AVq2l5hAIE8',
		imageURl: '/static/images/homepage/Rectangle 185.png',
	},
];

export const VideosList = () => {
	return (
		<Box>
			<React.Fragment key={1}>
				{videos?.map((video, id) => (
					<TestTubeVideoCard key={id} videoDetails={video} />
				))}
			</React.Fragment>
		</Box>
	);
};
