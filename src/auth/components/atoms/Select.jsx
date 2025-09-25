import {
    FormControl,
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
        backgroundColor: '#F7F7F7',
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
    children,
    ...props
}) => {
    const [value, setValue] = useState(null);

    const handleChange = (event) => {
        console.log(event.target.value)
        setValue(event.target.value)
    }

    return (
        <>
            <Typography variant="h2" sx={{ mb: 0.5, }}>{textLabel}</Typography>
            <FormControl fullWidth variant="filled">
                <StyledSelect
                    disableUnderline
                    hiddenLabel
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
                        if (selected === null) {
                            return <Typography variant="h2" color="#D1D1D1">{placeholder}</Typography>
                        }
                        return selected;
                    }}
                    {...props}
                >
                    {children}
                </StyledSelect>
            </FormControl>
        </>
    )
}
