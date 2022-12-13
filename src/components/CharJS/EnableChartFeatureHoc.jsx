import PropTypes from 'prop-types';
import { useEffect, useRef } from 'react';
import { Chart as ChartJS } from 'chart.js';
import { useRefMounted } from 'src/hooks/useRefMounted';

export const EnableChartFeatureHoc = ({
	zoom = false,
	options = {
		forceClean: false,
	},
	children,
}) => {
	const isMountedRef = useRefMounted();
	const zoomPluginRef = useRef(null);

	useEffect(() => {
		const enableChartZoom = async () => {
			if (zoom) {
				const zoomPlugin = (await import('chartjs-plugin-zoom')).default;
				ChartJS.register(zoomPlugin);
				zoomPluginRef.current = zoomPlugin;
			}
		};
		if (isMountedRef()) {
			enableChartZoom();
		}

		return () => {
			if (options.forceClean) {
				ChartJS.unregister(zoomPluginRef.current);
				zoomPluginRef.current = null;
			}
		};
	}, [isMountedRef, zoom]);
	return children;
};

EnableChartFeatureHoc.propTypes = {
	zoom: PropTypes.bool,
	options: PropTypes.shape({
		forceClean: PropTypes.bool,
	}),
	children: PropTypes.node,
};
