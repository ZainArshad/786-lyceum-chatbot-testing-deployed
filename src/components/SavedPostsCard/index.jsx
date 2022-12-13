import { useState } from 'react';
import {
	styled,
	useTheme,
	Card,
	CardContent,
	Typography,
	Box,
	Collapse,
} from '@mui/material';
import Expander from 'src/components/shared/Expander';
import { useTranslation } from 'next-i18next';
import SavedPostItemGroup from './ItemGroup';

const CardHeadingWrapper = styled(Box)(
	() => `
		display: flex;
    align-items: center;
		justify-content: space-between;
	`
);

const NodeDisplayWrapper = styled(Box)(
	({ theme }) => `
		display: flex;
		justify-content: space-between;
		flex-direction: column;
		margin-top: ${theme.spacing(2)};
    height: 245px;
	`
);

const mockQuestions = [
	'What happens when two surfaces comes in contanct?',
	'What is mach number?',
	'Why fighter planes are intentionally made unstable?',
	'Why fighter planes are intentionally made unstable?',
	'Why fighter planes are intentionally made unstable?',
];

const SavedPostsCard = () => {
	const [isShowingMore, setIsShowingMore] = useState(false);
	const theme = useTheme();
	const { t } = useTranslation();

	const showMore = () => setIsShowingMore((prev) => !prev);

	return (
		<Card
			sx={{
				mt: 2,
				backgroundColor: theme.colors.alpha.white[50],
				boxShadow: 0,
				border: `1px solid ${theme.colors.rawColors.secondaryL}`,
			}}
		>
			<CardContent
				sx={{
					'&:last-child': {
						paddingBottom: theme.spacing(1),
					},
					padding: theme.spacing(0.5, 1),
				}}
			>
				<CardHeadingWrapper>
					<Typography sx={{ fontSize: theme.typography.h4 }}>
						{t('Posts')}
					</Typography>
					<Expander onClick={showMore} expandState={isShowingMore} />
				</CardHeadingWrapper>
				<Collapse in={isShowingMore} timeout="auto" unmountOnExit>
					<NodeDisplayWrapper>
						<SavedPostItemGroup heading="Questions" questions={mockQuestions} />
						<SavedPostItemGroup
							heading="Hypothesis"
							questions={mockQuestions}
						/>
					</NodeDisplayWrapper>
					<SavedPostItemGroup heading="Experiment" questions={mockQuestions} />
					<SavedPostItemGroup heading="Results" questions={mockQuestions} />
					<SavedPostItemGroup heading="Conclusion" questions={mockQuestions} />
				</Collapse>
			</CardContent>
		</Card>
	);
};

export default SavedPostsCard;
