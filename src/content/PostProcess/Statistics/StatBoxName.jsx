import { useContext } from 'react';
import { StatInstanceContext } from 'src/content/PostProcess/context';
import { EditableTextInput } from 'src/components/Forms/TextInputs/EditableTextInput';
import { useDispatch, useSelector } from 'src/store';
import {
	selectPPStatBoxNames,
	updateStatBoxName,
} from 'src/slices/postProcessing/statistics';

export const StatBoxName = () => {
	const { statId } = useContext(StatInstanceContext);
	const currentStatBoxName = useSelector((state) => {
		return selectPPStatBoxNames(state)[statId];
	});
	const dispatch = useDispatch();

	const handleChange = (newName) => {
		if (!newName || newName === currentStatBoxName.name) return;
		dispatch(updateStatBoxName({ statBoxId: statId, newName }));
	};

	return (
		<EditableTextInput
			textToShow={currentStatBoxName.name}
			onChangeSuccess={handleChange}
		/>
	);
};
