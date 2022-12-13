import { useRef, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import {
	Box,
	Grid,
	Container,
	Typography,
	styled,
	List,
	ListItem,
	Icon,
} from '@mui/material';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';

const TypographyH2 = styled(Typography)(
	({ theme }) => `
    font-size: ${theme.typography.pxToRem(25)};
`
);

const BoxWrapper = styled(Box)(
	() => `
    width:100%;
    min-height:101px;
    overflow:hidden;
`
);

const list1 = [
	{
		title: 'Limit Generation',
		description:
			'When putting curves on graph, calculating limits based off a sigma distribution is often required to establish a pass/fail criteria at test stations during the manufacturing process',
	},
	{
		title: 'Measurement Correlation',
		description:
			'When measuring devices from one location/setup to the next, engineers are required to correlate the results in order to validate results are consistent and reliable',
	},
	{
		title: 'Auto-Visualization',
		description:
			'Generate graphs with data from a variety of upload sources, ranging from small to large amounts of data',
	},
];

const list2 = [
	{
		title: 'Manufacturing Yield',
		description:
			'Advanced statistics from manufacturing buildings such as Cp, Cpk, fail rate and failure signatures.',
	},
	{
		title: 'Session Sharing',
		description:
			'Work on the same set of data with colleagues across the world. Create a session by graphing and adding descriptions to your data, then send to a teammate who has mord data to add/compare/post-process in more depth!',
	},
	{
		title: 'Gage R&R',
		description:
			'ANOVA tables and tolerance studies of 2-dimensional data matrics.',
	},
];
function FeaturesPart() {
	const { t } = useTranslation();
	const vidRef = useRef();
	useEffect(() => {
		vidRef.current.play();
	}, []);

	return (
		<BoxWrapper sx={{ background: '#9abdc6', pt: 3, pb: 3 }}>
			<Grid container sx={{ mt: 3 }}>
				<Grid item md={4} xs={12}>
					<Container maxWidth="lg">
						<List>
							{list1.map((li, i) => {
								return (
									<ListItem key={i} sx={{ display: 'grid' }}>
										<TypographyH2>
											<Icon>
												<CheckCircleIcon sx={{ fontSize: '25px' }} />
											</Icon>
											{t(li.title)}
										</TypographyH2>
										<Typography variant="subtitle2" sx={{ ml: 3, mt: 1.5 }}>
											{t(li.description)}
										</Typography>
									</ListItem>
								);
							})}
						</List>
					</Container>
				</Grid>
				<Grid md={4} xs={12}>
					<BoxWrapper
						sx={{
							background: '#0a424f',
							height: { md: '35.67vw', xs: '97.67vw', sm: '67.67vw' },
							position: 'relative',
							pb: 3,
							pt: 3,
						}}
					>
						<video
							style={{ height: '100%', width: '100%' }}
							loop
							autoPlay
							muted
							ref={vidRef}
						>
							<source
								src="/static/images/homepage/5-sec.mov"
								type="video/mp4"
							/>
						</video>
					</BoxWrapper>
				</Grid>
				<Grid item md={4} xs={12}>
					<Container maxWidth="sm" sx={{ mt: 4 }}>
						<List>
							{list2.map((li, i) => {
								return (
									<ListItem key={i} sx={{ display: 'grid' }}>
										<TypographyH2>
											<Icon>
												<CheckCircleIcon sx={{ fontSize: '25px' }} />
											</Icon>
											{t(li.title)}
										</TypographyH2>
										<Typography variant="subtitle2" sx={{ ml: 3, mt: 1.5 }}>
											{t(li.description)}
										</Typography>
									</ListItem>
								);
							})}
						</List>
					</Container>
				</Grid>
			</Grid>
		</BoxWrapper>
	);
}

export default FeaturesPart;
