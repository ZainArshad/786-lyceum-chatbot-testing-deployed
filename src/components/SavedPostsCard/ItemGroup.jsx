import PropTypes from 'prop-types';
import { styled, useTheme, Box, Typography } from '@mui/material';
import RemoveCircleOutlineIcon from '@mui/icons-material/RemoveCircleOutline';
import Scrollbar from '../Scrollbar';

const SavedItemEntry = styled(Box)(
	({ theme }) => `
	display: flex;
	align-items: center;
	border-radius: ${theme.shape.borderRadius}px;
	height: ${theme.spacing(4)};
    background-color: ${theme.colors.alpha.white[100]};
    padding: ${theme.spacing(1)} ${theme.spacing(0.5)};
    margin-bottom: ${theme.spacing(0.5)};

	&:hover {
		background-color: ${theme.colors.alpha.black[10]};
		cursor: pointer;
	}
`
);

const SavedPostItemGroup = ({ heading, questions }) => {
	const theme = useTheme();

	return (
		<Box
			sx={{ display: 'flex', flexDirection: 'column', mb: theme.spacing(1) }}
		>
			<Typography sx={{ fontSize: theme.typography.h5 }}>{heading}</Typography>
			<Box
				sx={{
					display: 'flex',
					flexDirection: 'column',
					marginTop: 1,
					height: '150px',
				}}
			>
				<Scrollbar>
					{questions.map((question, i) => (
						<SavedItemEntry key={i}>
							<Typography
								sx={{
									flex: 1,
									fontSize: theme.typography.body2,
									color: theme.colors.alpha.black[50],
									overflow: 'hidden',
									whiteSpace: 'nowrap',
									textOverflow: 'ellipsis',
								}}
							>
								{question}
							</Typography>
							<RemoveCircleOutlineIcon
								sx={{ marginRight: '10px' }}
								color="error"
							/>
						</SavedItemEntry>
					))}
				</Scrollbar>
			</Box>
		</Box>
	);
};

SavedPostItemGroup.propTypes = {
	heading: PropTypes.string.isRequired,
	questions: PropTypes.arrayOf(PropTypes.string).isRequired,
};

export default SavedPostItemGroup;
