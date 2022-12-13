/* eslint react/prop-types: 0 */ // --> OFF | @Zain please take care of this
import * as React from 'react';
import { useTheme, styled } from '@mui/material/styles';
import ClickAwayListener from '@mui/material/ClickAwayListener';
import CloseIcon from '@mui/icons-material/Close';
import Autocomplete from '@mui/material/Autocomplete';
import {
	Avatar,
	Box,
	InputBase,
	Menu,
	MenuItem,
	IconButton,
	Grid,
} from '@mui/material';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import { useTranslation } from 'next-i18next';

const StyledInput = styled(InputBase)(({ theme }) => ({
	padding: 10,
	width: '100%',
	'& input': {
		borderRadius: 4,
		padding: 8,
		transition: theme.transitions.create(['border-color', 'box-shadow']),
		border: '1px solid #CCCEDD',
		fontSize: 14,
	},
}));

export default function CustomAutoComplete({
	inviteList,
	value,
	setValue,
	setSearchTerm,
}) {
	const [pendingValue, setPendingValue] = React.useState([]);
	const theme = useTheme();
	const { t } = useTranslation();

	const [open, setOpen] = React.useState(false);
	const [labels] = React.useState(inviteList);
	const [anchorEl, setAnchorEl] = React.useState(null);
	const openMenu = Boolean(anchorEl);
	const handleClick = (event) => {
		setAnchorEl(event.currentTarget);
	};
	const handleClose = () => {
		setAnchorEl(null);
	};

	const addRole = (label, role) => {
		label.role = role;
	};

	return (
		<>
			<ClickAwayListener
				onClickAway={() => {
					setOpen(false);
				}}
			>
				<div>
					<Autocomplete
						open={open}
						multiple
						value={pendingValue}
						onChange={(event, newValue, reason, detail) => {
							if (reason === 'removeOption') {
								detail.option.role = 'MEMBER';
							}
							setOpen(true);
							if (
								event.type === 'keydown' &&
								event.key === 'Backspace' &&
								reason === 'removeOption'
							) {
								return;
							}
							setPendingValue(newValue);
							setValue(newValue);
						}}
						disableCloseOnSelect
						renderTags={() => null}
						noOptionsText="Nothing Found"
						renderOption={(props, option, { selected, i }) => (
							<li {...props} key={i}>
								<Box
									sx={{
										display: 'flex',
										alignItems: 'start',
										justifyContent: 'space-between',
									}}
								>
									<Avatar
										sx={{
											width: 42,
											height: 42,
											mr: 1.5,
										}}
										alt={option.first_name}
										src={option.avatar || ''}
									/>
									<Box
										sx={{
											flexGrow: 1,
											'& span': {
												color:
													theme.palette.mode === 'light'
														? '#586069'
														: '#8b949e',
											},
										}}
									>
										{option.first_name}
										<br />
										<span>{option.last_name}</span>
									</Box>
								</Box>
								<Box
									component={CloseIcon}
									sx={{ opacity: 0.6, width: 18, height: 18 }}
									style={{
										visibility: selected ? 'visible' : 'hidden',
										marginLeft: 'auto',
									}}
								/>
							</li>
						)}
						options={[...labels].sort((a, b) => {
							let ai = value.indexOf(a);
							ai = ai === -1 ? value.length + labels.indexOf(a) : ai;
							let bi = value.indexOf(b);
							bi = bi === -1 ? value.length + labels.indexOf(b) : bi;
							return ai - bi;
						})}
						getOptionLabel={(option) => option.first_name}
						renderInput={(params) => (
							<StyledInput
								onClick={() => {
									setOpen(true);
								}}
								onChange={(e) => {
									setSearchTerm(e.target.value);
									setOpen(true);
								}}
								ref={params.InputProps.ref}
								inputProps={params.inputProps}
								autoFocus
								placeholder="Search for People Here"
							/>
						)}
					/>
				</div>
			</ClickAwayListener>
			<Box sx={{ width: '100%', maxHeight: '141px', overflowY: 'auto' }}>
				<Grid container>
					{value.map((label, i) => (
						<Grid item xs={12} key={i}>
							<Box
								sx={{
									display: 'flex',
									alignItems: 'end',
									justifyContent: 'space-between',
									ml: 5,
									mt: 0.5,
									mb: 0.15,
								}}
							>
								<Avatar
									sx={{
										width: 42,
										height: 42,
										mr: 1.5,
									}}
									alt={label.first_name}
									src={label.avatar || ''}
								/>
								<Box
									sx={{
										flexGrow: 1,
										'& span': {
											color:
												theme.palette.mode === 'light' ? '#586069' : '#8b949e',
										},
									}}
								>
									{label.first_name}
									<br />
									<span>{label.last_name}</span>
								</Box>
								<IconButton
									id="demo-positioned-button"
									aria-controls={openMenu ? 'demo-positioned-menu' : undefined}
									aria-haspopup="true"
									aria-expanded={openMenu ? 'true' : undefined}
									onClick={handleClick}
								>
									<MoreHorizIcon />
								</IconButton>
								<Menu
									id="demo-positioned-menu"
									aria-labelledby="demo-positioned-button"
									anchorEl={anchorEl}
									open={openMenu}
									onClose={handleClose}
									anchorOrigin={{
										vertical: 'top',
										horizontal: 'left',
									}}
									transformOrigin={{
										vertical: 'top',
										horizontal: 'left',
									}}
								>
									<MenuItem
										onClick={() => {
											addRole(label, 'ADMIN');
											handleClose();
										}}
									>
										{t('Admin')}
									</MenuItem>
									<MenuItem
										onClick={() => {
											addRole(label, 'MEMBER');
											handleClose();
										}}
									>
										{t('Member')}
									</MenuItem>
								</Menu>
							</Box>
						</Grid>
					))}
				</Grid>
			</Box>
		</>
	);
}
