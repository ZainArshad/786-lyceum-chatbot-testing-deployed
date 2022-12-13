import PushPinIcon from '@mui/icons-material/PushPin';
import {
	Box,
	Checkbox,
	FormControlLabel,
	FormGroup,
	Typography,
	useTheme,
} from '@mui/material';
import { useTranslation } from 'next-i18next';
import PropTypes from 'prop-types';
import { useState } from 'react';
import { EmptyData } from 'src/components/EmptyData';
import { DottedDivider } from 'src/components/shared';
import { Button } from 'src/components/shared/Buttons';
import {
	addOrRemoveCategories,
	selectPinboardDataCategories,
} from 'src/slices/pinboard/dataProcessing/pinnedDataSlice';
import { useDispatch, useSelector } from 'src/store';
import { DDContentCardWrapper } from './DDCardWrappers';
import { ALLOWED_DATA_TYPES } from '../constants';

export const DDCategories = ({
	categories,
	projectId,
	projectName,
	dataType,
}) => {
	const pinnedCategories = useSelector(selectPinboardDataCategories);
	const [selectedCategories, setSelectedCategories] = useState(
		pinnedCategories[projectId]?.pinnedCategories || []
	);
	const { t } = useTranslation();
	const theme = useTheme();
	const dispatch = useDispatch();

	const handleCheckboxChange = (_, categoryObj) => {
		const idx = selectedCategories.findIndex(
			(category) => category.categoryId === categoryObj.categoryId
		);
		if (idx === -1) {
			setSelectedCategories((prev) => [...prev, categoryObj]);
		} else {
			setSelectedCategories((prev) =>
				prev.filter(
					(category) => category.categoryId !== categoryObj.categoryId
				)
			);
		}
	};

	const handleDefaultChecked = (categoryId) => {
		const idx = selectedCategories.findIndex(
			(category) => category.categoryId === categoryId
		);
		return idx !== -1;
	};

	const handlePinning = () => {
		const payload = {
			projectId,
			projectName,
			pinnedCategories: selectedCategories,
		};
		dispatch(addOrRemoveCategories(payload));
	};

	return (
		<DDContentCardWrapper>
			<Typography variant="h3" my={1}>
				{t('Categories')}
			</Typography>
			{categories.length > 0 ? (
				<Box component="span" fullWidth>
					<FormGroup>
						{categories?.map((category) => (
							<FormControlLabel
								key={category.category__id}
								onChange={(e) =>
									handleCheckboxChange(e, {
										categoryId: category.category__id,
										categoryName: category.category__name,
										units: {
											xUnits: category.x_units,
											yUnits: category.y_units,
										},
										dataType,
									})
								}
								sx={{ color: theme.colors.rawColors.fontSecondary }}
								control={
									<Checkbox
										color="success"
										checked={handleDefaultChecked(category.category__id)}
									/>
								}
								label={category.category__name}
							/>
						))}
					</FormGroup>
					<DottedDivider />
					<Button
						sx={{ my: theme.spacing(1) }}
						size="small"
						startIcon={<PushPinIcon />}
						onClick={handlePinning}
					>
						{t('Pin Categories')}
					</Button>
				</Box>
			) : (
				<EmptyData />
			)}
		</DDContentCardWrapper>
	);
};

DDCategories.propTypes = {
	categories: PropTypes.array.isRequired,
	projectId: PropTypes.string.isRequired,
	projectName: PropTypes.string.isRequired,
	dataType: PropTypes.oneOf(ALLOWED_DATA_TYPES).isRequired,
};
