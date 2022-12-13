import { useEffect, createContext, useState } from 'react';
import PropTypes from 'prop-types';
import mitt from 'mitt';

export const GraphMitterContext = createContext({
	mitter: null,
});

export const GraphMitterProvider = ({ children }) => {
	const [mitter, setMitter] = useState(null);

	useEffect(() => {
		if (mitter) {
			return;
		}
		setMitter(mitt());
		return () => {
			mitter?.all.clear();
			setMitter(null);
		};
	}, []);

	if (!mitter) {
		return null;
	}

	return (
		// eslint-disable-next-line react/jsx-no-constructed-context-values
		<GraphMitterContext.Provider value={{ mitter }}>
			{children}
		</GraphMitterContext.Provider>
	);
};

GraphMitterProvider.propTypes = {
	children: PropTypes.node,
};
