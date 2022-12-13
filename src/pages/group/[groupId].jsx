import { useState } from 'react';
import { Box, styled } from '@mui/material';
import { Si6maLayout } from 'src/layouts/Si6maLayout';
import Head from 'next/head';
import { useTranslation } from 'react-i18next';
import GroupsHomeContent from 'src/content/Groups/index';
import { Authenticated } from 'src/components/Authenticated';

const GroupsWrapper = styled(Box)(
	({ theme }) => `
    overflow: auto;
    background: ${theme.palette.common.white};
    flex: 1;
`
);

function Groups() {
	const { t } = useTranslation();
	const [groupname, setGroupname] = useState('Group');

	return (
		<>
			<Head>
				<title>Lyceum - {t(groupname)}</title>
			</Head>
			<GroupsWrapper>
				<GroupsHomeContent setGroupname={setGroupname} />
			</GroupsWrapper>
		</>
	);
}

export default Groups;

Groups.getLayout = function getLayout(page) {
	return (
		<Authenticated>
			<Si6maLayout>{page}</Si6maLayout>
		</Authenticated>
	);
};
