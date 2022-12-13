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
import { deleteYieldBox } from 'src/slices/postProcessing/yield';
import { YieldInstanceContext } from '../context';

export const YieldOptionsPanel = () => {
	const theme = useTheme();
	const { yieldId } = useContext(YieldInstanceContext);
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
		dispatch(deleteYieldBox({ yieldId }));
	};

	return (
		<>
			<IconButton
				sx={{
					color: theme.colors.alpha.black[50],
					backgroundColor: theme.colors.rawColors.secondaryL,
					mb: 1,
				}}
				aria-label="filter"
				onClick={handleToggle}
				ref={anchorRef}
				size="small"
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
				{({ TransitionProps }) => (
					<Grow
						{...TransitionProps}
						style={{
							transformOrigin: 'right top',
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
