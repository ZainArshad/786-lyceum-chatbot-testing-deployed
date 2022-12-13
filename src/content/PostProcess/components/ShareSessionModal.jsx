import PropTypes from 'prop-types';
import { useQuery } from '@tanstack/react-query';
import { Modal, ModalBody, ModalFooter } from 'src/components/shared/Modal';
import { useTranslation } from 'next-i18next';
import { Typography, TextField, IconButton, Tooltip, Box } from '@mui/material';
import { Button, LoadingButton } from 'src/components/shared/Buttons';
import { queryKeys } from 'src/lib/constants/queries';
import { makeAccountRequest } from 'src/services/api/account';
import { time } from 'src/lib/helpers/shared';
import { useAuth } from 'src/hooks/useAuth';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import { Center, FlexApart } from 'src/components/shared/wrappers';
import { useSelector } from 'src/store';
import { config } from 'src/lib/constants/env/config';
import { Formik, Form, Field } from 'formik';
import { Autocomplete, TextField as FormikTextField } from 'formik-mui';
import * as Yup from 'yup';
import { Si6maLoader } from 'src/components/shared/Loaders';
import { selectSessionShareable } from 'src/slices/postProcessing/selectors';
import { useSnackbarNotifications } from 'src/hooks/useSnackbarNotifications';
import { useSession } from '../hooks/useSession';

const DEFAULT_GOURPS = []; // waiting for backend to add this features

export const ShareSessionModal = ({ open, handleClose = () => {} }) => {
	const { t } = useTranslation();
	const { user } = useAuth();
	const { showSuccessSnackbar } = useSnackbarNotifications();
	const getSessionsData = useSelector(selectSessionShareable);
	const { createOrUpdateSession, isLiveSession, sessionId, sessionQuery } =
		useSession();
	const {
		data: userAccounts,
		isLoading,
		isError,
		refetch,
	} = useQuery(
		[queryKeys.GET_ACCOUNTS_LIST],
		makeAccountRequest.getAccountList,
		{
			enabled: open,
			select: (data) => data.data.filter((a) => a.id !== user.id),
			staleTime: time.minutesToMilliseconds(1),
		}
	);

	const _handleClose = (_, reason) => {
		if (reason !== 'backdropClick') {
			handleClose();
		}
	};

	const generateShareableLink = () => {
		const url = `${config.APP_ORIGIN}/post-process/session/${sessionId}`;
		return url;
	};

	if (isLoading || sessionQuery.fetchStatus === 'fetching') {
		return (
			<Modal open={open} onClose={_handleClose}>
				<ModalBody>
					<Center>
						<Si6maLoader />
					</Center>
				</ModalBody>
			</Modal>
		);
	}

	if (isError) {
		return (
			<Modal open={open} onClose={_handleClose}>
				<ModalBody>
					<Center>
						<Button variant="outlined" onClick={() => refetch()}>
							Oops! Retry
						</Button>
					</Center>
				</ModalBody>
			</Modal>
		);
	}

	return (
		<Formik
			initialValues={{
				name: sessionQuery.data?.name || '',
				data_session_groups: DEFAULT_GOURPS,
				data_session_user: (() => {
					if (userAccounts && sessionQuery.data) {
						const defaultUserIds = [];
						sessionQuery.data.data_session_user.map((u) =>
							defaultUserIds.push(u.user.id)
						);
						const defaultSelectedUser = userAccounts.filter((a) =>
							defaultUserIds.includes(a.id)
						);
						return defaultSelectedUser;
					}
					return [];
				})(),
			}}
			validationSchema={Yup.object().shape({
				name: Yup.string()
					.required(t('Field Requird'))
					.min(3, t('Min 3 characters required'))
					.max(60, t('Max 60 characters allowed')),
			})}
			onSubmit={(values, { setSubmitting }) => {
				setSubmitting(true);
				const data = getSessionsData();
				const sessionUserIds = values.data_session_user.map((u) => u.id);
				const payload = {
					data,
					...values,
					data_session_groups: DEFAULT_GOURPS,
					data_session_user: sessionUserIds,
				};
				createOrUpdateSession(payload, {
					onSuccess: () => {
						setSubmitting(false);
						showSuccessSnackbar(t('Success'));
					},
				});
			}}
		>
			{({ submitForm, isSubmitting }) => (
				<Modal open={open} onClose={_handleClose}>
					<ModalBody>
						<Form>
							<Typography variant="h2" component="h2">
								{t('Share Session')}
							</Typography>
							<Typography sx={{ mt: 2 }}>{t('Session Name')}</Typography>
							<Field name="name" component={FormikTextField} fullWidth />
							<Typography sx={{ mt: 2 }}>
								{t('Select users to share the session with')}
							</Typography>
							<Field
								component={Autocomplete}
								name="data_session_user"
								multiple
								loading={isLoading}
								options={userAccounts || []}
								getOptionLabel={(option) => option.email}
								filterSelectedOptions
								disableCloseOnSelect
								renderInput={(params) => (
									<TextField fullWidth {...params} variant="outlined" />
								)}
							/>
							{isLiveSession && (
								<FlexApart sx={{ mt: 2 }}>
									<Box component="span" fullWidth>
										<Typography>{generateShareableLink()}</Typography>
									</Box>
									<CopyToClipboard text={generateShareableLink()}>
										<Tooltip title={t('Copy to clipboard')} arrow>
											<IconButton>
												<ContentCopyIcon />
											</IconButton>
										</Tooltip>
									</CopyToClipboard>
								</FlexApart>
							)}
							<ModalFooter sx={{ gap: 1 }}>
								<Button variant="outlined" color="error" onClick={_handleClose}>
									{t('Close')}
								</Button>
								<LoadingButton
									loading={isSubmitting}
									type="submit"
									onClick={submitForm}
								>
									{t('Save')}
								</LoadingButton>
							</ModalFooter>
						</Form>
					</ModalBody>
				</Modal>
			)}
		</Formik>
	);
};

ShareSessionModal.propTypes = {
	open: PropTypes.bool.isRequired,
	handleClose: PropTypes.func,
};
