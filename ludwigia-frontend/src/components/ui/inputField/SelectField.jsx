import { Controller } from 'react-hook-form';

import MenuItem from '@mui/material/MenuItem'
import TextField from '@mui/material/TextField'
import Typography from '@mui/material/Typography'
import ReportOutlined from '@mui/icons-material/ReportOutlined';

import { getErrValidate } from '~/utils/getErrorValidateFrom';

function SelectField(props) {
    const {
        form, name, options,
        label, disabled, readOnly, placeholder
    } = props;
    const { formState } = form;

    const splitName = name.split('.');
    const errorValidate = getErrValidate(splitName, formState.errors);

    return (
        <Controller
            name={name}
            control={form.control}
            render={({ field }) => (
                <TextField
                    select
                    { ...field }
                    fullWidth
                    label={label}
                    disabled={disabled}
                    placeholder={placeholder}
                    error={!!errorValidate}
                    helperText={errorValidate && (
                        <Typography variant='caption' display='flex' alignItems='center'>
                            <ReportOutlined sx={{ fontSize: '1.25em', mr: .5 }} />
                            {errorValidate?.message}
                        </Typography>
                    )}
                    InputProps={{
                        readOnly: readOnly,
                        sx: {
                            '& input::placeholder': {
                                fontStyle: 'italic',
                                fontSize: '15px'
                            }
                        }
                    }}
                >
                    {options.map((option, idx) => (
                        <MenuItem key={idx} value={option.value}>
                            {option.label}
                        </MenuItem>
                    ))}
                </TextField>
            )}
        />
    );
}

export default SelectField;