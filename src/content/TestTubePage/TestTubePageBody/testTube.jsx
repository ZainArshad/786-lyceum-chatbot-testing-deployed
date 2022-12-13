import { Box, Grid, styled, Typography, Container, Icon } from '@mui/material';
import { useTranslation } from 'next-i18next';
import Image from 'next/image';

const BoxWrapper = styled(Box)(
	() => `
    width:100%;
    min-height:101px;
    overflow:auto;
`
);

const TypographyH1Primary = styled(Typography)(
	({ theme }) => `
    font-size: ${theme.typography.pxToRem(36)};
`
);

const ImgWrapper = styled(Box)(
	() => `
    position: relative;
    z-index: 5;
    width: 50%;
    overflow: hidden;

    img {
      display: block;
      width: 100%;
    }
  `
);

function TestTubePart() {
	const { t } = useTranslation();

	return (
		<BoxWrapper sx={{ background: '#9abdc6', pb: 5 }}>
			<Grid container>
				<Grid
					item
					md={6}
					sm={12}
					xs={12}
					sx={{
						background: 'black',
						minHeight: '201px',
						justifyContent: 'center',
						alignItems: 'center',
						alignContent: 'center',
						display: 'grid',
					}}
				>
					<Container maxWidth="sm" sx={{ ml: { sm: 5, md: 0 } }}>
						<TypographyH1Primary variant="h1" sx={{ color: '#9abdc6' }}>
							{t('TestTube')}
						</TypographyH1Primary>
						<Typography
							sx={{
								mb: 2,
								color: '#9abdc6',
								mt: 3,
							}}
							variant="h3"
						>
							{t(
								'A single place where you can find everything you need to run and reproduce an experiment'
							)}
						</Typography>
						<Box sx={{ display: 'flex', alignItems: 'center' }}>
							<Icon sx={{ width: '50px', height: '50px' }}>
								<img
									alt="Test Tube 1"
									style={{ width: '100%', height: '100%' }}
									src="/static/images/homepage/testtube1.PNG"
								/>
							</Icon>
							<Typography
								sx={{
									mb: 2,
									color: 'lightgrey',
									mt: 3,
									ml: 1.5,
								}}
								variant="h4"
							>
								{t(
									'List out all of the equipment and instruments needed for an experiment'
								)}
							</Typography>
						</Box>
						<Box sx={{ display: 'flex', alignItems: 'center' }}>
							<Icon sx={{ width: '50px', height: '50px' }}>
								<img
									alt="Test Tube 2"
									style={{ width: '100%', height: '100%' }}
									src="/static/images/homepage/testtube2.PNG"
								/>
							</Icon>
							<Typography
								sx={{
									mb: 2,
									color: 'lightgrey',
									mt: 3,
									ml: 1.5,
								}}
								variant="h4"
							>
								{t(
									'Upload videos, media, and other assets like scripts, showing your community how to reproduce your experiment step by step'
								)}
							</Typography>
						</Box>
						<Box sx={{ display: 'flex', alignItems: 'center' }}>
							<Icon sx={{ width: '50px', height: '50px' }}>
								<img
									alt="Test Tube 3"
									style={{ width: '100%', height: '100%' }}
									src="/static/images/homepage/testtube3.PNG"
								/>
							</Icon>
							<Typography
								sx={{
									mb: 2,
									color: 'lightgrey',
									mt: 3,
									ml: 1.5,
								}}
								variant="h4"
							>
								{t(
									'Standardize data and provide exmaple data so that others can compare and share insights'
								)}
							</Typography>
						</Box>
					</Container>
				</Grid>
				<Grid
					item
					md={4}
					sm={12}
					xs={12}
					sx={{
						background: 'black',
						minHeight: '201px',
					}}
				>
					<ImgWrapper
						sx={{
							position: 'relative',
							height: { md: '35.67vw', xs: '97.67vw', sm: '91.67vw' },
							width: '100%',
							ml: { md: 25, sm: 0, xs: 0 },
							mt: { md: 15, sm: 0, xs: 0 },
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
		</BoxWrapper>
	);
}

export default TestTubePart;
