import { 
    IconButton, 
    InputBase, 
    Paper, 
    useTheme,
} from "@mui/material";

import SearchIcon from '@mui/icons-material/Search';

export default function SearchInput({
    placeholder = "Buscar...",
    onChange,
    sx,
}) {
    const theme = useTheme();

    return (
        <Paper
            component="form"
            sx={{
                p: '2px 4px',
                display: 'flex',
                alignItems: 'center',
                minWidth: {
                    sx: '100%',
                    md: 600,
                },
                borderRadius: 3.75,
                backgroundColor: theme.palette.grey[50],
                boxShadow: 3,
                paddingInlineEnd: 0,
                paddingBlock: 0,
                ...sx
            }}
        >
            <IconButton 
                sx={{ 
                    p: '10px',
                    '&:hover ': {
                        backgroundColor: 'transparent',
                    }
                }} 
                aria-label="menu"
            >
                <SearchIcon />
            </IconButton>
            <InputBase
                sx={{ ml: 1, flex: 1 }}
                placeholder={placeholder}
                inputProps={{ 'aria-label': 'search google maps' }}
                onChange={onChange}
            />
            <IconButton
                type="button"
                sx={{
                    p: '10px',
                    backgroundColor: 'primary.main',
                    color: theme.palette.white[100],
                    boxShadow: 3,
                    width: 46,
                    borderRadius: 3.75,
                }}
                aria-label="search"
            >
                <SearchIcon />
            </IconButton>
        </Paper>
    )
}
