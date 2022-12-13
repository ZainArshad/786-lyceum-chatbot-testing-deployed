import {
	Box,
	Container,
	Grid,
	Typography,
	styled,
	IconButton,
} from '@mui/material';
import ArrowForward from '@mui/icons-material/ArrowForward';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import NotificationsActiveOutlinedIcon from '@mui/icons-material/NotificationsActiveOutlined';
import MarkunreadOutlinedIcon from '@mui/icons-material/MarkunreadOutlined';
import UpdateIcon from '@mui/icons-material/Update';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import { useTranslation } from 'react-i18next';
import Footer from 'src/components/Footer';
import Scrollbar from 'src/components/Scrollbar';
import { LandingPageButtonBlack } from 'src/components/LandingPagesButton';
import SupportForm from 'src/content/SupportPage/SupportPageBody/supportForm';
import SecondLayer from './SecondLayer';
import ProblemsPart from './ThirdPart';
import ProductsPart from './Products';
import PinboardPart from './PinboardPart';
import FeaturesPart from './FeaturesPart';

const TypographyH1 = styled(Typography)(
	({ theme }) => `
    font-size: ${theme.typography.pxToRem(50)};
`
);

const TypographyH2 = styled(Typography)(
	({ theme }) => `
    font-size: ${theme.typography.pxToRem(17)};
`
);

const BoxWrapper = styled(Box)(
	() => `
    width:100%;
    min-height:101px;
    overflow:hidden;
`
);

const ImgWrapper = styled(Box)(
	() => `
    position: relative;
    z-index: 5;
    width: 100%;
    overflow: hidden;

    img {
      display: block;
      width: 75%;
    }
  `
);

function HomePageBody() {
	const { t } = useTranslation();

	return (
		<Scrollbar>
			<BoxWrapper sx={{ background: '#9abdc6' }}>
				<Grid
					spacing={{ xs: 6, md: 10 }}
					justifyContent="center"
					alignItems="center"
					sx={{ marginLeft: '2%' }}
					container
				>
					<Grid item md={6} pr={{ xs: 0, md: 3 }}>
						<Container maxWidth="md" sx={{ mt: { xs: 1, md: 0 } }}>
							<TypographyH1
								sx={{
									mb: 2,
									color: 'black',
								}}
								variant="h1"
							>
								{t('Simplify Engineering')}
							</TypographyH1>
							<TypographyH2
								sx={{
									lineHeight: 1.5,
									pb: 4,
									color: 'black',
								}}
								variant="h4"
								color="text.secondary"
								fontWeight="normal"
							>
								{t(
									'The Lyceum is an online collaborative software that facilitates hardware system engineering research & development and manufacturing by automating data-intensive tasks, keeping a track record of historical technical data, and offering tools for online groupwork.'
								)}
							</TypographyH2>
							<LandingPageButtonBlack
								icon={<ArrowForward />}
								link="/auth/register"
							>
								{t('Sign Up')}
							</LandingPageButtonBlack>
						</Container>
					</Grid>
					<Grid item md={6}>
						<ImgWrapper sx={{ display: 'flex', justifyContent: 'center' }}>
							<img
								alt="Home"
								src="/static/images/homepage/lyceumtransparent_hd.png"
							/>
						</ImgWrapper>
					</Grid>
				</Grid>
			</BoxWrapper>
			<BoxWrapper
				sx={{
					background: '#0a424f',
					display: { md: 'flex', sm: 'flex', xs: 'grid' },
					gridAutoColumns: { xs: 'min-content', sm: 'none' },
					justifyContent: 'center',
					alignItems: 'center',
					pt: 5,
				}}
			>
				<IconButton>
					<InfoOutlinedIcon
						sx={{
							background: '#9abdc6',
							fontSize: { md: '40px', sm: '40px', xs: '25px' },
						}}
					/>
					<Typography variant="h3" sx={{ color: '#9abdc6', pl: 1 }}>
						{t('About Us')}
					</Typography>
				</IconButton>
				<IconButton
					sx={{
						ml: 1,
					}}
				>
					<NotificationsActiveOutlinedIcon
						sx={{
							background: '#9abdc6',
							fontSize: { md: '40px', sm: '40px', xs: '25px' },
						}}
					/>
					<Typography variant="h3" sx={{ color: '#9abdc6', pl: 1 }}>
						{t('Subscribe')}
					</Typography>
				</IconButton>
				<IconButton
					sx={{
						ml: 1,
					}}
				>
					<MarkunreadOutlinedIcon
						sx={{
							background: '#9abdc6',
							fontSize: { md: '40px', sm: '40px', xs: '25px' },
						}}
					/>
					<Typography variant="h3" sx={{ color: '#9abdc6', pl: 1 }}>
						{t('Contact Us')}
					</Typography>
				</IconButton>
			</BoxWrapper>
			<BoxWrapper
				sx={{
					background: '#0a424f',
					display: 'grid',
					justifyContent: 'center',
					alignItems: 'center',
					pt: 3,
					pb: 5,
				}}
			>
				<Typography variant="h3" sx={{ color: 'white', textAlign: 'center' }}>
					{t("Welcome engineers, here's how the Lyceum can make your life")}
				</Typography>
				<br />
				<Typography
					variant="h1"
					sx={{ color: 'white', textAlign: 'center', mb: 3 }}
				>
					{t('Easy...')}
				</Typography>
				<Box sx={{ position: 'relative', paddingBottom: '56.25%' }}>
					<iframe
						title="Lyceum Walkthrough"
						style={{
							position: 'absolute',
							top: 0,
							left: 0,
							width: '100%',
							height: '100%',
						}}
						src="https://www.youtube.com/embed/Frc6UTnzw8E?showinfo=0"
						frameBorder="0"
						allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture;"
						allowFullScreen
					/>
				</Box>
			</BoxWrapper>
			<SecondLayer />
			<BoxWrapper
				sx={{
					background: '#0a424f',
					display: { md: 'flex', sm: 'grid', xs: 'grid' },
					justifyContent: 'space-around',
					alignItems: 'center',
					pt: 3,
					pb: 3,
				}}
			>
				<IconButton
					sx={{
						ml: 1,
					}}
				>
					<UpdateIcon
						sx={{
							background: '#9abdc6',
							fontSize: { md: '40px', sm: '40px', xs: '25px' },
						}}
					/>
					<Box>
						<Typography variant="h2" sx={{ color: 'white', pl: 1 }}>
							{t('24/7 Support')}
						</Typography>
						<Typography variant="subtitle1" sx={{ color: '#9abdc6', pl: 1 }}>
							{t('Online Chat and Email')}
						</Typography>
					</Box>
				</IconButton>
				<IconButton
					sx={{
						ml: 1,
					}}
				>
					<ShoppingCartIcon
						sx={{
							background: '#9abdc6',
							fontSize: { md: '40px', sm: '40px', xs: '25px' },
						}}
					/>
					<Box>
						<Typography variant="h2" sx={{ color: 'white', pl: 1 }}>
							{t('30-Day Trial')}
						</Typography>
						<Typography variant="subtitle1" sx={{ color: '#9abdc6', pl: 1 }}>
							{t('For Premium Services')}
						</Typography>
					</Box>
				</IconButton>
			</BoxWrapper>
			<ProblemsPart />
			<ProductsPart />
			<PinboardPart />
			<FeaturesPart />
			<SupportForm />
			<Footer />
		</Scrollbar>
	);
}

export default HomePageBody;
