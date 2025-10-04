import { TablePagination, IconButton, useTheme } from '@mui/material';
import { styled } from '@mui/material/styles';
import { ChevronLeft, ChevronRight } from '@mui/icons-material';
import KeyboardBackspaceIcon from '@mui/icons-material/KeyboardBackspace';

import { Button } from '../../../auth/components';

// ✅ 1. Botones personalizados
const PaginationButton = styled(IconButton)(({ theme, selected }) => ({
    minWidth: 32,
    height: 32,
    margin: '0 4px',
    borderRadius: '50%',
    backgroundColor: selected ? theme.palette.primary.main : 'transparent',
    color: selected ? '#fff' : '#000',
    '&:hover': {
        backgroundColor: selected ? theme.palette.primary.dark : theme.palette.action.hover,
    },
}));

// ✅ 2. Componente para botones prev/next
export default function ({ count, page, rowsPerPage, onPageChange }) {
    const handleBackButtonClick = () => onPageChange(null, page - 1);
    const handleNextButtonClick = () => onPageChange(null, page + 1);

    return (
        <div style={{ display: 'flex', alignItems: 'center' }}>
            {/* <IconButton onClick={handleBackButtonClick} disabled={page === 0}>
                ← asdf
            </IconButton> */}
            <Button
                kind="primary"
                size="small"
                sx={{
                    py: 0.5,
                    px: 2,
                    pr: 2.4,
                    '& .MuiButton-icon': {
                        mr: 0.5,
                    }
                }}
                startIcon={<KeyboardBackspaceIcon />}
                onClick={handleBackButtonClick}
                disabled={page === 0}
            >
                Anterior
            </Button>
            {[...Array(Math.ceil(count / rowsPerPage))].map((_, index) => (
                <PaginationButton
                    key={index}
                    onClick={() => onPageChange(null, index)}
                    selected={index === page ? 1 : 0}
                    sx={{
                        fontSize: 16,
                        p: 0,
                    }}
                >
                    {index + 1}
                </PaginationButton>
            ))}
            {/* <IconButton onClick={handleNextButtonClick} disabled={page >= Math.ceil(count / rowsPerPage) - 1}>
                →
            </IconButton> */}
            <Button
                kind="primary"
                size="small"
                sx={{
                    py: 0.5,
                    px: 2,
                    pl: 2.4,
                    '& .MuiButton-icon': {
                        ml: 0.5,
                    },
                }}
                endIcon={<KeyboardBackspaceIcon sx={{ transform: 'rotate(180deg)' }} />}
                onClick={handleNextButtonClick} 
                disabled={page >= Math.ceil(count / rowsPerPage) - 1}
            >
                Siguiente
            </Button>
        </div>
    );
}

// ✅ 3. Uso en tu tabla

