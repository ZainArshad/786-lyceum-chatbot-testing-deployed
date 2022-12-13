import { useTranslation } from 'react-i18next';
import { Box, Grid, Container, Typography, styled } from '@mui/material';
import Image from 'next/image';
import { LandingPageButton } from 'src/components/LandingPagesButton';

const ImgWrapper = styled(Box)(
	() => `
      position: relative;
      z-index: 5;
      width: 100%;
      overflow: hidden;
  
      img {
        display: block;
        width: 95%;
      }
    `
);

const BoxWrapper = styled(Box)(
	() => `
    width:100%;
    min-height:101px;
    overflow:hidden;
`
);

function SecondLayer() {
	const { t } = useTranslation();

	return (
		<BoxWrapper sx={{ background: '#0a424f' }}>
			<Grid container spacing={2}>
				<Grid item xs={12} md={6}>
					<Grid container>
						<Grid item xs={12} sm={6}>
							<BoxWrapper
								sx={{
									background: '#9abdc6',
									height: { md: '26.67vw', xs: '97.67vw', sm: '67.67vw' },
									display: 'flex',
									justifyContent: 'center',
									alignItems: 'center',
								}}
							>
								<Container maxWidth="sm">
									<Typography variant="h1">
										{t('Research & Development Engineers')}
									</Typography>
									<Typography
										sx={{
											pt: 1,
										}}
										variant="subtitle2"
									>
										{t(
											'For teams and independent contributors working in different principles and locations.'
										)}
									</Typography>
									<LandingPageButton
										link="/auth/register"
										styleSx={{ mt: 1, width: '90%' }}
									>
										{t('Sign Up')}
									</LandingPageButton>
								</Container>
							</BoxWrapper>
						</Grid>
						<Grid item xs={12} sm={6}>
							<ImgWrapper
								sx={{
									position: 'relative',
									height: { md: '26.67vw', xs: '97.67vw', sm: '67.67vw' },
									width: '100%',
								}}
							>
								<Image
									alt="Engineering Background"
									src="/static/images/homepage/engineerbg 1.svg"
									placeholder="blur"
									blurDataURL="/static/images/homepage/engineerbg1_low.png"
									layout="fill"
									objectFit="cover"
								/>
							</ImgWrapper>
						</Grid>
					</Grid>
				</Grid>

				<Grid item xs={12} md={6}>
					<Grid container>
						<Grid item xs={12} sm={6}>
							<BoxWrapper
								sx={{
									background: '#9abdc6',
									height: { md: '26.67vw', xs: '97.67vw', sm: '67.67vw' },
									display: 'flex',
									justifyContent: 'center',
									alignItems: 'center',
								}}
							>
								<Container maxWidth="sm">
									<Typography variant="h1">
										{t('Manufacturing Engineers')}
									</Typography>
									<Typography
										sx={{
											pt: 1,
										}}
										variant="subtitle2"
									>
										{t('Large dataset processing and automation tools for ')}{' '}
										<b style={{ color: 'black' }}>
											validation, yield calculation
										</b>{' '}
										and <b style={{ color: 'black' }}>root cause analysis.</b>
									</Typography>
									<LandingPageButton
										link="/auth/register"
										styleSx={{ mt: 1, width: '90%' }}
									>
										{t('Sign Up')}
									</LandingPageButton>
								</Container>
							</BoxWrapper>
						</Grid>
						<Grid item xs={12} sm={6}>
							<ImgWrapper
								sx={{
									position: 'relative',
									height: { md: '26.67vw', xs: '97.67vw', sm: '67.67vw' },
									width: '100%',
								}}
							>
								<Image
									alt="Manufatures"
									src="/static/images/homepage/manugrain 1.png"
									placeholder="blur"
									blurDataURL="/static/images/homepage/manugrain 1_low.png"
									layout="fill"
									objectFit="cover"
								/>
							</ImgWrapper>
						</Grid>
					</Grid>
				</Grid>
			</Grid>
		</BoxWrapper>
	);
}

export default SecondLayer;
