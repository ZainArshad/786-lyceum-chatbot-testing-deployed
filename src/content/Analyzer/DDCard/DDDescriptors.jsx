import EditIcon from '@mui/icons-material/Edit';
import { Box, useTheme, Typography, IconButton, Tooltip } from '@mui/material';
import _ from 'lodash';
import { useTranslation } from 'next-i18next';
import PropTypes from 'prop-types';
import { DDContentCardWrapper } from './DDCardWrappers';
import { TruncatedList } from './DDCardComps';

const DescriptorEntry = ({ title, content }) => {
	const theme = useTheme();

	return (
		<Box
			sx={{
				display: 'grid',
				gridTemplateColumns: { lg: '1fr 2fr', md: '1fr 1fr' },
				gridColumnGap: { lg: theme.spacing(2), xs: theme.spacing(1) },
				py: theme.spacing(1.2),
				borderBottom: `1px solid ${theme.colors.rawColors.secondaryL}`,
			}}
		>
			<Typography
				variant="h4"
				sx={{ color: theme.colors.rawColors.fontSecondary }}
			>
				{title}
			</Typography>
			<Box
				sx={{
					display: 'flex',
					alignItems: 'center',
					justifyContent: { md: 'flex-end' },
					pr: { lg: theme.spacing(0.75) },
				}}
			>
				<Typography variant="h4">
					{Array.isArray(content) ? (
						<TruncatedList contentList={content} />
					) : (
						content
					)}
				</Typography>
			</Box>
		</Box>
	);
};

DescriptorEntry.propTypes = {
	title: PropTypes.string.isRequired,
	content: PropTypes.oneOfType([PropTypes.string, PropTypes.array]).isRequired,
};

export const DDDescriptors = ({ descriptors, tags, editable = false }) => {
	const theme = useTheme();
	const { t } = useTranslation();
	return (
		<DDContentCardWrapper>
			<Box
				sx={{
					display: 'flex',
					alignItems: 'center',
					justifyContent: 'space-between',
				}}
			>
				<Typography variant="h3" my={1}>
					{t('Descriptors')}
				</Typography>
				{editable && (
					<Tooltip placement="left" title={t('Edit')} arrow>
						<IconButton
							sx={{
								color: theme.colors.alpha.black[50],
								backgroundColor: theme.colors.rawColors.secondaryL,
							}}
							aria-label="filter"
							onClick={() => {}}
						>
							<EditIcon />
						</IconButton>
					</Tooltip>
				)}
			</Box>
			{descriptors && (
				<Box component="span" fullWidth>
					{descriptors.map((descriptor, i) => (
						<DescriptorEntry
							key={i}
							title={t(descriptor.descriptor)}
							content={descriptor.value}
						/>
					))}
				</Box>
			)}
			{tags && (
				<Box component="span" fullWidth>
					<DescriptorEntry
						title={t('Tags')}
						content={_.reduce(
							tags,
							function (result, value) {
								result.push(value.name);
								return result;
							},
							[]
						)}
					/>
				</Box>
			)}
		</DDContentCardWrapper>
	);
};

DDDescriptors.propTypes = {
	editable: PropTypes.bool,
	descriptors: PropTypes.array,
	tags: PropTypes.array,
};
