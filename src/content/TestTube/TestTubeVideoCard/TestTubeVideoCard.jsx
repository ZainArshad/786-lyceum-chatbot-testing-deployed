import { CardMainWrapper } from 'src/components/CardsCompsAndWrappers/CardWrappers';
import PushPinOutlinedIcon from '@mui/icons-material/PushPinOutlined';
import RemoveRedEyeOutlinedIcon from '@mui/icons-material/RemoveRedEyeOutlined';
import { Box, Typography, useTheme, CardMedia } from '@mui/material';
import { useTranslation } from 'next-i18next';
import Link from 'next/link';
import PropTypes from 'prop-types';
import { CardIconButton } from 'src/components/CardsCompsAndWrappers/CardComps';

export const TestTubeVideoCard = ({ videoDetails }) => {
	const theme = useTheme();
	const { t } = useTranslation();

	return (
		<CardMainWrapper>
			<Box
				sx={{
					display: 'grid',
					gridTemplateColumns: { lg: '1fr 1fr' },
					width: '100%',
				}}
			>
				<CardMedia
					component="img"
					height="225"
					image={
						videoDetails?.imageURl
							? videoDetails?.imageURl
							: '/static/images/placeholders/placeholder.svg'
					}
					alt="request image"
				/>
				<Box sx={{ display: 'flex', flexWrap: 'wrap', width: '100%' }}>
					<Box sx={{ ml: theme.spacing(2) }}>
						<Typography variant="h4">{videoDetails.title}</Typography>
						<Typography variant="body1" color="text.secondary">
							{t('Updated ') + videoDetails.date}
						</Typography>
					</Box>
					<Box
						sx={{ display: 'flex', ml: theme.spacing(2), alignItems: 'center' }}
					>
						<Link href="/test-tube-video/1">
							<CardIconButton text="View" icon={<RemoveRedEyeOutlinedIcon />} />
						</Link>
						<CardIconButton
							text="Pin"
							sx={{
								background: theme.colors.rawColors.primary,
								color: 'white',
							}}
							icon={<PushPinOutlinedIcon />}
						/>
					</Box>
				</Box>
			</Box>
		</CardMainWrapper>
	);
};

TestTubeVideoCard.propTypes = {
	videoDetails: PropTypes.object.isRequired,
};
