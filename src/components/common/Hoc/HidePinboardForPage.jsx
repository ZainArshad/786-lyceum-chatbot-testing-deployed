import { useEffect } from 'react';
import { usePinboard } from 'src/hooks/usePinboard';

export const HidePinboardForPage = ({ hide = true, children }) => {
	const [, updatePinboardDeployment] = usePinboard();

	useEffect(() => {
		if (hide) {
			updatePinboardDeployment(false);
		}

		return () => {
			updatePinboardDeployment(true);
		};
	}, []);

	return children;
};
