import React, { useContext, useEffect } from 'react';
import { GraphInstanceContext } from 'src/content/PostProcess/context/GraphInstanceContext';
import { Box, Typography } from '@mui/material';
import { Line } from 'react-chartjs-2';
import { EnableChartFeatureHoc } from 'src/components/CharJS';
import { Center } from 'src/components/shared/wrappers';
import { RetryButton } from 'src/components/shared/Buttons';
import { useTranslation } from 'next-i18next';
import { ppgraphPanelHeight as h } from '../../constants';
import { PPGraphSkeleton } from '../../Skeletons';
import { useSessionGraph } from '../../hooks/useSessionGraph';
import { useChartOptions } from '../../hooks/useChartOptions';
import { GraphMitterContext } from '../../context/GraphMitterContext';

export const PostProcessGraph = React.memo(() => {
	const { t } = useTranslation();
	const { graphId } = useContext(GraphInstanceContext);
	const { mitter } = useContext(GraphMitterContext);
	const { chartOptions } = useChartOptions({ graphId });
	const { data, isError, isIdle, isLoading, isSuccess, refetch, hasNodes } =
		useSessionGraph({ graphId });
	const getLimKey = `get-limits:${graphId}`;

	// eventually this approach will be depricated by moving context upper in tree
	useEffect(() => {
		if (mitter.all.has(getLimKey)) {
			mitter.off(getLimKey);
		}
		mitter.on(getLimKey, () => {
			const limits = data.datasets.filter((d) => d.isLimit);
			mitter.emit(`your-limits:${graphId}`, { limits });
		});
		return () => {
			mitter.off(getLimKey);
		};
	}, [data]);

	const renderGraph = () => {
		if (isSuccess && hasNodes) {
			return (
				<Box sx={{ height: h }}>
					<EnableChartFeatureHoc zoom options={{ forceClean: true }}>
						<Line data={data} options={chartOptions} />
					</EnableChartFeatureHoc>
				</Box>
			);
		}
		if (isIdle || isError) {
			return (
				<Center sx={{ height: h, flexDirection: 'column' }}>
					<Typography>{t("Let's add some nodes!")}</Typography>
					<Typography variant="caption">
						{isIdle
							? t('press retry if you still see this message.')
							: t(
									'Oops! Something went wrong! Make sure you have nodes selected.'
							  )}
					</Typography>
					<RetryButton
						disabled={!hasNodes}
						text="Retry"
						onClick={() => refetch()}
					/>
				</Center>
			);
		}
		if (isLoading) {
			return <PPGraphSkeleton />;
		}
	};

	return renderGraph();
});

export default PostProcessGraph;
