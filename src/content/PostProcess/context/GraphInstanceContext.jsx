import { createContext, useMemo } from 'react';
import PropTypes from 'prop-types';
import { Center } from 'src/components/shared/wrappers';
import { Si6maLoader } from 'src/components/shared/Loaders';

export const GraphInstanceContext = createContext({
	graphId: null,
	setGraphId: () => {},
});

/**
 * Context responsible for providing the graphId to the child components
 * Don't include frequently changing props in the context to avoid unnecessary re-renders
 * @param {*} param0
 * @returns {{graphId: string, setGraphId: (string) => void}}
 */
export const GraphInstanceProvider = ({ gid, children }) => {
	const g = useMemo(
		() => ({
			graphId: gid,
		}),
		[gid]
	);

	if (!g.graphId) {
		return (
			<Center>
				<Si6maLoader />
			</Center>
		);
	}

	return (
		<GraphInstanceContext.Provider value={g}>
			{children}
		</GraphInstanceContext.Provider>
	);
};

GraphInstanceProvider.propTypes = {
	gid: PropTypes.string,
	children: PropTypes.node,
};
