/* eslint-disable no-alert */
import Router from 'next/router';
import PropTypes from 'prop-types';
import React, { useEffect } from 'react';
import { isServer } from 'src/utils/isServer';

export const WarnBeforePageLeave = React.forwardRef(
	(
		{
			onLeave = () => {},
			onCancel = () => {},
			children = null,
			showWarning = true,
			message = 'Are you sure you want to leave?',
		},
		ref
	) => {
		useEffect(() => {
			if (isServer) {
				return;
			}
			let isWarned = false;

			const routeChangeStart = (url) => {
				if (Router.asPath !== url && !isWarned) {
					isWarned = true;
					if (window.confirm(message)) {
						onLeave();
						Router.push(url);
					} else {
						isWarned = false;
						onCancel();
						Router.events.emit('routeChangeError');
						Router.replace(Router, Router.asPath, { shallow: true });
						throw new Error('Abort route change. Please ignore this error.');
					}
				}
			};

			const beforeUnload = (e) => {
				if (!isWarned) {
					const event = e || window.event;
					event.returnValue = 'message';
					return 'message';
				}
				return null;
			};

			if (showWarning && !!window) {
				Router.events.on('routeChangeStart', routeChangeStart);
				window?.addEventListener('beforeunload', beforeUnload);
				Router.beforePopState(({ url }) => {
					if (Router.asPath !== url && !isWarned) {
						isWarned = true;
						if (window.confirm(message)) {
							onLeave();
							return true;
						}
						isWarned = false;
						window?.history.pushState(null, '', url);
						Router.replace(Router, Router.asPath, { shallow: true });
						return false;
					}
					return true;
				});
			}

			return () => {
				if (!showWarning) return;
				Router.events.off('routeChangeStart', routeChangeStart);
				window?.removeEventListener('beforeunload', beforeUnload);
				Router.beforePopState(() => {
					return true;
				});
			};
		}, [isServer]);

		return <div ref={ref}>{children}</div>;
	}
);

WarnBeforePageLeave.propTypes = {
	onLeave: PropTypes.func,
	onCancel: PropTypes.func,
	children: PropTypes.node,
	showWarning: PropTypes.bool,
	message: PropTypes.string,
};
