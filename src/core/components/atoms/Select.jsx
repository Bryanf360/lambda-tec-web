import {
    FormControl,
    FormHelperText,
    InputBase,
    MenuItem,
    Select,
    styled,
    Typography,
    useTheme,
} from '@mui/material';

import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import AssignmentIndIcon from '@mui/icons-material/AssignmentInd';

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

export default function ({
    value,
    labelText,
    onChange,
    options = [],
    name,
    placeholder = "",
    size = 'small',
    sx = {},
    variant = "table",
    error,
    errorMessage,
    ...props
}) {
    const theme = useTheme();
    const variantStyles = {
        table: {
            borderRadius: '12px',
            border: '1px solid rgba(0, 0, 0, 0.2)',
            '& .MuiFilledInput-input': {
                paddingBlock: 1,
                pl: 1.5,
                textAlign: 'left',
            },
            ...theme.typography.selectText,
        },
        form: {
            borderRadius: 2.5,
            '& .MuiFilledInput-input': {
                paddingBlock: 1,
                paddingInline: 2,
                // pl: 1.5,
                // textAlign: 'left',
            },
        },
    };

    return (
        <>
            {/* <InputLabel>{labelText}</InputLabel> */}
            <Typography variant="h2" sx={{ mb: 0.5, ...(variant === 'form' ? { ...theme.typography.inputFormLabel } : {}), }}>{labelText}</Typography>
            <FormControl fullWidth size={size} variant="filled">
                <Select
                    displayEmpty
                    value={value}
                    onChange={onChange}
                    name={name}
                    {...props}
                    input={
                        variant === 'auth'
                            ? (
                                <StyledInputBase
                                    startAdornment={
                                        <AssignmentIndIcon
                                            sx={{ color: '#CFA968', opacity: 0.5 }}
                                        />
                                    }
                                />
                            ) : null
                    }
                    sx={{
                        backgroundColor: '#f5f5f5',
                        '& .MuiSelect-icon': {
                            color: 'primary.main',
                        },
                        ...variantStyles[variant],
                        ...sx,
                    }}
                    IconComponent={ExpandMoreIcon}
                    renderValue={(selected) => {
                        if (selected === 0) {
                            return (
                                <Typography
                                    variant={
                                        variant === "auth"
                                            ? "h2"
                                            : variant === 'form'
                                                ? "h4"
                                                : "h5"
                                    }
                                    sx={{
                                        opacity: 0.4,
                                    }}
                                >
                                    {placeholder}
                                </Typography>
                            )
                        }
                        return options.find(option => option.id === selected)?.name;
                    }}
                    disableUnderline
                >
                    {options.map((option) => (
                        <MenuItem
                            key={option.id}
                            value={option.id}
                            sx={{
                                ...theme.typography.selectText,
                                fontSize:
                                    variant === 'table'
                                        ? '0.75rem'
                                        : '0.875rem'
                            }}>
                            {option.name}
                        </MenuItem>
                    ))}
                </Select>
                {error && (
                    <FormHelperText sx={{ color: 'error.main' }}>{errorMessage}</FormHelperText>
                )}
            </FormControl>
        </>
    );
}
