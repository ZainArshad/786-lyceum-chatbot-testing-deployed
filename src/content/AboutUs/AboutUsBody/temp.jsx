import { Box, Grid, Typography } from '@mui/material';
import { useTranslation } from 'next-i18next';
import {
	BoxWrapper,
	ImgWrapper,
	TypographyH1Primary,
	TypographyH2,
} from 'src/components/LandingPageComps';
import Image from 'next/image';

function About() {
	const { t } = useTranslation();

	return (
		<BoxWrapper sx={{ background: '#9abdc6' }}>
			<Grid spacing={{ xs: 6, md: 10 }} container>
				<Grid item md={6} sm={12} xs={12}>
					<BoxWrapper
						sx={{
							background: 'linear-gradient(to left, #9abdc6 60%, black 40%)',
							height: '100%',
						}}
					>
						<ImgWrapper
							sx={{
								height: { md: '32.67vw', xs: '45.67vw', sm: '35.67vw' },
								width: '75%',
								mt: 5,
								ml: 5,
								overflow: 'hidden',
							}}
						>
							<Image
								alt="Enterprise 1"
								src="/static/images/homepage/aboutus1.png"
								placeholder="blur"
								blurDataURL="/static/images/homepage/aboutus2.png"
								layout="fill"
								objectFit="cover"
							/>
						</ImgWrapper>
					</BoxWrapper>
				</Grid>
				<Grid item md={5} sm={12} xs={12} pr={{ xs: 0, md: 3 }} ml={1} mt={5}>
					<TypographyH1Primary sx={{ fontWeight: 'bolder', mt: 2, mb: 2 }}>
						{t('About Us')}
					</TypographyH1Primary>
					<TypographyH2
						sx={{
							lineHeight: 2.5,
							pb: 4,
						}}
						variant="h4"
						color="text.primary"
						fontWeight="normal"
					>
						{t(
							'The Lyceum is collaboration tool started by Joshua Levy, an experienced audio systems engineer who has spent over a decade in the industry, working on the teams that delivered products such as the Amazon Alexa, Facebook Portal, and Oculus Quest Pro'
						)}
					</TypographyH2>
					<TypographyH2
						sx={{
							lineHeight: 2.5,
							pt: 2,
							pl: 3,
						}}
						variant="h4"
						color="text.primary"
						fontWeight="normal"
					>
						{t(
							'"I have been lab rat for as long as I can remember, and the most time-consuming aspects I deal with on a daily basis are data management, post-processing and reporting. The faster I am able to manage, collaborate and share my data, the easier my R&D, and manufacturing process become"'
						)}
					</TypographyH2>
					<TypographyH2
						sx={{
							lineHeight: 2.5,
							pb: 4,
							pt: 1,
							pl: 3,
							pr: 1.5,
						}}
						variant="h4"
						color="text.primary"
						fontWeight="normal"
						textAlign={'right'}
					>
						{t('-Joshua Levy')}
					</TypographyH2>
				</Grid>
			</Grid>
			<Grid spacing={{ xs: 6, md: 10 }} container>
				<Grid
					item
					md={6}
					sm={12}
					xs={12}
					ml={{ md: 5, sm: 1, xs: 1 }}
					mt={3}
					sx={{ height: 'max-content' }}
				>
					<Box style={{ height: '100%' }}>
						<TypographyH1Primary sx={{ fontWeight: 'bolder', mt: 2, mb: 2 }}>
							{t('Our Team')}
						</TypographyH1Primary>
						<TypographyH2
							sx={{
								lineHeight: 2.5,
								pb: 4,
							}}
							variant="h4"
							color="text.primary"
							fontWeight="normal"
						>
							{t(
								'Based in multiple locations across the globe, our team consists of professionals with diverse backgrounds and experiences. Our mission is to expand scientific knowledge to the masses. This includes users that may not have profession experience, or do have professional experience and wish to leverage the Lyceum' +
									"'" +
									's capaibilities to produce more results, better and faster than ever before.'
							)}
						</TypographyH2>
						<BoxWrapper
							sx={{
								background:
									'linear-gradient(to left, #9abdc6 60%, #285967 40%)',
								position: 'relative',
								height: { md: '32.67vw', xs: '47.67vw', sm: '37.67vw' },
								overflow: 'hidden',
							}}
						>
							<ImgWrapper
								sx={{
									height: { md: '25.67vw', xs: '45.67vw', sm: '35.67vw' },
									width: '75%',
									mt: 5,
									ml: 5,
									position: 'absolute',
								}}
							>
								<Image
									alt="Enterprise 1"
									src="/static/images/homepage/about2.png"
									placeholder="blur"
									blurDataURL="/static/images/homepage/about2_low.png"
									layout="fill"
									objectFit="cover"
								/>
							</ImgWrapper>
						</BoxWrapper>
					</Box>
				</Grid>
				<Grid item md={5} sm={12} xs={12} mt={3}>
					<Box style={{ height: '100%' }}>
						<BoxWrapper
							sx={{
								background: 'black',
								display: 'flex',
								borderRadius: '100em 0 0 100em',
							}}
						>
							<ImgWrapper
								sx={{
									height: { md: '7.67vw', xs: '45.67vw', sm: '35.67vw' },
									width: { md: '25%', sm: '40%', xs: '40%' },
									overflow: 'hidden',
									borderRadius: '100em',
								}}
							>
								<Image
									alt="Joshua Levy"
									src="/static/images/homepage/Booth4c.png"
									placeholder="blur"
									blurDataURL="/static/images/homepage/joshlevy.png"
									layout="fill"
									objectFit="cover"
								/>
							</ImgWrapper>
							<Box
								sx={{
									width: '50%',
									margin: 'auto',
								}}
							>
								<Typography
									component={'h3'}
									variant="h3"
									sx={{ textAlign: 'center', color: '#9abdc6' }}
								>
									{t('Joshua Levy')}
								</Typography>
								<Typography
									component={'h4'}
									variant="h4"
									sx={{ textAlign: 'center', pt: 1, color: '#9abdc6' }}
								>
									{t('Founder')}
								</Typography>
							</Box>
						</BoxWrapper>
						<BoxWrapper
							sx={{
								background: 'black',
								display: 'flex',
								borderRadius: '100em 0 0 100em',
								mt: 3,
							}}
						>
							<ImgWrapper
								sx={{
									height: { md: '7.67vw', xs: '45.67vw', sm: '35.67vw' },
									width: { md: '25%', sm: '40%', xs: '40%' },
									overflow: 'hidden',
									borderRadius: '100em',
								}}
							>
								<Image
									alt="Sunny Patel"
									src="/static/images/homepage/sunny1.png"
									placeholder="blur"
									blurDataURL="/static/images/homepage/sunny2.png"
									layout="fill"
									objectFit="cover"
								/>
							</ImgWrapper>
							<Box
								sx={{
									width: '50%',
									margin: 'auto',
								}}
							>
								<Typography
									component={'h3'}
									variant="h3"
									sx={{ textAlign: 'center', color: '#9abdc6' }}
								>
									{t('Sunny Patel')}
								</Typography>
								<Typography
									component={'h4'}
									variant="h4"
									sx={{ textAlign: 'center', pt: 1, color: '#9abdc6' }}
								>
									{t('Programmer')}
								</Typography>
							</Box>
						</BoxWrapper>
						<BoxWrapper
							sx={{
								background: 'black',
								display: 'flex',
								borderRadius: '100em 0 0 100em',
								mt: 3,
							}}
						>
							<ImgWrapper
								sx={{
									height: { md: '7.67vw', xs: '45.67vw', sm: '35.67vw' },
									width: { md: '25%', sm: '40%', xs: '40%' },
									overflow: 'hidden',
									borderRadius: '100em',
								}}
							>
								<Image
									alt="Sunny Patel"
									src="/static/images/homepage/mzainaa.jpg"
									placeholder="blur"
									blurDataURL="/static/images/homepage/sunny2.png"
									layout="fill"
									objectFit="cover"
								/>
							</ImgWrapper>
							<Box
								sx={{
									width: '50%',
									margin: 'auto',
								}}
							>
								<Typography
									component={'h3'}
									variant="h3"
									sx={{ textAlign: 'center', color: '#9abdc6' }}
								>
									{t('Muhammad Zain Arshad Ali')}
								</Typography>
								<Typography
									component={'h4'}
									variant="h4"
									sx={{ textAlign: 'center', pt: 1, color: '#9abdc6' }}
								>
									{t('Programmer')}
								</Typography>
							</Box>
						</BoxWrapper>
						<BoxWrapper
							sx={{
								background: 'black',
								display: 'flex',
								borderRadius: '100em 0 0 100em',
								mt: 3,
							}}
						>
							<ImgWrapper
								sx={{
									height: { md: '7.67vw', xs: '45.67vw', sm: '35.67vw' },
									width: { md: '25%', sm: '40%', xs: '40%' },
									overflow: 'hidden',
									borderRadius: '100em',
								}}
							>
								<Image
									alt="Abdullah Sial"
									src="/static/images/homepage/ab1c.png"
									placeholder="blur"
									blurDataURL="/static/images/homepage/ab2.png"
									layout="fill"
									objectFit="cover"
								/>
							</ImgWrapper>
							<Box
								sx={{
									width: '50%',
									margin: 'auto',
								}}
							>
								<Typography
									component={'h3'}
									variant="h3"
									sx={{ textAlign: 'center', color: '#9abdc6' }}
								>
									{t('Abdullah Sial')}
								</Typography>
								<Typography
									component={'h4'}
									variant="h4"
									sx={{ textAlign: 'center', pt: 1, color: '#9abdc6' }}
								>
									{t('Programmer')}
								</Typography>
							</Box>
						</BoxWrapper>
					</Box>
				</Grid>
			</Grid>
			<BoxWrapper
				sx={{
					background: 'linear-gradient(to top, black 50%, #9abdc6 50%)',
					minHeight: '401px',
					pb: 3,
					overflow: 'hidden',
				}}
			>
				<TypographyH1Primary
					sx={{ textAlign: 'center', fontWeight: 'bolder', mt: 2, mb: 2 }}
				>
					{t('Get In Touch')}
				</TypographyH1Primary>
				<Typography
					component={'h4'}
					variant="h4"
					sx={{ textAlign: 'center', pt: 1 }}
				>
					{t('Lets set it up...')}
				</Typography>
				<Grid
					container
					sx={{
						display: 'flex',
						justifyContent: {
							xs: 'space-around',
							sm: 'space-around',
							md: 'center',
						},
					}}
				>
					<Grid xs={3} sx={{ mt: 7 }}>
						<ImgWrapper
							sx={{
								position: 'relative',
								height: { md: '17.67vw', xs: '45.67vw', sm: '21.67vw' },
							}}
						>
							<Image
								alt="Demo"
								src="/static/images/homepage/demo.png"
								placeholder="blur"
								blurDataURL="/static/images/homepage/demo.png"
								layout="fill"
								objectFit="contain"
							/>
						</ImgWrapper>
						<Typography
							variant="h3"
							sx={{ color: '#9abdc6', textAlign: 'center' }}
						>
							{t('Schedule a Demo')}
						</Typography>
						<Typography
							variant="h5"
							sx={{ color: '#9abdc6', mt: 1, textAlign: 'center' }}
						>
							{t('Get in touch with our product experts')}
						</Typography>
					</Grid>
					<Grid xs={3} sx={{ mt: 7 }}>
						<Box>
							<ImgWrapper
								sx={{
									position: 'relative',
									height: { md: '17.67vw', xs: '45.67vw', sm: '21.67vw' },
								}}
							>
								<Image
									alt="Chat with Us"
									src="/static/images/homepage/chatwithus.png"
									placeholder="blur"
									blurDataURL="/static/images/homepage/chatwithus.png"
									layout="fill"
									objectFit="contain"
								/>
							</ImgWrapper>
							<Typography
								variant="h3"
								sx={{ color: '#9abdc6', textAlign: 'center' }}
							>
								{t('Chat with us')}
							</Typography>
							<Typography
								variant="h5"
								sx={{ color: '#9abdc6', mt: 1, textAlign: 'center' }}
							>
								{t('Connect to our executives right away')}
							</Typography>
						</Box>
					</Grid>
				</Grid>
			</BoxWrapper>
		</BoxWrapper>
	);
}

export default About;
