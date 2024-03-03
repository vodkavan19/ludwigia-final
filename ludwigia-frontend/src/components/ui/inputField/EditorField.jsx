import { Fragment } from 'react';

import { Controller } from 'react-hook-form';
import { CKEditor } from '@ckeditor/ckeditor5-react';

import Typography from '@mui/material/Typography';
import ReportOutlined from '@mui/icons-material/ReportOutlined';

import { getErrValidate } from '~/utils/getErrorValidateFrom';
import { EditorFieldWrapper } from '~/components/themeMUI/customComponents';
import Editor from 'ckeditor5-custom-build';
import CustomUploadAdapter from '~/utils/customUploadAdapter';
import { useDispatch } from 'react-redux';

function EditorField(props) {
    const dispatch = useDispatch()
    const {
        form, name,
        minHeight, readOnly, placeholder
    } = props;
    const { formState } = form;

    const splitName = name.split('.');
    const errorValidate = getErrValidate(splitName, formState.errors);

    return (
        <Controller
            name={name}
            control={form.control}
            defaultValue="<p></p>"
            render = {({ field }) => (
                <Fragment>
                    <EditorFieldWrapper minHeight={minHeight} error={errorValidate}>
                        <CKEditor
                            { ...field }
                            editor={Editor}
                            data={field.value}
                            onReady={(editor) => {
                                editor.plugins.get("FileRepository").createUploadAdapter = (loader) => {
                                    return new CustomUploadAdapter(loader, '/upload-editor/upload-image', dispatch);
                                };
                            }}
                            onChange={(e, editor) => {
                                const data = editor.getData();
                                field.onChange(data)
                            }}
                            disabled={readOnly}
                            config={{
                                isReadOnly: readOnly,
                                placeholder: placeholder || '',
                                ui: {
                                    viewportOffset: { top: 48 }
                                },
                            }}
                        />
                    </EditorFieldWrapper>
                    {errorValidate && (
                        <Typography
                            variant='caption' color='error' mt={0.75} mx={1}
                            display='flex' alignItems='center'
                        >
                            <ReportOutlined sx={{ fontSize: '1.25em', mr: .5 }} />
                            {errorValidate?.message}
                        </Typography>
                    )}
                </Fragment>
            )}
        />
    );
}

export default EditorField;