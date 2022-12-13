import PropTypes from 'prop-types';
import {
	Box,
	Typography,
	styled,
	Divider,
	ListItem,
	ListItemText,
	Alert,
	List,
	MenuItem,
	Select,
	Stack,
} from '@mui/material';
import { useMutation } from '@tanstack/react-query';
import CloudUploadTwoToneIcon from '@mui/icons-material/CloudUploadTwoTone';
import CloseTwoToneIcon from '@mui/icons-material/CloseTwoTone';
import CheckTwoToneIcon from '@mui/icons-material/CheckTwoTone';
import { useTranslation } from 'react-i18next';
import { useDropzone } from 'react-dropzone';
import * as Yup from 'yup';
import { useFormik } from 'formik';
import { makeGroupsRequest } from 'src/services/api/groups/groups.request';
import { useSnackbarNotifications } from 'src/hooks/useSnackbarNotifications';
import { TagsForm } from 'src/components/Tags';
import { uploadFileToS3 } from 'src/lib/helpers/content/fileUpload';
import { BrickBodyCtn, FlexEnd } from 'src/components/shared/wrappers';
import { LoadingButton } from 'src/components/shared/Buttons';
import { Input } from 'src/components/Forms';
import { Si6maQuillEditor } from 'src/components/shared';
import { getFormattedFileSize } from 'src/lib/helpers/format';

const BoxUploadWrapper = styled(Box)(
	({ theme }) => `
      border-radius: ${theme.general.borderRadius};
      padding: ${theme.spacing(2)};
      background: ${theme.colors.alpha.black[5]};
      border: 1px dashed ${theme.colors.alpha.black[30]};
      outline: none;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      transition: ${theme.transitions.create(['border', 'background'])};
  
      &:hover {
        background: ${theme.colors.alpha.white[50]};
        border-color: ${theme.colors.primary.main};
				cursor: pointer;
      }
  `
);

export function CreateGroupForm({
	onSuccess = () => {},
	onCancel = () => {},
	onError = () => {},
	containerStyle = {},
}) {
	const {
		acceptedFiles,
		isDragActive,
		isDragAccept,
		isDragReject,
		getRootProps,
		getInputProps,
	} = useDropzone({
		accept: 'image/jpeg, image/png',
		multiple: false,
	});

	const { showErrorSnackbar, showSuccessSnackbar } = useSnackbarNotifications();
	const createGroup = useMutation(makeGroupsRequest.createGroup, {
		onSuccess: () => {
			onSuccess();
			showSuccessSnackbar('Group created successfully');
		},
		onError: () => {
			onError();
			showErrorSnackbar('Error creating group');
		},
		onSettled: () => {
			formik.setSubmitting(false);
		},
	});

	const { t } = useTranslation();
	const formik = useFormik({
		initialValues: {
			group_name: '',
			description: '',
			is_public: true,
			image_url: '',
			tags: [],
		},
		validationSchema: Yup.object({
			group_name: Yup.string().max(255).required(t('This field is required')),
		}),
		onSubmit: async (values) => {
			let fileUrl = '';
			if (acceptedFiles.length > 0 && !values.image_url) {
				fileUrl = await uploadFileToS3(acceptedFiles, {
					basePath: 'group/cover_image',
					fileName: acceptedFiles[0].name,
				});
				formik.setFieldValue('image_url', fileUrl);
			}
			const payload = {
				group_name: values.group_name,
				description: values.group_desc,
				tags: values.tags,
				is_public: values.privacy,
				members: [],
				image_url: fileUrl,
			};
			createGroup.mutate(payload);
		},
	});

	const files = acceptedFiles.map((file, index) => (
		<ListItem disableGutters component="div" key={index}>
			<ListItemText primary={file.name} />
			<b>{getFormattedFileSize(file.size)}</b>
			<Divider />
		</ListItem>
	));

	return (
		<BrickBodyCtn sx={{ ...containerStyle }}>
			<form noValidate onSubmit={formik.handleSubmit}>
				<Stack direction="row">
					<Box
						sx={{
							width: {
								xl: '300px',
								lg: '200px',
								md: '100px',
								sm: '0px',
							},
						}}
					/>
					<Stack spacing={2} px={2} my={2} sx={{ width: '100%' }}>
						<Stack spacing={1}>
							<Typography variant="h5">{t('Group Name')}</Typography>
							<Input
								name="group_name"
								sx={{ flex: 1 }}
								onBlur={formik.handleBlur}
								onChange={formik.handleChange}
								value={formik.values.group_name}
								error={Boolean(
									formik.touched.group_name && formik.errors.group_name
								)}
								helperText={
									formik.touched.group_name && formik.errors.group_name
								}
							/>
						</Stack>
						<Stack spacing={1}>
							<Typography variant="h5">{t('Description')}</Typography>
							<Si6maQuillEditor
								name="description"
								onChange={(val) => formik.setFieldValue('description', val)}
							/>
						</Stack>
						<Stack spacing={1}>
							<Typography variant="h5">{t('Tags')}</Typography>
							<TagsForm
								tags={formik.values.tags}
								setTags={(newTags) => formik.setFieldValue('tags', newTags)}
								numoftags={5}
							/>
						</Stack>
						<Stack spacing={1}>
							<Typography variant="h5">{t('Group Privacy')}</Typography>
							<Select
								name="is_public"
								fullWidth
								onBlur={formik.handleBlur}
								onChange={formik.handleChange}
								value={formik.values.is_public}
							>
								<MenuItem value>{t('Public')}</MenuItem>
								<MenuItem value={false}>{t('Private')}</MenuItem>
							</Select>
						</Stack>
						<Stack spacing={1}>
							<Typography variant="h5">{t('Cover Photo')} </Typography>
							<BoxUploadWrapper {...getRootProps()}>
								<input {...getInputProps()} />
								{isDragAccept && (
									<>
										<CheckTwoToneIcon color="success" fontSize="large" />
										<Typography>
											{t('Drop the file to start uploading')}
										</Typography>
									</>
								)}
								{isDragReject && (
									<>
										<CloseTwoToneIcon color="error" fontSize="large" />
										<Typography>
											{t('You cannot upload these file types')}
										</Typography>
									</>
								)}
								{!isDragActive && (
									<>
										<CloudUploadTwoToneIcon color="primary" />
										<Typography>{t('Drag & drop file here')}</Typography>
									</>
								)}
							</BoxUploadWrapper>
							{files.length > 0 && (
								<>
									<Divider />
									<Box p={2}>
										<Alert severity="success">
											{t('You have uploaded')} <b>{files.length}</b>{' '}
											{t('files')}!
										</Alert>
										<List>{files}</List>
									</Box>
								</>
							)}
						</Stack>
						<FlexEnd gap={1}>
							<LoadingButton
								onClick={formik.handleSubmit}
								loading={formik.isSubmitting}
								type="submit"
							>
								{t('Create Group')}
							</LoadingButton>
							<LoadingButton
								variant="outlined"
								color="secondary"
								onClick={onCancel}
								loading={formik.isSubmitting}
							>
								{t('Cancel')}
							</LoadingButton>
						</FlexEnd>
					</Stack>
				</Stack>
			</form>
		</BrickBodyCtn>
	);
}

CreateGroupForm.propTypes = {
	onSuccess: PropTypes.func,
	onCancel: PropTypes.func,
	onError: PropTypes.func,
	containerStyle: PropTypes.object,
};
