import EditIcon from '@mui/icons-material/Edit';
import { Box, IconButton, Tooltip, Typography, useTheme } from '@mui/material';
import { useTranslation } from 'next-i18next';
import PropTypes from 'prop-types';
import { DDContentCardWrapper } from './DDCardWrappers';

export const DDAccessGroups = ({ editable = false, groups }) => {
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
					{t('Access Groups')}
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
			<Box component="span" fullWidth>
				{groups?.map((group) => (
					<Typography
						key={group.id}
						variant="h4"
						sx={{
							color: theme.colors.rawColors.fontSecondary,
							fontWeight: 'normal',
							my: theme.spacing(1),
							pb: theme.spacing(1),
							borderBottom: `1px solid ${theme.colors.rawColors.secondaryL}`,
						}}
					>
						{group.group_name}
					</Typography>
				))}
			</Box>
		</DDContentCardWrapper>
	);
};

DDAccessGroups.propTypes = {
	editable: PropTypes.bool,
	groups: PropTypes.arrayOf(
		PropTypes.shape({
			id: PropTypes.string,
			group_name: PropTypes.string,
		})
	),
};
