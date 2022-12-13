import React, { useContext, useState } from 'react';
import { GraphInstanceContext } from 'src/content/PostProcess/context/GraphInstanceContext';
import { Grid } from '@mui/material';
import Scrollbar from 'src/components/Scrollbar';
import {
	GraphLimitsButton,
	OperationsPanelCtn,
} from 'src/content/PostProcess/components';
import { LOWERL_LIMIT, UPPERL_LIMIT } from 'src/content/PostProcess/constants';
import { useTranslation } from 'next-i18next';
import { useSession } from 'src/content/PostProcess/hooks/useSession';
import { useSelector, useDispatch } from 'src/store';
import { selectPPLimits, setFetchId } from 'src/slices/postProcessing/graphs';
import { addLimits } from 'src/slices/pinboard/dataProcessing/pinnedDataSlice';
import { CreateLimitModal } from 'src/components/Modals/CreateLimitModal';
import { LoadLimitsModal } from './LoadLimitsModal';
import { LimitsTogglers } from './LimitsTogglers';
import { LimitSetter } from './LimitSetter';

export const LimitsPanel = React.memo(() => {
	const [loadLimitsModalOpen, setLoadLimitsModalOpen] = useState(false);
	const [createLimitModalOpen, setCreateLimitModalOpen] = useState(false);
	const { graphId } = useContext(GraphInstanceContext);
	const { fetchId } = useSelector((state) => {
		return selectPPLimits(state)[graphId];
	});
	const { isOwner } = useSession();
	const { t } = useTranslation();
	const dispatch = useDispatch();

	const onLimitCreationSuccess = ({ id, name }) => {
		dispatch(addLimits({ projectId: id, projectName: name }));
		dispatch(setFetchId({ graphId, value: id }));
	};

	return (
		<Scrollbar autoHide={false}>
			<OperationsPanelCtn>
				{!fetchId && (
					<>
						<LimitSetter graphId={graphId} type={UPPERL_LIMIT} />
						<LimitSetter graphId={graphId} type={LOWERL_LIMIT} />
					</>
				)}
				<LimitsTogglers graphId={graphId} />
				<Grid container>
					<Grid item xs={6}>
						<GraphLimitsButton
							onClick={() => setLoadLimitsModalOpen(true)}
							disabled={!isOwner}
						>
							{t('Load Limits')}
						</GraphLimitsButton>
					</Grid>
					<Grid item xs={6}>
						<GraphLimitsButton
							disabled={!!fetchId || !isOwner}
							variant="outlined"
							onClick={() => setCreateLimitModalOpen(true)}
						>
							{t('Save Limits')}
						</GraphLimitsButton>
					</Grid>
				</Grid>
			</OperationsPanelCtn>
			<LoadLimitsModal
				open={loadLimitsModalOpen}
				handleClose={() => setLoadLimitsModalOpen(false)}
				graphId={graphId}
			/>
			<CreateLimitModal
				open={createLimitModalOpen}
				handleClose={() => setCreateLimitModalOpen(false)}
				graphId={graphId}
				onSuccess={onLimitCreationSuccess}
			/>
		</Scrollbar>
	);
});
