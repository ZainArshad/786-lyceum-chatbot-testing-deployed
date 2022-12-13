import PropTypes from 'prop-types';
import dynamic from 'next/dynamic';
import 'react-quill/dist/quill.snow.css';
import React from 'react';
import { Box, styled, FormHelperText, useTheme } from '@mui/material';

export const QuillEditorWrapper = styled(Box)(
	({ theme, error }) => `
    .ql-editor {
      min-height: 100px;
    }

    .ql-snow .ql-picker {
      color: ${theme.colors.alpha.black[100]};
    }

    .ql-snow .ql-stroke {
      stroke: ${theme.colors.alpha.black[100]};
    }

    .ql-toolbar.ql-snow {
      border-top-left-radius: ${theme.general.borderRadius};
      border-top-right-radius: ${theme.general.borderRadius};
    }

    .ql-toolbar.ql-snow,
    .ql-container.ql-snow {
        border: 1px solid ${
					error ? theme.colors.error.main : theme.colors.alpha.black[10]
				};
    }

    .ql-container.ql-snow {
      border-bottom-left-radius: ${theme.general.borderRadius};
      border-bottom-right-radius: ${theme.general.borderRadius};
    }

    &:hover {
      .ql-toolbar.ql-snow,
      .ql-container.ql-snow {
        border-color: ${theme.palette.primary.lightest};
      }
    }
`
);

const ReactQuill = dynamic(() => import('react-quill'), { ssr: false });

export const Si6maQuillEditor = ({ error, helperText, ...rest }) => {
	const theme = useTheme();

	return (
		<QuillEditorWrapper error={error}>
			<ReactQuill {...rest} />
			{helperText && (
				<FormHelperText sx={{ color: theme.palette.error.main }}>
					{helperText}
				</FormHelperText>
			)}
		</QuillEditorWrapper>
	);
};

Si6maQuillEditor.propTypes = {
	error: PropTypes.bool,
	helperText: PropTypes.string,
};
