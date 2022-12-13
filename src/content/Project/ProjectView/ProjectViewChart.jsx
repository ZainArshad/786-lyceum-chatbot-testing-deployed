/* eslint react/prop-types: 0 */
import { Typography } from '@mui/material';
import { useCallback } from 'react';
import { useQuery } from '@tanstack/react-query';
import { Chart } from 'src/components/Chart';
import ReplayIcon from '@mui/icons-material/Replay';
import { useTranslation } from 'next-i18next';
import { useInView } from 'react-intersection-observer';
import { Button } from 'src/components/shared/Buttons';
import { Center } from 'src/components/shared/wrappers';
import { DDContentCardWrapper } from 'src/content/Analyzer/DDCard/DDCardWrappers';
import { queryKeys } from 'src/lib/constants/queries';
import { time } from 'src/lib/helpers/shared';
import { makeProjectRequest } from 'src/services/api/project';
import { GraphSkeleton } from './Skeletons/GraphSkeleton';

export const ProjectViewChart = ({ categoryId, projectId, categoryName }) => {
	const [ref, inView] = useInView({
		triggerOnce: true,
	});
	const { t } = useTranslation();

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

	const getSeries = useCallback(() => {
		if (!responseData) return [];
		const series = [];
		responseData.devices.forEach((device) => {
			series.push({
				name: device.device.name,
				data: Object.values(device.device_data),
			});
		});
		// series.push({
		//   name: 'Common Axis',
		//   data: Object.values(responseData.devices[0])
		// });
		// console.log(series[0].data.length);
		return series;
	}, [responseData]);

	const chartOptions = {
		series: getSeries(),
		options: {
			chart: {
				height: 350,
				type: 'area',
			},
			dataLabels: {
				enabled: false,
			},
			stroke: {
				curve: 'smooth',
			},
			xaxis: {
				labels: {
					show: false,
				},
			},
			yaxis: {
				labels: {
					show: false,
				},
			},
			tooltip: {
				x: {
					show: false,
				},
				y: {
					title: {
						formatter: (seriesName) => seriesName,
					},
					formatter: (val) => Number(val?.toFixed(2)),
				},
			},
		},
	};

	return (
		<DDContentCardWrapper ref={ref}>
			<Typography variant="h3" py={1.5}>
				{categoryName}
			</Typography>
			{isLoading && <GraphSkeleton />}
			{isSuccess && (
				<Chart
					options={chartOptions.options}
					series={chartOptions.series}
					type="area"
				/>
			)}
			{isError && (
				<Center>
					<Button
						startIcon={<ReplayIcon />}
						variant="primary"
						size="lg"
						onClick={() => refetch()}
					>
						{t('Retry')}
					</Button>
				</Center>
			)}
		</DDContentCardWrapper>
	);
};
