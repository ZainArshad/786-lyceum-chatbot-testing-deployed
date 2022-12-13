import { createContext, useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { useAuth } from 'src/hooks/useAuth';
import { queryKeys } from 'src/lib/constants/queries';
import { time } from 'src/lib/helpers/shared';
import { makeSessionRequest } from 'src/services/api/session';
import { useRouter } from 'next/router';
import { useDispatch } from 'src/store';
import { dangerouslySetSessionState } from 'src/slices/postProcessing/actions';

/**
 * @typedef {{
 *  isOwner: boolean;
 *  isLiveSession: boolean;
 *  sessionQuery: import('@tanstack/react-query').UseQueryResult | null;
 *  updateSessionMutation: import('@tanstack/react-query').UseMutationResult | null;
 *  createSessionMutaion: import('@tanstack/react-query').UseMutationResult | null;
 *  createSession: (data: any) => void;
 *  updateSession: (data: any) => void;
 *  sessionId: string;
 *  sessionOwnerId: string;
 *  createOrUpdateSession: (data: any) => void;
 *  isMutLoadig: boolean;
 *  cloneSession: () => void;
 * }} SessionContextType
 */

/** @type {import('react').Context<SessionContextType>} */
export const SessionContext = createContext({
	isOwner: false,
	isLiveSession: false,
	sessionQuery: null,
	updateSessionMutation: null,
	createSessionMutaion: null,
	createSession: (_data) => {},
	updateSession: (_data) => {},
	sessionId: '',
	sessionOwnerId: '',
	createOrUpdateSession: (_data) => {},
	isMutLoadig: false,
	cloneSession: () => {},
});

export const SessionProvider = ({
	defaultSessionId,
	triggerSync = false,
	children,
}) => {
	const { user: loggedInUser } = useAuth();
	const [sessionId, setSessionId] = useState(null);
	const [userId, setUserId] = useState(null);
	const [hasSliceSynced, setHasSliceSynced] = useState(false);
	const router = useRouter();
	const dispatch = useDispatch();
	const queryClient = useQueryClient();

	useEffect(() => {
		setUserId(loggedInUser?.id);
		if (defaultSessionId) {
			setSessionId(defaultSessionId);
		}
	}, []);

	const isOwner = userId === loggedInUser?.id;
	const isLiveSession = !!sessionId;

	const _setSessionId = (id) => setSessionId(id);

	const createSessionMutaion = useMutation(makeSessionRequest.createSession, {
		retry: 3,
		retryDelay: (attempt) => attempt * 1000,
		onSuccess: (response) => {
			_setSessionId(response.data.id);
			if (triggerSync) {
				router.replace(`/post-process/session/${response.data.id}`);
			}
		},
	});

	const updateSessionMutation = useMutation(makeSessionRequest.patchSession, {
		retry: 3,
		retryDelay: (attempt) => attempt * 1000,
		onSuccess: (data) => {
			const { data: response } = data;
			queryClient.setQueryData(
				[queryKeys.GET_SESSION_DATA_WITH_ID, response.id],
				data
			);
			handleRequestSuccess(response);
		},
	});

	const isMutLoading =
		createSessionMutaion.isLoading || updateSessionMutation.isLoading;

	const sessionQuery = useQuery(
		[queryKeys.GET_SESSION_DATA_WITH_ID, sessionId],
		makeSessionRequest.getSessionDetails,
		{
			enabled: !!sessionId,
			retry: triggerSync ? 0 : 3,
			select: (data) => data.data,
			staleTime: time.minutesToMilliseconds(6),
			onSuccess: (data) => {
				handleRequestSuccess(data);
			},
			onError: (error) => {
				if (error.response.status === 404) {
					router.push('/404');
				}
			},
		}
	);

	useEffect(() => {
		return () => {
			queryClient.removeQueries([queryKeys.GET_SESSION_DATA_WITH_ID]);
			setSessionId(null);
			setUserId(null);
			setHasSliceSynced(false);
		};
	}, []);

	useEffect(() => {
		if (triggerSync && !hasSliceSynced && sessionQuery.data) {
			/**
			 * @TODO Add Yup validation for the data coming from the server
			 * before setting the application state
			 * @Danger
			 */
			dispatch(dangerouslySetSessionState(sessionQuery.data.data));
			setHasSliceSynced(true);
		}
	}, [sessionQuery.data]);

	const handleRequestSuccess = (serverRes) => {
		setUserId(serverRes.user ?? userId);
		setSessionId(serverRes.id);
	};

	const createSession = (data, additionalCallbacks = {}) => {
		if (sessionId) return;
		createSessionMutaion.mutate({ data }, { ...additionalCallbacks });
	};

	const updateSession = (data, additionalCallbacks = {}) => {
		if (!sessionId) return;
		updateSessionMutation.mutate(
			{ data, sessionId },
			{ ...additionalCallbacks }
		);
	};

	const createOrUpdateSession = (data, additionalCallbacks = {}) => {
		if (sessionId) {
			updateSession(data, additionalCallbacks);
		} else {
			createSession(data, additionalCallbacks);
		}
	};

	const cloneSession = async () => {
		router.replace('/post-process/session/~new');
		setSessionId(null);
		setUserId(loggedInUser?.id);
		queryClient.invalidateQueries([queryKeys.GET_SESSION_DATA_WITH_ID]);
	};

	return (
		<SessionContext.Provider
			// @abdadeel - have a look at this
			// eslint-disable-next-line react/jsx-no-constructed-context-values
			value={{
				isOwner,
				isLiveSession,
				sessionQuery,
				updateSessionMutation,
				createSessionMutaion,
				createSession,
				updateSession,
				sessionId,
				sessionOwnerId: userId,
				createOrUpdateSession,
				isMutLoading,
				cloneSession,
			}}
		>
			{children}
		</SessionContext.Provider>
	);
};

SessionProvider.propTypes = {
	defaultSessionId: PropTypes.string,
	triggerSync: PropTypes.bool,
	children: PropTypes.node,
};
