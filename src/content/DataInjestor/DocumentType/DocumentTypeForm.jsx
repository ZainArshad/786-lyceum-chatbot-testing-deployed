import { Box, Typography, useTheme } from '@mui/material';
import { useTranslation } from 'next-i18next';
import { useContext } from 'react';
import { DropDownSelect } from 'src/components/Forms';
import { DottedDivider } from 'src/components/shared';
import { DataInjestorContext } from 'src/contexts/DataInjestorContext';
import { useProjectMetaDataQuery } from 'src/queries/project';
import { DataInjestorFormControls } from '../DataInjestorFormControls';

export function DocumentTypeForm() {
	const theme = useTheme();
	const { t } = useTranslation();
	const { data: metaDataRes, isLoading: isProjectMetadataLoading } =
		useProjectMetaDataQuery();

	const { dataInjState, setOrUpdateDocumentType } =
		useContext(DataInjestorContext);

	const handleChange = (e) => {
		setOrUpdateDocumentType((prev) => ({
			...prev,
			[e.target.name]: e.target.value,
		}));
	};

	return (
		<>
			<Box sx={{ width: '100%' }}>
				<Typography
					sx={{ m: theme.spacing(3, 0, 3, 0), fontSize: theme.typography.h3 }}
				>
					{t('Document Type')}
				</Typography>
				<Box sx={{ display: 'flex', flexDirection: 'column' }}>
					<Box sx={{ display: 'grid', gridTemplateColumns: { lg: '1fr 1fr' } }}>
						<Box sx={{ pr: { lg: theme.spacing(2.5) } }}>
							<Typography
								sx={{
									mb: theme.spacing(1),
									fontSize: theme.typography.h5,
									color: theme.colors.rawColors.fontPrimary,
								}}
							>
								{t('File Type')}
							</Typography>
							<DropDownSelect
								id="file-type"
								name="fileType"
								value={dataInjState.documentType.fileType || ''}
								handleChange={handleChange}
								loading={isProjectMetadataLoading}
								items={metaDataRes?.file_types || []}
								emptyPlaceHolder={t('Select File Type')}
								size="small"
							/>
						</Box>
						<Box sx={{ pl: { lg: theme.spacing(2.5) } }}>
							<Typography
								sx={{
									mb: theme.spacing(1),
									fontSize: theme.typography.h5,
									color: theme.colors.rawColors.fontPrimary,
								}}
							>
								{t('Data Type')}
							</Typography>
							<DropDownSelect
								id="data-type"
								name="dataType"
								loading={isProjectMetadataLoading}
								value={dataInjState.documentType.dataType || ''}
								handleChange={handleChange}
								items={metaDataRes?.data_types || []}
								emptyPlaceHolder={t('Select File Type')}
								size="small"
							/>
						</Box>
					</Box>
				</Box>
			</Box>
			<DottedDivider sx={{ my: theme.spacing(5) }} />

			<DataInjestorFormControls disableNext={isProjectMetadataLoading} />
		</>
	);
}
