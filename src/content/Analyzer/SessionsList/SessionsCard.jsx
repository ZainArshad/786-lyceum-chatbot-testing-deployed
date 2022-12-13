import DeleteIcon from '@mui/icons-material/Delete';
import RemoveRedEyeOutlinedIcon from '@mui/icons-material/RemoveRedEyeOutlined';
import { Box, Typography, useTheme } from '@mui/material';
import { format, parseISO } from 'date-fns';
import { useTranslation } from 'next-i18next';
import { useRouter } from 'next/router';
import PropTypes from 'prop-types';
import { STANDARD_DATE_FORMAT } from 'src/lib/constants/date-fns';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { makeSessionRequest } from 'src/services/api/session';
import { queryKeys } from 'src/lib/constants/queries';
import { useSnackbarNotifications } from 'src/hooks/useSnackbarNotifications';
import { useAuth } from 'src/hooks/useAuth';
import { DDMainWrapper } from '../DDCard/DDCardWrappers';
import { DDAnalyzeButton, DDSignalIcon } from '../DDCard/DDCardComps';

export const SessionsCard = ({ session }) => {
	const theme = useTheme();
	const { t } = useTranslation();
	const { user } = useAuth();
	const router = useRouter();
	const queryClient = useQueryClient();
	const { showSuccessSnackbar } = useSnackbarNotifications();

	const deleteSession = useMutation(makeSessionRequest.deleteSession, {
		onSuccess: () => {
			queryClient.invalidateQueries([queryKeys.LIST_USER_SESSIONS]);
			showSuccessSnackbar(t('Session Deleted'));
		},
	});

	return (
		<DDMainWrapper>
			<Box
				sx={{
					display: 'grid',
					gridTemplateColumns: { lg: '1fr 1fr' },
					width: '100%',
				}}
			>
				<Box sx={{ display: 'flex', alignItems: 'center' }}>
					<DDSignalIcon />
					<Box sx={{ display: 'flex', flexWrap: 'wrap' }}>
						<Box sx={{ ml: theme.spacing(2) }}>
							<Typography variant="h4">{session.name}</Typography>
							<Typography variant="h5" sx={{ fontWeight: 'normal' }}>
								{session.user === user.id ? t('You') : session.user}
							</Typography>
						</Box>
						<Box sx={{ ml: theme.spacing(2) }}>
							<Typography variant="body1" color="text.secondary">
								{t('Updated ') +
									format(parseISO(session.updated_at), STANDARD_DATE_FORMAT)}
							</Typography>
						</Box>
					</Box>
				</Box>
				<Box
					sx={{
						mt: { xs: theme.spacing(1) },
						display: 'flex',
						alignItems: 'center',
						justifyContent: { lg: 'flex-end' },
						flexWrap: 'wrap',
					}}
				>
					<DDAnalyzeButton
						text="Open"
						onClick={() => router.push(`/post-process/session/${session.id}`)}
						icon={<RemoveRedEyeOutlinedIcon />}
					/>
					<DDAnalyzeButton
						loading={deleteSession.isLoading}
						onClick={() => {
							deleteSession.mutate({ sessionId: session.id });
						}}
						text="Delete"
						icon={<DeleteIcon />}
					/>
				</Box>
			</Box>
		</DDMainWrapper>
	);
};

SessionsCard.propTypes = {
	session: PropTypes.object.isRequired,
};
