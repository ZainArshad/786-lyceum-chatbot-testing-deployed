import {
	BoxWrapper,
	TypographyH1Primary,
} from 'src/components/LandingPageComps';
import { Grid } from '@mui/material';
import { useTranslation } from 'next-i18next';
import EnterpriseFormBody from './form';

function EnterpriseForm() {
	const { t } = useTranslation();
	return (
		<BoxWrapper
			sx={{
				background: 'black',
				minHeight: '451px',
				backgroundImage:
					"linear-gradient(to top, transparent 65%, black 35%), url('/static/images/homepage/enterprise_3.png')",
				display: 'flex',
				alignItems: 'start',
				pr: { md: 11, sm: 3, xs: 1 },
				pt: 3,
				pb: 3,
			}}
		>
			<Grid container>
				<Grid xs={11} md={5} ml={1} item>
					<TypographyH1Primary sx={{ color: '#9abdc6', textAlign: 'center' }}>
						{t('Tell us about your company')}
					</TypographyH1Primary>
				</Grid>
				<Grid
					xs={10}
					md={5}
					item
					ml={3.5}
					sx={{
						display: 'flex',
						justifyContent: 'center',
					}}
				>
					<EnterpriseFormBody />
				</Grid>
			</Grid>
		</BoxWrapper>
	);
}

export default EnterpriseForm;
