import {
	List,
	ListItemButton,
	ListItemIcon,
	ListItem,
	Box,
	ListItemText,
	SwipeableDrawer,
	Divider,
	styled,
	IconButton,
	Accordion,
	AccordionSummary,
	AccordionDetails,
} from '@mui/material';
import ImportantDevicesIcon from '@mui/icons-material/ImportantDevices';
import LocalMallIcon from '@mui/icons-material/LocalMall';
import PropTypes from 'prop-types';
import { useTranslation } from 'next-i18next';
import Logo from 'src/components/LogoSign';
import AccountCircleOutlinedIcon from '@mui/icons-material/AccountCircleOutlined';
import BusinessIcon from '@mui/icons-material/Business';
import SupportAgentIcon from '@mui/icons-material/SupportAgent';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ScienceTwoToneIcon from '@mui/icons-material/ScienceTwoTone';
import SaveAsTwoToneIcon from '@mui/icons-material/SaveAsTwoTone';
import RemoveRedEyeTwoToneIcon from '@mui/icons-material/RemoveRedEyeTwoTone';
import GroupsIcon from '@mui/icons-material/Groups';

const SidebarWrapper = styled(Box)(
	({ theme }) => `
        width: ${theme.sidebar.width};
        min-width: ${theme.sidebar.width};
        color: ${theme.sidebar.textColor};
        background: #9abdc6;     
        position: relative;
        z-index: 7;
        height: 110%;
        @media (min-width: ${theme.breakpoints.values.lg}px) {
          height: 100%;
          margin-top: 0;
        }
				text-align:center;
				padding-bottom:5%;
`
);

function MobileSideBar({ toggleDrawer, open }) {
	const { t } = useTranslation();
	const list = (
		<SidebarWrapper>
			<List
				sx={{
					width: '100%',
					color: 'background.paper',
					justifyContent: 'start',
					display: 'contents',
				}}
				component="nav"
			>
				<ListItem>
					<Logo />
				</ListItem>
				<ListItem key="signin" />
				<ListItem key={1}>
					<Accordion sx={{ background: '#9abdc6' }}>
						<AccordionSummary
							expandIcon={<ExpandMoreIcon />}
							aria-controls="panel1a-content"
							id="panel1a-header"
						>
							<ListItemIcon sx={{ color: 'gray' }}>
								<LocalMallIcon />
								<ListItemText
									primary={t('Products')}
									sx={{ paddingLeft: 0.5 }}
								/>
							</ListItemIcon>
						</AccordionSummary>
						<AccordionDetails>
							<ListItemButton href="/test-tube-page">
								<ListItemIcon sx={{ color: 'gray' }}>
									<ScienceTwoToneIcon />
									<ListItemText
										primary={t('Test Tube')}
										sx={{ paddingLeft: 0.5 }}
									/>
								</ListItemIcon>
							</ListItemButton>
							<ListItemButton href="/data-ingestor-page">
								<ListItemIcon sx={{ color: 'gray' }}>
									<SaveAsTwoToneIcon />
									<ListItemText
										primary={t('Data Ingestor')}
										sx={{ paddingLeft: 0.5 }}
									/>
								</ListItemIcon>
							</ListItemButton>
							<ListItemButton href="/analyzer-page">
								<ListItemIcon sx={{ color: 'gray' }}>
									<RemoveRedEyeTwoToneIcon />
									<ListItemText
										primary={t('Analyzer')}
										sx={{ paddingLeft: 0.5 }}
									/>
								</ListItemIcon>
							</ListItemButton>
							<ListItemButton href="/collaboration-page">
								<ListItemIcon sx={{ color: 'gray' }}>
									<GroupsIcon />
									<ListItemText
										primary={t('Collaboration')}
										sx={{
											paddingLeft: 0.5,
											width: '75px',
										}}
									/>
								</ListItemIcon>
							</ListItemButton>
						</AccordionDetails>
					</Accordion>
				</ListItem>
				<Divider />
				<ListItem key={2}>
					<ListItemButton href="/features">
						<ListItemIcon sx={{ color: 'gray' }}>
							<ImportantDevicesIcon />
							<ListItemText primary={t('Features')} sx={{ paddingLeft: 0.5 }} />
						</ListItemIcon>
					</ListItemButton>
				</ListItem>
				<Divider />
				<ListItem key={3}>
					<ListItemButton href="/enterprise">
						<ListItemIcon sx={{ color: 'gray' }}>
							<BusinessIcon />
							<ListItemText
								primary={t('Enterprise')}
								sx={{ paddingLeft: 0.5 }}
							/>
						</ListItemIcon>
					</ListItemButton>
				</ListItem>
				<Divider />
				<ListItem key={4}>
					<ListItemButton href="/support">
						<ListItemIcon sx={{ color: 'gray' }}>
							<SupportAgentIcon />
							<ListItemText primary={t('Support')} sx={{ paddingLeft: 0.5 }} />
						</ListItemIcon>
					</ListItemButton>
				</ListItem>
				<Divider />
			</List>
			<IconButton
				sx={{
					p: 1,
					mt: 5,
					color: '#34596C',
					fontSize: '25px',
					border: '1px solid #34596C',
				}}
				href="/auth/login"
			>
				<AccountCircleOutlinedIcon
					sx={{
						color: '#34596C',
						fontSize: '25px',
					}}
				/>{' '}
				{'\xa0'}
				{t('Sign In')}
			</IconButton>
		</SidebarWrapper>
	);

	return (
		<div>
			<SwipeableDrawer
				anchor="left"
				open={open}
				onClose={(e) => toggleDrawer(e, false)}
				onOpen={(e) => toggleDrawer(e, true)}
			>
				{list}
			</SwipeableDrawer>
		</div>
	);
}

MobileSideBar.propTypes = {
	toggleDrawer: PropTypes.func.isRequired,
	open: PropTypes.bool.isRequired,
};

export default MobileSideBar;
