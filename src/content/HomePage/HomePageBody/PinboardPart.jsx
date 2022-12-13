import { useTranslation } from 'react-i18next';
import { Box, Grid, Container, Typography, styled, Icon } from '@mui/material';
import Image from 'next/image';

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

const TypographyH1Primary = styled(Typography)(
	({ theme }) => `
    font-size: ${theme.typography.pxToRem(36)};
`
);

const BoxWrapper = styled(Box)(
	() => `
    width:100%;
    min-height:101px;
    overflow:hidden;
`
);

function PinboardPart() {
	const { t } = useTranslation();
	return (
		<BoxWrapper sx={{ background: '#9abdc6', pt: 3, pb: 3 }}>
			<Grid container spacing={3}>
				<Grid item sm={7} xs={12}>
					<Container maxWidth="lg">
						<Typography variant="h2">{t('Your new best friend')}</Typography>
						<TypographyH1Primary
							sx={{
								pt: 3,
								color: '#0a424f',
							}}
							variant="h1"
						>
							{t('Pinboard')}
						</TypographyH1Primary>
						<Typography
							variant="h4"
							sx={{
								pt: 3,
							}}
						>
							{t(
								'Attach any data, experiment, comment, or asset to our pinboard to pull into a session and analyze.'
							)}
						</Typography>
						<Grid
							sx={{
								pt: 3,
							}}
							container
							spacing={3}
						>
							<Grid item xs={6}>
								<Box>
									<Icon sx={{ width: '50px', height: '50px' }}>
										<img
											alt="Pin Icon 11"
											src="/static/images/homepage/pinicon11.PNG"
											style={{ width: '100%', height: '100%' }}
										/>
									</Icon>
									<Typography variant="h3">{t('Data uploaded')}</Typography>
									<Typography variant="body1">
										{t(
											'Pin your data from different uploads to compare on a graph'
										)}
									</Typography>
								</Box>
							</Grid>
							<Grid item xs={6}>
								<Box>
									<Icon sx={{ width: '50px', height: '50px' }}>
										<img
											alt="Pin Icon 12"
											src="/static/images/homepage/pinicon12.PNG"
											style={{ width: '100%', height: '100%' }}
										/>
									</Icon>
									<Typography variant="h3">
										{t('Test Tube Procedures')}
									</Typography>
									<Typography variant="body1">
										{t(
											'Pin test procedures to describe to another user how to data was collected'
										)}
									</Typography>
								</Box>
							</Grid>
							<Grid item xs={6}>
								<Box>
									<Icon sx={{ width: '50px', height: '50px' }}>
										<img
											alt="Pin Icon 14"
											src="/static/images/homepage/pinicon14.PNG"
											style={{ width: '100%', height: '100%' }}
										/>
									</Icon>
									<Typography variant="h3">{t('Posts')}</Typography>
									<Typography variant="body1">
										{t(
											'Pin questions, comments and other posts to capture cross-functional feedback'
										)}
									</Typography>
								</Box>
							</Grid>
							<Grid item xs={6}>
								<Box>
									<Icon sx={{ width: '50px', height: '50px' }}>
										<img
											alt="Pin Icon 13"
											src="/static/images/homepage/pinicon13.PNG"
											style={{ width: '100%', height: '100%' }}
										/>
									</Icon>
									<Typography variant="h3">{t('Files')}</Typography>
									<Typography variant="body1">
										{t(
											'Pin files such as code-scripts sample data, audio files, etc'
										)}
									</Typography>
								</Box>
							</Grid>
						</Grid>
					</Container>
				</Grid>
				<Grid item sm={5} xs={12}>
					<BoxWrapper
						sx={{
							background: 'linear-gradient(to left, black 50%, #9abdc6 50%)',
							position: 'relative',
							height: { md: '36.67vw', xs: '97.67vw', sm: '67.67vw' },
							mb: 3,
						}}
					>
						<ImgWrapper
							sx={{
								height: '80%',
								width: '55%',
								position: 'absolute',
								top: 50,
								right: 50,
							}}
						>
							<Image
								alt="Manufatures"
								src="/static/images/homepage/pinboard.png"
								layout="fill"
								objectFit="cover"
							/>
						</ImgWrapper>
					</BoxWrapper>
				</Grid>
			</Grid>
		</BoxWrapper>
	);
}

export default PinboardPart;
