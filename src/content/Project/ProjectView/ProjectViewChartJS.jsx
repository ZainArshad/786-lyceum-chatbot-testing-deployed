/* eslint react/prop-types: 0 */
import { Box, Typography, useTheme } from '@mui/material';
import { Line } from 'react-chartjs-2';
import { useInView } from 'react-intersection-observer';
import { useQuery } from '@tanstack/react-query';
import { EnableChartFeatureHoc } from 'src/components/CharJS';
import { RetryButton } from 'src/components/shared/Buttons';
import { Center } from 'src/components/shared/wrappers';
import { DDContentCardWrapper } from 'src/content/Analyzer/DDCard/DDCardWrappers';
import { queryKeys } from 'src/lib/constants/queries';
import { getLineColors } from 'src/lib/helpers/charts';
import { time } from 'src/lib/helpers/shared';
import { makeProjectRequest } from 'src/services/api/project';
import { GraphSkeleton } from './Skeletons/GraphSkeleton';

export const ProjectViewChart = ({ categoryId, projectId, categoryName }) => {
	const [ref, inView] = useInView({
		triggerOnce: true,
	});
	const theme = useTheme();

	const {
		data: responseData,
		isLoading,
		isSuccess,
		isError,
		refetch,
	} = useQuery(
		[queryKeys.GET_PROJECT_CATEGORY_DEVICES_DETAIL, { categoryId, projectId }],
		makeProjectRequest.getCategoryDevicesDatails,
		{
			enabled: !!categoryId && !!projectId && inView,
			cacheTime: time.secondsToMilliseconds(30),
			select: (data) => data.data,
			retryOnMount: false,
			refetchOnWindowFocus: false,
			refetchOnReconnect: false,
		}
	);

	const getDataSets = () => {
		if (!responseData) return [];
		const dataSets = [];
		responseData.devices.forEach((device) => {
			const colors = getLineColors();
			dataSets.push({
				label: device.device.name,
				data: device.device_data,
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
		labels: Object?.keys(
			Object.fromEntries(responseData?.devices[0]?.device_data ?? [])
		),
	};

	const options = {
		responsive: true,
		maintainAspectRatio: false,
		animation: false,
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
		<DDContentCardWrapper ref={ref}>
			<Typography variant="h3" py={1.5}>
				{categoryName}
			</Typography>
			{isLoading && <GraphSkeleton />}
			{isSuccess && (
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
					<EnableChartFeatureHoc zoom options={{ forceClean: true }}>
						<Line data={data} options={options} />
					</EnableChartFeatureHoc>
				</Box>
			)}
			{isError && (
				<Center>
					<RetryButton text="Retry" onClick={() => refetch()} />
				</Center>
			)}
		</DDContentCardWrapper>
	);
};
