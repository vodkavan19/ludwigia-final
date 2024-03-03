import { styled } from '@mui/material/styles';

import Box from '@mui/material/Box'
import OutlinedInput from '@mui/material/OutlinedInput';
import StepConnector from '@mui/material/StepConnector'
import { stepConnectorClasses } from '@mui/material';

export const HomePageSearchInput = styled(OutlinedInput)(({ width, theme }) => ({
    width: width,
    paddingRight: 4,
    borderRadius: '160px',
    '& input': {
        fontSize: '18px',
        paddingLeft: '24px',
        caretColor: theme.palette.text.active1,
        '&::placeholder': {
            fontStyle: 'italic'
        }
    },
    '& button' : {
        color: theme.palette.text.accent1
    },
    '& fieldset': {
        borderWidth: '4px !important',
        borderColor: theme.palette.text.accent1
    },
    '&:not(.Mui-focused):hover': {
        '& button': {
            color: theme.palette.text.active1
        },
        '& .MuiOutlinedInput-notchedOutline': {
            borderColor: theme.palette.text.active1
        }
    },
    '&.Mui-focused': {
        '& button': {
            color: theme.palette.text.active1
        },
        '& .MuiOutlinedInput-notchedOutline': {
            borderColor: theme.palette.text.active1
        }
    }
}));

export const HeaderSearchInput = styled(OutlinedInput)(({ width, theme }) => ({
    width: width,
    paddingRight: 0,
    borderRadius: '12px',
    backgroundColor: '#fff',
    overflow: 'hidden',
    '& input': {
        paddingLeft: '16px',
        caretColor: theme.palette.text.active2,
        '&::placeholder': {
            fontStyle: 'italic',
            fontSize: '14px'
        }
    },
    '& fieldset': {
        top: '-4.5px',
        borderWidth: '2px !important',
        borderColor: theme.palette.text.accent2
    },
    '& button': {
        color: '#fff',
        borderRadius: 0,
        backgroundColor: theme.palette.text.accent2
    },
    '&:not(.Mui-focused):hover': {
        '& button': {
            backgroundColor: theme.palette.text.active2
        },
        '& .MuiOutlinedInput-notchedOutline': {
            borderColor: theme.palette.text.active2
        }
    },
    '&.Mui-focused': {
        '& button': {
            backgroundColor: theme.palette.text.active2
        },
        '& .MuiOutlinedInput-notchedOutline': {
            borderColor: theme.palette.text.active2
        }
    }
}));

export const CustomStepConnector = styled(StepConnector)(({ theme }) => ({
    [`& .${stepConnectorClasses.line}`]: {
        borderTopWidth: 3,
        borderRadius: 1
    },
    [`&.${stepConnectorClasses.active}`]: {
        [`& .${stepConnectorClasses.line}`]: {
            borderColor: theme.palette.text.active1
        }
    },
    [`&.${stepConnectorClasses.completed}`]: {
        [`& .${stepConnectorClasses.line}`]: {
            borderColor: theme.palette.text.accent1
        }
    }
}));

export const FileFieldWrapper = styled(Box)(({ theme, error }) => ({
    width: '100%',
    border: '2.5px dashed',
    borderRadius: '4px',
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    transition: 'border 0.24s ease-in-out',
    borderColor: error ? theme.palette.error.main : '#0000003b',
    color: error ? theme.palette.error.main : '#666',
    backgroundColor: theme.palette.background.adminContent,
    '&:focus': {
        borderColor: error ? theme.palette.error.main : theme.palette.text.accent1
    },
    '&:hover': {
        borderColor: error ? theme.palette.error.main : theme.palette.text.accent1
    }
}))

export const EditorFieldWrapper = styled(Box)(({ theme, error, minHeight }) => ({
    '& .ck.ck-content.ck-editor__editable': {
        minHeight: minHeight,
        '&::-webkit-scrollbar': {
            display: 'none'
        }
    },
    '& .ck.ck-toolbar': {
        borderColor: error ? theme.palette.error.main : '#0000003b'
    },
    '& .ck.ck-editor__main>.ck-editor__editable:not(.ck-focused)': {
        borderColor: error ? theme.palette.error.main : '#0000003b'
    },
    '& .ck.ck-editor__editable.ck-focused:not(.ck-editor__nested-editable)': {
        borderColor: error ? theme.palette.error.main : theme.palette.text.accent1
    },
    '& .ck-placeholder': {
        fontSize: '15px',
        fontStyle: 'italic'
    }
}))