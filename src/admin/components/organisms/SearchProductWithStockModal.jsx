import { DialogTitle, Grid, Typography, useTheme } from '@mui/material';
import { Inventory2 } from '@mui/icons-material';
import { useEffect, useState } from 'react';

import { Modal } from '../atoms';
import { SearchInput } from '../molecules';
import SearchProductTable from './SearchProductTable';
import { Button } from '../../../auth/components';
import { useProductsStore } from '../../hooks';
import SearchProductWithStockTable from './SearchProductWithStockTable';

export default function SearchProductWithStockModal({ open, onClose }) {
    const { isLoading, meta, products, startLoadingProductsWithStock } = useProductsStore();
    const [page, setPage] = useState(meta.page - 1);
    const [limit, setLimit] = useState(meta.limit);
    const [search, setSearch] = useState('');
    const theme = useTheme();

    useEffect(() => {
        const delay = setTimeout(() => {
            startLoadingProductsWithStock({ page: page + 1, limit, search });
        }, 400);
        return () => clearTimeout(delay);
    }, [page, limit, search, open]);

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setLimit(parseInt(event.target.value, 10));
        setPage(0);
    };

    const handleSearch = (searchTerm) => {
        setSearch(searchTerm);
        setPage(0);
    };

    const handleReadyButtonClick = () => {
        onClose();
    };

    return (
        <Modal open={open} onClose={onClose} maxWidth="lg" fullWidth>
            <Grid container alignItems="center" sx={{ mb: 1.5 }}>
                <Inventory2 sx={{ color: theme.palette.green[100] }} />
                <DialogTitle sx={{ padding: 0, pl: 0.5 }}>
                    <Typography variant="searchModalTitle">Buscar Productos</Typography>
                </DialogTitle>
            </Grid>
            <SearchInput
                sx={{
                    minWidth: {
                        xs: '100%',
                        sm: 450,
                    },
                    width: '50%',
                }}
                onSearch={handleSearch}
            />
            <SearchProductWithStockTable
                sx={{ mt: 1.5 }}
                search={search}
                data={products}
                page={page}
                limit={limit}
                total={meta.total}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
                isLoading={isLoading}
            />
            <Grid container justifyContent="flex-end">
                <Button sx={{ width: 200 }} onClick={handleReadyButtonClick}>
                    Listo
                </Button>
            </Grid>
        </Modal>
    );
}
