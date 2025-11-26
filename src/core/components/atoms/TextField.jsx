import { InputAdornment, TextField } from "@mui/material";

export default function ({ value, onChange}) {
    return (
        <TextField
            variant="filled"
            type="password"
            value={value}
            name="password"
            onChange={onChange}
            autoComplete="current-password"
            required
            placeholder="Ingrese su contraseña"
            slotProps={{
                input: {
                    startAdornment: (
                        <InputAdornment position="start">
                            <Lock sx={{ color: '#CFA968', opacity: 0.5 }} />
                        </InputAdornment>
                    ),
                    disableUnderline: true
                }
            }}

            sx={{
                '& .MuiFilledInput-root': {
                    backgroundColor: '#F7F7F7',
                    borderRadius: 2.5,
                },
                '& .MuiFilledInput-root:hover, & .MuiFilledInput-root.Mui-focused': {
                    backgroundColor: 'grey.50',
                },
                '& .MuiInputBase-adornedStart': {
                    px: 1.75
                },
                '& .MuiInputAdornment-root.MuiInputAdornment-positionStart.MuiInputAdornment-root': {
                    marginTop: 0
                },
                '& .MuiInputBase-input': {
                    py: 2,
                    pr: 0
                },
                '&, .MuiFilledInput-input::placeholder': {
                    fontSize: 12,
                    fontWeight: 500,
                    letterSpacing: 1.2
                }
            }}
        />
    )
}
