import PropsTypes from 'prop-types';
import { useTheme, Box, IconButton, Tooltip } from '@mui/material';
import { useTranslation } from 'next-i18next';
import RedoIcon from '@mui/icons-material/Redo';

export const SheetCellUtilBar = ({ handleNextClick, nextDisabled }) => {
	const theme = useTheme();
	const { t } = useTranslation();
	return (
		<Box
			sx={{
				mt: theme.spacing(2),
				display: 'flex',
				justifyContent: 'flex-end',
			}}
		>
			<Tooltip
				placement="left-start"
				title={t('Scroll to next invalid cell')}
				arrow
			>
				<Box component="span">
					<IconButton
						onClick={handleNextClick}
						color="primary"
						disabled={nextDisabled}
					>
						<RedoIcon />
					</IconButton>
				</Box>
			</Tooltip>
		</Box>
	);
};

SheetCellUtilBar.propTypes = {
	handleNextClick: PropsTypes.func.isRequired,
	nextDisabled: PropsTypes.bool.isRequired,
};
