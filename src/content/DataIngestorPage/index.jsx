import { useState } from 'react';
import NavBar from 'src/components/NavBar';
import MobileSideBar from 'src/components/MobileSideBar';
import DataIngestorPageBody from './DataIngestorPageBody';

function DataIngestorPage() {
	const [openSideBar, setOpenSideBar] = useState(false);

	const toggleDrawer = (open) => {
		setOpenSideBar(open);
	};
	return (
		<>
			<NavBar toggleDrawer={toggleDrawer} />
			<MobileSideBar toggleDrawer={toggleDrawer} open={openSideBar} />
			<DataIngestorPageBody />
		</>
	);
}

export default DataIngestorPage;
