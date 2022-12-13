import {
	Box,
	ClickAwayListener,
	Input,
	Typography,
	useTheme,
} from '@mui/material';
import PropTypes from 'prop-types';
import { useEffect, useState } from 'react';

export const EditableTextInput = ({
	textToShow = '',
	onChangeSuccess = (_newVal) => {},
	_onChangeFailure = (_val, _failedVal) => {},
	typographyStyles = {},
	inputStyles = {},
	inputContainerStyles = {},
}) => {
	const [inputValue, setInputValue] = useState('');
	const [isEditing, setIsEditing] = useState(false);
	const theme = useTheme();

	useEffect(() => {
		setInputValue(textToShow);
	}, [isEditing]);

	const handleClickAway = () => {
		setIsEditing(false);
		onChangeSuccess(inputValue ?? textToShow);
		setInputValue('');
	};

	return isEditing ? (
		<ClickAwayListener onClickAway={handleClickAway}>
			<Box
				sx={{
					width: 'fit-content',
					padding: 0,
					margin: 0,
					...inputContainerStyles,
				}}
			>
				<Input
					value={inputValue}
					onChange={(e) => {
						setInputValue(e.target.value);
					}}
					fullWidth
					disableUnderline
					sx={{
						fontSize: theme.typography.h3,
						padding: 0,
						margin: 0,
						...inputStyles,
					}}
					onKeyDown={(e) => {
						if (e.key === 'Enter') {
							if (inputValue === textToShow) {
								setIsEditing(false);
							} else {
								handleClickAway();
							}
						}
					}}
				/>
			</Box>
		</ClickAwayListener>
	) : (
		<Typography
			variant="h3"
			onClick={() => {
				setIsEditing(true);
			}}
			sx={{ ...typographyStyles, cursor: 'pointer' }}
		>
			{textToShow}
		</Typography>
	);
};

EditableTextInput.propTypes = {
	textToShow: PropTypes.string.isRequired,
	onChangeSuccess: PropTypes.func,
	_onChangeFailure: PropTypes.func,
	inputStyles: PropTypes.object,
	typographyStyles: PropTypes.object,
	inputContainerStyles: PropTypes.object,
};
