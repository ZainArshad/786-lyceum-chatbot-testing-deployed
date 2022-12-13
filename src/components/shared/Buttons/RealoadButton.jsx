import ReplayIcon from '@mui/icons-material/Replay';
import PropTypes from 'prop-types';
import { Button } from './Buttons';

export const ReloadButton = ({ iconProps, ...rest }) => {
	return (
		<Button {...rest}>
			<ReplayIcon {...iconProps} />
		</Button>
	);
};

ReloadButton.propTypes = {
	iconProps: PropTypes.object,
};
