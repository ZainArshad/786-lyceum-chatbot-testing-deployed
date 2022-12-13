import { useContext, useEffect } from 'react';
import PropsType from 'prop-types';
import { PinboardContext } from 'src/contexts/PinboardContext';

/* 
  This is the main component responsible for rendering Pinboard
  on the page.
  CASES:
   - component render (without `content`) -> shows defualt pinboard
   - component render (with `content`) -> shows pinboard with content
*/

export function Pinboard({ content, hide = false }) {
	const { isPinboardDeployed, updatePinboardDeployment, setPinboardContent } =
		useContext(PinboardContext);

	useEffect(() => {
		if (!isPinboardDeployed) {
			updatePinboardDeployment(true);
		}
		if (isPinboardDeployed && !content && hide) {
			updatePinboardDeployment(false);
		}

		if (content) {
			setPinboardContent(content);
			updatePinboardDeployment(true);
		} else {
			setPinboardContent(null);
		}
	}, [content]);

	return null;
}

Pinboard.propTypes = {
	content: PropsType.node,
	hide: PropsType.bool,
};

export default Pinboard;
