import { Box, Grid, styled, Typography, Container } from '@mui/material';
import { useTranslation } from 'next-i18next';
import SupportFormBody from './form';

const BoxWrapper = styled(Box)(
	() => `
    width:100%;
    min-height:301px;
    background:white;
    overflow:hidden;
`
);

function SupportForm() {
	const { t } = useTranslation();

	return (
		<BoxWrapper sx={{ position: 'relative' }}>
			<img
				alt="Engineerbg 2"
				src="/static/images/homepage/engineerbg 2.png"
				style={{
					position: 'absolute',
					width: '100%',
					height: '200%',
					top: 0,
					overflowY: 'hidden',
					overflow: 'hidden',
				}}
			/>
			<Container
				maxWidth="xl"
				sx={{
					mt: 1,
					position: 'relative',
					background: 'rgba(10, 66, 79, 0.85)',
					pb: 3,
				}}
			>
				<Grid
					spacing={{ xs: 6, md: 10 }}
					justifyContent="center"
					alignItems="center"
					sx={{ marginLeft: '2%' }}
					container
				>
					<Grid item md={6} pr={{ xs: 0, md: 3 }}>
						<Typography
							sx={{
								lineHeight: 1.5,
								pb: 2.1,
								color: '#9ABDC6',
							}}
							variant="h1"
						>
							{t('Contact Us')}
						</Typography>
						<SupportFormBody />
					</Grid>
				</Grid>
			</Container>
		</BoxWrapper>
	);
}

export default SupportForm;
