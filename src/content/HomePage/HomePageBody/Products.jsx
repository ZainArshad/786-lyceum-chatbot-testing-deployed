import { useTranslation } from 'react-i18next';
import { Box, Grid, Container, Typography, styled, Stack } from '@mui/material';
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

const products = [
	{
		name: 'Test Tube',
		description:
			'A single place to store and find everything you need to run and reproduce an experiment.',
		image: '/static/images/homepage/product_2.png',
		low_image: '/static/images/homepage/product_2_low.png',
	},
	{
		name: 'Data Ingestor',
		description:
			'Once upload all your data is easily searchable and accessible to you and your entire team.',
		image: '/static/images/homepage/product_1.png',
		low_image: '/static/images/homepage/product_1_low.png',
	},
	{
		name: 'Analyzer',
		description:
			'Graph and post process data effectively with no-code functionalities and collaborate by sharing sessions.',
		image: '/static/images/homepage/product_4.png',
		low_image: '/static/images/homepage/product_4_low.png',
	},
	{
		name: 'Collaboration',
		description:
			'Connect all data, assets, colleagues and conversations together to create valuable insights that never get lost.',
		image: '/static/images/homepage/product_3.png',
		low_image: '/static/images/homepage/product_3_low.png',
	},
];
function Products() {
	const { t } = useTranslation();

	return (
		<BoxWrapper sx={{ background: '#9abdc6', pt: 3, pb: 3 }}>
			<Container
				sx={{
					pt: { xs: 6, md: 12 },
					pb: { xs: 5, md: 15 },
				}}
				maxWidth="lg"
			>
				<TypographyH1Primary
					textAlign="center"
					sx={{
						mb: 2,
					}}
					variant="h1"
				>
					{t('All Our Products')}
				</TypographyH1Primary>
				<TypographyH2
					sx={{
						pb: 4,
						lineHeight: 1.5,
					}}
					textAlign="center"
					variant="h4"
					fontWeight="normal"
				>
					{t(
						'For critical functions that work together to promote scientific-method collaborate and learning'
					)}
				</TypographyH2>
				<Grid container spacing={3}>
					{products.map((product, i) => {
						return (
							<Grid key={i} item md={6} sm={6} xs={12}>
								<Stack
									direction="row"
									sx={{
										background: '#668890',
										height: '375px',
										width: '100%',
										display: 'flex',
									}}
								>
									<ImgWrapper
										sx={{
											position: 'relative',
											height: '100%',
											width: '50%',
										}}
									>
										<Image
											alt="Science Steps"
											src={product.image}
											placeholder="blur"
											blurDataURL={product.low_image}
											layout="fill"
											objectFit="cover"
										/>
									</ImgWrapper>
									<Box
										sx={{
											width: '50%',
											display: 'flex',
											justifyContent: 'center',
											alignItems: 'center',
										}}
									>
										<Container>
											<Typography variant="h2" sx={{ wordBreak: 'break-word' }}>
												{t(product.name)}
											</Typography>
											<Typography variant="subtitle1">
												{t(product.description)}
											</Typography>
										</Container>
									</Box>
								</Stack>
							</Grid>
						);
					})}
				</Grid>
			</Container>
		</BoxWrapper>
	);
}

export default Products;
