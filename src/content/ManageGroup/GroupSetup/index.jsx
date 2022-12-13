/* eslint react/prop-types: 0 */ // --> OFF | @Zain please take care of this
import { useState, Fragment } from 'react';

import {
	Box,
	Card,
	TextField,
	Button,
	Typography,
	styled,
	List,
	ListItem,
	ListItemText,
	Divider,
	FormControl,
	InputLabel,
	MenuItem,
	Select,
} from '@mui/material';
import LoadingButton from '@mui/lab/LoadingButton';

import { useTranslation } from 'react-i18next';
import { makeGroupsRequest } from 'src/services/api/groups';
import EditIcon from '@mui/icons-material/Edit';
import CloseIcon from '@mui/icons-material/Close';

import { Interweave } from 'interweave';
import { useMutation } from '@tanstack/react-query';
import { useSnackbarNotifications } from 'src/hooks/useSnackbarNotifications';
import dynamic from 'next/dynamic';
import 'react-quill/dist/quill.snow.css';

const ReactQuill = dynamic(() => import('react-quill'), { ssr: false });

const CardWrapper = styled(Card)(
	() => `
        margin-top:5%;
        height:100%;
  `
);

const GroupSetup = ({ data }) => {
	const { t } = useTranslation();
	const [loading, setLoading] = useState(false);

	const [groupName, setGroupName] = useState(
		data?.group_name !== undefined ? data?.group_name : ''
	);
	const [editGroupName, setEditGroupName] = useState(false);
	const [editGroupNameButton, setEditGroupNameButton] = useState(false);

	const [groupDesc, setGroupDesc] = useState(
		data?.description !== undefined ? data?.description : ''
	);
	const [editGroupDesc, setEditGroupDesc] = useState(false);
	const [editGroupDescButton, setEditGroupDescButton] = useState(false);

	const [groupPrivacy, setGroupPrivacy] = useState(data?.is_public);
	const [editGroupPrivacy, setEditGroupPrivacy] = useState(false);
	const [editGroupPrivacyButton, setEditGroupPrivacyButton] = useState(false);

	const [, setEditGroupAdmin] = useState(false);
	const [, setEditGroupAdminButton] = useState(false);

	const [groupApprovers, setGroupApprovers] = useState(
		data?.approver !== undefined ? data?.approver : 'MEMBER'
	);
	const [editGroupApprovers, setEditGroupApprovers] = useState(false);
	const [editGroupApproversButton, setEditGroupApproversButton] =
		useState(false);

	const [groupUploaders, setGroupUploaders] = useState(
		data?.uploader !== undefined ? data?.uploader : 'MEMBER'
	);
	const [editGroupUploaders, setEditGroupUploaders] = useState(false);
	const [editGroupUploadersButton, setEditGroupUploadersButton] =
		useState(false);

	const [groupInviters, setGroupInviters] = useState(
		data?.inviter !== undefined ? data?.inviter : 'MEMBER'
	);
	const [editGroupInviters, setEditGroupInviters] = useState(false);
	const [editGroupInvitersButton, setEditGroupInvitersButton] = useState(false);

	const [groupPosters, setGroupPosters] = useState(
		data?.poster !== undefined ? data?.poster : 'MEMBER'
	);
	const [editGroupPosters, setEditGroupPosters] = useState(false);
	const [editGroupPostersButton, setEditGroupPostersButton] = useState(false);

	const { showSuccessSnackbar, showErrorSnackbar } = useSnackbarNotifications();

	const editGroupNameFunc = () => {
		setEditGroupName(true);
		setEditGroupNameButton(true);
	};

	const closeGroupNameFunc = () => {
		setEditGroupName(false);
		setEditGroupNameButton(false);
	};

	const changeGroupName = (e) => {
		setGroupName(e.target.value);
	};

	const editGroupDescFunc = () => {
		setEditGroupDesc(true);
		setEditGroupDescButton(true);
	};

	const closeGroupDescFunc = () => {
		setEditGroupDesc(false);
		setEditGroupDescButton(false);
	};

	const changeGroupDesc = (value) => {
		setGroupDesc(value);
	};

	const editGroupPrivacyFunc = () => {
		setEditGroupPrivacy(true);
		setEditGroupPrivacyButton(true);
	};

	const closeGroupPrivacyFunc = () => {
		setEditGroupPrivacy(false);
		setEditGroupPrivacyButton(false);
	};

	const changeGroupPrivacy = (e) => {
		setGroupPrivacy(e.target.value);
	};

	const closeGroupAdminFunc = () => {
		setEditGroupAdmin(false);
		setEditGroupAdminButton(false);
	};

	const editGroupApproversFunc = () => {
		setEditGroupApprovers(true);
		setEditGroupApproversButton(true);
	};

	const closeGroupApproversFunc = () => {
		setEditGroupApprovers(false);
		setEditGroupApproversButton(false);
	};

	const changeGroupApprovers = (e) => {
		setGroupApprovers(e.target.value);
	};

	const editGroupUploadersFunc = () => {
		setEditGroupUploaders(true);
		setEditGroupUploadersButton(true);
	};

	const closeGroupUploadersFunc = () => {
		setEditGroupUploaders(false);
		setEditGroupUploadersButton(false);
	};

	const changeGroupUploaders = (e) => {
		setGroupUploaders(e.target.value);
	};

	const editGroupInvitersFunc = () => {
		setEditGroupInviters(true);
		setEditGroupInvitersButton(true);
	};

	const closeGroupInvitersFunc = () => {
		setEditGroupInviters(false);
		setEditGroupInvitersButton(false);
	};

	const changeGroupInviters = (e) => {
		setGroupInviters(e.target.value);
	};

	const editGroupPostersFunc = () => {
		setEditGroupPosters(true);
		setEditGroupPostersButton(true);
	};

	const closeGroupPostersFunc = () => {
		setEditGroupPosters(false);
		setEditGroupPostersButton(false);
	};

	const changeGroupPosters = (e) => {
		setGroupPosters(e.target.value);
	};

	const closeAll = () => {
		closeGroupAdminFunc();
		closeGroupApproversFunc();
		closeGroupDescFunc();
		closeGroupInvitersFunc();
		closeGroupNameFunc();
		closeGroupPostersFunc();
		closeGroupPrivacyFunc();
		closeGroupUploadersFunc();
	};

	const saveSettings = () => {
		setLoading(true);
		closeAll();
		manageGroup();
	};

	const { mutate: manageGroup } = useMutation(
		() => {
			return makeGroupsRequest.update_group_partially(
				{
					group_name: groupName,
					description: groupDesc,
					approver: groupApprovers,
					inviter: groupInviters,
					uploader: groupUploaders,
					poster: groupPosters,
					is_public: groupPrivacy,
				},
				data?.id
			);
		},
		{
			onSuccess: () => {
				showSuccessSnackbar('Group Settings Updated!');
				setLoading(false);
			},
			onError: () => {
				showErrorSnackbar('Something went wrong! Try again');
				setLoading(false);
			},
		}
	);

	return (
		<>
			<CardWrapper>
				<Box
					display="flex"
					alignItems="center"
					justifyContent="space-between"
					p={2}
				>
					<Box>
						<Typography
							variant="h4"
							sx={{ fontWeight: '700', fontSize: '18px' }}
						>
							{t('Setup Group')}
						</Typography>
					</Box>
				</Box>
				<List disablePadding>
					<Fragment key={1}>
						<ListItem
							sx={{
								justifyContent: 'space-between',
								display: { xs: 'block', sm: 'flex' },
								py: 2,
								px: 2.5,
							}}
						>
							<ListItemText
								sx={{
									flexGrow: 0,
									maxWidth: '50%',
									flexBasis: '20%',
								}}
								disableTypography
								primary={<Typography variant="subtitle2">Name</Typography>}
							/>
							<div
								style={{
									flexGrow: 0,
									maxWidth: '75%',
									flexBasis: '75%',
								}}
							>
								{!editGroupName ? (
									<Typography
										color="text.primary"
										variant="h5"
										sx={{
											fontWeight: '400 !important',
										}}
									>
										{groupName}
									</Typography>
								) : (
									<TextField
										id="outlined-basic"
										label="Group Name"
										variant="outlined"
										sx={{ width: '100%' }}
										value={groupName}
										onChange={changeGroupName}
									/>
								)}
							</div>
							<Box
								display="flex"
								flexGrow={1}
								alignItems="center"
								justifyContent="end"
							>
								{!editGroupNameButton ? (
									<Button
										size="small"
										color="primary"
										startIcon={<EditIcon />}
										onClick={editGroupNameFunc}
									/>
								) : (
									<Button
										size="small"
										color="error"
										startIcon={<CloseIcon />}
										onClick={closeGroupNameFunc}
									/>
								)}
							</Box>
						</ListItem>
					</Fragment>
					<Fragment key={2}>
						<Divider />
						<ListItem
							sx={{
								justifyContent: 'space-between',
								display: { xs: 'block', sm: 'flex' },
								py: 2,
								px: 2.5,
							}}
						>
							<ListItemText
								sx={{
									flexGrow: 0,
									maxWidth: '50%',
									flexBasis: '20%',
								}}
								disableTypography
								primary={
									<Typography variant="subtitle2">Description</Typography>
								}
							/>
							<div
								style={{
									flexGrow: 0,
									maxWidth: '75%',
									flexBasis: '75%',
								}}
							>
								{!editGroupDesc ? (
									<Interweave content={groupDesc} />
								) : (
									<ReactQuill
										name="group_desc"
										defaultValue={groupDesc}
										onChange={(content) => {
											changeGroupDesc(content.toString());
										}}
									/>
								)}
							</div>
							<Box
								display="flex"
								flexGrow={1}
								alignItems="center"
								justifyContent="end"
							>
								{!editGroupDescButton ? (
									<Button
										size="small"
										color="primary"
										startIcon={<EditIcon />}
										onClick={editGroupDescFunc}
									/>
								) : (
									<Button
										size="small"
										color="error"
										startIcon={<CloseIcon />}
										onClick={closeGroupDescFunc}
									/>
								)}
							</Box>
						</ListItem>
					</Fragment>
					<Fragment key={3}>
						<Divider />
						<ListItem
							sx={{
								justifyContent: 'space-between',
								display: { xs: 'block', sm: 'flex' },
								py: 2,
								px: 2.5,
							}}
						>
							<ListItemText
								sx={{
									flexGrow: 0,
									maxWidth: '50%',
									flexBasis: '20%',
								}}
								disableTypography
								primary={<Typography variant="subtitle2">Privacy</Typography>}
							/>
							<div
								style={{
									flexGrow: 0,
									maxWidth: '75%',
									flexBasis: '75%',
								}}
							>
								{!editGroupPrivacy ? (
									<Typography
										color="text.primary"
										variant="h5"
										sx={{
											fontWeight: '400 !important',
										}}
									>
										{groupPrivacy !== undefined
											? data === true
												? 'Public'
												: 'Private'
											: 'Public'}
									</Typography>
								) : (
									<FormControl fullWidth>
										<InputLabel id="demo-simple-select-label">
											{t('Privacy')}
										</InputLabel>
										<Select
											labelId="demo-simple-select-label"
											id="demo-simple-select"
											value={groupPrivacy}
											label={t('Privacy')}
											onChange={changeGroupPrivacy}
										>
											<MenuItem value>{t('Public')}</MenuItem>
											<MenuItem value={false}>{t('Private')}</MenuItem>
										</Select>
									</FormControl>
								)}
							</div>
							<Box
								display="flex"
								flexGrow={1}
								alignItems="center"
								justifyContent="end"
							>
								{!editGroupPrivacyButton ? (
									<Button
										size="small"
										color="primary"
										startIcon={<EditIcon />}
										onClick={editGroupPrivacyFunc}
									/>
								) : (
									<Button
										size="small"
										color="error"
										startIcon={<CloseIcon />}
										onClick={closeGroupPrivacyFunc}
									/>
								)}
							</Box>
						</ListItem>
					</Fragment>
				</List>
			</CardWrapper>

			<CardWrapper>
				<Box
					display="flex"
					alignItems="center"
					justifyContent="space-between"
					p={2}
				>
					<Box>
						<Typography
							variant="h4"
							sx={{ fontWeight: '700', fontSize: '18px' }}
						>
							{t('Manage Members')}
						</Typography>
					</Box>
				</Box>
				<List disablePadding>
					<Fragment key={5}>
						<ListItem
							sx={{
								justifyContent: 'space-between',
								display: { xs: 'block', sm: 'flex' },
								py: 2,
								px: 2.5,
							}}
						>
							<ListItemText
								sx={{
									flexGrow: 0,
									maxWidth: '50%',
									flexBasis: '20%',
								}}
								disableTypography
								primary={<Typography variant="subtitle2">Approvers</Typography>}
							/>
							<div
								style={{
									flexGrow: 0,
									maxWidth: '75%',
									flexBasis: '75%',
								}}
							>
								{!editGroupApprovers ? (
									<Typography
										color="text.primary"
										variant="h5"
										sx={{
											fontWeight: '400 !important',
										}}
									>
										{groupApprovers}
									</Typography>
								) : (
									<FormControl fullWidth>
										<InputLabel id="demo-simple-select-label">
											{t('Approvers')}
										</InputLabel>
										<Select
											labelId="demo-simple-select-label"
											id="demo-simple-select"
											value={groupApprovers}
											label={t('Approvers')}
											onChange={changeGroupApprovers}
										>
											<MenuItem value="ADMIN">{t('ADMIN')}</MenuItem>
											<MenuItem value="MEMBER">{t('MEMBER')}</MenuItem>
										</Select>
									</FormControl>
								)}
							</div>
							<Box
								display="flex"
								flexGrow={1}
								alignItems="center"
								justifyContent="end"
							>
								{!editGroupApproversButton ? (
									<Button
										size="small"
										color="primary"
										startIcon={<EditIcon />}
										onClick={editGroupApproversFunc}
									/>
								) : (
									<Button
										size="small"
										color="error"
										startIcon={<CloseIcon />}
										onClick={closeGroupApproversFunc}
									/>
								)}
							</Box>
						</ListItem>
					</Fragment>
					<Fragment key={6}>
						<Divider />
						<ListItem
							sx={{
								justifyContent: 'space-between',
								display: { xs: 'block', sm: 'flex' },
								py: 2,
								px: 2.5,
							}}
						>
							<ListItemText
								sx={{
									flexGrow: 0,
									maxWidth: '50%',
									flexBasis: '20%',
								}}
								disableTypography
								primary={<Typography variant="subtitle2">Uploaders</Typography>}
							/>
							<div
								style={{
									flexGrow: 0,
									maxWidth: '75%',
									flexBasis: '75%',
								}}
							>
								{!editGroupUploaders ? (
									<Typography
										color="text.primary"
										variant="h5"
										sx={{
											fontWeight: '400 !important',
										}}
									>
										{groupUploaders}
									</Typography>
								) : (
									<FormControl fullWidth>
										<InputLabel id="demo-simple-select-label">
											{t('Uploaders')}
										</InputLabel>
										<Select
											labelId="demo-simple-select-label"
											id="demo-simple-select"
											value={groupUploaders}
											label={t('Uploaders')}
											onChange={changeGroupUploaders}
										>
											<MenuItem value="MEMBER">{t('MEMBER')}</MenuItem>
											<MenuItem value="ADMIN">{t('ADMIN')}</MenuItem>
										</Select>
									</FormControl>
								)}
							</div>
							<Box
								display="flex"
								flexGrow={1}
								alignItems="center"
								justifyContent="end"
							>
								{!editGroupUploadersButton ? (
									<Button
										size="small"
										color="primary"
										startIcon={<EditIcon />}
										onClick={editGroupUploadersFunc}
									/>
								) : (
									<Button
										size="small"
										color="error"
										startIcon={<CloseIcon />}
										onClick={closeGroupUploadersFunc}
									/>
								)}
							</Box>
						</ListItem>
					</Fragment>
					<Fragment key={7}>
						<Divider />
						<ListItem
							sx={{
								justifyContent: 'space-between',
								display: { xs: 'block', sm: 'flex' },
								py: 2,
								px: 2.5,
							}}
						>
							<ListItemText
								sx={{
									flexGrow: 0,
									maxWidth: '50%',
									flexBasis: '20%',
								}}
								disableTypography
								primary={<Typography variant="subtitle2">Inviters</Typography>}
							/>
							<div
								style={{
									flexGrow: 0,
									maxWidth: '75%',
									flexBasis: '75%',
								}}
							>
								{!editGroupInviters ? (
									<Typography
										color="text.primary"
										variant="h5"
										sx={{
											fontWeight: '400 !important',
										}}
									>
										{groupInviters}
									</Typography>
								) : (
									<FormControl fullWidth>
										<InputLabel id="demo-simple-select-label">
											{t('Inviters')}
										</InputLabel>
										<Select
											value={groupInviters}
											label={t('Inviters')}
											onChange={changeGroupInviters}
										>
											<MenuItem value="MEMBER">{t('MEMBER')}</MenuItem>
											<MenuItem value="ADMIN">{t('ADMIN')}</MenuItem>
										</Select>
									</FormControl>
								)}
							</div>
							<Box
								display="flex"
								flexGrow={1}
								alignItems="center"
								justifyContent="end"
							>
								{!editGroupInvitersButton ? (
									<Button
										size="small"
										color="primary"
										startIcon={<EditIcon />}
										onClick={editGroupInvitersFunc}
									/>
								) : (
									<Button
										size="small"
										color="error"
										startIcon={<CloseIcon />}
										onClick={closeGroupInvitersFunc}
									/>
								)}
							</Box>
						</ListItem>
					</Fragment>
					<Fragment key={8}>
						<Divider />
						<ListItem
							sx={{
								justifyContent: 'space-between',
								display: { xs: 'block', sm: 'flex' },
								py: 2,
								px: 2.5,
							}}
						>
							<ListItemText
								sx={{
									flexGrow: 0,
									maxWidth: '50%',
									flexBasis: '20%',
								}}
								disableTypography
								primary={<Typography variant="subtitle2">Posters</Typography>}
							/>
							<div
								style={{
									flexGrow: 0,
									maxWidth: '75%',
									flexBasis: '75%',
								}}
							>
								{!editGroupPosters ? (
									<Typography
										color="text.primary"
										variant="h5"
										sx={{
											fontWeight: '400 !important',
										}}
									>
										{groupPosters}
									</Typography>
								) : (
									<FormControl fullWidth>
										<InputLabel id="demo-simple-select-label">
											{t('Posters')}
										</InputLabel>
										<Select
											labelId="demo-simple-select-label"
											id="demo-simple-select"
											value={groupPosters}
											label={t('Posters')}
											onChange={changeGroupPosters}
										>
											<MenuItem value="MEMBER">{t('MEMBER')}</MenuItem>
											<MenuItem value="ADMIN">{t('ADMIN')}</MenuItem>
										</Select>
									</FormControl>
								)}
							</div>
							<Box
								display="flex"
								flexGrow={1}
								alignItems="center"
								justifyContent="end"
							>
								{!editGroupPostersButton ? (
									<Button
										size="small"
										color="primary"
										startIcon={<EditIcon />}
										onClick={editGroupPostersFunc}
									/>
								) : (
									<Button
										size="small"
										color="error"
										startIcon={<CloseIcon />}
										onClick={closeGroupPostersFunc}
									/>
								)}
							</Box>
						</ListItem>
					</Fragment>
				</List>
			</CardWrapper>
			<Box
				mt={3}
				mb={3}
				display="flex"
				flexGrow={1}
				alignItems="center"
				justifyContent="end"
				fullWidth
			>
				<LoadingButton
					variant="contained"
					onClick={saveSettings}
					loading={loading}
				>
					{t('Save Settings')}
				</LoadingButton>
			</Box>
		</>
	);
};

export default GroupSetup;
