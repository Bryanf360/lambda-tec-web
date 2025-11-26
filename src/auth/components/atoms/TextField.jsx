import {
    Box,
    InputAdornment,
    styled,
    TextField,
    Typography,
} from "@mui/material";

const StyledTextField = styled(TextField)(({ theme }) => ({
    '& .MuiFilledInput-root': {
        borderRadius: 10,
        backgroundColor: theme.palette.secondary.main,
        paddingLeft: 0,
    },
    '& .MuiInputAdornment-positionStart': {
        paddingLeft: 14,
    },
    '& .MuiFilledInput-input': {
        paddingBlock: 10,
        paddingRight: 14,
    },
    '& .MuiFilledInput-input::placeholder': {
        fontSize: 12,
        fontWeight: 500,
        letterSpacing: 1.2,
    }
}))

const inlineStyles = {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
}

export default ({
    labelText,
    iconLeft,
    variant = 'block',
    className,
    ...props
}) => {
    return (
        <div className={className}>
            <Box
                sx={variant === 'inline' ? inlineStyles : {}}
            >
                {labelText && (<Typography variant="h2" sx={variant === 'inline' ? { mb: 0, mr: 1 } : { mb: 0.5, mr: 0 }} className="custom-label">{labelText}</Typography>)}
                <StyledTextField
                    hiddenLabel
                    variant="filled"
                    slotProps={{
                        input: {
                            startAdornment: iconLeft ? (
                                <InputAdornment position="start">
                                    {iconLeft}
                                </InputAdornment>
                            ) : null,
                            disableUnderline: true
                        }
                    }}
                    fullWidth
                    {...props}
                    sx={{
                        '& .MuiInputBase-multiline': {
                            padding: 0,
                            paddingLeft: 1.5,
                        },
                        ...props.sx
                    }}
                />
            </Box>
        </div>
    )
}
