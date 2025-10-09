import {
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

export default ({
    labelText,
    iconLeft,
    className,
    ...props
}) => {
    return (
        <div className={className}>
            <Typography variant="h2" sx={{ mb: 0.5, }} className="custom-label">{labelText}</Typography>
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
                sx={{
                    '& .MuiInputBase-multiline': {
                        padding: 0,
                        paddingLeft: 1.5,
                    },
                }}
                {...props}
            />
        </div>
    )
}
