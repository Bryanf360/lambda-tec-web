import { LockOutlined } from "@mui/icons-material"
import { InputAdornment, TextField } from "@mui/material"

export const DashboardPage = () => {
    return (
        <>
            <TextField
                variant="filled"
                type="password"
                // value={password}
                name="password"
                // onChange={handleFormInputChange}
                autoComplete="current-password"
                required
                slotProps={{
                    input: {
                        startAdornment: (
                            <InputAdornment position="start">
                                {/* <LockIcon /> */}
                                <LockOutlined sx={{ color: 'warning.main', opacity: 0.9 }} />
                            </InputAdornment>
                        ),
                        disableUnderline: true
                    }
                }}

                sx={{
                    '& .MuiFilledInput-root': {
                        backgroundColor: 'grey.100',
                        borderRadius: 3,
                        px: 1.5,
                        // py: 1,
                    },
                    '& .MuiFilledInput-root:hover, & .MuiFilledInput-root.Mui-focused': {
                        backgroundColor: 'grey.100',
                    },
                    '& .MuiInputBase-input::placeholder': {
                        color: 'text.disabled',
                        opacity: 1,
                    },
                }}
            />
        </>
    )
}
