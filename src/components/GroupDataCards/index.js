import PropTypes from 'prop-types';
import { useTheme, styled, Box, Typography, Icon, Grid } from '@mui/material';
import SignalCellularAltRoundedIcon from '@mui/icons-material/SignalCellularAltRounded';
import DataReactionsPanel from './Common/DataActions';

const GroupsDataCardWrapper = styled(Box)(
	({ theme }) => `
        margin-top: ${theme.spacing(2)};
        width: 100%;
        display: flex;
        flex-direction: column;
        border-radius: ${theme.general.borderRadiusSm};
        border: 1px solid ${theme.colors.alpha.black[10]};
    `
);

const GroupsDataCard = ({ questionId, userLiked }) => {
	const theme = useTheme();

	return (
		<GroupsDataCardWrapper>
			<Box p={theme.spacing(2)}>
				<Box sx={{ display: 'flex', width: '100%', alignItems: 'self-start' }}>
					<Icon
						color="primary"
						sx={{
							borderRadius: theme.general.borderRadiusSm,
							border: `1px solid ${theme.colors.alpha.black[10]}`,
							color: theme.colors.primary,
							display: 'flex',
							alignItems: 'center',
							padding: theme.spacing(2, 2),
							margin: theme.spacing(0, 0.75),
							width: '60px',
						}}
					>
						<SignalCellularAltRoundedIcon />
					</Icon>
					<Box sx={{ marginLeft: theme.spacing(1) }}>
						<Grid container>
							<Typography
								sx={{ fontSize: theme.typography.h5, fontWeight: 600 }}
							>
								Sample Data 1
							</Typography>
							<Typography
								sx={{
									color: theme.colors.alpha.black[70],
									fontSize: 12,
									ml: 1.5,
									mt: 0.3,
								}}
							>
								Updated April 29,2022
							</Typography>
						</Grid>
					</Box>
				</Box>
				<Box
					sx={{
						display: 'flex',
						width: '100%',
						alignItems: 'center',
						justifyContent: 'space-between',
						padding: theme.spacing(0, 0, 2, 0),
					}}
				>
					<Typography
						sx={{
							fontFamily: theme.typography.h6,
							padding: theme.spacing(0, 0, 2, 9.5),
						}}
					>
						Charles Xavier
					</Typography>
					<Box>
						<DataReactionsPanel postId={questionId} userLiked={userLiked} />
					</Box>
				</Box>
			</Box>
		</GroupsDataCardWrapper>
	);
};

GroupsDataCard.propTypes = {
	questionId: PropTypes.string.isRequired,
	userLiked: PropTypes.bool.isRequired,
};

export default GroupsDataCard;
