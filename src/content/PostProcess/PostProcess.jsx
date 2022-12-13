import { useEffect } from 'react';
import { setIsProcessing } from 'src/slices/pinboard/dataProcessing/pinnedDataSlice';
import { useDispatch } from 'src/store';
import { PostProcessContent } from './PostProcessContent';
import { SessionProvider } from './context/SessionContext';
import { GraphMitterProvider } from './context/GraphMitterContext';

export const PostProcess = () => {
	const dispatch = useDispatch();

	useEffect(() => {
		return () => {
			dispatch(setIsProcessing(false));
		};
	}, []);

	return (
		<SessionProvider>
			<GraphMitterProvider>
				<PostProcessContent />
			</GraphMitterProvider>
		</SessionProvider>
	);
};
