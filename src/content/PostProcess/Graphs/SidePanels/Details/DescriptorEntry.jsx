import React from 'react';
import { Box, Stack, Typography, useTheme } from '@mui/material';
import PropTypes from 'prop-types';
import { useTranslation } from 'next-i18next';

export const DescriptorEntry = ({ proj }) => {
	const theme = useTheme();
	const { t } = useTranslation();
	return (
		<Box
			sx={{
				padding: theme.spacing(1),
				border: `2px solid #7B8092`,
				borderRadius: theme.general.borderRadius,
				mb: theme.spacing(2),
			}}
		>
			<Box
				sx={{
					backgroundColor: theme.palette.common.white,
					color: theme.palette.text.secondary,
					width: 'fit-content',
					px: theme.spacing(1),
					mt: theme.spacing(-2.9),
					borderRadius: theme.general.borderRadiusSm,
				}}
			>
				<Typography my={0.5}>Group</Typography>
			</Box>
			<Box>
				<Stack spacing={1}>
					<Box>
						<Typography mr={theme.spacing(1)} sx={{ fontWeight: 'bold' }}>
							{t('Project Name')}
						</Typography>
						<Typography>{proj[0]?.project}</Typography>
					</Box>
					{proj.map((e, i) => (
						<Box key={e.project + i}>
							<Typography mr={theme.spacing(1)} sx={{ fontWeight: 'bold' }}>
								{e.descriptor}
							</Typography>
							<Typography>{e.value}</Typography>
						</Box>
					))}
				</Stack>
			</Box>
		</Box>
	);
};

DescriptorEntry.propTypes = {
	proj: PropTypes.arrayOf(
		PropTypes.shape({
			project: PropTypes.string.isRequired,
			descriptor: PropTypes.string.isRequired,
			value: PropTypes.string.isRequired,
		}).isRequired
	).isRequired,
};
