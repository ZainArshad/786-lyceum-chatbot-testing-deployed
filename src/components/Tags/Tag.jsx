import CloseIcon from '@mui/icons-material/Close';
import LocalOfferOutlinedIcon from '@mui/icons-material/LocalOfferOutlined';
import { useTheme, Box, Typography, IconButton } from '@mui/material';
import PropTypes from 'prop-types';
import { useState } from 'react';

export const Tag = ({ title, index, handleTagRemove }) => {
	const theme = useTheme();
	const [isHovering, setIsHovering] = useState(false);

	return (
		<Box
			sx={{
				minWidth: theme.typography.pxToRem(165),
				backgroundColor: theme.colors.rawColors.trueWhite,
				borderRadius: theme.general.borderRadiusSm,
				border: `1px solid ${theme.colors.rawColors.secondaryL}`,
				height: theme.typography.pxToRem(40),
				padding: theme.spacing(1),
				display: 'flex',
				alignItems: 'center',
				justifyContent: 'space-between',
				color: theme.colors.rawColors.fontSecondary,
				m: theme.spacing(1),
			}}
			onMouseEnter={() => setIsHovering(true)}
			onMouseLeave={() => setIsHovering(false)}
		>
			<Typography>{title}</Typography>
			{isHovering ? (
				<IconButton size="small" onClick={() => handleTagRemove(index)}>
					<CloseIcon />
				</IconButton>
			) : (
				<LocalOfferOutlinedIcon sx={{ ml: 2 }} />
			)}
		</Box>
	);
};

Tag.propTypes = {
	/* Text to show at the in the tag */
	title: PropTypes.string.isRequired,

	/* Index of the tag  in the list of tags */
	index: PropTypes.number.isRequired,

	/* Function takes the index of the tag as the only argument and remove it from the list */
	handleTagRemove: PropTypes.func.isRequired,
};
