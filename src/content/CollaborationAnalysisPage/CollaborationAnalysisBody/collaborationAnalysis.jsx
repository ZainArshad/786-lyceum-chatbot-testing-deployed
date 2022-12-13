import { Box, Grid, Typography, Container } from '@mui/material';
import { useTranslation } from 'next-i18next';
import {
	TypographyH1Primary,
	BoxWrapper,
	ImgWrapper,
} from 'src/components/LandingPageComps';
import Image from 'next/image';

const collab = [
	{
		image: '/static/images/homepage/collaboration1.png',
		image_low: '/static/images/homepage/collaboration1_low.png',
		name: 'Share Sessions',
		description:
			'As  if you were standing over the shoulder of someone using Matlab',
	},
	{
		image: '/static/images/homepage/collaboration2.png',
		image_low: '/static/images/homepage/collaboration2_low.png',
		name: 'Post Comments',
		description: 'Comment in various ways using the scientific method',
	},
	{
		image: '/static/images/homepage/collaboration3.png',
		image_low: '/static/images/homepage/collaboration3_low.png',
		name: 'Control Groups',
		description:
			'Give access privileges to only those you wish to see your data',
	},
	{
		image: '/static/images/homepage/collaboration4.png',
		image_low: '/static/images/homepage/collaboration4_low.png',
		name: 'Report Curation',
		description:
			'Highly customized reports that still follow company wide templates',
	},
];

const plan = [
	{
		image: 'slack',
		name: 'Slack',
		description: 'So you can message your teammates',
	},
	{
		image: 'jira',
		name: 'Jira',
		description: 'So you can track your tasks',
	},
	{
		image: 'zoom',
		name: 'Zoom',
		description: 'So you can call your teammates',
	},
	{
		image: 'confluence',
		name: 'Confluence',
		description: 'So you can add more detailed notes',
	},
	{
		image: 'excel',
		name: 'Excel',
		description: 'So you can upload your data straight from a chart',
	},
	{
		image: 'chrome',
		name: 'Chrome',
		description: 'So you pin data anywhere from the internet',
	},
];

function CollaborationAnalysisPart() {
	const { t } = useTranslation();

	return (
		<>
			<BoxWrapper
				sx={{
					background: 'linear-gradient(to top, #0A424F 50%, black 50%)',
					minHeight: '401px',
					pb: 3,
				}}
			>
				<TypographyH1Primary
					variant="h1"
					sx={{ color: '#9abdc6', textAlign: 'center', mt: 3 }}
				>
					{t('Collaboration')}
				</TypographyH1Primary>
				<Typography
					variant="h4"
					sx={{ color: '#9abdc6', textAlign: 'center', mt: 3, mb: 3 }}
				>
					{t('New ways to collaborate with your teammates')}
				</Typography>
				<Grid container rowSpacing={3}>
					{collab?.map((col, i) => {
						return (
							<Grid md={3} sm={6} xs={12} key={i} sx={{ mt: 3 }}>
								<Box sx={{ display: 'flex', justifyContent: 'center' }}>
									<ImgWrapper
										sx={{
											position: 'relative',
											height: { md: '17.67vw', xs: '45.67vw', sm: '21.67vw' },
											width: '85%',
										}}
									>
										<Image
											alt="Engineering Background"
											src={col?.image}
											placeholder="blur"
											blurDataURL={col?.image_low}
											layout="fill"
											objectFit="cover"
										/>
									</ImgWrapper>
								</Box>
								<Box
									sx={{
										display: 'grid',
										justifyContent: 'center',
										width: '100%',
									}}
								>
									<Typography
										variant="h3"
										sx={{ color: '#9abdc6', textAlign: 'center' }}
									>
										{t(col.name)}
									</Typography>
									<Typography
										variant="h6"
										sx={{ color: '#9abdc6', mt: 1, textAlign: 'center' }}
									>
										{t(col.description)}
									</Typography>
								</Box>
							</Grid>
						);
					})}
				</Grid>
			</BoxWrapper>
			<BoxWrapper sx={{ background: '#80A2AB', position: 'relative' }}>
				<Box
					sx={{
						background: 'black',
						width: '10.5%',
						height: '40px',
						position: 'absolute',
						top: 25,
						right: 0,
						display: { xs: 'none', sm: 'block' },
					}}
				/>
				<Box
					sx={{
						background: 'black',
						width: '10.5%',
						height: '40px',
						position: 'absolute',
						top: 25,
						left: 0,
						display: { xs: 'none', sm: 'block' },
					}}
				/>
				<TypographyH1Primary
					variant="h1"
					sx={{ color: 'black', textAlign: 'center', mt: 3 }}
				>
					{t('Future Integrations')}
				</TypographyH1Primary>
				<Container maxWidth="md" sx={{ mb: 3 }}>
					<Grid container sx={{ mt: 5 }} spacing={3}>
						{plan?.map((pl, i) => {
							return (
								<Grid
									key={i}
									item
									xs={6}
									sm={4}
									md={4}
									display="grid"
									justifyContent="center"
								>
									<Box
										sx={{
											width: '100%',
											height: '75px',
											display: 'flex',
											justifyContent: 'center',
										}}
									>
										<img
											alt={`plan_i${i}`}
											style={{ width: '75px', height: '100%' }}
											src={`/static/images/homepage/${pl.image}.PNG`}
										/>
									</Box>
									<Box sx={{ width: '100px' }}>
										<Typography
											variant="h3"
											sx={{ textAlign: 'center', mt: 1 }}
										>
											{t(pl.name)}
										</Typography>
										<Typography
											variant="h6"
											sx={{ textAlign: 'center', mt: 1 }}
										>
											{t(pl.description)}
										</Typography>
									</Box>
								</Grid>
							);
						})}
					</Grid>
				</Container>
			</BoxWrapper>
		</>
	);
}

export default CollaborationAnalysisPart;
