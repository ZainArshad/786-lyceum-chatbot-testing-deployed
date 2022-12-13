import React, { useState } from 'react';
import { Typography, IconButton, useTheme, Box } from '@mui/material';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import { useTranslation } from 'next-i18next';
import {
	GraphLimitsButton,
	HeadedContainer,
	HeadedInput,
} from 'src/content/PostProcess/components';
import PropTypes from 'prop-types';
import {
	LIMIT_TYPE_X,
	LIMIT_TYPE_Y,
	LOWERL_LIMIT,
	UPPERL_LIMIT,
} from 'src/content/PostProcess/constants';
import { FlexApart } from 'src/components/shared/wrappers';
import { shallowEqual } from 'react-redux';
import { useSelector, useDispatch } from 'src/store';
import {
	selectPPLimits,
	addNewLimitPoint,
	deleteLimitPoint,
	updateLimitPoint,
	handleUpdateSigma,
	handleUpdateIsAutogenerating,
	updateProcessId,
} from 'src/slices/postProcessing/graphs';
import { useSession } from 'src/content/PostProcess/hooks/useSession';

const MIN_POINTS_REQUIRED = 2;
export const LimitSetter = ({ type, graphId }) => {
	const isLowerLimit = type === LOWERL_LIMIT;
	const limitKey = isLowerLimit ? 'lowerLimit' : 'upperLimit';
	const theme = useTheme();
	const dispatch = useDispatch();
	const { isOwner } = useSession();
	const { t } = useTranslation();

	const handleShallowEqual = (left, right) => {
		return shallowEqual(left[graphId][limitKey], right[graphId][limitKey]);
	};

	const ppLimits = useSelector(selectPPLimits, handleShallowEqual);
	const currentGraphPPInstance = ppLimits[graphId];
	const [sigma, setSigma] = useState(currentGraphPPInstance[limitKey].sigma);

	const shouldAllowDelete = () =>
		currentGraphPPInstance[limitKey].points.length > MIN_POINTS_REQUIRED;

	const handleAddNewPoint = () => {
		dispatch(addNewLimitPoint({ graphId, limitType: type }));
	};

	const handleDeleteLimit = (pointId) => {
		dispatch(deleteLimitPoint({ graphId, pointId, limitType: type }));
	};

	const handleUpdateLimitPoint = (e, pointId, pointType) => {
		dispatch(
			updateLimitPoint({
				graphId,
				limitType: type,
				pointId,
				axisType: pointType,
				value: Number(e.target.value),
			})
		);
	};

	const handleToggleAutogeneration = () => {
		/**
		 * @todo change to support toggling both ways
		 */
		if (!currentGraphPPInstance[limitKey].isAutogenerating) {
			const val = true;
			dispatch(
				handleUpdateIsAutogenerating({ graphId, limitType: type, value: val })
			);
		}
		dispatch(handleUpdateSigma({ graphId, limitType: type, value: sigma }));
		dispatch(updateProcessId({ graphId }));
	};

	const isAutogenerating = () =>
		currentGraphPPInstance[limitKey].isAutogenerating;

	return (
		<HeadedContainer
			heading={isLowerLimit ? t('Lower Limit') : t('Upper Limit')}
			containerStyles={{
				'.limit-setter-container > *, button': {
					pointerEvents: isOwner ? null : 'none',
				},
			}}
		>
			{!isAutogenerating() &&
				currentGraphPPInstance[limitKey].points.map((point, i) => (
					<FlexApart key={point.id}>
						<FlexApart sx={{ maxWidth: 100 }}>
							<Typography>{t('Point ') + (i + 1)}</Typography>
							{shouldAllowDelete() && (
								<IconButton
									color="error"
									size="small"
									onClick={() => handleDeleteLimit(point.id)}
								>
									<DeleteOutlineIcon />
								</IconButton>
							)}
						</FlexApart>
						<HeadedInput
							onBlur={(e) => handleUpdateLimitPoint(e, point.id, LIMIT_TYPE_X)}
							defaultValue={point.x}
							type="number"
							heading="X"
						/>
						<HeadedInput
							onBlur={(e) => handleUpdateLimitPoint(e, point.id, LIMIT_TYPE_Y)}
							defaultValue={point.y}
							type="number"
							heading="Y"
						/>
					</FlexApart>
				))}
			{!isAutogenerating() && (
				<GraphLimitsButton
					variant="outlined"
					btnStyles={{ mt: theme.spacing(2) }}
					onClick={handleAddNewPoint}
				>
					{t('Add Point')}
				</GraphLimitsButton>
			)}
			<Box sx={{ display: 'grid', gridTemplateColumns: '1fr 1fr' }}>
				<HeadedInput
					value={sigma}
					onChange={(e) => setSigma(Number(e.target.value))}
					inputProps={{
						step: 0.1,
					}}
					type="number"
					heading={t('Sigma')}
				/>
				<GraphLimitsButton
					btnStyles={{ mt: theme.spacing(2.2) }}
					onClick={handleToggleAutogeneration}
				>
					{t('Auto Generate')}
				</GraphLimitsButton>
			</Box>
		</HeadedContainer>
	);
};

LimitSetter.propTypes = {
	type: PropTypes.oneOf([UPPERL_LIMIT, LOWERL_LIMIT]).isRequired,
	graphId: PropTypes.string.isRequired,
};
