import { IconButton } from '@mui/material';
import { styled } from '@mui/material/styles';
import KeyboardBackspaceIcon from '@mui/icons-material/KeyboardBackspace';
import { Button } from '../../../auth/components';

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

export default function ({ count, page, rowsPerPage, onPageChange }) {
    const totalPages = Math.ceil(count / rowsPerPage);
    const handleBackButtonClick = () => onPageChange(null, page - 1);
    const handleNextButtonClick = () => onPageChange(null, page + 1);

    const getVisiblePages = () => {
        const pages = [];

        if (totalPages <= 7) {
            // 🔹 Mostrar todas las páginas si son pocas
            for (let i = 0; i < totalPages; i++) pages.push(i);
        } else {
            // 🔹 Mostrar primeras, últimas y entorno de la actual
            if (page <= 3) {
                pages.push(0, 1, 2, 3, 4, 'ellipsis', totalPages - 1);
            } else if (page >= totalPages - 4) {
                pages.push(
                    0,
                    'ellipsis',
                    totalPages - 5,
                    totalPages - 4,
                    totalPages - 3,
                    totalPages - 2,
                    totalPages - 1
                );
            } else {
                pages.push(0, 'ellipsis', page - 1, page, page + 1, 'ellipsis', totalPages - 1);
            }
        }

        return pages;
    };

    const visiblePages = getVisiblePages();

    return (
        <div
            style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                flexWrap: 'wrap',
            }}
        >
            {/* 🔹 Botón anterior */}
            <Button
                kind="primary"
                size="small"
                sx={{
                    py: 0.5,
                    px: 2,
                    pr: 2.4,
                    mr: 0.5,
                    '& .MuiButton-icon': {
                        mr: 0.5,
                    },
                }}
                startIcon={<KeyboardBackspaceIcon />}
                onClick={handleBackButtonClick}
                disabled={page === 0}
            >
                Anterior
            </Button>

            {/* 🔹 Botones numerados + puntos suspensivos */}
            {visiblePages.map((p, index) =>
                p === 'ellipsis' ? (
                    <span key={`ellipsis-${index}`} style={{ margin: '0 4px' }}>
                        …
                    </span>
                ) : (
                    <PaginationButton
                        key={p}
                        onClick={() => onPageChange(null, p)}
                        selected={p === page ? 1 : 0}
                        sx={{
                            fontSize: 15,
                            p: 0,
                        }}
                    >
                        {p + 1}
                    </PaginationButton>
                )
            )}

            {/* 🔹 Botón siguiente */}
            <Button
                kind="primary"
                size="small"
                sx={{
                    py: 0.5,
                    px: 2,
                    pl: 2.4,
                    ml: 0.5,
                    '& .MuiButton-icon': {
                        ml: 0.5,
                    },
                }}
                endIcon={<KeyboardBackspaceIcon sx={{ transform: 'rotate(180deg)' }} />}
                onClick={handleNextButtonClick}
                disabled={page >= totalPages - 1}
            >
                Siguiente
            </Button>
        </div>
    );
}
