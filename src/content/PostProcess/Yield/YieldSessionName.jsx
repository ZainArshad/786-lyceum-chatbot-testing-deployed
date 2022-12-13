import { useContext } from 'react';
import { YieldInstanceContext } from 'src/content/PostProcess/context';
import { EditableTextInput } from 'src/components/Forms/TextInputs/EditableTextInput';
import { useDispatch, useSelector } from 'src/store';
import {
	updateYieldBoxName,
	selectYieldGroups,
} from 'src/slices/postProcessing/yield';

export const YieldBoxName = () => {
	const { yieldId } = useContext(YieldInstanceContext);
	const yieldBox = useSelector((state) => {
		const yieldGroup = selectYieldGroups(state);
		return yieldGroup[yieldId];
	});
	const dispatch = useDispatch();

	const handleChange = (newName) => {
		if (!newName || newName === yieldBox.name) return;
		dispatch(updateYieldBoxName({ yieldId, newName }));
	};

	return (
		<EditableTextInput
			textToShow={yieldBox.name}
			onChangeSuccess={handleChange}
		/>
	);
};
