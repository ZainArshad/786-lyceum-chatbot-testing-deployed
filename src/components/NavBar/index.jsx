/* eslint react/prop-types: 0 */ // --> OFF | @Zain please take care of this
import { useState } from 'react';
import {
	Stack,
	Typography,
	ImageListItem,
	Menu,
	MenuItem,
} from '@mui/material';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Tooltip from '@mui/material/Tooltip';
import AccountCircleOutlinedIcon from '@mui/icons-material/AccountCircleOutlined';

import { useTranslation } from 'next-i18next';
import Link from 'next/link';
import { Si6maLogo } from 'src/assets/svgs';
import { Button } from '../shared/Buttons';

const NavBar = ({ toggleDrawer }) => {
	const { t } = useTranslation();
	const [anchorEl, setAnchorEl] = useState(null);

	const menuClick = (event) => {
		setAnchorEl(event.currentTarget);
	};
	const menuClose = () => {
		setAnchorEl(null);
	};

	return (
		<AppBar
			position="static"
			sx={{
				background: '#9abdc6',
				height: { xs: '55px', md: 'inherit' },
				display: 'flex',
				justifyContent: 'center',
			}}
		>
			<Container maxWidth="xl">
				<Toolbar disableGutters>
					<Box
						sx={{
							flexGrow: 0.15,
							display: { xs: 'none', md: 'flex' },
							width: '15%',
						}}
					>
						<Link href="/" passHref>
							<Si6maLogo
								containerStyles={{
									pt: 1,
								}}
								width={200}
							/>
						</Link>
					</Box>
					<Box sx={{ flexGrow: 0.5, display: { xs: 'flex', md: 'none' } }}>
						<IconButton
							size="large"
							aria-label="account of current user"
							aria-controls="menu-appbar"
							aria-haspopup="true"
							onClick={(e) => toggleDrawer(e, true)}
							color="inherit"
							sx={{ color: 'black' }}
						>
							<MenuIcon />
						</IconButton>
					</Box>
					<Box
						sx={{
							pr: 0.5,
							display: { xs: 'flex', md: 'none' },
							width: { sm: '25%', xs: '40%' },
						}}
					>
						<ImageListItem>
							<Si6maLogo />
						</ImageListItem>
					</Box>
					<Box sx={{ flexGrow: 0.5 }} />
					<Stack
						direction="row"
						sx={{
							flexGrow: 1,
							display: { xs: 'none', md: 'flex' },
							my: 2,
							'& *': {
								fontWeight: '500',
								fontSize: '19px',
							},
							justifyContent: 'right',
						}}
						spacing={1}
					>
						<Button
							id="basic-products"
							aria-controls={anchorEl ? 'basic-products' : undefined}
							aria-haspopup="true"
							aria-expanded={anchorEl ? 'true' : undefined}
							onClick={(e) => menuClick(e)}
							variant="text"
						>
							{t('Products')}
						</Button>
						<Link href="/features" passHref>
							<Button variant="text">{t('Features')}</Button>
						</Link>
						<Link href="/enterprise" passHref>
							<Button variant="text">{t('Enterprise')}</Button>
						</Link>
						<Link href="/support" passHref>
							<Button variant="text">{t('Support')}</Button>
						</Link>
						<Menu
							id="basic-menu"
							anchorEl={anchorEl}
							open={Boolean(anchorEl)}
							onClose={() => menuClose()}
							MenuListProps={{
								'aria-labelledby': 'basic-menu',
							}}
							sx={{
								'& .MuiPaper-root': {
									backgroundColor: '#9abdc6',
									boxShadow:
										'0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)',
								},
							}}
						>
							<MenuItem>
								<Link href="/test-tube-page" passHref>
									<Typography>Test Tube</Typography>
								</Link>
							</MenuItem>
							<MenuItem>
								<Link href="/data-ingestor-page" passHref>
									<Typography>Data Ingestor</Typography>
								</Link>
							</MenuItem>
							<MenuItem>
								<Link href="/analyzer-page" passHref>
									<Typography>Analyzer</Typography>
								</Link>
							</MenuItem>
							<MenuItem>
								<Link href="/collaboration-page" passHref>
									<Typography>Collaboration</Typography>
								</Link>
							</MenuItem>
						</Menu>
					</Stack>

					<Stack
						direction="row"
						sx={{ background: '#668890', borderRadius: '25px', height: '35px' }}
					>
						<Link href="/auth/register" passHref>
							<Button
								size="small"
								sx={{
									borderRadius: '25px',
									display: {
										xs: 'none',
										md: 'block',
									},
								}}
							>
								{t('Try Now')}
							</Button>
						</Link>
						<Tooltip
							title="Sign In"
							sx={{ display: { xs: 'none', md: 'flex' } }}
						>
							<Link href="/auth/login" passHref>
								<IconButton
									sx={{
										p: 1,
										fontSize: '14px',
										display: { xs: 'none', md: 'inline-flex' },
									}}
									size="small"
								>
									<AccountCircleOutlinedIcon /> {'\xa0'}
									{t('Sign In')}
								</IconButton>
							</Link>
						</Tooltip>
					</Stack>
				</Toolbar>
			</Container>
		</AppBar>
	);
};
export default NavBar;
