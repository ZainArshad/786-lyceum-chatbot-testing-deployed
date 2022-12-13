import AddIcon from '@mui/icons-material/Add';
import ArrowRightAltIcon from '@mui/icons-material/ArrowRightAlt';
import { Box, Typography, useTheme } from '@mui/material';
import { useTranslation } from 'next-i18next';
import { useRouter } from 'next/router';
import { useCallback, useContext, useState } from 'react';
import { FileUpload, Input } from 'src/components/Forms';
import { DottedDivider } from 'src/components/shared';
import { Button } from 'src/components/shared/Buttons';
import { DataInjestorContext } from 'src/contexts/DataInjestorContext';
import { useSnackbarNotifications } from 'src/hooks/useSnackbarNotifications';
import { DataInjestorFormControls } from '../DataInjestorFormControls';
import { DataInjestorTemplateSchema } from './utils/schema';

export function UploadFile() {
	const theme = useTheme();
	const { t } = useTranslation();
	const { showErrorSnackbar } = useSnackbarNotifications();
	const router = useRouter();

	const { dataInjState, setOrUpdateFileUpload, setDataInjStateTo } =
		useContext(DataInjestorContext);

	const { file, nameOrTitle } = dataInjState.fileUpload;
	const [templateFile, setTemplateFile] = useState(null);

	const handleTemplateFileUpload = (tempFile) => {
		if (tempFile.lenght === 0) return;
		let reader = new FileReader();
		try {
			reader.readAsText(tempFile[0]);
		} catch (error) {
			console.error(error.message);
			showErrorSnackbar('Cannot parse file');
			return;
		}
		reader.onload = async () => {
			const jsonData = JSON.parse(reader.result);
			try {
				const verifiedUpload = await DataInjestorTemplateSchema.validate(
					jsonData
				);
				const templateData = {
					fileUpload: {
						file: dataInjState.fileUpload.file,
						nameOrTitle: dataInjState.fileUpload.nameOrTitle,
					},
					documentType: {
						fileType: verifiedUpload.formState.documentType.fileType,
						dataType: verifiedUpload.formState.documentType.dataType,
					},
					descriptors: verifiedUpload.formState.descriptors,
					tags: verifiedUpload.formState.tags,
					groups: verifiedUpload.formState.groups,
					jsonAxisInfo: verifiedUpload.jsonAxisInfo,
				};
				setDataInjStateTo(templateData);
				setTemplateFile(tempFile[0]);
			} catch (_err) {
				console.error(_err);
				showErrorSnackbar(t('Invalid Template File.'));
				setTemplateFile(null);
			}
		};
	};

	const showSkipToClean = useCallback(() => {
		if (!templateFile) return false;
		return true;
	}, [templateFile]);

	return (
		<>
			<Box sx={{ width: '100%' }}>
				<Box
					sx={{
						display: 'flex',
						justifyContent: 'space-between',
						alignItems: { sm: 'center' },
						flexDirection: { sm: 'row', xs: 'column' },
					}}
				>
					<Typography
						sx={{ m: theme.spacing(3, 0, 2, 0), fontSize: theme.typography.h3 }}
					>
						{t('Upload File')}
					</Typography>
					{showSkipToClean() && (
						<Button
							endIcon={<ArrowRightAltIcon />}
							variant="contained"
							sx={{ mb: { xs: theme.spacing(1) }, width: '100%' }}
							disabled={!file || !nameOrTitle}
							onClick={() =>
								router.push(
									'/data-ingestor/?stage=clean',
									'/data-ingestor/clean'
								)
							}
						>
							{t('Clean Now')}
						</Button>
					)}
				</Box>
				<Box sx={{ display: 'flex', flexDirection: 'column' }}>
					<Box sx={{ display: 'grid', gridTemplateColumns: { lg: '1fr 1fr' } }}>
						<Box sx={{ pr: theme.spacing(1) }}>
							<Typography
								sx={{
									mb: theme.spacing(2),
									fontSize: theme.typography.h5,
									color: theme.colors.rawColors.fontPrimary,
								}}
							>
								{t('File Selection')}
							</Typography>
							<FileUpload
								id="data-file"
								name="data-file"
								dropZoneProps={{
									onDrop: (acceptedFiles) => {
										setOrUpdateFileUpload((prev) => ({
											...prev,
											file: acceptedFiles[0],
										}));
									},
									maxFiles: 1,
									accept: '.xlsx',
								}}
							>
								{file ? (
									file.name
								) : (
									<Box
										sx={{
											display: 'flex',
											alignItems: 'center',
											justifyContent: 'center',
											fontSize: theme.typography.h4,
										}}
									>
										<AddIcon sx={{ mr: theme.spacing(1) }} /> {t('Choose File')}
									</Box>
								)}
							</FileUpload>
							{!file?.name && (
								<Typography
									sx={{
										mt: theme.spacing(1),
										fontSize: theme.typography.body1,
										color: theme.colors.rawColors.fontSecondary,
									}}
								>
									{t('No file choosen')}
								</Typography>
							)}
						</Box>
						<Box sx={{ pl: { lg: theme.spacing(1) } }}>
							<Typography
								sx={{
									mb: theme.spacing(2),
									color: theme.colors.rawColors.fontPrimary,
									fontSize: theme.typography.h5,
								}}
							>
								{t('Fast Upload')}
							</Typography>
							<FileUpload
								id="fast-upload-file"
								name="data-file"
								dropZoneProps={{
									onDrop: (acceptedFiles) => {
										handleTemplateFileUpload(acceptedFiles);
									},
									maxFiles: 1,
									accept: '.json',
								}}
							>
								{templateFile ? (
									templateFile.name
								) : (
									<Box
										sx={{
											display: 'flex',
											alignItems: 'center',
											justifyContent: 'center',
											fontSize: theme.typography.h4,
										}}
									>
										<AddIcon sx={{ mr: theme.spacing(1) }} /> {t('Choose File')}
									</Box>
								)}
							</FileUpload>
							{!templateFile?.name && (
								<Typography
									sx={{
										mt: theme.spacing(1),
										fontSize: theme.typography.body1,
										color: theme.colors.rawColors.fontSecondary,
									}}
								>
									{t('No file choosen')}
								</Typography>
							)}
						</Box>
					</Box>
					<Typography
						sx={{
							mt: theme.spacing(4),
							mb: theme.spacing(2),
							fontSize: theme.typography.h5,
							color: theme.colors.rawColors.fontPrimary,
						}}
					>
						{t('Name / Title')}
					</Typography>
					<Input
						id="name-or-title"
						name="nameOrTitle"
						value={nameOrTitle}
						size="small"
						onChange={({ target }) => {
							setOrUpdateFileUpload((prev) => ({
								...prev,
								nameOrTitle: target.value,
							}));
						}}
						placeholder={t('Enter Name/Title')}
					/>
				</Box>
			</Box>
			<DottedDivider sx={{ my: theme.spacing(5) }} />
			<DataInjestorFormControls />
		</>
	);
}
