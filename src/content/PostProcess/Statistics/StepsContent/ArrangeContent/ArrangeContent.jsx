import { Stack, Box, styled, Card, Divider } from '@mui/material';
import React, { useContext } from 'react';
import { Center, FlexApart } from 'src/components/shared/wrappers';
import { StatFormControl } from 'src/content/PostProcess/Statistics/StatFormControl';
import { StatInstanceContext } from 'src/content/PostProcess/context';
import { useDispatch, useSelector } from 'src/store';
import {
	selectPPStatBoxNodes,
	alterNodesPosition,
} from 'src/slices/postProcessing/statistics';
import { DragDropContext, Draggable, Droppable } from 'react-beautiful-dnd';
import {
	INSTANCE_TYPE_MASTER,
	INSTANCE_TYPE_SLAVE,
	INSTANCE_TYPE_TO_STORE_NAME_NODE,
	ppgraphPanelHeight,
} from 'src/content/PostProcess/constants';

const DragStack = styled(Stack)(
	() => `
    min-width: 700px;
    height: auto;
    display: flex;
    align-items: center;
    justify-content: center;
    max-height: 100rem;
    overflow-y: auto;
  `
);

const DragCtn = styled(Box)(
	() => `
    min-width: 50%;
    height: auto;
  `
);

const DragCard = styled(Card)(
	({ theme }) => `
    width: 100%;
    height: auto;
    display: flex;
    align-items: center;
    justify-content: flex-start;
    margin-bottom: ${theme.spacing(1)};
    padding: ${theme.spacing(2)};
    border: 1px solid ${theme.palette.secondary.lightest};
  `
);

export const ArrangeContent = () => {
	const { statId } = useContext(StatInstanceContext);
	const dispatch = useDispatch();
	const nodes = useSelector(
		selectPPStatBoxNodes,
		(a, b) => a[statId] === b[statId]
	)[statId];
	const selectedNodes = nodes.nodes;

	const handleDragEnd = (result) => {
		if (!result.destination) return;
		dispatch(
			alterNodesPosition({
				statBoxId: statId,
				instanceType: result.source.droppableId,
				nodeId: result.draggableId,
				destinationIdx: result.destination.index,
			})
		);
	};

	return (
		<FlexApart flexDirection="column" sx={{ minHeight: ppgraphPanelHeight }}>
			<Center flex={1}>
				<DragStack direction="row">
					<DragDropContext onDragEnd={handleDragEnd}>
						<Droppable
							droppableId={
								INSTANCE_TYPE_TO_STORE_NAME_NODE[INSTANCE_TYPE_MASTER]
							}
						>
							{(provided) => (
								<DragCtn ref={provided.innerRef}>
									{selectedNodes.masterNodes.map((node, index) => (
										<Draggable
											draggableId={node.nodeId}
											index={index}
											key={node.nodeId}
										>
											{(provided, _snapshot) => (
												<Stack
													direction="row"
													ref={provided.innerRef}
													style={{ ...provided.draggableProps.style }}
													{...provided.draggableProps}
													{...provided.dragHandleProps}
												>
													<DragCard>{node.name}</DragCard>
													<Center sx={{ width: 'auto' }}>
														<Divider sx={{ width: '2rem', height: '2px' }} />
													</Center>
												</Stack>
											)}
										</Draggable>
									))}
									{provided.placeholder}
								</DragCtn>
							)}
						</Droppable>
					</DragDropContext>
					<DragDropContext onDragEnd={handleDragEnd}>
						<Droppable
							droppableId={
								INSTANCE_TYPE_TO_STORE_NAME_NODE[INSTANCE_TYPE_SLAVE]
							}
						>
							{(provided) => (
								<DragCtn ref={provided.innerRef}>
									{selectedNodes.slaveNodes.map((node, index) => (
										<Draggable
											draggableId={node.nodeId}
											index={index}
											key={node.nodeId}
										>
											{(provided, _snapshot) => (
												<Stack
													direction="row"
													ref={provided.innerRef}
													style={{ ...provided.draggableProps.style }}
													{...provided.draggableProps}
													{...provided.dragHandleProps}
												>
													<Center sx={{ width: 'auto' }}>
														<Divider sx={{ width: '2rem', height: '2px' }} />
													</Center>
													<DragCard>{node.name}</DragCard>
												</Stack>
											)}
										</Draggable>
									))}
									{provided.placeholder}
								</DragCtn>
							)}
						</Droppable>
					</DragDropContext>
				</DragStack>
			</Center>
			<StatFormControl
				onNext={() => {
					return true;
				}}
			/>
		</FlexApart>
	);
};
