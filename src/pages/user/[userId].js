import React from 'react';
import Head from 'next/head';
import { Si6maLayout } from 'src/layouts/Si6maLayout';
import { Authenticated } from 'src/components/Authenticated';
import UserProfile from 'src/content/UserProfile';

function UserProfilePage() {
	return (
		<>
			<Head>
				<title>Lyceum</title>
			</Head>
			<UserProfile />
		</>
	);
}

UserProfilePage.getLayout = function getLayout(page) {
	return (
		<Authenticated>
			<Si6maLayout>{page}</Si6maLayout>
		</Authenticated>
	);
};

export default UserProfilePage;
