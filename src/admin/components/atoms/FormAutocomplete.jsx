import {
    Autocomplete,
    Box,
    InputAdornment,
    styled,
    Typography,
    useTheme,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import AddIcon from '@mui/icons-material/Add';

import { Button, TextField } from "../../../auth/components";

const StyledTypography = styled(Typography)(({ theme }) => ({
    opacity: 0.7,
    fontSize: '0.875rem',
    fontWeight: 500,
}))

const StyledAutocomplete = styled(Autocomplete)(({ theme }) => ({
    '& .MuiFilledInput-root': {
        backgroundColor: theme.palette.secondary.main,
        borderRadius: 12,
        paddingLeft: 12,
        paddingRight: 8,
        '&:before, &:after': { display: 'none' },
        height: 40,
        boxSizing: 'border-box',
    },
    '& .MuiInputAdornment-filled': {
        marginRight: 4,
        paddingLeft: 0,
    },
    '& .MuiAutocomplete-input': {
        padding: 0,
        height: '100%',
        boxSizing: 'border-box',
    },
    '& .MuiInputBase-input': {
        padding: 0,
        height: '100%',
        boxSizing: 'border-box',
    },
}));

export default function FormAutocomplete({
    labelText,
    mb,
    ...props
}) {
    const theme = useTheme();

    return (
        <>
            <StyledTypography variant="h2">{labelText}</StyledTypography>
            <Box 
                sx={{ 
                    display: 'flex', 
                    alignItems: 'center', 
                    mb, 
                }}>
                <StyledAutocomplete
                    popupIcon={<KeyboardArrowDownIcon sx={{ color: '#1a2b6d' }} />}
                    renderInput={(params) => (
                        <TextField
                            {...params}
                            hiddenLabel
                            variant="filled"
                            placeholder="Ingrese el tipo"
                            slotProps={{
                                input: {
                                    ...params.InputProps,
                                    startAdornment: (
                                        <InputAdornment position="start">
                                            <SearchIcon fontSize="small" sx={{ color: theme.palette.grey[400], fontSize: '1.5rem' }} />
                                        </InputAdornment>
                                    ),
                                    sx: {
                                        color: theme.palette.black[100],
                                        fontSize: '0.875rem',
                                        fontWeigth: 500,
                                        letterSpacing: 0,
                                    }
                                }
                            }}
                        />
                    )}
                    {...props}
                    sx={{ flex: 1, ...props.sx }}
                />
                <Button
                    kind="tertiary" 
                    startIcon={<AddIcon />} 
                    sx={{
                        borderRadius: 2.25,
                        '&.MuiButtonBase-root': {
                            padding: 0.5,
                            minWidth: 28,
                        },
                        '& .MuiButton-startIcon': {
                            margin: 0,
                        },
                        ml: 0.5,
                    }}
                />
            </Box>
        </>
    );
}
