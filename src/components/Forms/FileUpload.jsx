import { styled } from '@mui/material';
import PropTypes from 'prop-types';
import { useDropzone } from 'react-dropzone';
import { UploadCtn } from '../shared/wrappers';

const Upload = styled(UploadCtn)(
	() => `
		font-size: 18px;
    `
);

export function FileUpload({ children, dropZoneProps, ...rest }) {
	const { getRootProps, getInputProps } = useDropzone({
		noClick: true,
		...dropZoneProps,
	});

	return (
		<Upload
			sx={{
				w: '100%',
				h: '100%',
				display: 'flex',
				alignItems: 'center',
				justifyContent: 'center',
			}}
			component="label"
			{...rest}
			{...getRootProps({
				role: 'button',
				'aria-label': 'drag and drop area',
			})}
		>
			<input {...getInputProps()} />
			{children}
		</Upload>
	);
}

FileUpload.propTypes = {
	children: PropTypes.node,

	// accepts the same params as the `useDropzone` hook
	// all props -> https://react-dropzone.js.org/#src
	dropZoneProps: PropTypes.object,
};
