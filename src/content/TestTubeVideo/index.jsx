import { PageContentWrapper } from 'src/components/styled';
import { PageHeading } from 'src/components/shared/Typography';
import Head from 'next/head';
import { useTranslation } from 'next-i18next';
import {
	Box,
	Typography,
	Button,
	IconButton,
	Grid,
	styled,
} from '@mui/material';
import PushPinOutlinedIcon from '@mui/icons-material/PushPinOutlined';
import ShareOutlinedIcon from '@mui/icons-material/ShareOutlined';
import Image from 'next/image';
import GroupsQuestionCard from 'src/components/GroupsQuestionCard';
import { FileCard } from './FileComponent';
import { DDCard } from '../Analyzer/DDCard';

const ImgWrapper = styled(Box)(
	() => `
      position: relative;
      z-index: 5;
      width: 100%;
      overflow: hidden;
  
      img {
        display: block;
        width: 95%;
      }
    `
);

const files = [
	{ title: 'Soundcheck Test Sequence', uploader: 'Ransom Cole', date: '9 Sep' },
	{ title: 'Stimulus.wav file', uploader: 'Ransom Cole', date: '9 Sep' },
	{ title: 'Python Script', uploader: 'Ransom Cole', date: '9 Sep' },
];

const sampleProjectDetail = {
	id: '24f5836d-f222-437a-998c-116f00d858e7',
	tags: [
		{
			id: 'e84311ef-4557-4a31-af2b-9bfd26a5a2ef',
			created_at: '2022-09-09T22:44:01.483599Z',
			updated_at: '2022-09-09T22:44:01.483628Z',
			name: 'Calibrated',
			slug: 'calibrated',
		},
	],
	descriptors: [
		{
			descriptor: 'Environment',
			value: 'Table',
		},
		{
			descriptor: 'Distance from Microphone',
			value: '6 inches',
		},
	],
	categories: [
		{
			category__id: '3c5a77c5-7cd0-48c7-9c58-653b04c26255',
			category__name: 'Fundamental ...Reference Mic))',
			x_units: 'hz',
			y_units: 'dB',
		},
		{
			category__id: '41a447a7-2b4b-4f1e-ac99-4b686e6ee25a',
			category__name: 'Fundamental ...ATS Right Ear))',
			x_units: 'hz',
			y_units: 'dB',
		},
		{
			category__id: 'ba18a5ba-637e-43eb-b76d-2dffbb771c75',
			category__name: 'Fundamental ...HATS Left Ear))',
			x_units: 'hz',
			y_units: 'dB',
		},
	],
	groups: [
		{
			id: '13d61a2f-94a6-40c7-80c3-6cce7bb3a5c3',
			group_name: 'Josh Levy Labs',
		},
	],
	limits: [],
	owner: 'Joshua Test',
	created_at: '2022-09-09T22:44:01.421308Z',
	updated_at: '2022-09-09T22:44:17.069622Z',
	name: 'HATS vs SCM',
	file: 'https://si6ma-development.s3.amazonaws.com/media/data-ingestor/ce1816221ede72b151712cd2/undefined23d886_800be5c8b09fac8b70ac1066.xlsx',
	status: 'DONE',
	file_type: 'xls',
	data_type: 'measurement',
	units: [
		{
			x_axis: 'hz',
			y_axis: 'dB',
			category: 'Fundamental ...ATS Right Ear))',
			index_column: 'Hz',
		},
		{
			x_axis: 'hz',
			y_axis: 'dB',
			category: 'Fundamental ...HATS Left Ear))',
			index_column: 'Hz',
		},
		{
			x_axis: 'hz',
			y_axis: 'dB',
			category: 'Fundamental ...Reference Mic))',
			index_column: 'Hz',
		},
	],
	invalid_cells_action: null,
	is_public: true,
};
function TestTubeVideo() {
	const { t } = useTranslation();
	return (
		<>
			<Head>
				{' '}
				<title>{t('Test Tube Video')} </title>
			</Head>
			<PageContentWrapper>
				<Box
					sx={{
						ml: { md: 4, sm: 1, xs: 1 },
						mr: { md: 4, sm: 1, xs: 1 },
						width: '100%',
					}}
				>
					<PageHeading>
						How to stress test your loudspeaker to simulate its life expectancy
					</PageHeading>
					<Grid container spacing={3}>
						<Grid item md={4} sm={6} xs={12}>
							<Box
								sx={{
									display: 'flex',
									border: '1px solid #e8eaf1',
									borderRadius: '11px',
									p: 1,
									alignItems: 'center',
									justifyContent: 'center',
								}}
							>
								<Typography variant="h5">Rayna Calzoni</Typography>
								<Button variant="contained" size="medium" sx={{ ml: 1 }}>
									{t('Connect')}
								</Button>
							</Box>
						</Grid>
						<Grid item md={8} sm={6} xs={12}>
							<Box
								sx={{
									display: 'flex',
									border: '1px solid #e8eaf1',
									borderRadius: '11px',
									p: 1,
									alignItems: 'center',
									width: '100%',
									justifyContent: 'center',
								}}
							>
								<IconButton>
									<PushPinOutlinedIcon />
								</IconButton>
								<Typography variant="body1">11k Pins</Typography>
								<IconButton>
									<ShareOutlinedIcon />
								</IconButton>
								<Typography variant="body1">11k Shares</Typography>
							</Box>
						</Grid>
					</Grid>

					<Box
						sx={{
							border: '1px solid #e8eaf1',
							borderRadius: '11px',
							p: 1,
							alignItems: 'center',
							width: '100%',
							mt: 3,
						}}
					>
						<Typography variant="h3">{t('Summary')}</Typography>
						<Grid container spacing={3}>
							<Grid item md={5} sm={12} xs={12}>
								<ImgWrapper
									sx={{
										position: 'relative',
										height: { md: '15.67vw', xs: '37.67vw' },
										width: '100%',
									}}
								>
									<Image
										alt="Engineering Background"
										src="/static/images/homepage/Rectangle 182.png"
										layout="fill"
										objectFit="cover"
									/>
								</ImgWrapper>
							</Grid>
							<Grid item md={7} sm={12} xs={12}>
								<Typography variant="body1">
									This test procedure outlines how to properly use the klippel
									testing system to measure the balloon performance of a
									loudspeaker. Scientists that reproduce this procedure
									successfully will be learn how to setup and calculate sound
									pressure level of a loudspeaker and see how it performs in
									360-degrees in an anechoic environment.{' '}
								</Typography>
							</Grid>
						</Grid>
					</Box>
					<Box
						sx={{
							border: '1px solid #e8eaf1',
							borderRadius: '11px',
							p: 1,
							alignItems: 'center',
							width: '100%',
							mt: 3,
							height: '331px',
						}}
					>
						<Typography variant="h3">{t('Video')}</Typography>
						<iframe
							title="Test Tube Video"
							id="video"
							width="100%"
							height="91%"
							src="https://www.youtube.com/embed/60XZlQ8yGEw"
							frameBorder="0"
							allow="accelerometer, autoplay; encrypted-media; gyroscope; picture-in-picture"
							allowFullScreen
						/>
					</Box>
					<Box
						sx={{
							border: '1px solid #e8eaf1',
							borderRadius: '11px',
							p: 1,
							alignItems: 'center',
							width: '100%',
							mt: 3,
						}}
					>
						<Typography variant="h3">{t('Files')}</Typography>
						{files?.map((file, i) => {
							return <FileCard key={i} file={file} />;
						})}
					</Box>
					<Box
						sx={{
							border: '1px solid #e8eaf1',
							borderRadius: '11px',
							p: 1,
							alignItems: 'center',
							width: '100%',
							mt: 3,
						}}
					>
						<Typography variant="h3">{t('Resulting Data')}</Typography>
						<DDCard projectDetails={sampleProjectDetail} canEdit={false} />
					</Box>
					<Box
						sx={{
							border: '1px solid #e8eaf1',
							borderRadius: '11px',
							p: 1,
							alignItems: 'center',
							width: '100%',
							mt: 3,
							mb: 3,
						}}
					>
						<Typography variant="h3">{t('Comments')}</Typography>
						<GroupsQuestionCard postId="1" userLiked />
					</Box>
				</Box>
			</PageContentWrapper>
		</>
	);
}

export default TestTubeVideo;
