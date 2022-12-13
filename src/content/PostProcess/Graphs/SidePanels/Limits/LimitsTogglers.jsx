import { Grid, Switch, Typography, useTheme } from '@mui/material';
import { useTranslation } from 'next-i18next';
import PropTypes from 'prop-types';
import { useSelector, useDispatch } from 'src/store';
import {
	toggleShowFailing,
	toggleShowPassing,
	selectPPLimits,
} from 'src/slices/postProcessing/graphs';
import { shallowEqual } from 'react-redux';
import { FlexApart } from 'src/components/shared/wrappers';

export const LimitsTogglers = ({ graphId }) => {
	const theme = useTheme();
	const { t } = useTranslation();
	const dispatch = useDispatch();
	const ppLimits = useSelector(selectPPLimits, (left, right) => {
		return shallowEqual(left[graphId], right[graphId]);
	});
	const currentGraphPPInstance = ppLimits[graphId];

	const handleToggleShowFailing = (e) => {
		dispatch(toggleShowFailing({ graphId, value: e.target.checked }));
	};

	const handleToggleShowPassing = (e) => {
		dispatch(toggleShowPassing({ graphId, value: e.target.checked }));
	};

	return (
		<Grid container>
			<Grid item xs={6}>
				<FlexApart sx={{ p: theme.spacing(1) }}>
					<Typography color="success">{t('Passing')}</Typography>
					<Switch
						onChange={handleToggleShowPassing}
						checked={currentGraphPPInstance?.showPassing || false}
						color="success"
					/>
				</FlexApart>
			</Grid>
			<Grid item xs={6}>
				<FlexApart sx={{ p: theme.spacing(1) }}>
					<Typography color="error">{t('Failing')}</Typography>
					<Switch
						color="error"
						onChange={handleToggleShowFailing}
						checked={currentGraphPPInstance?.showFailing || false}
					/>
				</FlexApart>
			</Grid>
		</Grid>
	);
};

LimitsTogglers.propTypes = {
	graphId: PropTypes.string.isRequired,
};
