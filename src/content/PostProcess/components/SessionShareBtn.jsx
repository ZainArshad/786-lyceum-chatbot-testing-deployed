import { useTheme } from '@mui/material';
import { useTranslation } from 'next-i18next';
import { Button } from 'src/components/shared/Buttons';
import ScreenShareOutlinedIcon from '@mui/icons-material/ScreenShareOutlined';

export const SessionShareBtn = ({ ...rest }) => {
	const { t } = useTranslation();
	const theme = useTheme();

	return (
		<Button
			variant="contained"
			sx={{ ml: theme.spacing(1) }}
			endIcon={<ScreenShareOutlinedIcon />}
			{...rest}
		>
			{t('Share Session')}
		</Button>
	);
};
