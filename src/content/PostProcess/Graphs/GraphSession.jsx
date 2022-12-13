import { Box, Grid, useTheme } from '@mui/material';
import React, { useState } from 'react';
import { DottedDivider } from 'src/components/shared';
import { OperationsPanelCtn } from 'src/content/PostProcess/components';
import { FlexApart } from 'src/components/shared/wrappers';
import { GraphSessionContainer, TabButton } from '../components';
import { tabButtons } from '../utils/tabButtons';
import { DescriptorPanel } from './SidePanels/Details';
import { LimitsPanel } from './SidePanels/Limits';
import { NodesPanel } from './SidePanels/Nodes';
import { NotesPanel } from './SidePanels/Notes';
import { PropertiesPanel } from './SidePanels/Properties';
import { PostProcessGraph } from './Graph/PostProcessGraph';
import { GraphName } from './GraphName';
import { GraphOptionsPanel } from './GraphOptionsPanel';
import { useSession } from '../hooks/useSession';
import { ppgraphPanelHeight } from '../constants';

export const GraphSession = React.memo(() => {
	const [tabValue, setTabValue] = useState(0);
	const theme = useTheme();
	const { isOwner } = useSession();

	return (
		<GraphSessionContainer mb={2}>
			<GraphName />
			<FlexApart>
				<Box sx={{ my: theme.spacing(2) }}>
					{tabButtons.map((btn) => (
						<TabButton
							key={btn.id}
							label={btn.label}
							selected={btn.id === tabValue}
							disabled={btn.disabled}
							onClick={() => setTabValue(btn.id)}
						/>
					))}
				</Box>
				{isOwner && <GraphOptionsPanel />}
			</FlexApart>
			<DottedDivider />
			<Grid container spacing={2}>
				<Grid item xs={12} lg={4}>
					<Box
						sx={{
							height: ppgraphPanelHeight,
						}}
					>
						{tabValue === 0 && <DescriptorPanel />}
						{tabValue === 2 && <LimitsPanel />}
						{tabValue === 3 && <NotesPanel />}
						{tabValue === 4 && <NodesPanel />}
						{tabValue === 5 && <PropertiesPanel />}
					</Box>
				</Grid>
				<Grid item md={12} lg={8}>
					<OperationsPanelCtn>
						<PostProcessGraph />
					</OperationsPanelCtn>
				</Grid>
			</Grid>
		</GraphSessionContainer>
	);
});
