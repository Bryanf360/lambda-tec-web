import {
    Autocomplete,
    Box,
    InputAdornment,
    styled,
    useTheme,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import AddIcon from '@mui/icons-material/Add';

import { Button, TextField } from "../../../auth/components";
import { InputLabel } from "./";

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
    minWidth,
    width,
    variant = 'block',
    marginEnd,
    marginStart,
    haveAddButton = true,
    placeholder = "",
    onAddButtonClick,
    ...props
}) {
    const theme = useTheme();

    return (
        <>
            {labelText && variant === 'block' && (
                <InputLabel>{labelText}</InputLabel>
            )}
            <Box
                sx={{
                    display: 'flex',
                    alignItems: 'center',
                    mb,
                    p: 0,
                    mr: marginEnd,
                    ml: marginStart,
                }}>
                {labelText && variant === 'inline' && (
                    <InputLabel sx={{ mr: 1.3, }}>{labelText}</InputLabel>
                )}
                <StyledAutocomplete
                    popupIcon={<KeyboardArrowDownIcon sx={{ color: '#1a2b6d' }} />}
                    renderInput={(params) => (
                        <TextField
                            {...params}
                            hiddenLabel
                            variant="filled"
                            placeholder={placeholder}
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
                    sx={{ flex: 1, ...(variant === 'inline' ? { minWidth: 100, width: 200 } : {}), ...props.sx }}
                />
                {haveAddButton && (
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
                        onClick={onAddButtonClick}
                    />
                )}
            </Box>
        </>
    );
}
