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
import { LandingPageButtonBlack } from 'src/components/LandingPagesButton';
import Image from 'next/image';
import DoneIcon from '@mui/icons-material/Done';

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

const listItems = [
	'Standardizing measurement techniques',
	'Cleaning data',
	'Storing data in a singular, searchable database',
	'Automative repetitive functions',
	'Securely sharing data with teammates',
];

function ProblemsPart() {
	const { t } = useTranslation();

	return (
		<BoxWrapper sx={{ background: '#9abdc6', pt: 3, pb: 3 }}>
			<Grid container sx={{ mb: 3 }}>
				<Grid item sm={6} xs={12}>
					<Box sx={{ mt: 5 }}>
						<Container maxWidth="lg">
							<TypographyH1Primary
								sx={{
									mb: 2,
									color: 'black',
								}}
								variant="h1"
							>
								{t('Have These Problems?')}
							</TypographyH1Primary>
							<Typography variant="subtitle2">
								{t(
									'As a team of engineers ourselves we have encountered many inefficiencies when engineering including.'
								)}
							</Typography>
							<List>
								{listItems.map((list, i) => {
									return (
										<ListItem key={i}>
											<Icon>
												<DoneIcon />
											</Icon>
											<Typography variant="body1" sx={{ ml: 1 }}>
												{t(list)}
											</Typography>
										</ListItem>
									);
								})}
							</List>
							<LandingPageButtonBlack
								styleSx={{ mt: 3, mb: 3, width: '50%' }}
								link="/auth/register"
							>
								{t('Sign Up')}
							</LandingPageButtonBlack>
						</Container>
					</Box>
				</Grid>
				<Grid item sm={6} xs={12} sx={{ position: 'relative' }}>
					<BoxWrapper
						sx={{
							background: 'black',
							height: '75%',
							position: 'absolute',
							width: '75%',
							bottom: -50,
							right: 50,
						}}
					/>
					<Grid container sx={{ mt: 5, justifyContent: 'center' }}>
						<Grid xs={10}>
							<ImgWrapper
								sx={{
									position: 'relative',
									height: '16.67vw',
									width: '100%',
									display: { md: 'block', xs: 'none' },
								}}
							>
								<Image
									alt="Manufatures"
									src="/static/images/homepage/rectangle_1.png"
									placeholder="blur"
									blurDataURL="/static/images/homepage/rectangle_1_low.png"
									layout="fill"
									objectFit="cover"
								/>
							</ImgWrapper>
							<ImgWrapper
								sx={{
									position: 'relative',
									height: '40vw',
									width: '100%',
									display: { md: 'none', xs: 'block' },
								}}
							>
								<Image
									alt="Manufatures"
									src="/static/images/homepage/rectangle_1_low.png"
									placeholder="blur"
									blurDataURL="/static/images/homepage/rectangle_1_low.png"
									layout="fill"
									objectFit="cover"
								/>
							</ImgWrapper>
						</Grid>
					</Grid>
					<Grid container sx={{ mt: 2.5, justifyContent: 'center' }}>
						<Grid item xs={5}>
							<ImgWrapper
								sx={{
									position: 'relative',
									height: '16.67vw',
									width: '100%',
									display: { md: 'block', xs: 'none' },
								}}
							>
								<Image
									alt="Manufatures"
									src="/static/images/homepage/rectangle_3.png"
									placeholder="blur"
									blurDataURL="/static/images/homepage/rectangle_3_low.png"
									layout="fill"
									objectFit="cover"
								/>
							</ImgWrapper>
							<ImgWrapper
								sx={{
									position: 'relative',
									height: '40vw',
									width: '100%',
									display: { md: 'none', xs: 'block' },
								}}
							>
								<Image
									alt="Manufatures"
									src="/static/images/homepage/rectangle_3_low.png"
									placeholder="blur"
									blurDataURL="/static/images/homepage/rectangle_3_low.png"
									layout="fill"
									objectFit="cover"
								/>
							</ImgWrapper>
						</Grid>
						<Grid item xs={5} sx={{ ml: 5 }}>
							<ImgWrapper
								sx={{
									position: 'relative',
									height: '16.67vw',
									width: '100%',
									display: { md: 'block', xs: 'none' },
								}}
							>
								<Image
									alt="Manufatures"
									src="/static/images/homepage/rectangle_2.png"
									placeholder="blur"
									blurDataURL="/static/images/homepage/rectangle_2_low.png"
									layout="fill"
									objectFit="cover"
								/>
							</ImgWrapper>
							<ImgWrapper
								sx={{
									position: 'relative',
									height: '40vw',
									width: '100%',
									display: { md: 'none', xs: 'block' },
								}}
							>
								<Image
									alt="Manufatures"
									src="/static/images/homepage/rectangle_2_low.png"
									placeholder="blur"
									blurDataURL="/static/images/homepage/rectangle_2_low.png"
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

export default ProblemsPart;
