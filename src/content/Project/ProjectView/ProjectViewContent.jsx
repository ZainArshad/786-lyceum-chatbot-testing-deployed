import { Box, Grid, useTheme } from '@mui/material';
import { format, parseISO } from 'date-fns';
import { useTranslation } from 'next-i18next';
import { useRouter } from 'next/router';
import { useQuery } from '@tanstack/react-query';
import { Si6maLoader } from 'src/components/shared/Loaders';
import { PageBodyWrapper } from 'src/components/shared/wrappers';
import { LIMIT_TYPE } from 'src/content/Analyzer/constants';
import { DDAccessGroups } from 'src/content/Analyzer/DDCard/DDAccessGroups';
import { DDDescriptors } from 'src/content/Analyzer/DDCard/DDDescriptors';
import { STANDARD_DATE_FORMAT } from 'src/lib/constants/date-fns';
import { queryKeys } from 'src/lib/constants/queries';
import { time } from 'src/lib/helpers/shared';
import { makeProjectRequest } from 'src/services/api/project';
import { LimitChart } from './LimitsChat';
import { ProjectInfoTitle } from './ProjectInfoTitle';
import { ProjectViewChart } from './ProjectViewChartJS';
import { ProjectViewSectionHeading } from './ProjectViewComps';

export const ProjectViewContent = () => {
	const theme = useTheme();
	const router = useRouter();
	const { pid } = router.query;
	const { t } = useTranslation();

	const {
		data: projectDetailRes,
		isLoading: isProjectDetailsLoading,
		isError,
	} = useQuery(
		[queryKeys.GET_PROJECT_DETAIL, pid],
		() => makeProjectRequest.getProjectDetail({ projId: pid }),
		{
			enabled: !!pid,
			select: (data) => data.data.results || data.data,
			cacheTime: time.minutesToMilliseconds(1),
			retryOnMount: false,
			refetchOnWindowFocus: false,
			refetchOnReconnect: false,
		}
	);

	return (
		<PageBodyWrapper>
			{isProjectDetailsLoading && <Si6maLoader sx={{ my: theme.spacing(2) }} />}
			{!!projectDetailRes > 0 && (
				<>
					<ProjectInfoTitle
						title={projectDetailRes.name}
						author="Charles Xavier"
						date={
							t('Updated ') +
							format(
								parseISO(projectDetailRes.updated_at),
								STANDARD_DATE_FORMAT
							)
						}
					/>
					<Box
						sx={{
							display: 'grid',
							gridTemplateColumns: { lg: '1fr 1fr' },
							gridGap: theme.spacing(2),
							width: '100%',
						}}
					>
						<DDDescriptors
							editable
							descriptors={projectDetailRes.descriptors}
							tags={projectDetailRes.tags}
						/>
						<DDAccessGroups editable groups={projectDetailRes.groups} />
					</Box>
					<Box>
						<ProjectViewSectionHeading otherStyles={{ my: theme.spacing(2) }}>
							{t('Data')}
						</ProjectViewSectionHeading>
						<Grid
							container
							direction="row"
							justifyContent="start"
							alignItems="stretch"
							spacing={2}
						>
							{projectDetailRes.data_type === LIMIT_TYPE ? (
								<Grid item xs={12}>
									<LimitChart
										error={isError}
										limits={projectDetailRes.limits}
										name={projectDetailRes.name}
										refetch={projectDetailRes.refetch}
									/>
								</Grid>
							) : (
								projectDetailRes.categories.map((category) => (
									<Grid item xs={12} key={category.category__id}>
										<ProjectViewChart
											categoryId={category.category__id}
											projectId={projectDetailRes.id}
											categoryName={category.category__name}
										/>
									</Grid>
								))
							)}
						</Grid>
					</Box>
				</>
			)}
		</PageBodyWrapper>
	);
};
