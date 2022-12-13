import { useTheme, Box, Divider, Input } from '@mui/material';
import { useTranslation } from 'next-i18next';
import PropTypes from 'prop-types';
import { useState } from 'react';
import { useSnackbarNotifications } from 'src/hooks/useSnackbarNotifications';
import { Tag } from './Tag';

export function TagsForm({ tags, setTags, numoftags }) {
	const theme = useTheme();
	const { t } = useTranslation();

	const [tagVal, setTagVal] = useState('');
	const { showWarningSnackbar } = useSnackbarNotifications();

	const addOrDeleteTags = (callback) => {
		if (typeof callback !== 'function') return;
		setTags(callback(tags));
	};

	const handleKeyDown = (event) => {
		if (event.keyCode === 32) {
			if (!tagVal.replace(/\s/g, '').length) {
				setTagVal('');
				return;
			}
			if (tags.length + 1 > numoftags) {
				showWarningSnackbar(
					t(`Maximum number of nodes you can add are ${numoftags}`)
				);
				return;
			}
			setTagVal(tagVal.replace(/\s/g, ''));
			addOrDeleteTags((prev) => [...prev, tagVal]);
			setTagVal('');
		}
	};

	const handleTagRemove = (tagIndex) => {
		addOrDeleteTags((prev) => prev.filter((_, i) => i !== tagIndex));
	};

	return (
		<Box sx={{ width: '100%' }}>
			<Box
				sx={{
					display: 'flex',
					flexDirection: 'column',
				}}
			>
				<Box
					sx={{
						display: 'grid',
					}}
				>
					<Box
						sx={{
							p: theme.typography.pxToRem(20),
							backgroundColor: theme.forms.colors.inputsBg,
							borderRadius: theme.general.borderRadiusXl,
							border: `1px solid ${theme.colors.rawColors.secondaryL}`,
						}}
					>
						<Input
							sx={{
								fontSize: theme.typography.pxToRem(18),
								color: theme.colors.rawColors.fontSecondary,
								width: '100%',
							}}
							value={tagVal}
							onChange={(e) => setTagVal(e.target.value.replace(/\s/g, ''))}
							onKeyDown={handleKeyDown}
							placeholder={t('Write text and press space  ⎵')}
							disableUnderline
						/>
						<Divider
							sx={{
								color: theme.colors.rawColors.secondaryL,
								my: theme.spacing(2),
							}}
						/>
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
					</Box>
				</Box>
			</Box>
		</Box>
	);
}

TagsForm.propTypes = {
	tags: PropTypes.array,
	setTags: PropTypes.func,
	numoftags: PropTypes.number,
};
