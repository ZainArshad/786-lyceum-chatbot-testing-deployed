import { Box } from '@mui/material';
import { HappyMusic } from 'src/assets/svgs/HappyMusic';

export const EmptyData = ({ ...rest }) => {
	return (
		<Box
			sx={{
				width: '100%',
				display: 'flex',
				justifyContent: 'center',
			}}
		>
			<HappyMusic {...rest} />
		</Box>
	);
};
