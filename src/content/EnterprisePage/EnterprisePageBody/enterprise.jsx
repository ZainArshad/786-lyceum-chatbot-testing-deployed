import { Box, Grid, Typography } from '@mui/material';
import { useTranslation } from 'next-i18next';
import TaskAltIcon from '@mui/icons-material/TaskAlt';
import {
	BoxWrapper,
	ImgWrapper,
	TypographyH1Primary,
	TypographyH2,
} from 'src/components/LandingPageComps';
import Image from 'next/image';

function EnterprisePart() {
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
						<Box sx={{ display: 'flex' }}>
							<ImgWrapper
								sx={{
									height: { md: '21.67vw', xs: '45.67vw', sm: '21.67vw' },
									width: '50%',
									mt: 3,
								}}
							>
								<Image
									alt="Enterprise 1"
									src="/static/images/homepage/enterprise_1.png"
									placeholder="blur"
									blurDataURL="/static/images/homepage/enterprise_1_low.png"
									layout="fill"
									objectFit="cover"
								/>
							</ImgWrapper>
						</Box>
						<ImgWrapper
							sx={{
								height: { md: '25.67vw', xs: '45.67vw', sm: '35.67vw' },
								width: '75%',
								mt: 3,
								ml: 5,
								mb: 3,
							}}
						>
							<Image
								alt="Enterprise 1"
								src="/static/images/homepage/enterprise_2.png"
								placeholder="blur"
								blurDataURL="/static/images/homepage/enterprise_2_low.png"
								layout="fill"
								objectFit="cover"
							/>
						</ImgWrapper>
					</BoxWrapper>
				</Grid>
				<Grid item md={5} sm={12} xs={12} pr={{ xs: 0, md: 3 }} ml={1}>
					<Typography variant="h2">{t('Enterprise')}</Typography>
					<TypographyH1Primary sx={{ fontWeight: 'bolder', mt: 2, mb: 2 }}>
						{t('We find a solution that works for you.')}
					</TypographyH1Primary>
					<TypographyH2
						sx={{
							lineHeight: 1.5,
							pb: 4,
						}}
						variant="h4"
						color="text.secondary"
						fontWeight="normal"
					>
						{t(
							'Whatever you and your team needs, whatever your company requires, we can find a way to make The Lyceum benefit.'
						)}
					</TypographyH2>
					<Box sx={{ display: 'flex', alignItems: 'center' }}>
						<TaskAltIcon sx={{ mr: 1, fontSize: '35px' }} />
						<Typography variant="h2">{t('On-site Installation')}</Typography>
					</Box>
					<TypographyH2
						sx={{
							lineHeight: 1.5,
							pb: 4,
							pt: 2,
						}}
						variant="h4"
						color="text.secondary"
						fontWeight="normal"
					>
						{t(
							'For those enterprises that value their security and that extra piece of mind.'
						)}
					</TypographyH2>
					<Box sx={{ display: 'flex', alignItems: 'center' }}>
						<TaskAltIcon sx={{ mr: 1, fontSize: '35px' }} />
						<Typography variant="h2">{t('Custom Data Ingestion')}</Typography>
					</Box>
					<TypographyH2
						sx={{
							lineHeight: 1.5,
							pb: 4,
							pt: 2,
						}}
						variant="h4"
						color="text.secondary"
						fontWeight="normal"
					>
						{t(
							'For the teams that have extra specialization needs to transform their data to take advantage of the Lyceum.'
						)}
					</TypographyH2>
					<Box sx={{ display: 'flex', alignItems: 'center' }}>
						<TaskAltIcon sx={{ mr: 1, fontSize: '35px' }} />
						<Typography variant="h2">
							{t('Custom Analysis Algorithms')}
						</Typography>
					</Box>
					<TypographyH2
						sx={{
							lineHeight: 1.5,
							pb: 4,
							pt: 2,
						}}
						variant="h4"
						color="text.secondary"
						fontWeight="normal"
					>
						{t(
							'Automate the most time-consuming and data-intesive activities so your engineers can engineer instead.'
						)}
					</TypographyH2>
				</Grid>
			</Grid>
		</BoxWrapper>
	);
}

export default EnterprisePart;
