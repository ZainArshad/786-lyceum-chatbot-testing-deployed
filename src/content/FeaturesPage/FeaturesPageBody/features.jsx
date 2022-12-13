import {
	Grid,
	Typography,
	Table,
	TableBody,
	TableCell,
	TableContainer,
	TableHead,
	TableRow,
	Container,
	tableCellClasses,
	Icon,
	Card,
	CardContent,
	styled,
} from '@mui/material';
import { useTranslation } from 'next-i18next';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import { BoxWrapper } from 'src/components/LandingPageComps';
import { LandingPagePricingTableButton } from 'src/components/LandingPagesButton';

const rows = [
	{
		title: 'Unlimited Public Storage',
		basic: true,
		premium: true,
		enterprise: true,
		inhouse: true,
	},
	{
		title: 'Unlimited Private Storage',
		basic: false,
		premium: true,
		enterprise: true,
		inhouse: true,
	},
	{
		title: '24/7 Support + Security Features',
		basic: false,
		premium: false,
		enterprise: true,
		inhouse: true,
	},
	{
		title: 'Server Installation + Customized Features',
		basic: false,
		premium: false,
		enterprise: false,
		inhouse: true,
	},
];

const PlanningCard = styled(Card)(
	() => `	
		max-width: 301px;
		border-radius: 0;
		box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
		background: #9abdc6;
		text-align: center;
		min-height:351px;
		position:relative;
`
);

function Features() {
	const { t } = useTranslation();

	return (
		<BoxWrapper sx={{ background: '#9abdc6' }}>
			<Grid
				container
				columnSpacing={1}
				rowGap={7}
				mt={5}
				sx={{ display: 'flex', justifyContent: 'center', mb: 3 }}
			>
				<Grid
					item
					xs={12}
					sx={{
						position: 'relative',
						display: { md: 'block', sm: 'block', xs: 'none' },
					}}
				>
					<BoxWrapper>
						<Container maxWidth="lg">
							<TableContainer
								sx={{
									background: '#9abdc6',
									[`& .${tableCellClasses.root}`]: {
										borderBottom: 'none',
									},
								}}
							>
								<Table
									sx={{
										minWidth: 650,
									}}
									aria-label="simple table"
								>
									<TableHead>
										<TableRow sx={{ background: 'none' }}>
											<TableCell>
												<Typography variant="h2" sx={{ color: 'black' }}>
													{t('Monthly Pricing')}
												</Typography>
											</TableCell>
											<TableCell align="center">
												<Typography variant="h5" sx={{ color: 'black' }}>
													{t('Basic')}
												</Typography>
												<Typography variant="h2" sx={{ color: 'black' }}>
													{t('Free')}
												</Typography>
												<LandingPagePricingTableButton>
													{t('Choose Plan')}
												</LandingPagePricingTableButton>
											</TableCell>
											<TableCell align="center">
												<Typography variant="h5" sx={{ color: 'black' }}>
													{t('Premium')}
												</Typography>
												<Typography variant="h2" sx={{ color: 'black' }}>
													{t('50$')}
												</Typography>
												<LandingPagePricingTableButton>
													{t('Choose Plan')}
												</LandingPagePricingTableButton>
											</TableCell>
											<TableCell
												align="center"
												sx={{
													color: '#9abdc6',
													background: 'black',
												}}
											>
												<Typography variant="h5">{t('Enterprise')}</Typography>
												<Typography variant="h2">{t('399$')}</Typography>
												<LandingPagePricingTableButton>
													{t('Choose Plan')}
												</LandingPagePricingTableButton>
											</TableCell>
											<TableCell align="center">
												<Typography variant="h5" sx={{ color: 'black' }}>
													{t('In-House Solutions')}
												</Typography>
												<Typography variant="h2" sx={{ color: 'black' }}>
													{t('TBD')}
												</Typography>
												<LandingPagePricingTableButton>
													{t('Contact Us')}
												</LandingPagePricingTableButton>
											</TableCell>
										</TableRow>
									</TableHead>
									<TableBody
										sx={{
											background: 'black',
											border: '15px solid black',
											'& tbody:first-child': {
												borderRadius: '1em 0 0 1em',
											},
											'& tbody:last-child': {
												borderRadius: '0 1em 1em 0',
											},
										}}
									>
										{rows.map((row) => (
											<TableRow
												key={row.title}
												sx={{
													borderRadius: '15px',
												}}
											>
												<TableCell
													component="th"
													scope="row"
													sx={{ color: '#9abdc6' }}
												>
													{row.title}
												</TableCell>
												<TableCell
													align="center"
													sx={{
														background: '#9abdc6',
														color: row.basic ? 'black' : '#5d787f',
													}}
												>
													<Icon>
														<CheckCircleIcon />
													</Icon>
												</TableCell>
												<TableCell
													align="center"
													sx={{
														background: '#9abdc6',
														color: row.premium ? 'black' : '#5d787f',
													}}
												>
													<Icon>
														<CheckCircleIcon />
													</Icon>
												</TableCell>
												<TableCell
													align="center"
													sx={{
														background: 'black',
														color: row.enterprise ? '#9abdc6' : '#36474b',
													}}
												>
													<Icon>
														<CheckCircleIcon />
													</Icon>
												</TableCell>
												<TableCell
													align="center"
													sx={{
														background: '#9abdc6',
														color: row.inhouse ? 'black' : '#5d787f',
													}}
												>
													<Icon>
														<CheckCircleIcon />
													</Icon>
												</TableCell>
											</TableRow>
										))}
									</TableBody>
								</Table>
							</TableContainer>
						</Container>
					</BoxWrapper>
				</Grid>
				<Grid sm={12} sx={{ display: { md: 'none', sm: 'none', xs: 'block' } }}>
					<Typography
						variant="h2"
						sx={{ color: 'black', textAlign: 'center', mt: 3, mb: 3 }}
					>
						{t('Monthly Pricing')}
					</Typography>
					<Container
						maxWidth="lg"
						sx={{ display: 'grid', justifyContent: 'center' }}
					>
						<PlanningCard>
							<Typography variant="h5" sx={{ color: 'black' }}>
								{t('Basic')}
							</Typography>
							<Typography variant="h2" sx={{ color: 'black' }}>
								{t('Free')}
							</Typography>
							<LandingPagePricingTableButton styleSx={{ mb: 1 }}>
								{t('Choose Plan')}
							</LandingPagePricingTableButton>
							<CardContent
								sx={{
									background: 'black',
									color: '#9abdc6',
									position: 'absolute',
									height: '100%',
									width: '100%',
									display: 'grid',
								}}
							>
								<Typography
									variant="h4"
									sx={{ mt: 3, display: 'flex', alignItems: 'start' }}
								>
									<Icon>
										<CheckCircleIcon />
									</Icon>
									{t('Unlimited Public Storage')}
								</Typography>
							</CardContent>
						</PlanningCard>
						<PlanningCard sx={{ mt: 3 }}>
							<Typography variant="h5" sx={{ color: 'black' }}>
								{t('Premium')}
							</Typography>
							<Typography variant="h2" sx={{ color: 'black' }}>
								{t('50$')}
							</Typography>
							<LandingPagePricingTableButton styleSx={{ mb: 1 }}>
								{t('Choose Plan')}
							</LandingPagePricingTableButton>
							<CardContent
								sx={{
									background: 'black',
									color: '#9abdc6',
									position: 'absolute',
									height: '100%',
									width: '100%',
								}}
							>
								<Typography
									variant="h4"
									sx={{ mt: 3, display: 'flex', alignItems: 'start' }}
								>
									<Icon>
										<CheckCircleIcon />
									</Icon>
									{t('Unlimited Public Storage')}
								</Typography>
								<Typography
									variant="h4"
									sx={{ mt: 3, display: 'flex', alignItems: 'start' }}
								>
									<Icon>
										<CheckCircleIcon />
									</Icon>
									{t('Unlimited Private Storage')}
								</Typography>
							</CardContent>
						</PlanningCard>
						<PlanningCard sx={{ mt: 3, background: 'black', color: '#9abdc6' }}>
							<Typography variant="h5">{t('Enterprise')}</Typography>
							<Typography variant="h2">{t('399$')}</Typography>
							<LandingPagePricingTableButton styleSx={{ mb: 1 }}>
								{t('Choose Plan')}
							</LandingPagePricingTableButton>
							<CardContent
								sx={{
									background: 'black',
									color: '#9abdc6',
									textAlign: 'start',
								}}
							>
								<Typography
									variant="h4"
									sx={{ mt: 3, display: 'flex', alignItems: 'start' }}
								>
									<Icon>
										<CheckCircleIcon />
									</Icon>
									{t('Unlimited Public Storage')}
								</Typography>
								<Typography
									variant="h4"
									sx={{ mt: 3, display: 'flex', alignItems: 'start' }}
								>
									<Icon>
										<CheckCircleIcon />
									</Icon>
									{t('Unlimited Private Storage')}
								</Typography>
								<Typography
									variant="h4"
									sx={{ mt: 3, display: 'flex', alignItems: 'start' }}
								>
									<Icon>
										<CheckCircleIcon />
									</Icon>
									{t('24/7 Support + Security Features')}
								</Typography>
							</CardContent>
						</PlanningCard>
						<PlanningCard sx={{ mt: 3 }}>
							<Typography variant="h5" sx={{ color: 'black' }}>
								{t('In-House Solutions')}
							</Typography>
							<Typography variant="h2" sx={{ color: 'black' }}>
								{t('TBD')}
							</Typography>
							<LandingPagePricingTableButton styleSx={{ mb: 1 }}>
								{t('Choose Plan')}
							</LandingPagePricingTableButton>
							<CardContent
								sx={{
									background: 'black',
									color: '#9abdc6',
									textAlign: 'start',
								}}
							>
								<Typography
									variant="h4"
									sx={{ mt: 3, display: 'flex', alignItems: 'start' }}
								>
									<Icon>
										<CheckCircleIcon />
									</Icon>
									{t('Unlimited Public Storage')}
								</Typography>
								<Typography
									variant="h4"
									sx={{ mt: 3, display: 'flex', alignItems: 'start' }}
								>
									<Icon>
										<CheckCircleIcon />
									</Icon>
									{t('Unlimited Private Storage')}
								</Typography>
								<Typography
									variant="h4"
									sx={{ mt: 3, display: 'flex', alignItems: 'start' }}
								>
									<Icon>
										<CheckCircleIcon />
									</Icon>
									{t('24/7 Support + Security Features')}
								</Typography>
								<Typography
									variant="h4"
									sx={{ mt: 3, display: 'flex', alignItems: 'start' }}
								>
									<Icon>
										<CheckCircleIcon />
									</Icon>
									{t('24/7 Support + Security Features')}
								</Typography>
								<Typography
									variant="h4"
									sx={{ mt: 3, display: 'flex', alignItems: 'start' }}
								>
									<Icon>
										<CheckCircleIcon />
									</Icon>
									{t('Server Installation + Customized Features')}
								</Typography>
							</CardContent>
						</PlanningCard>
					</Container>
				</Grid>
			</Grid>
		</BoxWrapper>
	);
}

export default Features;
