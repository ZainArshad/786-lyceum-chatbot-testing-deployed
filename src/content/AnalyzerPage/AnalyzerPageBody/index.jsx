import { BoxWrapper, ImgWrapper } from 'src/components/LandingPageComps';
import { Box, Typography, Grid, Container } from '@mui/material';
import Image from 'next/image';
import { useTranslation } from 'next-i18next';
import SupportForm from 'src/content/SupportPage/SupportPageBody/supportForm';
import Footer from 'src/components/Footer';
import Scrollbar from 'src/components/Scrollbar';
import LargeScreenVersion from './LargScreenVersion';
import SmallScreenVersion from './SmallScreenVersion';

function AnalyzerPageBody() {
	const { t } = useTranslation();
	return (
		<Scrollbar>
			<BoxWrapper
				sx={{
					background: '#9abdc6',
					position: 'relative',
					overflow: 'hidden',
				}}
			>
				<Box
					sx={{
						borderBottom: '150px solid transparent',
						borderLeft: '500px solid #3C6874',
						borderTop: '150px solid transparent',
						position: 'absolute',
					}}
				/>
				<ImgWrapper
					sx={{
						height: { md: '525px', sm: '351px', xs: '175px' },
						width: '75%',
						position: 'relative',
						margin: 'auto',
						mt: 1.5,
					}}
				>
					<Image
						alt="Science Steps"
						src="/static/images/homepage/usedata.png"
						layout="fill"
					/>
				</ImgWrapper>

				<Grid container sx={{ mt: { md: 3, sm: 5, xs: 11 }, mb: 1.5 }}>
					<Grid
						md={4}
						sm={12}
						xs={12}
						sx={{ display: 'flex', justifyContent: 'center' }}
					>
						<Box
							sx={{
								background: '#adcad1',
								width: '225px',
								p: 2,
							}}
						>
							<Typography variant="h4">{t('Analyzer')}</Typography>
							<Typography variant="h1">
								{t('A powerful way to use data')}
							</Typography>
						</Box>
					</Grid>
					<Grid md={8} sm={12} xs={12} sx={{ mt: 3 }}>
						<Container maxWidth="lg">
							<Typography variant="h4">
								{t(
									'Having an entire teams database at your fingertips, the analyzer function of the lyceum gives the ability for engineers to gain data based insights that all pulled from any experiment done at any point in time.'
								)}
							</Typography>
							<Typography variant="h4" sx={{ mt: 3 }}>
								{t(
									'Gone are the days when knowledge leaves a company when employees choose to leave'
								)}
							</Typography>
						</Container>
					</Grid>
				</Grid>
			</BoxWrapper>
			<BoxWrapper
				sx={{ background: 'black', display: { md: 'block', xs: 'none' } }}
			>
				<LargeScreenVersion />
			</BoxWrapper>
			<BoxWrapper
				sx={{ background: 'black', display: { md: 'none', xs: 'block' } }}
			>
				<SmallScreenVersion />
			</BoxWrapper>
			<SupportForm />
			<Footer />
		</Scrollbar>
	);
}

export default AnalyzerPageBody;
