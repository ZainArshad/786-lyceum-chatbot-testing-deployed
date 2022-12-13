import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import FileUploadOutlinedIcon from '@mui/icons-material/FileUploadOutlined';
import LoadingButton from '@mui/lab/LoadingButton';
import {
	Button,
	ButtonGroup,
	Checkbox,
	ClickAwayListener,
	FormControlLabel,
	FormGroup,
	Grow,
	Paper,
	Popper,
	useTheme,
} from '@mui/material';
import { useTranslation } from 'next-i18next';
import PropTypes from 'prop-types';
import { useRef, useState } from 'react';

export const UploadButton = ({
	isLoading,
	disabled,
	handleUpload,
	...rest
}) => {
	const [open, setOpen] = useState(false);
	const theme = useTheme();
	const { t } = useTranslation();
	const anchorRef = useRef(null);
	const [selections, setSelection] = useState({
		template: false,
		excel: false,
	});

	const handleToggle = () => {
		setOpen((prevOpen) => !prevOpen);
	};

	const handleSelectionChange = (event) => {
		const { checked, name } = event.target;
		setSelection({
			...selections,
			[name]: checked,
		});
	};

	const handleClose = (event) => {
		if (anchorRef.current && anchorRef.current.contains(event.target)) {
			return;
		}

		setOpen(false);
	};

	return (
		<>
			<ButtonGroup
				variant="contained"
				ref={anchorRef}
				aria-label="split button"
				sx={{ zIndex: 1000, width: { lg: 'auto', xs: '100%' } }}
				disabled={disabled}
			>
				<LoadingButton
					fullWidth
					loading={isLoading}
					onClick={() => {
						setOpen(false);
						handleUpload(selections);
					}}
					variant="contained"
					sx={{ height: '48px' }}
					{...rest}
				>
					<FileUploadOutlinedIcon sx={{ mr: theme.spacing(2) }} />
					{t('Upload')}
				</LoadingButton>
				<Button
					size="small"
					aria-controls={open ? 'split-button-menu' : undefined}
					aria-expanded={open ? 'true' : undefined}
					aria-label="select strategy"
					aria-haspopup="menu"
					onClick={handleToggle}
					sx={{ height: '48px' }}
				>
					<ArrowDropDownIcon />
				</Button>
			</ButtonGroup>
			<Popper
				open={open}
				anchorEl={anchorRef.current}
				role={undefined}
				transition
				disablePortal
				style={{ zIndex: 1 }}
			>
				{({ TransitionProps, placement }) => (
					<Grow
						{...TransitionProps}
						style={{
							transformOrigin:
								placement === 'bottom' ? 'center top' : 'center bottom',
						}}
					>
						<Paper sx={{ padding: theme.spacing(2) }}>
							<ClickAwayListener onClickAway={handleClose}>
								<FormGroup>
									<FormControlLabel
										sx={{ color: theme.colors.rawColors.fontSecondary }}
										control={<Checkbox />}
										label={t('Download Excel')}
										name="excel"
										onChange={handleSelectionChange}
									/>
									<FormControlLabel
										sx={{ color: theme.colors.rawColors.fontSecondary }}
										control={<Checkbox />}
										label={t('Download Template')}
										name="template"
										onChange={handleSelectionChange}
									/>
								</FormGroup>
							</ClickAwayListener>
						</Paper>
					</Grow>
				)}
			</Popper>
		</>
	);
};

UploadButton.propTypes = {
	isLoading: PropTypes.bool,
	disabled: PropTypes.bool,
	handleUpload: PropTypes.func.isRequired,
	rest: PropTypes.object,
};
