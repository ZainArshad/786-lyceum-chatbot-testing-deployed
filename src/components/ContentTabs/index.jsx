import { useState } from 'react';
import {
	Box,
	Card,
	Typography,
	styled,
	useTheme,
	Tabs,
	Tab,
	IconButton,
	Grid,
} from '@mui/material';

import { useTranslation } from 'react-i18next';
import GroupsQuestionCard from 'src/components/GroupsQuestionCard';
import GroupsDataCard from 'src/components/GroupDataCards';
import TuneTwoToneIcon from '@mui/icons-material/TuneTwoTone';

const CardWrapper = styled(Card)(
	({ theme }) => `
  margin-top: ${theme.spacing(2)};
  width: 100%;
  display: flex;
  flex-direction: column;
  padding: ${theme.spacing(2)};
  border-radius: ${theme.general.borderRadiusSm};
  border: 1px solid ${theme.colors.alpha.black[10]};
`
);

function GroupTabs() {
	const { t } = useTranslation();
	const theme = useTheme();
	const [tabValue, setTabValue] = useState(0);
	const handleTabChange = (event, newValue) => {
		setTabValue(newValue);
	};

	return (
		<CardWrapper sx={{ minHeight: '301px' }}>
			<Grid container sx={{ width: '100%' }}>
				<Tabs value={tabValue} onChange={handleTabChange}>
					<Tab label="All" />
					<Tab label="Questions" />
					<Tab label="Hypothesis" />
					<Tab label="Data" />
					<Tab label="Result" />
					<Tab label="Conclusion" />
					<Tab label="Test Tube" />
					<Tab label="Files" />
				</Tabs>
				<IconButton color="secondary" sx={{ margin: '0 0 0 auto' }}>
					<TuneTwoToneIcon />
				</IconButton>
			</Grid>
			{tabValue === 0 && (
				<>
					<Box
						display="flex"
						alignItems="center"
						justifyContent="space-between"
						padding={theme.spacing(4, 2, 0, 2)}
					>
						<Typography sx={{ fontSize: theme.typography.h4, fontWeight: 600 }}>
							{t('Questions')}
						</Typography>
					</Box>
					<GroupsQuestionCard postId="1" userLiked />
					<Box
						display="flex"
						alignItems="center"
						justifyContent="space-between"
						padding={theme.spacing(4, 2, 0, 2)}
					>
						<Typography sx={{ fontSize: theme.typography.h4, fontWeight: 600 }}>
							{t('Data')}
						</Typography>
					</Box>
					<GroupsDataCard questionId="1" userLiked={false} />
					<GroupsDataCard questionId="1" userLiked={false} />
				</>
			)}
			{tabValue === 1 && (
				<>
					<Box
						display="flex"
						alignItems="center"
						justifyContent="space-between"
						padding={theme.spacing(4, 2, 0, 2)}
					>
						<Typography sx={{ fontSize: theme.typography.h4, fontWeight: 600 }}>
							{t('Questions')}
						</Typography>
					</Box>
					<GroupsQuestionCard postId="1" userLiked />
				</>
			)}
			{tabValue === 3 && (
				<>
					<Box
						display="flex"
						alignItems="center"
						justifyContent="space-between"
						padding={theme.spacing(4, 2, 0, 2)}
					>
						<Typography sx={{ fontSize: theme.typography.h4, fontWeight: 600 }}>
							{t('Data')}
						</Typography>
					</Box>
					<GroupsDataCard questionId="1" userLiked={false} />
					<GroupsDataCard questionId="1" userLiked={false} />
				</>
			)}
			{tabValue === 4 && null}
			{tabValue === 5 && null}
			{tabValue === 6 && null}
			{tabValue === 7 && null}
		</CardWrapper>
	);
}

export default GroupTabs;
