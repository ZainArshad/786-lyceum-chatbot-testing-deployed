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
import Scrollbar from 'src/components/Scrollbar';
import Expander from 'src/components/shared/Expander';
import { useTranslation } from 'next-i18next';
import ProcedureCardItem from './Item';

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
    height: 245px;
	`
);

const ProcedureCard = () => {
	const theme = useTheme();
	const [isCardExpanded, setIsCardExpanded] = useState(false);
	const { t } = useTranslation();

	const expandCard = () => setIsCardExpanded((prev) => !prev);

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
						{t('Procedures')}
					</Typography>
					<Expander onClick={expandCard} expandState={isCardExpanded} />
				</CardHeadingWrapper>
				<Collapse in={isCardExpanded} timeout="auto" unmountOnExit>
					<DataCardDisplayWrapper>
						<Scrollbar>
							{[...Array(5)].map((_, i) => (
								<ProcedureCardItem
									key={i}
									heading="How to stress test your..."
									description="Amplifier"
									id={i}
								/>
							))}
						</Scrollbar>
					</DataCardDisplayWrapper>
				</Collapse>
			</CardContent>
		</Card>
	);
};

export default ProcedureCard;
