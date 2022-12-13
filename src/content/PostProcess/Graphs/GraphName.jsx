import { useContext } from 'react';
import { GraphInstanceContext } from 'src/content/PostProcess/context/GraphInstanceContext';
import { EditableTextInput } from 'src/components/Forms/TextInputs/EditableTextInput';
import {
	selectPPGraphNames,
	updateGraphName,
} from 'src/slices/postProcessing/graphs';
import { useDispatch, useSelector } from 'src/store';

export const GraphName = () => {
	const { graphId } = useContext(GraphInstanceContext);
	const currentGraphName = useSelector((state) => {
		return selectPPGraphNames(state)[graphId];
	});
	const dispatch = useDispatch();

	const handleChange = (newName) => {
		if (!newName || newName === currentGraphName) return;
		dispatch(updateGraphName({ graphId, graphName: newName }));
	};

	return (
		<EditableTextInput
			textToShow={currentGraphName.graphName}
			onChangeSuccess={handleChange}
		/>
	);
};
