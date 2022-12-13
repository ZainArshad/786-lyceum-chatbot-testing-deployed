import { ImgWrapper } from 'src/components/LandingPageComps';
import { Box, Grid, Typography } from '@mui/material';
import { useTranslation } from 'next-i18next';
import Image from 'next/image';

function LargeScreenVersion() {
	const { t } = useTranslation();
	return (
		<Grid container>
			<Grid item xs={4} sx={{ position: 'relative' }}>
				<ImgWrapper
					sx={{
						height: { md: '475px', sm: '351px', xs: '175px' },
						width: '75%',
						position: 'relative',
						margin: 'auto',
						mt: 1.5,
					}}
				>
					<Image
						alt="Analyzer Page 2"
						src="/static/images/homepage/analyzer_page_2.png"
						layout="fill"
					/>
				</ImgWrapper>
				<ImgWrapper
					sx={{
						height: { md: '475px', sm: '351px', xs: '175px' },
						width: '75%',
						position: 'absolute',
						margin: 'auto',
						bottom: 0,
						left: '12%',
					}}
				>
					<Image
						alt="Analyzer Page 5"
						src="/static/images/homepage/analyzer_page_5.png"
						layout="fill"
					/>
				</ImgWrapper>
			</Grid>
			<Grid item xs={4}>
				<Box
					sx={{
						background: '#9abdc6',
						width: '95%',
						mt: 2,
						textAlign: 'center',
						position: 'relative',
						p: 5,
					}}
				>
					<Typography variant="h2">{t('Graph and compare')}</Typography>
					<Typography variant="body2" sx={{ lineHeight: 2.1 }}>
						{t(
							'Data act as nodes that can be easily graphed visually. Users are able to attach any descriptors to graphs (such as TestTubes) to portray cross-functionality the most amount of information in the most simplistic ways'
						)}
					</Typography>
					<Box
						sx={{
							borderBottom: '25px solid transparent',
							borderRight: '50px solid #9abdc6',
							borderTop: '25px solid transparent',
							position: 'absolute',
							left: -50,
							top: '40%',
						}}
					/>
				</Box>
				<Box
					sx={{
						background: '#9abdc6',
						width: '95%',
						mt: 2,
						textAlign: 'center',
						position: 'relative',
						p: 5,
					}}
				>
					<Typography variant="h2">{t('Generate limits')}</Typography>
					<Typography variant="body2" sx={{ lineHeight: 2.1 }}>
						{t(
							'Boundary condition can tells you if your test results pass or fail a target performance criteria.'
						)}
					</Typography>
					<Box
						sx={{
							borderBottom: '25px solid transparent',
							borderLeft: '50px solid #9abdc6',
							borderTop: '25px solid transparent',
							position: 'absolute',
							right: -50,
							top: '40%',
						}}
					/>
				</Box>
				<Box
					sx={{
						background: '#9abdc6',
						width: '95%',
						mt: 2,
						textAlign: 'center',
						position: 'relative',
						p: 5,
					}}
				>
					<Typography variant="h2">{t('Calculate Statistics')}</Typography>
					<Typography variant="body2" sx={{ lineHeight: 2.1 }}>
						{t(
							'Post-process data using code less statistics box to add, subtract, multiply and divide nodes, as well as find standard deviation, max/min and normalized results of multiplse nodes.'
						)}
					</Typography>
					<Typography variant="body2" sx={{ lineHeight: 2.1 }}>
						{t('(More to come)')}
					</Typography>
					<Box
						sx={{
							borderBottom: '25px solid transparent',
							borderLeft: '50px solid #9abdc6',
							borderTop: '25px solid transparent',
							position: 'absolute',
							right: -50,
							top: '40%',
						}}
					/>
				</Box>
				<Box
					sx={{
						background: '#9abdc6',
						width: '95%',
						mt: 2,
						textAlign: 'center',
						position: 'relative',
						p: 5,
					}}
				>
					<Typography variant="h2">{t('Find Yield')}</Typography>
					<Typography variant="body2" sx={{ lineHeight: 2.1 }}>
						{t(
							'Process large amounts of data against limits to find yield and other advanced statistics such as Cpk, failure signatures, and export list of failure serial numbers'
						)}
					</Typography>
					<Box
						sx={{
							borderBottom: '25px solid transparent',
							borderRight: '50px solid #9abdc6',
							borderTop: '25px solid transparent',
							position: 'absolute',
							left: -50,
							top: '40%',
						}}
					/>
				</Box>
			</Grid>
			<Grid item xs={4}>
				<Box
					sx={{
						background: 'black',
						width: '95%',
						mt: 2,
						textAlign: 'center',
						position: 'relative',
						p: 5,
					}}
				>
					<Typography variant="h2">{t('Graph and compare')}</Typography>
					<Typography variant="body2" sx={{ lineHeight: 2.1 }}>
						{t(
							'Data act as nodes that can be easily graphed visually. Users are able to attach any descriptors to graphs (such as TestTubes) to portray cross-functionality the most amount of information in the most simplistic ways'
						)}
					</Typography>
				</Box>
				<ImgWrapper
					sx={{
						height: { md: '305px', sm: '301px', xs: '155px' },
						width: '75%',
						position: 'relative',
						margin: 'auto',
						mt: 1.5,
					}}
				>
					<Image
						alt="Analyzer Page 3"
						src="/static/images/homepage/analyzer_page_3.png"
						layout="fill"
					/>
				</ImgWrapper>
				<ImgWrapper
					sx={{
						height: { md: '305px', sm: '301px', xs: '155px' },
						width: '75%',
						position: 'relative',
						margin: 'auto',
						mt: 1.5,
					}}
				>
					<Image
						alt="Analyzer Page 4"
						src="/static/images/homepage/analyzer_page_4.png"
						layout="fill"
					/>
				</ImgWrapper>
			</Grid>
		</Grid>
	);
}

export default LargeScreenVersion;
