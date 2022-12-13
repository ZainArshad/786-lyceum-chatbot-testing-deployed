import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { useTranslation } from 'next-i18next';
import { Modal, ModalBody, ModalFooter } from 'src/components/shared/Modal';
import { Typography } from '@mui/material';
import { useSelector, useDispatch } from 'src/store';
import { Center, FlexApart } from 'src/components/shared/wrappers';
import { useTheme } from '@emotion/react';
import { Button, LoadingButton } from 'src/components/shared/Buttons';
import { isEmpty } from 'lodash';
import {
	addOrUpdatePairingInput,
	selectAvailableCategories,
} from 'src/slices/postProcessing/yield';
import { useQueryClient } from '@tanstack/react-query';
import { useSnackbarNotifications } from 'src/hooks/useSnackbarNotifications';
import { EmptyData } from 'src/components/EmptyData';

export const SelectCategoryModal = ({
	open,
	handleClose = () => {},
	pairingId,
	currentSelected,
}) => {
	const theme = useTheme();
	const { t } = useTranslation();
	const dispatch = useDispatch();
	const queryClient = useQueryClient();
	const [loading, setLoading] = useState(false);
	const { showErrorSnackbar } = useSnackbarNotifications();
	const categories = useSelector(selectAvailableCategories);

	const handleSelect = async (category) => {
		try {
			setLoading(true);
			await dispatch(
				addOrUpdatePairingInput({
					payload: {
						pairingId,
						input: {
							type: 'category',
							value: category,
						},
					},
					queryClient,
				})
			);
			setLoading(false);
			handleClose();
		} catch (error) {
			showErrorSnackbar('Error! Try again');
		}
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
					{t('Select Category')}
				</Typography>
				{!isEmpty(categories) ? (
					categories.map((cat) => (
						<FlexApart
							key={cat.id}
							sx={{
								mb: theme.spacing(1),
								backgroundColor: theme.palette.secondary.lighter,
								border: `1px solid ${theme.palette.secondary.lightest}`,
								borderRadius: theme.spacing(1),
								padding: theme.spacing(1),
							}}
						>
							<Typography variant="h4">{cat.name}</Typography>
							<LoadingButton
								size="small"
								loading={loading}
								disabled={currentSelected === cat.id}
								onClick={() =>
									handleSelect({
										id: cat.id,
										name: cat.name,
										projectId: cat.projectId,
									})
								}
							>
								{t('Select')}
							</LoadingButton>
						</FlexApart>
					))
				) : (
					<Center>
						<EmptyData />
					</Center>
				)}
				<ModalFooter>
					<Button variant="outlined" color="error" onClick={handleClose}>
						{t('Cancel')}
					</Button>
				</ModalFooter>
			</ModalBody>
		</Modal>
	);
};

SelectCategoryModal.propTypes = {
	open: PropTypes.bool.isRequired,
	handleClose: PropTypes.func.isRequired,
	pairingId: PropTypes.string.isRequired,
	currentSelected: PropTypes.string,
};
