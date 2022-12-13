import { useTheme } from '@mui/material';
import { selectPPProperties } from 'src/slices/postProcessing/graphs';
import { useSelector } from 'src/store';
import _ from 'lodash';

import { configureTooltip } from 'src/lib/helpers/graphs/postProcessing';

/**
 *
 * @param {{graphId: string}} param0
 * @returns {{chartOptions: {[key: string]: any}}}
 */
export const useChartOptions = ({ graphId }) => {
	const theme = useTheme();

	const propertiesPrefs = useSelector((state) => {
		const pr = selectPPProperties(state);
		return pr[graphId];
	});

	const options = {
		responsive: true,
		maintainAspectRatio: false,
		animation: false,
		spanGaps: true,
		cornerRadius: 22,
		plugins: {
			legend: {
				display: propertiesPrefs.legend,
				position: 'bottom',
				// onClick: (e, legendItem, legend) => {
				//   console.log(e, legendItem, legend);
				// }
			},
			tooltip: { ...configureTooltip(theme) },
			zoom: {
				zoom: {
					wheel: {
						enabled: true,
					},
					pinch: {
						enabled: true,
					},
					mode: 'x',
				},
				pan: {
					enabled: true,
					mode: 'x',
				},
			},
		},
		scales: {
			x: {
				display: true,
				type: propertiesPrefs.xScale,
				...(!_.isNull(propertiesPrefs.xLow) && {
					min: Number(propertiesPrefs.xLow),
				}),
				...(!_.isNull(propertiesPrefs.xHigh) && {
					max: Number(propertiesPrefs.xHigh),
				}),
			},
			y: {
				display: true,
				type: propertiesPrefs.yScale,
				...(!_.isNull(propertiesPrefs.yLow) && {
					min: Number(propertiesPrefs.yLow),
				}),
				...(!_.isNull(propertiesPrefs.yHigh) && {
					max: Number(propertiesPrefs.yHigh),
				}),
			},
		},
		interaction: {
			mode: 'index',
			intersect: false,
		},
		stacked: false,
		hover: {
			mode: 'nearest',
			intersect: true,
		},
	};

	return { chartOptions: options };
};
