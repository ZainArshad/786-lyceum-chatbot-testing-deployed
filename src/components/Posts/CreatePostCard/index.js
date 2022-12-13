import {
	useTheme,
	styled,
	Box,
	Avatar,
	IconButton,
	TextareaAutosize,
	Card,
} from '@mui/material';
import InsertPhotoIcon from '@mui/icons-material/InsertPhoto';
import PushPinIcon from '@mui/icons-material/PushPin';
import DashboardIcon from '@mui/icons-material/Dashboard';
import { useTranslation } from 'next-i18next';
import { Button } from 'src/components/shared/Buttons';

const CreatePostWrapper = styled(Card)(
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

const PostTextArea = styled(TextareaAutosize)(
	({ theme }) => `
          flex: 1;
          min-height: ${theme.spacing(4)};
          margin-left: ${theme.spacing(1)};
          border: none;
          outline: none;
          background: transparent;
          max-height: ${theme.spacing(20)};
          padding: ${theme.spacing(1)};
          resize: none;
  
          &:focus {
              outline: none;
              border-radius: ${theme.shape.borderRadius};
          }
      `
);

const CreatePostCard = () => {
	const theme = useTheme();
	const user = {
		avatar: '/static/images/avatars/1.jpg',
		name: 'Rachael Simons2',
		jobtitle: 'Lead Developer',
	};
	const { t } = useTranslation();

	return (
		<CreatePostWrapper>
			<Box sx={{ display: 'flex', width: '100%', alignItems: 'self-start' }}>
				<Avatar alt={user.name} src={user.avatar} />
				<PostTextArea maxRows={4} placeholder="Type here..." />
			</Box>
			<Box
				sx={{
					display: 'flex',
					width: '100%',
					alignItems: 'center',
					justifyContent: 'space-between',
					padding: theme.spacing(1),
					borderTop: `1px solid ${theme.colors.alpha.black[10]}`,
				}}
			>
				<Box
					sx={{
						display: 'flex',
						alignItems: 'center',
						width: '40%',
						justifyContent: 'space-between',
					}}
				>
					<IconButton>
						<DashboardIcon color="secondary" />
					</IconButton>
					<IconButton>
						<PushPinIcon color="secondary" />
					</IconButton>
					<IconButton>
						<InsertPhotoIcon color="secondary" />
					</IconButton>
				</Box>
				<Box sx={{ display: 'flex', alignItems: 'center' }}>
					<Button sx={{ fontSize: theme.typography.body1 }}>{t('Post')}</Button>
				</Box>
			</Box>
		</CreatePostWrapper>
	);
};

export default CreatePostCard;
