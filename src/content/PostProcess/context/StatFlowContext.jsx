import { createContext, useState } from 'react';
import PropTypes from 'prop-types';

const initialState = {
	formControls: {
		activeStep: 0,
	},
};

export const StatFlowContext = createContext({
	statFlowState: initialState,
	setActiveStep: (_callback = () => {}) => {},
});

export const StatFlowProvider = ({ children }) => {
	const [statFlowState, setStatFlowState] = useState(initialState);

	const setActiveStep = (callback) => {
		if (typeof callback !== 'function') return;

		setStatFlowState({
			...statFlowState,
			formControls: {
				...statFlowState.formControls,
				activeStep: callback(statFlowState.formControls.activeStep),
			},
		});
	};

	return (
		// abdadeel - 2021-09-14 - TODO: fix this eslint error
		// eslint-disable-next-line react/jsx-no-constructed-context-values
		<StatFlowContext.Provider value={{ statFlowState, setActiveStep }}>
			{children}
		</StatFlowContext.Provider>
	);
};

StatFlowProvider.propTypes = {
	children: PropTypes.node,
};
