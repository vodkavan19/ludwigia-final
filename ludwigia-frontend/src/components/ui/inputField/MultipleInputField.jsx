import { Controller } from 'react-hook-form';

import Autocomplete from '@mui/material/Autocomplete'
import Chip from '@mui/material/Chip'
import TextField from '@mui/material/TextField'
import Typography from '@mui/material/Typography';
import ReportOutlined from '@mui/icons-material/ReportOutlined';

import { getErrValidate } from '~/utils/getErrorValidateFrom';

function MultipleInputField(props) {
    const {
        form, name,
        label, disabled, readOnly, placeholder, options
    } = props
    const { formState } = form;

    const splitName = name.split('.');
    const errorValidate = getErrValidate(splitName, formState.errors);

    return (
        <Controller
            name={name}
            control={form.control}
            render={({ field: { onChange, onBlur, value } }) => (
                <Autocomplete
                    multiple
                    clearOnBlur
                    freeSolo
                    value={value}
                    options={options}
                    clearIcon={null}
                    readOnly={readOnly}
                    onChange={(e) => {
                        if (e.target.value != null && e.target.value.trim() !== '') {
                            onChange([...value, e.target.value])
                        }
                    }}
                    renderTags={(values, getTagProps) =>
                        values.map((item, idx) => (
                            <Chip
                                key={idx}
                                label={item}
                                color='primary'
                                variant='outlined'
                                {...getTagProps({ idx })}
                                onDelete={() => onChange(value.filter(e => e !== item))}
                            />
                        ))
                    }
                    renderInput={(params) => (
                        <TextField
                            {...params}
                            name={name}
                            label={label}
                            disabled={disabled}
                            placeholder={placeholder}
                            onBlur={onBlur}
                            error={!!errorValidate}
                            helperText={errorValidate && (
                                <Typography variant='caption' display='flex' alignItems='center'>
                                    <ReportOutlined sx={{ fontSize: '1.25em', mr: .5 }} />
                                    {errorValidate?.message}
                                </Typography>
                            )}
                        />
                    )}
                />
            )}
        />
    );
}

export default MultipleInputField

