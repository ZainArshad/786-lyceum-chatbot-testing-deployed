import { useState } from 'react';
import NavBar from 'src/components/NavBar';
import MobileSideBar from 'src/components/MobileSideBar';
import AnalyzerPageBody from './AnalyzerPageBody';

function AnalyzerPage() {
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
			<AnalyzerPageBody />
		</>
	);
}

export default AnalyzerPage;
