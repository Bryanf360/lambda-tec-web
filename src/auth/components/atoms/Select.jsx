import {
    FormControl,
    FormHelperText,
    InputAdornment,
    InputBase,
    InputLabel,
    MenuItem,
    Select,
    styled,
    Typography,
} from "@mui/material";
import AssignmentIndIcon from '@mui/icons-material/AssignmentInd';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { useState } from "react";

const StyledInputBase = styled(InputBase)(({ theme }) => ({
    '&.MuiInputBase-root': {
        borderRadius: 10,
        backgroundColor: theme.palette.secondary.main,
        paddingBlock: 10,
        paddingInline: 14,
    },
    '& .MuiSelect-select': {
        marginLeft: 9,
        minHeight: 'auto !important',
        paddingBlock: 0,

    },
}))

const StyledSelect = styled(Select)(({ theme }) => ({
    '& .MuiSelect-iconFilled': {
        color: '#3842DD',
    }
}))

export default ({
    textLabel,
    placeholder,
    error,
    errorMessage,
    children,
    ...props
}) => {

    return (
        <>
            <Typography variant="h2" sx={{ mb: 0.5, }}>{textLabel}</Typography>
            <FormControl fullWidth variant="filled" error={error}>
                <StyledSelect
                    displayEmpty
                    input={
                        <StyledInputBase
                            startAdornment={
                                <AssignmentIndIcon
                                    sx={{ color: '#CFA968', opacity: 0.5 }}
                                />
                            }
                        />
                    }
                    IconComponent={ExpandMoreIcon}
                    renderValue={(selected) => {
                        if (selected === '') {
                            return <Typography variant="h4" sx={{ opacity: 0.4, }}>{placeholder}</Typography>
                        }
                        return selected === 'admin'
                            ? 'Admin'
                            : 'Técnico'
                    }}
                    {...props}
                >
                    {children}
                </StyledSelect>
                {error && (
                    <FormHelperText>{errorMessage}</FormHelperText>
                )}
            </FormControl>
        </>
    )
}
