import { Skeleton } from '@mui/material';
import { ppgraphPanelHeight as h } from '../constants';

export const PPGraphSkeleton = () => {
	return (
		<Skeleton
			variant="rect"
			width="100%"
			sx={{
				borderRadius: 2,
				height: h,
			}}
		/>
	);
};
