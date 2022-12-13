import RemoveCircleOutlineIcon from '@mui/icons-material/RemoveCircleOutline';
import {
	useTheme,
	Card,
	CardContent,
	Typography,
	Box,
	IconButton,
} from '@mui/material';
import PropTypes from 'prop-types';

const DataCardItem = ({ heading, description }) => {
	const theme = useTheme();
	return (
		<Card sx={{ marginBottom: theme.spacing(1), height: '71px' }}>
			<CardContent>
				<Box
					sx={{
						display: 'flex',
						justifyContent: 'space-between',
						alignItems: 'center',
					}}
				>
					<Box
						sx={{
							display: 'flex',
							flexDirection: 'column',
							flex: 1,
						}}
					>
						<Typography
							sx={{
								fontSize: theme.typography.h6,
							}}
						>
							{heading}
						</Typography>
						<Typography
							sx={{
								fontSize: theme.typography.body2,
								color: theme.colors.alpha.black[50],
							}}
						>
							{description}
						</Typography>
					</Box>
					<IconButton>
						<RemoveCircleOutlineIcon color="error" />
					</IconButton>
				</Box>
			</CardContent>
		</Card>
	);
};

DataCardItem.propTypes = {
	heading: PropTypes.string.isRequired,
	description: PropTypes.string.isRequired,
};

export default DataCardItem;
