import { useTheme, Box } from '@mui/material';
import PropTypes from 'prop-types';
import { useTranslation } from 'next-i18next';
import { useRouter } from 'next/router';
import { BackButton, Button } from 'src/components/shared/Buttons';
import { PageHeading } from 'src/components/shared/Typography';
import {
	BrickBodyCtn,
	FlexApart,
	PageBodyWrapper,
} from 'src/components/shared/wrappers';
import { useState, useEffect } from 'react';
import { useDispatch } from 'src/store';
import { WarnBeforePageLeave } from 'src/components/common/Hoc';
import { resetPostProcessingSession } from 'src/slices/postProcessing/actions';
import { SessionShareBtn, ShareSessionModal } from './components';
import { PostProcessBody } from './PostProcessBody';
import { useSession } from './hooks/useSession';

export const PostProcessContent = ({
	warnOnLeave = true,
	clearSession = false,
}) => {
	const { t } = useTranslation();
	const router = useRouter();
	const theme = useTheme();
	const dispatch = useDispatch();
	const { isOwner, cloneSession, sessionQuery } = useSession();
	const [modalOpen, setModalOpen] = useState(false);

	const resetSession = () => {
		dispatch(resetPostProcessingSession());
	};

	useEffect(() => {
		return () => {
			if (clearSession) {
				resetSession();
			}
		};
	}, []);

	const handleClone = () => cloneSession();

	return (
		<WarnBeforePageLeave onLeave={resetSession} showWarning={warnOnLeave}>
			<PageBodyWrapper>
				<FlexApart>
					<PageHeading>
						{' '}
						{sessionQuery.data?.name || t('Working Session')}
					</PageHeading>
					<Box sx={{ display: 'inline-flex', gap: 2 }}>
						<BackButton onClick={() => router.back()}>
							{t('Back To Data')}
						</BackButton>
						{isOwner ? (
							<SessionShareBtn onClick={() => setModalOpen(true)} />
						) : (
							<Button onClick={handleClone}>{t('Clone Session')}</Button>
						)}
					</Box>
				</FlexApart>
				<BrickBodyCtn
					overRideStyles={{
						background: '#F8F9FE',
						borderColor: theme.colors.primary.main,
					}}
				>
					<PostProcessBody />
				</BrickBodyCtn>
			</PageBodyWrapper>
			{modalOpen && (
				<ShareSessionModal
					open={modalOpen}
					handleClose={() => setModalOpen((prev) => !prev)}
				/>
			)}
		</WarnBeforePageLeave>
	);
};

PostProcessContent.propTypes = {
	warnOnLeave: PropTypes.bool,
	clearSession: PropTypes.bool,
};
