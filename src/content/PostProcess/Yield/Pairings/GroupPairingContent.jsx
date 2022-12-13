import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Stack, useTheme, Box, Collapse } from '@mui/material';
import { FlexApart, UploadCtn } from 'src/components/shared/wrappers';
import { Expander } from 'src/components/shared';
import { selectPairings } from 'src/slices/postProcessing/yield';
import { useSelector } from 'src/store';
import { useTranslation } from 'next-i18next';
import { PairingName } from './PairingName';
import { PairingOptionsPanel } from './PairingOptionsPanel';
import { SelectLimitModal } from './SelectLimitModal';
import { SelectCategoryModal } from './SelectCategoryModal';

export const GroupPairingContent = ({ pairingId }) => {
	const theme = useTheme();
	const { t } = useTranslation();
	const [expanded, setExpanded] = useState(false);
	const pairing = useSelector((state) => {
		const p = selectPairings(state);
		return p[pairingId];
	});
	const [categoryModalOpen, setCategoryModalOpen] = useState(false);
	const [limitModalOpen, setLimitModalOpen] = useState(false);

	const handleExpand = () => setExpanded((prev) => !prev);

	return (
		<Box
			sx={{
				border: '1px solid',
				borderColor: theme.palette.secondary.lightest,
				p: theme.spacing(1, 2),
				borderRadius: theme.general.borderRadius,
			}}
		>
			<FlexApart>
				<PairingName pairing={pairing} />
				<Stack direction="row" spacing={0.5}>
					<PairingOptionsPanel pairingId={pairingId} />
					<Expander
						btnSize="small"
						onClick={handleExpand}
						expandState={expanded}
					/>
				</Stack>
			</FlexApart>
			<Collapse in={expanded} unmountOnExit>
				<Stack my={2} spacing={1}>
					<Stack direction="row" spacing={2}>
						<UploadCtn onClick={() => setCategoryModalOpen(true)}>
							{pairing.inputs.category?.name || t('Select Category')}
						</UploadCtn>
						<UploadCtn onClick={() => setLimitModalOpen(true)}>
							{pairing.inputs.limit?.name || t('Select Limit')}
						</UploadCtn>
					</Stack>
				</Stack>
			</Collapse>
			<SelectLimitModal
				pairingId={pairingId}
				open={limitModalOpen}
				handleClose={() => setLimitModalOpen(false)}
				currentSelected={pairing.inputs.limit?.id}
			/>
			<SelectCategoryModal
				pairingId={pairingId}
				open={categoryModalOpen}
				handleClose={() => setCategoryModalOpen(false)}
				currentSelected={pairing.inputs.category?.id}
			/>
		</Box>
	);
};

GroupPairingContent.propTypes = {
	pairingId: PropTypes.string.isRequired,
};
