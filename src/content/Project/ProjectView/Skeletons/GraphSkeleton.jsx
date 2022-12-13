import { Skeleton } from '@mui/material';

export const GraphSkeleton = () => {
	return (
		<>
			<Skeleton
				variant="rect"
				width="100%"
				sx={{
					borderRadius: 2,
					height: {
						lg: 600,
						md: 500,
						sm: 400,
						xs: 300,
					},
				}}
			/>
			<Skeleton variant="text" width="100%" sx={{ my: 2 }} />
		</>
	);
};
