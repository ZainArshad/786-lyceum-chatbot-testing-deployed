/* eslint react/prop-types: 0 */ // --> OFF | @Zain please take care of this
import { Fragment } from 'react';
import {
	Box,
	ListItemAvatar,
	ListItemText,
	Divider,
	List,
	Card,
	Typography,
	Avatar,
	styled,
	ListItem,
} from '@mui/material';
import { Button, LoadingButton } from 'src/components/shared/Buttons';

import { useTranslation } from 'react-i18next';
import ArrowRightAltIcon from '@mui/icons-material/ArrowRightAlt';
import Scrollbar from 'src/components/Scrollbar';
import Link from 'next/link';

const GCard = styled(Card)(
	({ theme }) => `
      margin-left:1%;  
      margin-top:2.5%;
      margin-bottom:2.5%;
      min-height:389px;
			height:100%;
      border-radius: ${theme.general.borderRadiusSm};
      border: 1px solid ${theme.colors.alpha.black[10]};
`
);

function GroupsCard({ title, members, check, group_id }) {
	const { t } = useTranslation();
	let count = members.filter((item) => {
		return item.group_role.localeCompare(check) === 0;
	});

	return (
		<GCard>
			<Box
				display="flex"
				alignItems="center"
				justifyContent="space-between"
				p={2}
			>
				<Box>
					<Typography variant="h4" sx={{ fontWeight: '700', fontSize: '18px' }}>
						{`${count.length} ${title}`}
					</Typography>
				</Box>
				<Box
					display="flex"
					alignItems="center"
					justifyContent="end"
					width="50%"
				>
					<Link href={`/users-management/${group_id}?tab=${check}`}>
						<Button
							size="small"
							variant="contained"
							sx={{ fontWeight: '400', fontSize: '12px' }}
							endIcon={<ArrowRightAltIcon />}
						>
							{t('View All')}
						</Button>
					</Link>
				</Box>
			</Box>
			<Scrollbar>
				<List disablePadding sx={{ height: 'auto' }}>
					{count.map((item, i) => (
						<Fragment key={i}>
							<Divider />
							<ListItem
								sx={{
									justifyContent: 'space-between',
									display: { xs: 'block', sm: 'flex' },
									py: 2,
									px: 2.5,
								}}
							>
								<ListItemAvatar
									sx={{
										minWidth: 'auto',
										mr: 2,
										mb: { xs: 2, sm: 0 },
									}}
								>
									<Avatar
										sx={{
											width: 42,
											height: 42,
										}}
										alt={item.user.first_name}
										src={item?.user?.profile_image}
									/>
								</ListItemAvatar>
								<ListItemText
									sx={{
										flexGrow: 0,
										maxWidth: '50%',
										flexBasis: '50%',
									}}
									disableTypography
									primary={
										<Typography
											color="text.primary"
											variant="h5"
											sx={{ fontWeight: '400 !important' }}
										>
											{`${item.user.first_name} ${item.user.last_name}`}
										</Typography>
									}
								/>
								<Box pl={3.5} display="flex" flexGrow={1} alignItems="center">
									<LoadingButton
										size="small"
										sx={{
											fontWeight: 'normal',
											fontSize: '12px',
										}}
										href={`/user/${item?.user?.id}`}
										target="_blank"
									>
										{t('View Profile')}
									</LoadingButton>
								</Box>
							</ListItem>
						</Fragment>
					))}
				</List>
			</Scrollbar>
		</GCard>
	);
}

export default GroupsCard;
