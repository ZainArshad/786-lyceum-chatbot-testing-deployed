import { useState } from 'react';
import NavBar from 'src/components/NavBar';
import MobileSideBar from 'src/components/MobileSideBar';
import AboutUsBody from './AboutUsBody';

function AboutUsPage() {
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
			<AboutUsBody />
		</>
	);
}

export default AboutUsPage;
