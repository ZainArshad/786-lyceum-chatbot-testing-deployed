import React from 'react';
import PropTypes from 'prop-types';
import { Box } from '@mui/material';
import { Line } from 'react-chartjs-2';
import { getLineColors } from 'src/lib/helpers/charts';

/**
 * @param {number[]} arr1
 * @param {number[]} arr2
 */
const getDataFromArrs = (arr1, arr2) => {
	if (arr1.length !== arr2.length) {
		return [];
	}
	const data = [];
	for (let i = 0; i < arr1.length; i++) {
		data.push({
			x: arr1[i],
			y: arr2[i],
		});
	}
	return data;
};

/**
 * @param {{
 *  results: ReturnType<typeof import('src/slices/postProcessing/yield').selectResultForGroup>,
 *  pairings: ReturnType<typeof import('src/slices/postProcessing/yield').selectPairingForGroup>,
 * }} props
 */
export const CpkGraph = ({ results, pairings }) => {
	const getData = () => {
		const dataset = [];
		results.forEach((result) => {
			const { cpkX, failingCpk, passingCpk } = result;
			const passingData = getDataFromArrs(cpkX, passingCpk);
			const failingData = getDataFromArrs(cpkX, failingCpk);
			if (passingData.length > 0) {
				const colors = getLineColors();
				dataset.push({
					label: `${pairings[result.uid]?.name} - passing`,
					data: passingData,
					backgroundColor: colors.backgroundColor,
					borderColor: colors.borderColor,
					pointRadius: 0,
				});
			}
			if (failingData.length > 0) {
				const colors = getLineColors();
				dataset.push({
					label: `${pairings[result.uid]?.name} - failing`,
					data: failingData,
					backgroundColor: colors.backgroundColor,
					borderColor: colors.borderColor,
					pointRadius: 0,
				});
			}
		});
		return dataset;
	};

	const data = {
		datasets: getData(),
	};

	const options = {
		plugins: {
			legend: {
				display: true,
				position: 'bottom',
			},
		},
		animation: false,
		interaction: {
			mode: 'index',
			intersect: false,
		},
		stacked: false,
		hover: {
			mode: 'nearest',
			intersect: true,
		},
		scales: {
			x: {
				display: true,
				type: 'linear',
			},
			y: {
				display: true,
				type: 'linear',
			},
		},
	};

	if (results.length === 0) return null;

	return (
		<Box w="100%" h="100%">
			<Line data={data} options={options} />
		</Box>
	);
};

CpkGraph.propTypes = {
	results: PropTypes.array.isRequired,
	pairings: PropTypes.object.isRequired,
};
