/* eslint react/prop-types: 0 */
import { CacheProvider } from '@emotion/react';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import CssBaseline from '@mui/material/CssBaseline';
import { appWithTranslation } from 'next-i18next';
import Head from 'next/head';
import Router from 'next/router';
import { SnackbarProvider } from 'notistack';
import nProgress from 'nprogress';
import 'nprogress/nprogress.css';
import { QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { Provider as ReduxProvider } from 'react-redux';
import Loader from 'src/components/Loader';
import { AuthConsumer, AuthProvider } from 'src/contexts/JWTAuthContext';
import { PinboardProvider } from 'src/contexts/PinboardContext';
import { SidebarProvider } from 'src/contexts/SidebarContext';
import createEmotionCache from 'src/createEmotionCache';
import useScrollTop from 'src/hooks/useScrollTop';
import { store } from 'src/store';
import ThemeProvider from 'src/theme/ThemeProvider';
// @TODO: remove lazy import and replace with tree-shakeable version in future
import 'src/utils/chart';
import 'src/i18n/i18n'; // 💀
import { si6maQueryClient } from 'src/queries/queryClient';

const clientSideEmotionCache = createEmotionCache();

function MyApp(props) {
	const { Component, emotionCache = clientSideEmotionCache, pageProps } = props;
	const getLayout = Component.getLayout ?? ((page) => page);
	useScrollTop();

	Router.events.on('routeChangeStart', nProgress.start);
	Router.events.on('routeChangeError', nProgress.done);
	Router.events.on('routeChangeComplete', nProgress.done);

	return (
		<CacheProvider value={emotionCache}>
			<Head>
				<title>Lyceum</title>
				<meta
					name="viewport"
					content="width=device-width, initial-scale=1, shrink-to-fit=no"
				/>
			</Head>
			<ReduxProvider store={store}>
				<QueryClientProvider client={si6maQueryClient}>
					<SidebarProvider>
						<ThemeProvider>
							<LocalizationProvider dateAdapter={AdapterDateFns}>
								<AuthProvider>
									<PinboardProvider>
										<SnackbarProvider
											maxSnack={6}
											anchorOrigin={{
												vertical: 'bottom',
												horizontal: 'right',
											}}
										>
											<CssBaseline />
											<AuthConsumer>
												{(auth) =>
													!auth.isInitialized ? (
														<Loader />
													) : (
														getLayout(<Component {...pageProps} />)
													)
												}
											</AuthConsumer>
										</SnackbarProvider>
									</PinboardProvider>
								</AuthProvider>
							</LocalizationProvider>
						</ThemeProvider>
					</SidebarProvider>
					<ReactQueryDevtools position="bottom-right" initialIsOpen={false} />
				</QueryClientProvider>
			</ReduxProvider>
		</CacheProvider>
	);
}

export default appWithTranslation(MyApp);
