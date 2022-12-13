import { useContext, useRef, useState } from 'react';
import TuneIcon from '@mui/icons-material/Tune';
import {
	useTheme,
	IconButton,
	ClickAwayListener,
	Grow,
	Paper,
	Popper,
	List,
	ListItem,
	ListItemText,
} from '@mui/material';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import { useTranslation } from 'next-i18next';
import { useDispatch } from 'src/store';
import { deleteStatBox } from 'src/slices/postProcessing/statistics';
import { StatInstanceContext } from '../context';

export const StatOptionsPanel = () => {
	const theme = useTheme();
	const { statId } = useContext(StatInstanceContext);
	const { t } = useTranslation();
	const dispatch = useDispatch();
	const [open, setOpen] = useState(false);
	const anchorRef = useRef(null);

	const handleToggle = () => {
		setOpen((prevOpen) => !prevOpen);
	};

	const handleClose = (event) => {
		if (anchorRef.current && anchorRef.current.contains(event.target)) {
			return;
		}
		handleToggle();
	};

	const handleDelete = () => {
		dispatch(deleteStatBox({ statBoxId: statId }));
	};

	return (
		<>
			<IconButton
				sx={{
					color: theme.colors.alpha.black[50],
					backgroundColor: theme.colors.rawColors.secondaryL,
				}}
				aria-label="filter"
				onClick={handleToggle}
				ref={anchorRef}
			>
				<TuneIcon />
			</IconButton>
			<Popper
				open={open}
				anchorEl={anchorRef.current}
				role={undefined}
				transition
				disablePortal
				style={{ zIndex: 1 }}
				placement="bottom-end"
			>
				{({ TransitionProps, placement }) => (
					<Grow
						{...TransitionProps}
						style={{
							transformOrigin:
								placement === 'bottom' ? 'left top' : 'left bottom',
						}}
					>
						<Paper sx={{ p: theme.spacing(0.2) }}>
							<ClickAwayListener onClickAway={handleClose}>
								<List component="nav">
									<ListItem onClick={() => {}} button>
										<ContentCopyIcon fontSize="small" color="primary" />
										<ListItemText primary={t('Duplicate')} />
									</ListItem>
									<ListItem onClick={handleDelete} button>
										<DeleteOutlineIcon fontSize="small" color="error" />
										<ListItemText primary={t('Delete')} />
									</ListItem>
								</List>
							</ClickAwayListener>
						</Paper>
					</Grow>
				)}
			</Popper>
		</>
	);
};
