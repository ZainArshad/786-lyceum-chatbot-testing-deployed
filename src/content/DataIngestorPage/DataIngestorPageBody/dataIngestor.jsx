import { useState } from 'react';
import { Box, Grid, Container, Typography } from '@mui/material';
import { useTranslation } from 'next-i18next';
import Image from 'next/image';
import VideoModal from 'src/components/VideoModal';
import {
	BoxWrapper,
	TypographyH2,
	ImgWrapper,
	TypographyH1Primary,
} from 'src/components/LandingPageComps';

function DataIngestorPart() {
	const { t } = useTranslation();
	const [open, setOpen] = useState(false);
	const handleOpen = () => setOpen(true);
	const handleClose = () => setOpen(false);

	return (
		<>
			<VideoModal
				url="https://www.youtube.com/embed/60XZlQ8yGEw?autoplay=1"
				open={open}
				handleClose={handleClose}
			/>
			<BoxWrapper
				sx={{
					width: '100%',
					background: '#9ABDC6',
					position: 'relative',
					overflow: 'hidden',
				}}
			>
				<BoxWrapper
					sx={{
						height: '401px',
						width: '100%',
						background: 'black',
						position: 'absolute',
					}}
				/>
				<Grid container sx={{ positon: 'relative' }}>
					<Grid md={3} sm={12} xs={12} item sx={{ positon: 'relative' }}>
						<ImgWrapper
							sx={{
								height: { md: '615px', sm: '375px', xs: '375px' },
								width: '100%',
								position: 'relative',
							}}
						>
							<Image
								alt="Science Steps"
								src="/static/images/homepage/data_ingestor_1.png"
								layout="fill"
								placeholder="blur"
								blurDataURL="/static/images/homepage/data_ingestor_1_low.png"
							/>
						</ImgWrapper>
					</Grid>
					<Grid md={8} sm={12} xs={12}>
						<Box
							sx={{
								width: '100%',
								textAlign: 'center',
								display: 'grid',
								background: { md: 'none', sm: 'black', xs: 'black' },
								mt: { md: 0, sm: 1, xs: 1 },
								mb: { md: 0, sm: 3, xs: 3 },
								pt: { md: 15, sm: 0, xs: 0 },
							}}
						>
							<TypographyH1Primary
								sx={{
									color: '#9ABDC6',
									zIndex: 7,
									fontWeight: 'bolder',
								}}
							>
								{t('Data Ingestion')}
							</TypographyH1Primary>
							<Container maxWidth="sm" sx={{ zIndex: 7 }}>
								<TypographyH2
									sx={{
										lineHeight: 1.5,
										color: '#9ABDC6',
										textAlign: 'start',
										zIndex: 7,
										mt: 5,
										mb: 3,
									}}
								>
									{t(
										'Once uploaded, all of you and your teams data is easily searchable and accessible in an instant.'
									)}
								</TypographyH2>
							</Container>
							<ImgWrapper
								sx={{
									height: { md: '25vw', xs: '45vw' },
									width: { md: '45vw', xs: '65vw' },
									margin: 'auto',
								}}
							>
								<Image
									alt="Science Steps"
									src="/static/images/homepage/data_ingestor_video_1.png"
									layout="fill"
									style={{ cursor: 'pointer' }}
									onClick={handleOpen}
								/>
							</ImgWrapper>
						</Box>
					</Grid>
				</Grid>
			</BoxWrapper>
			<BoxWrapper
				sx={{
					background: '#80A2AB',
					display: { md: 'flex', xs: 'grid' },
					justifyContent: 'end',
					overflow: 'hidden',
				}}
			>
				<BoxWrapper sx={{ overflow: 'hidden' }}>
					<Typography sx={{ textAlign: 'center', mt: 3 }} variant="h1">
						{t('We transform your data by...')}
					</Typography>
					<BoxWrapper
						sx={{
							display: 'flex',
							marginTop: '5%',
							marginLeft: { md: 5, sm: 1 },
							justifyContent: 'start',
							alignItems: 'center',
							overflowX: 'hidden',
							p: 1.5,
						}}
					>
						<img
							alt="Data Ingestor 3"
							src="/static/images/homepage/data_ingestor_3.png"
							style={{
								borderRadius: '100%',
								border: '7px solid #285967',
								width: '75px',
								height: '75px',
							}}
						/>
						<Box sx={{ overflow: 'hidden' }}>
							<Typography variant="h2" sx={{ ml: 1 }}>
								{t('Accepting a variety of formats')}
							</Typography>
							<TypographyH2 variant="h3" sx={{ ml: 1 }}>
								{t(
									'Excel is common, but we also can accept .txt, .mat and others'
								)}
							</TypographyH2>
						</Box>
					</BoxWrapper>
					<BoxWrapper
						sx={{
							display: 'flex',
							marginTop: '5%',
							justifyContent: 'start',
							alignItems: 'center',
							overflowX: 'hidden',
							marginLeft: { md: 10, sm: 1 },
							p: 1.5,
						}}
					>
						<img
							alt="Data Ingestor 4"
							src="/static/images/homepage/data_ingestor_4.png"
							style={{
								borderRadius: '100%',
								border: '7px solid #285967',
								width: '75px',
								height: '75px',
							}}
						/>
						<Box sx={{ overflow: 'hidden' }}>
							<Typography variant="h2" sx={{ ml: 1 }}>
								{t('Attach descriptors & control access')}
							</Typography>
							<TypographyH2 variant="h3" sx={{ ml: 1 }}>
								{t(
									'You decide what other information gets tied to your data, and who gets to see it'
								)}
							</TypographyH2>
						</Box>
					</BoxWrapper>
					<BoxWrapper
						sx={{
							display: 'flex',
							marginTop: '5%',
							justifyContent: 'start',
							alignItems: 'center',
							overflowX: 'hidden',
							marginLeft: { md: 15, sm: 1 },
							p: 1.5,
						}}
					>
						<img
							alt="Data Ingestor 5"
							src="/static/images/homepage/data_ingestor_5.png"
							style={{
								borderRadius: '100%',
								border: '7px solid #285967',
								width: '75px',
								height: '75px',
							}}
						/>
						<Box sx={{ overflow: 'hidden' }}>
							<Typography variant="h2" sx={{ ml: 1 }}>
								{t('Automate')}
							</Typography>
							<TypographyH2
								variant="h3"
								sx={{ ml: 1, wordWrap: 'break', whiteSpace: 'initial' }}
							>
								{t(
									'Once File is uploaded, all other data in the same starting form can be automatically uploaded'
								)}
							</TypographyH2>
						</Box>
					</BoxWrapper>
				</BoxWrapper>
				<ImgWrapper
					sx={{
						height: { md: '40vw', xs: '45vw' },
						width: { md: '55vw', xs: '50vw' },
						mt: 7,
						ml: 3,
						mb: 3,
						transform: {
							xs: 'translate(25%,-30%)',
							md: 'translate(10%,-15%)',
							sm: 'translate(20%,-20%)',
						},
						borderRadius: '100%',
						borderStyle: 'solid',
						borderWidth: '0 0 9px 15px',
						borderColor: '#285967',
					}}
				>
					<Image
						alt="Science Steps"
						src="/static/images/homepage/data_ingestor_2.png"
						layout="fill"
					/>
				</ImgWrapper>
			</BoxWrapper>
		</>
	);
}

export default DataIngestorPart;
