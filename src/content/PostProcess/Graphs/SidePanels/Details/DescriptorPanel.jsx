import { useContext } from 'react';
import { GraphInstanceContext } from 'src/content/PostProcess/context/GraphInstanceContext';
import Scrollbar from 'src/components/Scrollbar';
import { OperationsPanelCtn } from 'src/content/PostProcess/components';
import { useQuery } from '@tanstack/react-query';
import { queryKeys } from 'src/lib/constants/queries';
import { makeProjectRequest } from 'src/services/api/project';
import { useSelector } from 'src/store';
import { selectPPNodes } from 'src/slices/postProcessing/graphs';
import { shallowEqual } from 'react-redux';
import _ from 'lodash';
import { Si6maLoader } from 'src/components/shared/Loaders';
import { Center } from 'src/components/shared/wrappers';
import { Typography } from '@mui/material';
import { RetryButton } from 'src/components/shared/Buttons';
import { useTranslation } from 'next-i18next';
import { DescriptorEntry } from './DescriptorEntry';

export const DescriptorPanel = () => {
	const { t } = useTranslation();
	const { graphId } = useContext(GraphInstanceContext);
	const selectedNodes = useSelector(selectPPNodes, (left, right) => {
		return shallowEqual(left[graphId], right[graphId]);
	});

	const generateRequestPayload = () => _.keys(selectedNodes[graphId]);
	const hasProjectIds = !_.isEmpty(generateRequestPayload());

	const {
		data: responseData,
		status,
		fetchStatus,
		refetch,
	} = useQuery(
		[
			queryKeys.GET_GRAPH_DETAILS,
			graphId,
			{
				payload: generateRequestPayload(),
			},
		],
		makeProjectRequest.getDeviceNodeDescriptors,
		{
			enabled: hasProjectIds,
			select: (data) => {
				const f = _.groupBy(data.data, (o) => o.project);
				return _.values(f);
			},
			cacheTime: Infinity,
		}
	);

	const renderPanelContent = () => {
		if (status === 'success') {
			return (
				<>
					{responseData.map((proj, i) => (
						<DescriptorEntry key={i} proj={proj} />
					))}
				</>
			);
		}
		if (fetchStatus === 'idle' || status === 'error') {
			return (
				<Center
					sx={{
						height: '100%',
						flexDirection: 'column',
					}}
				>
					<Typography>{t("Let's add some nodes!")}</Typography>
					<Typography variant="caption">
						{t('press retry if you still see this message.')}
					</Typography>
					<RetryButton
						disabled={!hasProjectIds}
						text="Retry"
						onClick={() => refetch()}
					/>
				</Center>
			);
		}
		if (status === 'loading') {
			return <Si6maLoader />;
		}
	};

	return (
		<Scrollbar autoHide={false}>
			<OperationsPanelCtn style={{ height: '100%' }}>
				{renderPanelContent()}
			</OperationsPanelCtn>
		</Scrollbar>
	);
};
