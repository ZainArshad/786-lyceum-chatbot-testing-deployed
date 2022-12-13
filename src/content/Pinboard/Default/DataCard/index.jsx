import ArrowRightAltIcon from '@mui/icons-material/ArrowRightAlt';
import LoadingButton from '@mui/lab/LoadingButton';
import {
	Box,
	Card,
	CardContent,
	Collapse,
	styled,
	Typography,
	useTheme,
} from '@mui/material';
import _ from 'lodash';
import { useTranslation } from 'next-i18next';
import { useRouter } from 'next/router';
import { useState } from 'react';
import Scrollbar from 'src/components/Scrollbar';
import { DottedDivider } from 'src/components/shared';
import Expander from 'src/components/shared/Expander';
import { LIMIT_TYPE } from 'src/content/Analyzer/constants';
import {
	selectIsProcessing,
	selectPinboardDataCategories,
	setIsProcessing,
	selectPinboardLimits,
} from 'src/slices/pinboard/dataProcessing/pinnedDataSlice';
import { useDispatch, useSelector } from 'src/store';
import DataCardItem from './Item';

const CardHeadingWrapper = styled(Box)(
	() => `
		display: flex;
    align-items: center;
		justify-content: space-between;
	`
);

const DataCardDisplayWrapper = styled(Box)(
	({ theme }) => `
		display: flex;
		justify-content: space-between;
		flex-direction: column;
		margin-top: ${theme.spacing(2)};
    height: 225px;
	`
);

const DataCard = () => {
	const theme = useTheme();
	const { t } = useTranslation();
	const [isCardExpanded, setIsCardExpanded] = useState(false);
	const categories = useSelector(selectPinboardDataCategories);
	const limits = useSelector(selectPinboardLimits);
	const isProcessing = useSelector(selectIsProcessing);
	const router = useRouter();
	const dispatch = useDispatch();

	const handlePushToDataProcessing = () => {
		if (isProcessing) return;

		dispatch(setIsProcessing(true));
		router.push('/post-process');
	};

	const expandCard = () => setIsCardExpanded((prev) => !prev);

	return (
		<>
			<LoadingButton
				sx={{ fontSize: theme.typography.body1 }}
				disabled={_.isEmpty(categories) && _.isEmpty(limits)}
				fullWidth
				color={isProcessing ? 'success' : 'primary'}
				variant="contained"
				onClick={handlePushToDataProcessing}
				endIcon={!isProcessing ? <ArrowRightAltIcon /> : null}
			>
				{isProcessing ? t('Post-Processing ...') : t('Post-Process')}
			</LoadingButton>
			<Card
				sx={{
					mt: 2,
					boxShadow: 0,
					border: `1px solid ${theme.colors.rawColors.secondaryL}`,
				}}
			>
				<CardContent
					sx={{
						'&:last-child': { paddingBottom: theme.spacing(1) },
						padding: theme.spacing(0.5, 1),
					}}
				>
					<CardHeadingWrapper>
						<Typography sx={{ fontSize: theme.typography.h4 }}>
							{t('Data')}
						</Typography>
						<Expander
							togglerProps={{
								disabled: _.isEmpty(categories) && _.isEmpty(limits),
							}}
							onClick={expandCard}
							expandState={isCardExpanded}
						/>
					</CardHeadingWrapper>
					<Collapse in={isCardExpanded} timeout="auto">
						<DataCardDisplayWrapper>
							<Scrollbar>
								{!_.isEmpty(categories) &&
									_.keys(categories)?.map((projectId) => {
										const project = categories[projectId];
										return project.pinnedCategories.map((category) => {
											return (
												<DataCardItem
													key={category.categoryId}
													heading={project.projectName}
													projectId={projectId}
													categoryId={category.categoryId}
													description={category.categoryName}
													type={category.dataType}
												/>
											);
										});
									})}
								{!_.isEmpty(limits) && (
									<>
										<DottedDivider sx={{ my: 1 }} />
										{_.keys(limits)?.map((projectId) => {
											const limit = limits[projectId];
											return (
												<DataCardItem
													key={projectId}
													heading={limit.projectName}
													projectId={projectId}
													type={LIMIT_TYPE}
												/>
											);
										})}
									</>
								)}
							</Scrollbar>
						</DataCardDisplayWrapper>
					</Collapse>
				</CardContent>
			</Card>
		</>
	);
};

export default DataCard;
