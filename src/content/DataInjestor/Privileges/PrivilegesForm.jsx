import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import {
	Box,
	Button,
	Typography,
	useTheme,
	Autocomplete,
	TextField,
} from '@mui/material';
import { useTranslation } from 'next-i18next';
import { useContext, useState, useEffect, useCallback } from 'react';
import { useQuery } from '@tanstack/react-query';
import { CreateGroupModal } from 'src/components/Modals/CreateGroupModal';
import { DottedDivider } from 'src/components/shared';
import { Si6maLoader } from 'src/components/shared/Loaders';
import { Center } from 'src/components/shared/wrappers';
import { DataInjestorContext } from 'src/contexts/DataInjestorContext';
import { queryKeys } from 'src/lib/constants/queries';
import { makeOrganizationRequest } from 'src/services/api/organization';
import _ from 'lodash';
import { DataInjestorFormControls } from '../DataInjestorFormControls';

export function PrivilegesForm() {
	const { t } = useTranslation();
	const theme = useTheme();
	const { dataInjState, addOrDeleteGroups } = useContext(DataInjestorContext);
	const [selectedGroups, setSelectedGroups] = useState([]);
	const [createGroupModalOpen, setCreateDescModalOpen] = useState(false);
	const {
		data: groupsResponse,
		isLoading,
		refetch,
	} = useQuery(
		[queryKeys.GET_USER_GROUPS],
		makeOrganizationRequest.getGroupsList,
		{
			select: (data) => data.data,
		}
	);

	useEffect(() => {
		if (groupsResponse) {
			const defaults = groupsResponse.filter((g) =>
				dataInjState.groups.includes(g.id)
			);
			setSelectedGroups(defaults);
		}
	}, [groupsResponse]);

	const handleCommit = (value) => {
		const ids = _.reduce(
			value,
			(acc, v) => {
				acc.push(v.id);
				return acc;
			},
			[]
		);
		addOrDeleteGroups((_prev) => {
			return [...ids];
		});
	};

	const handleChange = (value) => {
		setSelectedGroups([...value]);
		handleCommit(value);
	};

	return (
		<>
			<Box sx={{ width: '100%' }}>
				<Typography variant="h3">{t('Privileges')}</Typography>
				<Button
					sx={{ my: 1 }}
					color="success"
					variant="outlined"
					onClick={() => setCreateDescModalOpen(true)}
					startIcon={<AddCircleOutlineIcon />}
				>
					{t('Add New')}
				</Button>
			</Box>
			{isLoading ? (
				<Center>
					<Si6maLoader />
				</Center>
			) : (
				<Autocomplete
					multiple
					loading={isLoading}
					options={groupsResponse || []}
					getOptionLabel={(group) => group.group_name}
					value={selectedGroups}
					filterSelectedOptions
					disableCloseOnSelect
					onChange={(_event, value) => handleChange(value)}
					renderInput={(params) => (
						<TextField fullWidth {...params} variant="outlined" />
					)}
				/>
			)}
			<DottedDivider sx={{ my: theme.spacing(5) }} />
			<DataInjestorFormControls
				disableNext={isLoading || selectedGroups.length === 0}
			/>

			<CreateGroupModal
				open={createGroupModalOpen}
				handleClose={useCallback(() => setCreateDescModalOpen(false))}
				onSuccess={() => refetch()}
			/>
		</>
	);
}

PrivilegesForm.propTypes = {};
