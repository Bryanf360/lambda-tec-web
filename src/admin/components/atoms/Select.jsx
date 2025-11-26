import { FormControl, InputLabel, MenuItem, Select, Typography, useTheme } from '@mui/material';

import ExpandMoreIcon from '@mui/icons-material/ExpandMore'; // 👈 puedes usar cualquier icono

export default function ({
    value,
    onChange,
    options = [],
    name,
    placeholder = "",
    size = 'small',
    sx = {},
    ...props
}) {
    const theme = useTheme();
    
    return (
        <FormControl fullWidth size={size} sx={sx} variant="filled">
            {/* <InputLabel>{label}</InputLabel> */}
            <Select
                // label={label}
                value={value}
                onChange={onChange}
                name={name}
                {...props}
                sx={{
                    borderRadius: '12px',
                    border: '1px solid rgba(0, 0, 0, 0.2)',
                    backgroundColor: '#f5f5f5',
                    '& .MuiFilledInput-input': {
                        paddingBlock: 1,
                        pl: 1.5,
                        textAlign: 'left',
                    },
                    '& .MuiSelect-icon': {
                        color: 'primary.main',
                    },
                    ...theme.typography.selectText,
                    ...sx,
                }}
                IconComponent={ExpandMoreIcon}
                renderValue={(selected) => {
                    if (selected === 0) {
                        return <Typography variant="h2" sx={{ opacity: 0.4, }}>{placeholder}</Typography>
                    }
                    return options.find(option => option.id === selected)?.value;
                }}

                disableUnderline
            >
                {options.map((option) => (
                    <MenuItem key={option.id} value={option.id} sx={{ ...theme.typography.selectText }}>
                        {option.value}
                    </MenuItem>
                ))}
            </Select>
        </FormControl>
    );
}
