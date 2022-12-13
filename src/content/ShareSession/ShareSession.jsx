import { useEffect, useState } from 'react';
import { setIsProcessing } from 'src/slices/pinboard/dataProcessing/pinnedDataSlice';
import { useDispatch } from 'src/store';
import { PostProcessContent } from 'src/content/PostProcess/PostProcessContent';
import { SessionProvider } from 'src/content/PostProcess/context/SessionContext';
import { useRouter } from 'next/router';
import { Center } from 'src/components/shared/wrappers';
import { Si6maLoader } from 'src/components/shared/Loaders';
import { GraphMitterProvider } from '../PostProcess/context/GraphMitterContext';

export const ShareSession = () => {
	const dispatch = useDispatch();
	const router = useRouter();
	const [isLoading, setIsLoading] = useState(true);
	const { sessionId } = router.query;

	useEffect(() => {
		if (!sessionId) {
			router.push('/');
		} else {
			dispatch(setIsProcessing(true));
			setIsLoading(false);
		}

		return () => {
			dispatch(setIsProcessing(false));
		};
	}, []);

	if (isLoading) {
		return (
			<Center>
				<Si6maLoader />
			</Center>
		);
	}

	return (
		<SessionProvider defaultSessionId={sessionId} triggerSync={!!sessionId}>
			<GraphMitterProvider>
				<PostProcessContent clearSession warnOnLeave={false} />
			</GraphMitterProvider>
		</SessionProvider>
	);
};
