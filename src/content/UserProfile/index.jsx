/* eslint react/prop-types: 0 */ // --> OFF | @Zain please take care of this
import { PageContentWrapper } from 'src/components/styled';
import { Grid } from '@mui/material';
import Pinboard from 'src/components/Pinboard/Pinboard';
import { queryKeys } from 'src/lib/constants/queries';
import { useQuery } from '@tanstack/react-query';
import Loader from 'src/components/Loader';
import { makeAccountRequest } from 'src/services/api/account';
import { useRouter } from 'next/router';
import Head from 'next/head';
import ProfileCover from './ProfileCover';
import { AnalyzerContent } from '../Analyzer/AnalyzerContent';

function UserProfile() {
	const router = useRouter();
	const id = router.query.userId;

	const { isLoading, data } = useQuery(
		[queryKeys.GET_USER_PROFILE, id],
		makeAccountRequest.getUser,
		{
			enabled: !!id,
			select: (data) => data.data,
		}
	);

	return (
		<PageContentWrapper>
			{!isLoading && data ? (
				<>
					<Head>
						<title>Lyceum - {data.first_name || ''}</title>
					</Head>
					<Grid
						sx={{ px: 4, mb: 3 }}
						container
						direction="row"
						justifyContent="center"
						alignItems="stretch"
						spacing={3}
					>
						<Grid item xs={12}>
							<ProfileCover user={data} />
							<AnalyzerContent forUser={id} />
						</Grid>
					</Grid>
				</>
			) : (
				<Loader />
			)}
			<Pinboard />
		</PageContentWrapper>
	);
}

export default UserProfile;
