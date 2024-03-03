import { Fragment } from 'react';

import Dropzone from 'react-dropzone';
import { Controller } from 'react-hook-form';

import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip'
import Clear from '@mui/icons-material/Clear';
import CloudUploadOutlined from '@mui/icons-material/CloudUploadOutlined';
import ReportOutlined from '@mui/icons-material/ReportOutlined';

import { acceptImageFile } from '~/utils/acceptFileField';
import { getErrValidate } from '~/utils/getErrorValidateFrom';
import { FileFieldWrapper } from '~/components/themeMUI/customComponents';

function ImageField(props) {
    const {
        form, name,
        label, disabled,
        width, height
    } = props;
    const { formState } = form;

    const splitName = name.split('.');
    const errorValidate = getErrValidate(splitName, formState.errors);

    const handleRemoveFile = () => {
        form.setValue(name, '')
    }

    return (
        <Controller
            name={name}
            control={form.control}
            render = {({ field: { onChange, onBlur, value } }) => (
                <Dropzone
                    accept={acceptImageFile}
                    onDrop={onChange}
                    disabled={disabled}
                    multiple={false}
                >
                    {({ getRootProps, getInputProps }) => (
                        <Box height={height} width={width} display='flex' flexDirection='column'>
                            <FileFieldWrapper
                                {...getRootProps()}
                                error={errorValidate}
                                flex={1} position='relative'
                            >
                                <input {...getInputProps()} onBlur={onBlur} />
                                {!value ? (
                                    <Box textAlign='center'>
                                        <CloudUploadOutlined sx={{ fontSize: 40 }} />
                                        <Typography fontWeight={600} fontSize={18}>{label}</Typography>
                                        <Typography variant='body2'>Kéo thả hoặc chọn hình ảnh tải lên</Typography>
                                        <Typography variant='caption' component='div'>
                                            File hợp lệ: .png, .jpg, .jpeg, .webp, .svg, .gif
                                        </Typography>
                                        <Typography variant='caption' component='div'>
                                            Dung lượng File tối đa: 5 MB
                                        </Typography>
                                    </Box>
                                ) : (
                                    <Fragment>
                                        <Box
                                            className='flex-center'
                                            position='absolute' overflow='hidden'
                                            top={0} left={0} height='100%' width='100%'
                                        >
                                            {(Array.isArray(value) && value.every(img => img instanceof File)) ? (
                                                <Tooltip title={value[0]?.name} followCursor>
                                                    <Box
                                                        component='img' alt=''
                                                        src={URL.createObjectURL(value[0])}
                                                        width='calc(100% - 4px)' height='calc(100% - 4px)'
                                                        sx={{ objectFit: 'contain' }}
                                                    />
                                                </Tooltip>
                                            ) : (
                                                <Box
                                                    component='img' src={value.fileUrl} alt=''
                                                    width='calc(100% - 4px)' height='calc(100% - 4px)'
                                                    sx={{ objectFit: 'contain' }}
                                                />
                                            )}
                                        </Box>
                                        <Tooltip title='Chọn lại ảnh' arrow>
                                            <span>
                                                <IconButton
                                                    size='small'
                                                    onClick={handleRemoveFile}
                                                    sx={{
                                                        position: 'absolute', top: 0, right: 0,
                                                        bgcolor: '#ffffff80', backdropFilter: 'blur(8px)',
                                                        '&:hover': { color: 'error.main', bgcolor: '#ffffff80', backdropFilter: 'blur(8px)' }
                                                    }}
                                                >
                                                    <Clear />
                                                </IconButton>
                                            </span>
                                        </Tooltip>
                                    </Fragment>
                                )}
                            </FileFieldWrapper>
                            {errorValidate && (
                                <Typography
                                    variant='caption' color='error.main'
                                    display='flex' alignItems='center'
                                    px={1.75} pt={.5}
                                >
                                    <ReportOutlined sx={{ fontSize: '1.25em', mr: .5 }} />
                                    {errorValidate?.message}
                                </Typography>
                            )}
                        </Box>
                    )}
                </Dropzone>
            )}
        />
    );
}

export default ImageField;