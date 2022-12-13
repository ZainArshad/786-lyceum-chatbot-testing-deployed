import { createContext, useMemo } from 'react';
import PropTypes from 'prop-types';
import { Si6maLoader } from 'src/components/shared/Loaders';
import { Center } from 'src/components/shared/wrappers';

/**
 * @typedef YieldInstanceContext
 * @property {string} yieldId
 */

/** @type {import('react').Context<YieldInstanceContext>} */
export const YieldInstanceContext = createContext({
	yieldId: '',
});

export const YieldInstanceProvider = ({ yieldId, children }) => {
	const y = useMemo(
		() => ({
			yieldId,
		}),
		[yieldId]
	);

	if (!y.yieldId) {
		return (
			<Center>
				<Si6maLoader />
			</Center>
		);
	}

	return (
		<YieldInstanceContext.Provider value={y}>
			{children}
		</YieldInstanceContext.Provider>
	);
};

YieldInstanceProvider.propTypes = {
	yieldId: PropTypes.string.isRequired,
	children: PropTypes.node,
};
