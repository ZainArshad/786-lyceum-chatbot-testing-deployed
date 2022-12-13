import { createContext, useMemo } from 'react';
import PropTypes from 'prop-types';
import { Center } from 'src/components/shared/wrappers';
import { Si6maLoader } from 'src/components/shared/Loaders';

/**
 * @typedef StatInstanceContext
 * @property {string} statId
 */

/** @type {import('react').Context<StatInstanceContext>} */
export const StatInstanceContext = createContext({
	statId: '',
});

/**
 * Context responsible for providing the stat bot id to the child components
 * Don't include frequently changing props in the context to avoid unnecessary re-renders
 */
export const StatInstanceProvider = ({ statBoxId, children }) => {
	const s = useMemo(
		() => ({
			statId: statBoxId,
		}),
		[statBoxId]
	);

	if (!s.statId) {
		return (
			<Center>
				<Si6maLoader />
			</Center>
		);
	}

	return (
		<StatInstanceContext.Provider value={s}>
			{children}
		</StatInstanceContext.Provider>
	);
};

StatInstanceProvider.propTypes = {
	statBoxId: PropTypes.string.isRequired,
	children: PropTypes.node,
};
