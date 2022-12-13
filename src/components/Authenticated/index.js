import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import PropTypes from 'prop-types';
import { useAuth } from 'src/hooks/useAuth';

export const Authenticated = (props) => {
	const { children } = props;
	const auth = useAuth();
	const router = useRouter();
	const [verified, setVerified] = useState(false);

	useEffect(() => {
		if (!router.isReady) {
			return;
		}

		if (!auth.isAuthenticated) {
			router.push({
				pathname: '/auth/login',
				query: { backTo: router.asPath },
			});
		} else {
			setVerified(true);
		}
	}, [router.isReady]);

	if (!verified) {
		return null;
	}

	return children;
};

Authenticated.propTypes = {
	children: PropTypes.node,
};
