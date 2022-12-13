/* eslint react/prop-types: 0 */ // --> OFF | @Zain please take care of this
import { useState } from 'react';
import { Modal, styled, Box, IconButton } from '@mui/material';
import SendOutlinedIcon from '@mui/icons-material/SendOutlined';
import CancelIcon from '@mui/icons-material/Cancel';
import { useTranslation } from 'next-i18next';
import { makeGroupsRequest } from 'src/services/api/groups';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { queryKeys } from 'src/lib/constants/queries';
import { Button } from 'src/components/shared/Buttons';
import CustomAutoComplete from './CustomAutoComplete';

const CustomBox = styled(Box)(
	`background:white; width:75%; 
   height:327px;
   margin:0 auto`
);

function InviteModal({
	modalOpen,
	handleClose,
	inviteList,
	groupId,
	setSearchTerm,
}) {
	const queryClient = useQueryClient();
	if (inviteList === undefined) {
		inviteList = [];
	}
	const [value, setValue] = useState([]);
	const { t } = useTranslation();
	const { mutate: addMemberFunction } = useMutation(
		(obj) => {
			return makeGroupsRequest.add_member(obj.groupId, obj.members);
		},
		{
			onSuccess: () => {
				handleClose();
				return queryClient.invalidateQueries([queryKeys.GET_GROUPS_LIST]);
			},
		}
	);

	const handleSubmit = async () => {
		let users = [];
		value.forEach((d) => {
			users.push({
				user: d.id,
				group_role: d.role === undefined ? 'MEMBER' : d.role,
			});
		});
		addMemberFunction({ groupId, members: { members: users } });
	};

	return (
		<Modal open={modalOpen}>
			<CustomBox>
				<form noValidate style={{ position: 'relative', height: '100%' }}>
					<p
						style={{
							fontSize: '18px',
							fontWeight: '400',
							textAlign: 'center',
							marginTop: '5%',
							paddingTop: '1.5%',
						}}
					>
						{t('Invite People')}
					</p>
					<IconButton
						color="secondary"
						aria-label="directions"
						sx={{
							p: '10px',
							position: 'absolute',
							top: '3.1%',
							right: '1%',
						}}
						onClick={handleClose}
					>
						<CancelIcon sx={{ fill: 'black' }} />
					</IconButton>
					<CustomAutoComplete
						inviteList={inviteList}
						value={value}
						setValue={setValue}
						setSearchTerm={setSearchTerm}
					/>
					<Box
						style={{
							background: '#F8F9FE',
							height: '45px',
							position: 'absolute',
							bottom: '0',
							width: '100%',
						}}
					>
						<Button
							endIcon={<SendOutlinedIcon />}
							sx={{
								fontSize: '16px',
								fontWeight: '400',
								width: '100%',
								float: 'right',
								borderRadius: '0px',
								top: '1px',
								justifyContent: 'center !important',
							}}
							onClick={handleSubmit}
						>
							{t('Add')}
						</Button>
					</Box>
				</form>
			</CustomBox>
		</Modal>
	);
}

export default InviteModal;
