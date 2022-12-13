import { ImgWrapper, BoxWrapper } from 'src/components/LandingPageComps';
import { Typography } from '@mui/material';
import { useTranslation } from 'next-i18next';
import Image from 'next/image';

function SmallScreenVersion() {
	const { t } = useTranslation();
	return (
		<>
			<BoxWrapper
				sx={{
					background: '#9abdc6',
					width: '91%',
					margin: 'auto',
					mt: 2.1,
					textAlign: 'center',
					position: 'relative',
					p: 1,
				}}
			>
				<ImgWrapper
					sx={{
						height: { md: '475px', sm: '401px', xs: '225px' },
						width: '50%',
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
				<Typography variant="h2" sx={{ mt: 2 }}>
					{t('Graph and compare')}
				</Typography>
				<Typography variant="body2" sx={{ lineHeight: 2.1 }}>
					{t(
						'Data act as nodes that can be easily graphed visually. Users are able to attach any descriptors to graphs (such as TestTubes) to portray cross-functionality the most amount of information in the most simplistic ways'
					)}
				</Typography>
			</BoxWrapper>
			<BoxWrapper
				sx={{
					background: '#9abdc6',
					width: '91%',
					margin: 'auto',
					mt: 2,
					textAlign: 'center',
					position: 'relative',
					p: 1,
				}}
			>
				<ImgWrapper
					sx={{
						height: { md: '475px', sm: '401px', xs: '225px' },
						width: '50%',
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
				<Typography variant="h2" sx={{ mt: 2.1 }}>
					{t('Generate limits')}
				</Typography>
				<Typography variant="body2" sx={{ lineHeight: 2.1 }}>
					{t(
						'Boundary condition can tells you if your test results pass or fail a target performance criteria.'
					)}
				</Typography>
			</BoxWrapper>
			<BoxWrapper
				sx={{
					background: '#9abdc6',
					width: '91%',
					margin: 'auto',
					mt: 2.1,
					textAlign: 'center',
					position: 'relative',
					p: 1,
				}}
			>
				<ImgWrapper
					sx={{
						height: { md: '475px', sm: '401px', xs: '225px' },
						width: '50%',
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
				<Typography variant="h2" sx={{ mt: 2.1 }}>
					{t('Calculate Statistics')}
				</Typography>
				<Typography variant="body2" sx={{ lineHeight: 2.1 }}>
					{t(
						'Post-process data using code less statistics box to add, subtract, multiply and divide nodes, as well as find standard deviation, max/min and normalized results of multiplse nodes.'
					)}
				</Typography>
				<Typography variant="body2" sx={{ lineHeight: 2.1 }}>
					{t('(More to come)')}
				</Typography>
			</BoxWrapper>
			<BoxWrapper
				sx={{
					background: '#9abdc6',
					width: '91%',
					margin: 'auto',
					mt: 2.1,
					textAlign: 'center',
					position: 'relative',
					p: 1,
					mb: 2.1,
				}}
			>
				<ImgWrapper
					sx={{
						height: { md: '475px', sm: '401px', xs: '225px' },
						width: '50%',
						position: 'relative',
						margin: 'auto',
						mt: 1.5,
					}}
				>
					<Image
						alt="Analyzer Page 5"
						src="/static/images/homepage/analyzer_page_5.png"
						layout="fill"
					/>
				</ImgWrapper>
				<Typography variant="h2" sx={{ mt: 2.1 }}>
					{t('Find Yield')}
				</Typography>
				<Typography variant="body2" sx={{ lineHeight: 2.1 }}>
					{t(
						'Process large amounts of data against limits to find yield and other advanced statistics such as Cpk, failure signatures, and export list of failure serial numbers'
					)}
				</Typography>
			</BoxWrapper>
		</>
	);
}

export default SmallScreenVersion;
