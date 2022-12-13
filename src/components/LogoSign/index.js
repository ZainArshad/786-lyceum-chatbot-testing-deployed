import { Tooltip, tooltipClasses, styled } from '@mui/material';
import Link from 'src/components/Link';
import { useTranslation } from 'react-i18next';
import Si6maLogo from 'src/assets/svgs/Si6maLogo';

const TooltipWrapper = styled(({ className, ...props }) => (
	<Tooltip {...props} classes={{ popper: className }} />
))(({ theme }) => ({
	[`& .${tooltipClasses.tooltip}`]: {
		backgroundColor: theme.colors.alpha.trueWhite[100],
		color: theme.palette.getContrastText(theme.colors.alpha.trueWhite[100]),
		fontSize: theme.typography.pxToRem(12),
		fontWeight: 'bold',
		borderRadius: theme.general.borderRadiusSm,
		boxShadow:
			'0 .2rem .8rem rgba(7,9,25,.18), 0 .08rem .15rem rgba(7,9,25,.15)',
	},
	[`& .${tooltipClasses.arrow}`]: {
		color: theme.colors.alpha.trueWhite[100],
	},
}));

function Logo() {
	const { t } = useTranslation();

	return (
		<TooltipWrapper title={t('Lyceum.io')} arrow>
			<Link href="/">
				<Si6maLogo
					width={150}
					containerStyles={{
						display: 'flex',
						alighItems: 'center',
						justifyContent: 'center',
					}}
				/>
			</Link>
		</TooltipWrapper>
	);
}

export default Logo;
