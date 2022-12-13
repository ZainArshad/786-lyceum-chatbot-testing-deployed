import { useState } from 'react';
import NavBar from 'src/components/NavBar';
import MobileSideBar from 'src/components/MobileSideBar';
import FeaturesPageBody from './FeaturesPageBody';

function FeaturesPage() {
	const [openSideBar, setOpenSideBar] = useState(false);

	const toggleDrawer = (event, open) => {
		if (
			event &&
			event.type === 'keydown' &&
			(event.key === 'Tab' || event.key === 'Shift')
		) {
			return;
		}
		setOpenSideBar(open);
	};
	return (
		<>
			<NavBar toggleDrawer={toggleDrawer} />
			<MobileSideBar toggleDrawer={toggleDrawer} open={openSideBar} />
			<FeaturesPageBody />
		</>
	);
}

export default FeaturesPage;
