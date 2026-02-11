import { useEffect, useState } from 'react';

import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { Grid, IconButton, Typography } from '@mui/material';
import { Navigate, useNavigate, useParams } from 'react-router-dom';

import { CardLayout, Table } from '../components';
import { SearchInput } from '../components/molecules';
import { useProductDetailsStore } from '../hooks';

const columns = [
    { id: 'serial', label: 'Serial', minWidth: 125 },
    { id: 'assetNumber', label: 'Nro de Active Fijo', minWidth: 125 },
    { id: 'name', label: 'Nombre', minWidth: 100 },
    { id: 'type', label: 'Tipo', minWidth: 50 },
    { id: 'brand', label: 'Marca', minWidth: 100 },
    { id: 'model', label: 'Modelo', minWidth: 100 },
    { id: 'partNumber', label: 'Nro de Parte', minWidth: 100 },
    { id: 'unitType', label: 'Tipo de Unidad', minWidth: 100 },
    { id: 'description', label: 'Descripción', minWidth: 150 },
    { id: 'warehouse', label: 'Bodega', minWidth: 100 },
    { id: 'quantity', label: 'Cantidad', minWidth: 50 },
];

export default function ProductDetailsPage() {
    const navigate = useNavigate();
    const { isLoading, instances, meta, startLoadingProductDetailsByProductId } =
        useProductDetailsStore({
            page: 1,
            limit: 10,
        });
    const [page, setPage] = useState(meta.page - 1);
    const [limit, setLimit] = useState(meta.limit);
    const [search, setSearch] = useState('');
    const { id } = useParams();

    useEffect(() => {
        startLoadingProductDetailsByProductId(id, { page: page + 1, limit, search });
    }, [id, page, limit, search]);

    const hanldeBackButtonClick = () => {
        navigate('/products');
    };

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

    if (!id) {
        return <Navigate to="/admin/products" replace />;
    }

    return (
        <CardLayout title="Ingresos">
            <Grid container alignItems="center" sx={{ mb: 2 }}>
                <IconButton
                    sx={{
                        backgroundColor: 'secondary.main',
                        borderRadius: 2,
                        boxShadow: '0px 2px 6px rgba(0, 0, 0, 0.1)',
                        padding: 1,
                        '&:hover': {
                            backgroundColor: '#f5f5f5',
                        },
                    }}
                    onClick={hanldeBackButtonClick}
                >
                    <ArrowBackIcon sx={{ color: '#C49B5B' }} />
                </IconButton>
                <Typography variant="h1" sx={{ m: 3 }}>
                    Detalles del Artículo
                </Typography>
                <SearchInput placeholder="Buscar..." onSearch={handleSearch} />
            </Grid>
            <Table
                columns={columns}
                data={instances}
                isLoading={isLoading}
                page={page}
                limit={limit}
                total={meta.total}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
            />
        </CardLayout>
    );
}
