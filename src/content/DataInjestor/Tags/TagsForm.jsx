import AddIcon from '@mui/icons-material/Add';
import ClearIcon from '@mui/icons-material/Clear';
import {
	Box,
	Grid,
	IconButton,
	Input as MuiInput,
	Typography,
	useTheme,
	Stack,
} from '@mui/material';
import _ from 'lodash';
import { useTranslation } from 'next-i18next';
import { useCallback, useContext, useState } from 'react';

import { DropDownSelect, Input } from 'src/components/Forms';
import { CUDescriptorModal } from 'src/components/Modals/CUDescriptorModal';
import { Button } from 'src/components/shared/Buttons';
import { DottedDivider } from 'src/components/shared/Dividers';
import { FlexEnd } from 'src/components/shared/wrappers';
import { DataInjestorContext } from 'src/contexts/DataInjestorContext';
import { useProjectMetaDataQuery } from 'src/queries/project';
import { DataInjestorFormControls } from '../DataInjestorFormControls';
import { Tag } from './Tag';

// const MAX_DESCRIPTORS_ALLOWED = 10;
// const MAX_TAGS_ALLOWED = 10;

export function TagsForm() {
	const theme = useTheme();
	const { t } = useTranslation();
	const [tagVal, setTagVal] = useState('');
	const [createDescModalOpen, setCreateDescModalOpen] = useState(false);
	const { dataInjState, addOrDeleteTags, addOrDeleteDescriptors } =
		useContext(DataInjestorContext);
	const { tags, descriptors } = dataInjState;

	const { data: projMetaDataRes, isLoading: isProjectMetadataLoading } =
		useProjectMetaDataQuery();

	const handleKeyDown = (event) => {
		if (event.keyCode === 32 && tagVal) {
			addOrDeleteTags((prev) => [...prev, tagVal]);
			setTagVal('');
		}
	};

	const handleTagRemove = (tagIndex) => {
		addOrDeleteTags((prev) => prev.filter((_, i) => i !== tagIndex));
	};

	const handleAddNew = () => {
		addOrDeleteDescriptors((prev) => [
			...prev,
			{
				descriptor: '',
				value: '',
			},
		]);
	};

	const handleDescriptorFieldChange = (event, idx) => {
		const { name, value } = event.target;
		if (name === 'descriptor-group') {
			addOrDeleteDescriptors((prev) => {
				const newDescriptors = [...prev];
				newDescriptors[idx].descriptor = value;
				return newDescriptors;
			});
		}
		if (name === 'descriptor-group-name') {
			addOrDeleteDescriptors((prev) => {
				const newDescriptors = [...prev];
				newDescriptors[idx].value = value;
				return newDescriptors;
			});
		}
	};

	const handleDescriptorRemove = (descriptorIndex) => {
		addOrDeleteDescriptors((prev) =>
			prev.filter((_, i) => i !== descriptorIndex)
		);
	};

	return (
		<>
			<Box sx={{ width: '100%' }}>
				<Typography variant="h3" mb={2}>
					{t('Add Desctriptors')}
				</Typography>
				<Grid container>
					{descriptors.map((descriptor, i) => (
						<Grid container spacing={2} key={i} sx={{ mb: theme.spacing(1) }}>
							<Grid item xs={12} md={6}>
								<Stack spacing={1}>
									{i === 0 && (
										<Typography
											variant="body1"
											sx={{ fontSize: theme.typography.h5 }}
										>
											{t('Descriptor Group')}
										</Typography>
									)}
									<DropDownSelect
										name="descriptor-group"
										loading={isProjectMetadataLoading}
										value={descriptor.descriptor}
										handleChange={(e) => handleDescriptorFieldChange(e, i)}
										items={projMetaDataRes?.descriptor || []}
										emptyPlaceHolder={t('Descriptor Group')}
										showNewItemButton
										newItemButtonOnClick={() => setCreateDescModalOpen(true)}
										size="small"
									/>
								</Stack>
							</Grid>
							<Grid item xs={12} md={6}>
								<Stack spacing={1}>
									{i === 0 && (
										<Typography
											variant="body1"
											sx={{ fontSize: theme.typography.h5 }}
										>
											{t('Descriptor Group Name')}
										</Typography>
									)}
									<Stack direction="row" spacing={1}>
										<Input
											name="descriptor-group-name"
											fullWidth
											value={descriptor.value}
											onChange={(e) => handleDescriptorFieldChange(e, i)}
											placeholder={t('Type Descriptor Group Name')}
											size="small"
										/>
										{descriptors.length > 1 && (
											<IconButton onClick={() => handleDescriptorRemove(i)}>
												<ClearIcon />
											</IconButton>
										)}
									</Stack>
								</Stack>
							</Grid>
						</Grid>
					))}
				</Grid>
				<FlexEnd>
					<Button
						startIcon={<AddIcon />}
						onClick={handleAddNew}
						disabled={
							descriptors.length === projMetaDataRes?.descriptor.length ||
							!_.every(dataInjState.descriptors, function (descriptor) {
								return descriptor.descriptor && descriptor.value;
							})
						}
						size="medium"
					>
						{t('Add New')}
					</Button>
				</FlexEnd>
				<Typography variant="h3" mb={1} sx={{ fontSize: theme.typography.h5 }}>
					{t('Enter Tags')}
				</Typography>
				<Stack
					sx={{
						mt: theme.spacing(2),
						p: theme.typography.pxToRem(20),
						backgroundColor: theme.forms.colors.inputsBg,
						borderRadius: theme.general.borderRadiusXl,
						border: `1px solid ${theme.palette.secondary.lightest}`,
					}}
				>
					<MuiInput
						sx={{
							fontSize: theme.typography.pxToRem(18),
							color: theme.colors.rawColors.fontSecondary,
						}}
						value={tagVal}
						onChange={(e) => setTagVal(e.target.value)}
						onKeyDown={handleKeyDown}
						placeholder={t('Write text and press space  ⎵')}
						disableUnderline
					/>
					<DottedDivider sx={{ my: theme.spacing(2) }} />
					{tags && (
						<Box sx={{ display: 'flex', flexWrap: 'wrap' }}>
							{tags.map((tag, index) => (
								<Tag
									key={index}
									title={tag}
									index={index}
									handleTagRemove={handleTagRemove}
								/>
							))}
						</Box>
					)}
				</Stack>
			</Box>
			<DottedDivider sx={{ my: theme.spacing(5) }} />

			<CUDescriptorModal
				open={createDescModalOpen}
				handleClose={useCallback(() => setCreateDescModalOpen(false))}
			/>

			<DataInjestorFormControls disableNext={isProjectMetadataLoading} />
		</>
	);
}

TagsForm.propTypes = {};
