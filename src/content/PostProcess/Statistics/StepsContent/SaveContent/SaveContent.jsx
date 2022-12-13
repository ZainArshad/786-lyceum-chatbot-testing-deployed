import React, { useContext, useState } from 'react';
import { Stack, Switch, Typography } from '@mui/material';
import { Center, FlexApart } from 'src/components/shared/wrappers';
import { shouldShowArrangementStep } from 'src/lib/helpers/statistics';
import { StatInstanceContext } from 'src/content/PostProcess/context';
import { useDispatch, useSelector } from 'src/store';
import { selectPPStatBoxMath } from 'src/slices/postProcessing/statistics';
import { Button } from 'src/components/shared/Buttons';
import { useTranslation } from 'next-i18next';
import { ppgraphPanelHeight } from 'src/content/PostProcess/constants';
import { CreateNewUploadModal } from 'src/components/Modals/StatCreateNewUploadModal';
import { STATISTICS_TYPE } from 'src/content/Analyzer/constants';
import { addOrRemoveCategories } from 'src/slices/pinboard/dataProcessing/pinnedDataSlice';
import { StatFormControl } from '../../StatFormControl';

export const SaveContent = () => {
	const [saveToPinboard, setSaveToPinboard] = useState(true);
	const [newUploadModalOpen, setNewUploadModalOpen] = useState(false);
	const { t } = useTranslation();
	const dispatch = useDispatch();
	const { statId } = useContext(StatInstanceContext);
	const math = useSelector((state) => {
		const m = selectPPStatBoxMath(state);
		return m[statId];
	});

	const handleSaveToNewUpload = () => {
		setNewUploadModalOpen(true);
	};

	const handleSuccessResponse = (data) => {
		if (saveToPinboard) {
			const toPin = data.statistics.map((category) => ({
				categoryId: category.category__id,
				categoryName: category.category__name,
				units: {
					xUnits: category.x_units,
					yUnits: category.y_units,
				},
				// TODO: change it to fully rely on server response one integrated by backend
				dataType:
					data.statistics.data_type || category.data_type || STATISTICS_TYPE,
			}));
			const payload = {
				projectId: data.id,
				projectName: data.name,
				pinnedCategories: toPin,
			};
			dispatch(addOrRemoveCategories(payload));
		}
	};

	return (
		<FlexApart flexDirection="column" sx={{ minHeight: ppgraphPanelHeight }}>
			<Center flex={1}>
				<Stack spacing={2}>
					<Button onClick={handleSaveToNewUpload} size="large">
						{t('Save to New Upload')}
					</Button>
					<FlexApart>
						<Typography variant="caption">{t('Add to Pinboard')}</Typography>
						<Switch
							checked={saveToPinboard}
							onChange={(e) => setSaveToPinboard(e.target.checked)}
						/>
					</FlexApart>
				</Stack>
			</Center>
			<StatFormControl
				onBack={() => {
					return shouldShowArrangementStep(math.func, math.operation) ? 1 : 2;
				}}
			/>
			<CreateNewUploadModal
				open={newUploadModalOpen}
				handleClose={() => setNewUploadModalOpen(false)}
				statBoxId={statId}
				onSuccess={handleSuccessResponse}
			/>
		</FlexApart>
	);
};
