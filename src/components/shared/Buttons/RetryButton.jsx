import ReplayIcon from '@mui/icons-material/Replay';
import { useTranslation } from 'next-i18next';
import PropTypes from 'prop-types';
import { Button } from './Buttons';

export const RetryButton = ({ text = 'Retry', ...rest }) => {
	const { t } = useTranslation();
	return (
		<Button startIcon={<ReplayIcon />} variant="primary" size="large" {...rest}>
			{t(text)}
		</Button>
	);
};

RetryButton.propTypes = {
	text: PropTypes.string,
};
