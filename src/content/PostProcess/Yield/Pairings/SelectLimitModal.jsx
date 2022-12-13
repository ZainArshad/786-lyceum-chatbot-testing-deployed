import React from 'react';
import PropTypes from 'prop-types';
import { useTranslation } from 'next-i18next';
import { Modal, ModalBody, ModalFooter } from 'src/components/shared/Modal';
import { Typography } from '@mui/material';
import { useSelector, useDispatch } from 'src/store';
import { Center, FlexApart } from 'src/components/shared/wrappers';
import { useTheme } from '@emotion/react';
import { Button } from 'src/components/shared/Buttons';
import { isEmpty } from 'lodash';
import {
	addOrUpdatePairingInput,
	selectAvailableLimits,
} from 'src/slices/postProcessing/yield';
import { EmptyData } from 'src/components/EmptyData';

export const SelectLimitModal = ({
	open,
	handleClose = () => {},
	pairingId,
	currentSelected,
}) => {
	const theme = useTheme();
	const { t } = useTranslation();
	const dispatch = useDispatch();
	const limits = useSelector(selectAvailableLimits);

	const handleSelect = async (limit) => {
		await dispatch(
			addOrUpdatePairingInput({
				payload: {
					pairingId,
					input: {
						type: 'limit',
						value: limit,
					},
				},
			})
		);
		handleClose();
	};

	return (
		<Modal open={open} onClose={handleClose}>
			<ModalBody
				sx={{
					width: {
						xs: '90%',
						md: '60%',
						lg: '40%',
					},
				}}
			>
				<Typography mb={2} variant="h3" component="h2">
					{t('Select Limit')}
				</Typography>
				{!isEmpty(limits) ? (
					limits?.map((lim) => {
						return (
							<FlexApart
								key={lim.id}
								sx={{
									mb: theme.spacing(1),
									backgroundColor: theme.palette.secondary.lighter,
									border: `1px solid ${theme.palette.secondary.lightest}`,
									borderRadius: theme.spacing(1),
									padding: theme.spacing(1),
								}}
							>
								<Typography variant="h4">{lim.name}</Typography>
								<Button
									disabled={currentSelected === lim.id}
									onClick={() =>
										handleSelect({
											id: lim.id,
											name: lim.name,
										})
									}
								>
									{t('Select')}
								</Button>
							</FlexApart>
						);
					})
				) : (
					<Center>
						<EmptyData />
					</Center>
				)}
				<ModalFooter>
					<Button
						variant="outlined"
						size="small"
						color="error"
						onClick={handleClose}
					>
						{t('Cancel')}
					</Button>
				</ModalFooter>
			</ModalBody>
		</Modal>
	);
};

SelectLimitModal.propTypes = {
	open: PropTypes.bool.isRequired,
	handleClose: PropTypes.func.isRequired,
	pairingId: PropTypes.string.isRequired,
	currentSelected: PropTypes.oneOfType([PropTypes.string]),
};
