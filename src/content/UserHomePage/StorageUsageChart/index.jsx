import {
	CardContent,
	Grid,
	CircularProgress,
	Card,
	Box,
	Typography,
	useTheme,
} from '@mui/material';
import { useTranslation } from 'next-i18next';

function StorageUsageChart() {
	const theme = useTheme();
	const { t } = useTranslation();
	return (
		<Card>
			<CardContent>
				<Grid container columnSpacing={1.5}>
					<Grid item xs={6}>
						<Box
							display="inline-flex"
							position="relative"
							justifyContent="flex-end"
						>
							<Box
								sx={{
									animationDuration: '550ms',
									position: 'absolute',
									left: 0,
									top: 0,
									bottom: 0,
									right: 0,
									display: 'flex',
									alignItems: 'center',
									justifyContent: 'center',
								}}
							>
								<Typography
									sx={{
										color: `${theme.colors.success.main}`,
									}}
									variant="h5"
								>
									43%
								</Typography>
							</Box>
							<CircularProgress
								variant="determinate"
								sx={{
									color: theme.colors.success.lighter,
								}}
								size={70}
								thickness={5}
								value={100}
							/>
							<CircularProgress
								size={70}
								sx={{
									animationDuration: '550ms',
									position: 'absolute',
									left: 0,
									color: theme.colors.success.main,
									top: 0,
								}}
								thickness={5}
								variant="determinate"
								value={25}
							/>
						</Box>
					</Grid>
					<Grid item xs={6}>
						<Typography variant="h4" justifyContent="start">
							{t('Organizations')}
						</Typography>
					</Grid>
				</Grid>
			</CardContent>
		</Card>
	);
}

export default StorageUsageChart;
