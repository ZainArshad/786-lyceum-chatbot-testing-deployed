import React from 'react';
import { useTheme, Typography, Box } from '@mui/material';
import PropTypes from 'prop-types';
import { useTranslation } from 'next-i18next';
import { Modal, ModalBody } from 'src/components/shared/Modal';

import { useSelector, useDispatch } from 'src/store';
import { selectPinboardLimits } from 'src/slices/pinboard/dataProcessing/pinnedDataSlice';
import {
	selectPPLimits,
	setFetchId,
	selectPPMetaData,
	handleUpdateIsAutogenerating,
} from 'src/slices/postProcessing/graphs';
import _, { isEmpty } from 'lodash';
import { FlexApart, FlexEnd } from 'src/components/shared/wrappers';
import { Button } from 'src/components/shared/Buttons';
import { DottedDivider } from 'src/components/shared';
import { LOWERL_LIMIT, UPPERL_LIMIT } from 'src/content/PostProcess/constants';

export const LoadLimitsModal = ({ open, handleClose = () => {}, graphId }) => {
	const { t } = useTranslation();
	const theme = useTheme();
	const dispatch = useDispatch();
	const limits = useSelector(selectPinboardLimits);
	const { fetchId, lowerLimit, upperLimit } = useSelector((state) => {
		return selectPPLimits(state)[graphId];
	});
	const metaData = useSelector(selectPPMetaData); // nodes from the shared session

	const handleLimitsSelection = (id) => {
		dispatch(setFetchId({ graphId, value: id }));
		if (id) handleClose();
	};

	const handleClearLimits = () => {
		dispatch(
			handleUpdateIsAutogenerating({
				graphId,
				value: false,
				limitType: UPPERL_LIMIT,
			})
		);
		dispatch(
			handleUpdateIsAutogenerating({
				graphId,
				value: false,
				limitType: LOWERL_LIMIT,
			})
		);
		handleClose();
	};

	if (fetchId || lowerLimit.isAutogenerating || upperLimit.isAutogenerating) {
		return (
			<Box px={theme.spacing(2)}>
				<Button
					fullWidth
					onClick={() =>
						fetchId ? handleLimitsSelection(null) : handleClearLimits()
					}
				>
					Reset
				</Button>
			</Box>
		);
	}

	if (isEmpty(limits) && isEmpty(metaData.limits)) {
		return <Typography variant="h3">{t('No Limits Pinned')}</Typography>;
	}

	return (
		<Modal open={open} onClose={handleClose}>
			<ModalBody
				overRideStyles={{
					width: {
						xs: '95%',
						md: '60%',
						xl: '30%',
					},
					maxHeight: '80vh',
				}}
			>
				<Typography mb={2} variant="h2">
					{t('Select Limit')}
				</Typography>
				<>
					{_.keys(limits)?.map((key) => {
						const limit = limits[key];
						return (
							<FlexApart
								key={key}
								sx={{
									mb: theme.spacing(1),
									backgroundColor: theme.palette.secondary.lighter,
									border: `1px solid ${theme.palette.secondary.lightest}`,
									borderRadius: theme.spacing(1),
									padding: theme.spacing(1),
								}}
							>
								<Typography variant="h4">{limit.projectName}</Typography>
								<Button
									size="small"
									disabled={key === fetchId}
									onClick={() => handleLimitsSelection(key)}
								>
									{t('Select')}
								</Button>
							</FlexApart>
						);
					})}
					<DottedDivider sx={{ my: 2 }} />
				</>
				{_.keys(metaData.limits)?.map((key) => {
					const limit = metaData.limits[key];
					return (
						<FlexApart
							key={key}
							sx={{
								mb: theme.spacing(1),
								backgroundColor: theme.palette.secondary.lighter,
								border: `1px solid ${theme.palette.secondary.lightest}`,
								borderRadius: theme.spacing(1),
								padding: theme.spacing(1),
							}}
						>
							<Typography variant="h4">{limit.projectName}</Typography>
							<Button
								size="small"
								disabled={key === fetchId}
								onClick={() => handleLimitsSelection(key)}
							>
								{t('Select')}
							</Button>
						</FlexApart>
					);
				})}
				<FlexEnd>
					<Button
						size="small"
						variant="outlined"
						onClick={() => handleLimitsSelection(null)}
					>
						{t('Clear')}
					</Button>
				</FlexEnd>
			</ModalBody>
		</Modal>
	);
};

LoadLimitsModal.propTypes = {
	open: PropTypes.bool.isRequired,
	handleClose: PropTypes.func.isRequired,
	graphId: PropTypes.string.isRequired,
};
