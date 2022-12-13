import { Input, useTheme } from '@mui/material';
import PropTypes from 'prop-types';
import { HeadedContainer } from './Containers';

export const HeadedInput = ({ heading, ...rest }) => {
	const theme = useTheme();
	return (
		<HeadedContainer
			containerStyles={{
				mt: theme.spacing(2),
				width: {
					lg: 'fit-content',
					xs: '100%',
				},
				mx: theme.spacing(0.5),
				mb: 0,
				height: theme.typography.pxToRem(40),
			}}
			heading={heading}
		>
			<Input size="small" disableUnderline {...rest} />
		</HeadedContainer>
	);
};

HeadedInput.propTypes = {
	heading: PropTypes.string.isRequired,
};
