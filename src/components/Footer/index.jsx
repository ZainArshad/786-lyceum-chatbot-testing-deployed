import { useTranslation } from 'react-i18next';
import {
	Box,
	Grid,
	Container,
	Typography,
	styled,
	IconButton,
	Icon,
	Divider,
	List,
	ListItem,
} from '@mui/material';
import FacebookIcon from '@mui/icons-material/Facebook';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import TwitterIcon from '@mui/icons-material/Twitter';
import EmailIcon from '@mui/icons-material/Email';
import SmartphoneIcon from '@mui/icons-material/Smartphone';
import SvgIcon from '@mui/material/SvgIcon';
import { Si6maLogo } from 'src/assets/svgs';

const BoxHighlights = styled(Box)(
	() => `
    position: relative;
    z-index: 5;
    minHeight: 101px;
`
);

function Footer() {
	const { t } = useTranslation();

	return (
		<BoxHighlights>
			<Container
				sx={{
					pt: 7,
					pb: 7,
					background: '#9abdc6',
				}}
				maxWidth="xl"
			>
				<Grid
					container
					sx={{
						mb: 6,
						alignContent: 'start',
					}}
				>
					<Container maxWidth="md">
						<Grid
							container
							spacing={4}
							sx={{ gridAutoFlow: 'column', gridAutoColumns: '1fr' }}
						>
							<Grid item xs={12} sm={5}>
								<Box>
									<Si6maLogo width={200} />
									<Typography
										sx={{
											p: 2,
										}}
										variant="subtitle2"
									>
										{t(
											'The Lyceum is an online collaborative software that facilitates hardware system engineering team research & development, manufacturing statistics and keeps a track record of technical insights.'
										)}
									</Typography>
								</Box>
							</Grid>

							<Grid item xs={12} sm={4}>
								<Typography
									sx={{
										pl: 2,
										textAlign: { md: 'start', xs: 'center' },
									}}
									variant="h2"
								>
									{t('Get in Touch')}
								</Typography>
								<List>
									<ListItem>
										<Box sx={{ display: 'flex', alignItems: 'center', mt: 1 }}>
											<Icon>
												<SmartphoneIcon />
											</Icon>
											<Typography
												variant="h4"
												sx={{
													textAlign: { md: 'start', xs: 'center' },
												}}
											>
												954-326-8300
											</Typography>
										</Box>
									</ListItem>
									<Divider sx={{ background: '#5c747a' }} variant="fullWidth" />
									<ListItem>
										<Box sx={{ display: 'flex', alignItems: 'center', mt: 1 }}>
											<Icon>
												<EmailIcon />
											</Icon>
											<Typography
												variant="h4"
												sx={{
													fontWeight: 400,
													textAlign: { md: 'start', xs: 'center' },
													ml: 1,
												}}
											>
												josh@joshlevylabs.com
											</Typography>
										</Box>
									</ListItem>
									<Divider sx={{ background: '#5c747a' }} variant="fullWidth" />
								</List>

								<Box
									sx={{
										display: 'flex',
										justifyContent: 'center',
										alignContent: 'space-evenly',
										p: 1,
									}}
								>
									<IconButton
										href="https://www.facebook.com/lyceumthe"
										target="_blank"
									>
										<FacebookIcon />
									</IconButton>

									<IconButton
										href="https://www.linkedin.com/company/lyceumthe"
										target="_blank"
									>
										<LinkedInIcon />
									</IconButton>
									<IconButton
										href="https://www.twitter.com/thelyceum_"
										target="_blank"
									>
										<TwitterIcon />
									</IconButton>
									<IconButton
										href="https://discord.com/invite/ePGdxQ4B"
										target="_blank"
									>
										<SvgIcon
											sx={{
												fontSize: 33,
												transform: 'translate(12.5%,12.5%)',
											}}
										>
											<path d="M13.545 2.907a13.227 13.227 0 0 0-3.257-1.011.05.05 0 0 0-.052.025c-.141.25-.297.577-.406.833a12.19 12.19 0 0 0-3.658 0 8.258 8.258 0 0 0-.412-.833.051.051 0 0 0-.052-.025c-1.125.194-2.22.534-3.257 1.011a.041.041 0 0 0-.021.018C.356 6.024-.213 9.047.066 12.032c.001.014.01.028.021.037a13.276 13.276 0 0 0 3.995 2.02.05.05 0 0 0 .056-.019c.308-.42.582-.863.818-1.329a.05.05 0 0 0-.01-.059.051.051 0 0 0-.018-.011 8.875 8.875 0 0 1-1.248-.595.05.05 0 0 1-.02-.066.051.051 0 0 1 .015-.019c.084-.063.168-.129.248-.195a.05.05 0 0 1 .051-.007c2.619 1.196 5.454 1.196 8.041 0a.052.052 0 0 1 .053.007c.08.066.164.132.248.195a.051.051 0 0 1-.004.085 8.254 8.254 0 0 1-1.249.594.05.05 0 0 0-.03.03.052.052 0 0 0 .003.041c.24.465.515.909.817 1.329a.05.05 0 0 0 .056.019 13.235 13.235 0 0 0 4.001-2.02.049.049 0 0 0 .021-.037c.334-3.451-.559-6.449-2.366-9.106a.034.034 0 0 0-.02-.019Zm-8.198 7.307c-.789 0-1.438-.724-1.438-1.612 0-.889.637-1.613 1.438-1.613.807 0 1.45.73 1.438 1.613 0 .888-.637 1.612-1.438 1.612Zm5.316 0c-.788 0-1.438-.724-1.438-1.612 0-.889.637-1.613 1.438-1.613.807 0 1.451.73 1.438 1.613 0 .888-.631 1.612-1.438 1.612Z" />
										</SvgIcon>
									</IconButton>
								</Box>
							</Grid>
						</Grid>
					</Container>
				</Grid>
			</Container>
		</BoxHighlights>
	);
}

export default Footer;
