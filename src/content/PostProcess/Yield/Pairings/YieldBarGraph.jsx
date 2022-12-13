import React from 'react';
import PropTypes from 'prop-types';
import { Bar } from 'react-chartjs-2';
import { getLineColors } from 'src/lib/helpers/charts';

/**
 * @param {{
 *  results: ReturnType<typeof import('src/slices/postProcessing/yield').selectResultForGroup>,
 *  pairings: ReturnType<typeof import('src/slices/postProcessing/yield').selectPairingForGroup>,
 * }} props
 */
export const YieldBarGraph = ({ results, pairings }) => {
	const getTotalYield = () => {
		const totalYield = results.reduce((acc, curr) => {
			return acc + curr.passingNodesPercentage;
		}, 0);
		return totalYield / results.length;
	};

	const generateDataSets = () => {
		const datasets = [];
		results.forEach((result) => {
			const colors = getLineColors();
			datasets.push({
				data: [
					{
						x: pairings[result.uid].name,
						y: result.passingNodesPercentage * 100,
					},
				],
				backgroundColor: colors.backgroundColor,
				borderColor: colors.borderColor,
				borderWidth: 1,
			});
		});
		// add total yield
		const colors = getLineColors();
		datasets.push({
			data: [
				{
					x: 'Total Yield',
					y: getTotalYield() * 100,
				},
			],
			backgroundColor: colors.backgroundColor,
			borderColor: colors.borderColor,
			borderWidth: 1,
		});
		return datasets;
	};

	const data = {
		datasets: generateDataSets(),
	};

	const options = {
		plugins: {
			legend: {
				display: false,
			},
		},
		animation: false,
	};

	if (results.length === 0) return null;

	return (
		<div>
			<Bar data={data} options={options} />
		</div>
	);
};

YieldBarGraph.propTypes = {
	results: PropTypes.array.isRequired,
	pairings: PropTypes.object.isRequired,
};
