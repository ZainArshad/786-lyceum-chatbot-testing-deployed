import { styled, Modal as MuiModal, Box } from '@mui/material';
import PropTypes from 'prop-types';
import React from 'react';

export const Modal = styled(MuiModal)(() => ({}));

export const StyledModalBody = styled(Box)(({ theme }) => ({
	position: 'absolute',
	top: '50%',
	left: '50%',
	transform: 'translate(-50%, -50%)',
	boxShadow: 24,
	padding: theme.spacing(2),
	backgroundColor: theme.palette.background.default,
	borderRadius: theme.general.borderRadius,
	overflowY: 'auto',
	maxHeight: 'calc(100% - 64px)',

	// custom scrollbar styles
	'::-webkit-scrollbar': {
		width: '10px',
	},
	'::-webkit-scrollbar-track': {
		backgroundColor: theme.colors.alpha.white[10],
		borderRadius: theme.general.borderRadius,
		margin: theme.spacing(3, 0),
	},
	'::-webkit-scrollbar-thumb': {
		backgroundColor: theme.colors.alpha.black[10],
		borderRadius: theme.general.borderRadius,
	},
}));

export const ModalBody = React.forwardRef(
	({ children, overRideStyles, ...rest }, ref) => {
		return (
			<StyledModalBody
				ref={ref}
				sx={{
					width: {
						sm: '100%',
						md: '50%',
						lg: '50%',
						xl: '50%',
					},
					...overRideStyles,
				}}
				{...rest}
			>
				{children}
			</StyledModalBody>
		);
	}
);

ModalBody.propTypes = {
	children: PropTypes.node,
	overRideStyles: PropTypes.object,
};

export const ModalFooter = styled(Box)(({ theme }) => ({
	display: 'flex',
	justifyContent: 'flex-end',
	marginTop: theme.spacing(2),
}));
