import {
	Button,
	Card,
	Box,
	CardContent,
	Typography,
	CardActions,
	Divider,
	styled,
	useTheme,
} from '@mui/material';
import { useTranslation } from 'next-i18next';
import CheckTwoToneIcon from '@mui/icons-material/CheckTwoTone';
import Text from 'src/components/Text';

const CardIndicatorWrapper = styled(Card)(
	() => `
      position: relative;
      
      .MuiCard-indicator {
        position: absolute;
        left: 0;
        right: 0;
        top: 0;
        height: 5px;
      }
  `
);

const CardActionsWrapper = styled(CardActions)(
	({ theme }) => `
      background: ${theme.colors.alpha.black[5]};
      padding: ${theme.spacing(2)} ${theme.spacing(2)};
  `
);

const IconWrapper = styled(Box)(
	({ theme }) => `
      display: flex;
      margin-right: ${theme.spacing(0.5)};
  `
);

function OrganizationCard() {
	const { t } = useTranslation();
	const theme = useTheme();
	return (
		<CardIndicatorWrapper>
			<Box
				className="MuiCard-indicator"
				sx={{
					background: `${theme.colors.info.main}`,
				}}
			/>
			<CardContent
				sx={{
					pb: 4,
					pt: 7,
					px: 3,
					textAlign: 'center',
				}}
			>
				<img
					style={{ height: '30px' }}
					src="/static/images/placeholders/logo/netflix-logo.jpg"
					alt="..."
				/>
				<Typography
					variant="h3"
					sx={{
						pt: 2,
						px: 3,
					}}
					gutterBottom
				>
					{t('Mainframe Analytics Cluster for Visitors and Page Views')}
				</Typography>
				<Typography variant="subtitle2">
					{t('Maintained for')} {t('Netflix Inc.')}
				</Typography>
				<Button
					variant="outlined"
					color="primary"
					sx={{
						mt: 3,
					}}
				>
					{t('View details')}
				</Button>
			</CardContent>
			<Divider />
			<CardActionsWrapper
				sx={{
					display: 'flex',
					justifyContent: 'space-between',
				}}
			>
				<Typography variant="subtitle1">
					<Text color="black">
						<b>7</b>
					</Text>{' '}
					{t('hosts')}
				</Typography>
				<Typography
					sx={{
						display: 'flex',
						alignItems: 'center',
					}}
					variant="subtitle1"
				>
					<IconWrapper
						sx={{
							color: `${theme.colors.success.main}`,
						}}
					>
						<CheckTwoToneIcon />
					</IconWrapper>
					<Text color="success">{t('available')}</Text>
				</Typography>
			</CardActionsWrapper>
		</CardIndicatorWrapper>
	);
}

export default OrganizationCard;
