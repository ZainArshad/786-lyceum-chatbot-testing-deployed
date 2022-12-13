import { useState } from 'react';
import {
	Typography,
	Button,
	Box,
	Grid,
	styled,
	Card,
	CardContent,
	TableContainer,
	Table,
	TableHead,
	TableCell,
	TableRow,
	Paper,
	TableBody,
	OutlinedInput,
} from '@mui/material';
import { useTranslation } from 'react-i18next';

const StorageComponentWrapper = styled(Box)(
	() => `
          margin-left:1.5%;
          margin-right:1.5%;
          margin-top:1.5%;
          width:100%;
          position:relative;
      `
);

const AddToCartButton = styled(Button)(
	() => `
            border-radius:0px;
            position:absolute;
            bottom:0;
            left:0;
            width:100%;
        `
);

const StyledCard = styled(Card)(
	({ theme }) => `
            margin-top: ${theme.spacing(2)};
            width: 100%;
            display: flex;
            flex-direction: column;
            padding: ${theme.spacing(2)};
            border-radius: ${theme.general.borderRadiusSm};
            border: 1px solid ${theme.colors.alpha.black[10]};
            height:440px;
            position:relative;
        `
);

function StorageComponent() {
	const { t } = useTranslation();
	const [basic, setBasic] = useState(0);
	const [standard, setStandard] = useState(0);
	const [premium, setPremium] = useState(0);

	const basicJson = {
		desc: '+ 20 GB Space Allocation',
		price: '$15 / month',
		value: 15,
	};
	const standardJson = {
		desc: 'Unlimited Space 1 private organization',
		price: '$100 / month',
		value: 100,
	};
	const premiumJson = {
		desc: 'Unlimited Space Unlimited Organizations',
		price: '$500 / month',
		value: 500,
	};

	const [array, setArray] = useState([]);
	return (
		<StorageComponentWrapper>
			<Typography
				variant="h2"
				component="h2"
				gutterBottom
				sx={{ fontWeight: '400' }}
			>
				{t('Increase Storage Plans')}
			</Typography>
			<Grid container spacing={1.5}>
				<Grid item xs={4}>
					<StyledCard key={1}>
						<CardContent>
							<Typography
								variant="h2"
								component="h2"
								gutterBottom
								sx={{
									fontWeight: '400',
									textAlign: 'center',
									fontSize: '30px',
									marginTop: '11%',
								}}
							>
								{t('$15 / month')}
							</Typography>
							<Typography
								variant="h3"
								component="h3"
								gutterBottom
								sx={{
									textAlign: 'center',
									marginTop: '11%',
								}}
							>
								{t('+ 20 GB')}
							</Typography>
							<p style={{ textAlign: 'center', marginTop: '11%' }}>
								{t(
									'add an additional 30 GB of storage space to your allocation'
								)}
							</p>
						</CardContent>
						<AddToCartButton
							variant="contained"
							onClick={() => {
								if (basic === 0) array.push(basicJson);
								setBasic((value) => value + 1);
							}}
						>
							{t('Add to Cart')}
						</AddToCartButton>
					</StyledCard>
				</Grid>
				<Grid item xs={4}>
					<StyledCard key={2}>
						<CardContent>
							<Typography
								variant="h2"
								component="h2"
								gutterBottom
								sx={{
									fontWeight: '400',
									textAlign: 'center',
									fontSize: '30px',
									marginTop: '11%',
								}}
							>
								{t('$100 / month')}
							</Typography>
							<Typography
								variant="h3"
								component="h3"
								gutterBottom
								sx={{
									textAlign: 'center',
									marginTop: '5%',
								}}
							>
								{t('Unlimited Space 1 private organization')}
							</Typography>
							<p style={{ textAlign: 'center', marginTop: '11%' }}>
								{t(
									' unlock unlimited storage space for a single private organization only. If you already have purchased space for a private organization, and would like to apply unlimited space to it, your account plan will be credited back the previously purchased plans'
								)}
							</p>
						</CardContent>
						<AddToCartButton
							variant="contained"
							onClick={() => {
								if (standard === 0) array.push(standardJson);
								setStandard((value) => value + 1);
							}}
						>
							{t('Add to Cart')}
						</AddToCartButton>
					</StyledCard>
				</Grid>
				<Grid item xs={4}>
					<StyledCard key={3}>
						<CardContent>
							<Typography
								variant="h2"
								component="h2"
								gutterBottom
								sx={{
									fontWeight: '400',
									textAlign: 'center',
									fontSize: '30px',
									marginTop: '11%',
								}}
							>
								{t('$500 / month')}
							</Typography>
							<Typography
								variant="h3"
								component="h3"
								gutterBottom
								sx={{
									textAlign: 'center',
									marginTop: '11%',
								}}
							>
								{t('Unlimited Space Unlimited Organizations')}
							</Typography>
							<p style={{ textAlign: 'center', marginTop: '11%' }}>
								{t(
									'unlock unlimited storage space for unlimited amount of organizations. All previously purchased plans will be credited back, and this will be the only charge per month'
								)}
							</p>
						</CardContent>
						<AddToCartButton
							variant="contained"
							onClick={() => {
								if (premium === 0) array.push(premiumJson);
								setPremium((value) => value + 1);
							}}
						>
							{t('Add to Cart')}
						</AddToCartButton>
					</StyledCard>
				</Grid>
			</Grid>
			<br />
			{array.length > 0 && (
				<>
					<Grid container>
						<Grid item xs={12}>
							<Typography
								variant="h3"
								component="h3"
								gutterBottom
								sx={{
									marginTop: '1%',
								}}
							>
								{t('Cart')}
							</Typography>
							<TableContainer component={Paper}>
								<Table sx={{ minWidth: 650 }} aria-label="simple table">
									<TableHead>
										<TableRow>
											<TableCell>{t('Item')}</TableCell>
											<TableCell align="center">{t('Qty')}</TableCell>
											<TableCell align="center">{t('Price')}</TableCell>
											<TableCell align="center">{t('Total')}</TableCell>
										</TableRow>
									</TableHead>
									<TableBody>
										{array.map((row, i) => (
											<TableRow
												key={i}
												sx={{
													'&:last-child td, &:last-child th': { border: 0 },
												}}
											>
												<TableCell component="th" scope="row">
													{row.desc}
												</TableCell>
												<TableCell align="center">
													<OutlinedInput
														onChange={(e) => {
															// fix this eslint error
															// eslint-disable-next-line no-unused-expressions
															row.value === 15
																? setBasic(parseInt(e.target.value))
																: row.value === 100
																? setStandard(parseInt(e.target.value))
																: setPremium(parseInt(e.target.value));

															if (e.target.value === 0) {
																let temp_array = array.splice(i, 1);
																setArray(temp_array);
															}
														}}
														type="number"
														value={
															row.value === 15
																? basic
																: row.value === 100
																? standard
																: premium
														}
														sx={{
															input: {
																textAlign: 'center',
															},
														}}
													/>
												</TableCell>
												<TableCell align="center">{row.price}</TableCell>
												<TableCell align="center">
													{row.value === 15
														? `$${basic * row.value} / month`
														: row.value === 100
														? `$${standard * row.value} / month`
														: `$${premium * row.value} / month`}
												</TableCell>
											</TableRow>
										))}
										<TableRow>
											<TableCell />
											<TableCell />
											<TableCell />
											<TableCell align="center">
												{t('Total')} :{' '}
												<b>
													{`$${
														basic * 15 + standard * 100 + premium * 500
													} / month`}
												</b>
											</TableCell>
										</TableRow>
									</TableBody>
								</Table>
							</TableContainer>
						</Grid>
					</Grid>
					<br />
					<Button
						variant="contained"
						sx={{ position: 'absolute', right: '1.5%', marginBottom: '1.5%' }}
					>
						{t('Checkout with Stripe')}
					</Button>
				</>
			)}
		</StorageComponentWrapper>
	);
}

export default StorageComponent;
