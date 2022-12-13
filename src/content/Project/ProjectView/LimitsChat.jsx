import PropTypes from 'prop-types';
import { Box, Typography, useTheme } from '@mui/material';
import { Line } from 'react-chartjs-2';
import { EnableChartFeatureHoc } from 'src/components/CharJS';
import { RetryButton } from 'src/components/shared/Buttons';
import { Center } from 'src/components/shared/wrappers';
import { DDContentCardWrapper } from 'src/content/Analyzer/DDCard/DDCardWrappers';
import { getLineColors } from 'src/lib/helpers/charts';

export const LimitChart = ({ limits, name, error, refetch }) => {
	const theme = useTheme();

	const getDataSets = () => {
		if (!limits) return [];
		const dataSets = [];
		limits.forEach((d) => {
			const colors = getLineColors();
			dataSets.push({
				label: d.limit_types,
				data: Object.values(d.limit),
				backgroundColor: colors.backgroundColor,
				borderColor: colors.borderColor,
				pointRadius: 0,
				fill: true,
				type: 'line',
			});
		});
		return dataSets;
	};

	const data = {
		datasets: getDataSets(),
		labels: Object.keys(limits[0]?.limit),
	};

	const options = {
		responsive: true,
		maintainAspectRatio: false,
		cornerRadius: 22,
		plugins: {
			legend: {
				position: 'bottom',
			},
			title: {
				display: false,
				text: 'Data',
			},
			tooltip: {
				enabled: true,
				mode: 'index',
				intersect: false,
				caretSize: 6,
				displayColors: true,
				yPadding: 8,
				xPadding: 16,
				borderWidth: 4,
				bodySpacing: 10,
				titleFontSize: 16,
				borderColor: theme.palette.common.black,
				backgroundColor: theme.palette.common.black,
				titleFontColor: theme.palette.common.white,
				bodyFontColor: theme.palette.common.white,
				footerFontColor: theme.palette.common.white,
			},
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
		layout: {
			padding: {
				left: 0,
				right: 0,
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

	return (
		<DDContentCardWrapper>
			<Typography variant="h3" py={1.5}>
				{name}
			</Typography>
			<Box
				sx={{
					height: {
						lg: 600,
						md: 500,
						sm: 400,
						xs: 300,
					},
				}}
			>
				<EnableChartFeatureHoc zoom>
					<Line data={data} options={options} />
				</EnableChartFeatureHoc>
			</Box>
			{error && (
				<Center>
					<RetryButton text="Retry" onClick={() => refetch()} />
				</Center>
			)}
		</DDContentCardWrapper>
	);
};

LimitChart.propTypes = {
	limits: PropTypes.array.isRequired,
	name: PropTypes.string.isRequired,
	error: PropTypes.bool.isRequired,
	refetch: PropTypes.func.isRequired,
};
