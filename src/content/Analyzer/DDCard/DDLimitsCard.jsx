import PushPinIcon from '@mui/icons-material/PushPin';
import { useTheme } from '@mui/material';
import { useTranslation } from 'next-i18next';
import PropTypes from 'prop-types';
import { Button } from 'src/components/shared/Buttons';
import { addLimits } from 'src/slices/pinboard/dataProcessing/pinnedDataSlice';
import { useDispatch } from 'src/store';
import { DDContentCardWrapper } from './DDCardWrappers';

export const DDLimitsCard = ({ projectId, projectName }) => {
	const { t } = useTranslation();
	const theme = useTheme();
	const dispatch = useDispatch();

	const handlePinning = () => {
		const payload = {
			projectId,
			projectName,
		};
		dispatch(addLimits(payload));
	};

	return (
		<DDContentCardWrapper>
			<Button
				sx={{ my: theme.spacing(1) }}
				size="small"
				startIcon={<PushPinIcon />}
				onClick={handlePinning}
			>
				{t('Pin Limit')}
			</Button>
		</DDContentCardWrapper>
	);
};

DDLimitsCard.propTypes = {
	projectId: PropTypes.string.isRequired,
	projectName: PropTypes.string.isRequired,
};
