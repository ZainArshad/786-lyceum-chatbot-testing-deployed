import { useState, useContext } from 'react';
import { Hidden, useTheme, Box, Button } from '@mui/material';
import { useTranslation } from 'next-i18next';

import { DottedDivider } from 'src/components/shared';
import { PageHeading } from 'src/components/shared/Typography';
import { BrickBodyCtn, PageBodyWrapper } from 'src/components/shared/wrappers';
import { IconStepper, SimpleVerticalLineStepper } from 'src/components/Stepper';
import { steps as dataInjestorSteps } from 'src/components/Stepper/Items/DataInjestorStepper';
import { DataInjestorContext } from 'src/contexts/DataInjestorContext';
import OndemandVideoIcon from '@mui/icons-material/OndemandVideo';
import VideoModal from 'src/components/VideoModal';
import { DocumentTypeForm } from './DocumentType';
import { PrivilegesForm } from './Privileges';
import { TagsForm } from './Tags';
import { UploadFile as UploadFileForm } from './UploadFile';

export function DataInjestorContent() {
	const theme = useTheme();
	const { t } = useTranslation();
	const { dataInjState } = useContext(DataInjestorContext);
	const { formControls } = dataInjState;
	const [open, setOpen] = useState(false);
	const handleOpen = () => setOpen(true);
	const handleClose = () => setOpen(false);

	return (
		<PageBodyWrapper>
			<Box
				sx={{
					display: 'flex',
					justifyContent: 'space-between',
					alignItems: 'center',
				}}
			>
				<PageHeading> {t('Upload Data')}</PageHeading>
				<Button
					startIcon={<OndemandVideoIcon />}
					sx={{ fontSize: '12px', height: '45px' }}
					variant="contained"
					onClick={handleOpen}
				>
					{t('How it Works?')}
				</Button>
				<VideoModal
					url="https://www.youtube.com/embed/60XZlQ8yGEw?autoplay=1"
					open={open}
					handleClose={handleClose}
				/>
			</Box>
			<BrickBodyCtn>
				<Hidden smDown>
					<IconStepper
						activeStep={formControls.activeStep}
						steps={dataInjestorSteps}
					/>
				</Hidden>
				<Hidden smUp>
					<SimpleVerticalLineStepper
						activeStep={formControls.activeStep}
						steps={dataInjestorSteps}
					/>
				</Hidden>
				<DottedDivider sx={{ m: theme.spacing(5, 0, 2, 0) }} />
				{formControls.activeStep === 0 && <UploadFileForm />}
				{formControls.activeStep === 1 && <DocumentTypeForm />}
				{formControls.activeStep === 2 && <TagsForm />}
				{formControls.activeStep === 3 && <PrivilegesForm />}
			</BrickBodyCtn>
		</PageBodyWrapper>
	);
}
