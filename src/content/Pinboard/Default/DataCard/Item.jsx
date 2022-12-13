import HideSourceOutlinedIcon from '@mui/icons-material/HideSourceOutlined';
import {
	IconButton,
	Stack,
	Tooltip,
	Typography,
	useTheme,
	styled,
	Box,
} from '@mui/material';
import { useTranslation } from 'next-i18next';
import PropTypes from 'prop-types';
import { FlexApart } from 'src/components/shared/wrappers';
import { DATA_TYPES } from 'src/content/Analyzer/constants';
import {
	removeSelectedCategory,
	selectIsProcessing,
	removeLimits,
} from 'src/slices/pinboard/dataProcessing/pinnedDataSlice';
import { useDispatch, useSelector } from 'src/store';
import { LimitsIcon, SimulationIcon, MeasurementsIcon } from 'src/assets/svgs';
import { useState } from 'react';

const IconCtn = styled(Box)(({ theme }) => ({
	width: theme.spacing(4),
	height: theme.spacing(4),
	borderRadius: theme.spacing(1),
	backgroundColor: theme.palette.common.white,
	border: `1px solid ${theme.palette.secondary.lightest}`,
	display: 'flex',
	alignItems: 'center',
	justifyContent: 'center',
	marginRight: theme.spacing(0.1),
}));

const DataCardItem = ({
	heading,
	description,
	projectId,
	categoryId,
	type,
}) => {
	const isLimit = type === DATA_TYPES.LIMIT;
	const theme = useTheme();
	const [isHovering, setIsHovering] = useState(false);
	const dispatch = useDispatch();
	const { t } = useTranslation();
	const isProcessing = useSelector(selectIsProcessing);

	const handleCategoryRemove = () => {
		dispatch(removeSelectedCategory({ projectId, categoryId }));
	};

	const handleLimitRemove = () => {
		dispatch(removeLimits({ projectId }));
	};

	const getTypedIcon = () => {
		switch (type) {
			case DATA_TYPES.MEASUREMENT:
				return <MeasurementsIcon style={{ width: 20, height: 20 }} />;
			case DATA_TYPES.LIMIT:
				return <LimitsIcon />;
			case DATA_TYPES.SIMULATION:
				return <SimulationIcon style={{ width: 20, height: 20 }} />;
			default:
				return null;
		}
	};

	return (
		<Stack
			sx={{
				mb: theme.spacing(1),
				backgroundColor: theme.palette.secondary.lighter,
				border: `1px solid ${theme.palette.secondary.lightest}`,
				borderRadius: theme.spacing(1),
				padding: theme.spacing(1),
			}}
		>
			<FlexApart
				sx={{ justifyContent: 'flex-start', minHeight: theme.spacing(4) }}
				onMouseEnter={() => setIsHovering(true)}
				onMouseLeave={() => setIsHovering(false)}
			>
				{!isHovering ? (
					<IconCtn>{getTypedIcon()}</IconCtn>
				) : (
					<Tooltip
						title={t('Remove')}
						disabled={isProcessing}
						arrow
						placement="left"
					>
						<IconButton
							size="small"
							sx={{ mr: theme.spacing(0.5) }}
							onClick={isLimit ? handleLimitRemove : handleCategoryRemove}
						>
							<HideSourceOutlinedIcon color="secondary" />
						</IconButton>
					</Tooltip>
				)}
				<Stack>
					<Typography variant="body1">{heading}</Typography>
					<Typography variant="subtitle2">{description}</Typography>
				</Stack>
			</FlexApart>
		</Stack>
	);
};

DataCardItem.propTypes = {
	heading: PropTypes.string.isRequired,
	description: PropTypes.string,
	projectId: PropTypes.string.isRequired,
	categoryId: PropTypes.string,
	type: PropTypes.string.isRequired,
};

export default DataCardItem;
