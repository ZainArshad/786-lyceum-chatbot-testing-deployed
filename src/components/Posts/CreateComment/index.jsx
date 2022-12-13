import { useTheme, Box, Avatar, TextField, Button } from '@mui/material';
import { useTranslation } from 'next-i18next';

const CreatePostComment = () => {
	const theme = useTheme();
	const { t } = useTranslation();
	const user = {
		avatar: '/static/images/avatars/1.jpg',
		name: 'Rachael Simons1',
		jobtitle: 'Lead Developer',
	};
	return (
		<Box
			p={theme.spacing(1)}
			sx={{
				display: 'flex',
				alignItems: 'center',
				justifyContent: 'space-between',
			}}
		>
			<Avatar alt={user.name} src={user.avatar} />
			<Box p={1} sx={{ flex: 1 }}>
				<TextField
					sx={{
						m: 0,
						px: theme.spacing(2),
					}}
					onChange={() => {}}
					placeholder={t('Reply..')}
					fullWidth
					variant="outlined"
				/>
			</Box>
			<Button variant="contained">{t('Send')}</Button>
		</Box>
	);
};

CreatePostComment.propTypes = {};

export default CreatePostComment;
