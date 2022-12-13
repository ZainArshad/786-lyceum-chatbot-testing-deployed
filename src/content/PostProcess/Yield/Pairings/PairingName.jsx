import PropTypes from 'prop-types';
import { EditableTextInput } from 'src/components/Forms/TextInputs/EditableTextInput';
import { useDispatch } from 'src/store';
import { updatePairingName } from 'src/slices/postProcessing/yield';

export const PairingName = ({ pairing }) => {
	const dispatch = useDispatch();

	const handleChange = (newName) => {
		if (!newName || newName === pairing.name) return;
		dispatch(updatePairingName({ pairingId: pairing.id, newName }));
	};

	return (
		<EditableTextInput
			textToShow={pairing.name}
			onChangeSuccess={handleChange}
		/>
	);
};

PairingName.propTypes = {
	pairing: PropTypes.object.isRequired,
};
