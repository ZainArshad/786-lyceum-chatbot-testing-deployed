import { Button } from '@mui/material';
import PropTypes from 'prop-types';

export const LandingPageButtonBlack = ({
	children,
	icon,
	styleSx,
	link,
	type = '',
}) => {
	return (
		<Button
			variant="contained"
			endIcon={icon}
			href={link}
			sx={{
				...styleSx,
				background: 'black',
				color: '#9abdc6',
				borderRadius: 0,
				boxShadow: '7px 11px #888888',
			}}
			size="large"
			type={type}
		>
			{children}
		</Button>
	);
};

export const LandingPageButton = ({ children, icon, styleSx, link }) => {
	return (
		<Button
			variant="contained"
			endIcon={icon}
			href={link}
			sx={{
				...styleSx,
				background: 'rgb(40 89 103)',
				color: '#9abdc6',
				borderRadius: 0,
				boxShadow: '7px 11px #888888',
			}}
			size="large"
		>
			{children}
		</Button>
	);
};

export const LandingPagePricingTableButton = ({
	children,
	icon,
	styleSx,
	link,
}) => {
	return (
		<Button
			variant="contained"
			endIcon={icon}
			href={link}
			sx={{
				...styleSx,
				background: '#8bacb4',
				color: 'black',
				borderRadius: 0,
			}}
			size="large"
		>
			{children}
		</Button>
	);
};

LandingPagePricingTableButton.propTypes = {
	children: PropTypes.node,
	icon: PropTypes.node,
	styleSx: PropTypes.object,
	link: PropTypes.string,
};

LandingPageButtonBlack.propTypes = {
	children: PropTypes.node,
	icon: PropTypes.node,
	styleSx: PropTypes.object,
	link: PropTypes.string,
	type: PropTypes.string,
};

LandingPageButton.propTypes = {
	children: PropTypes.node,
	icon: PropTypes.node,
	styleSx: PropTypes.object,
	link: PropTypes.string,
};
