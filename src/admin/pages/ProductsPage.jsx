import { Grid, IconButton, TextField, Typography } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import { useEffect, useState } from 'react';
import { Edit, Delete, Visibility } from '@mui/icons-material';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import { AddProductModal, CardLayout, DeleteModal, SearchInput, Table } from '../components';
import { Button, Chip } from '../../auth/components';
import FormTextField from '../components/atoms/FormTextField';
import { useProductsStore } from '../hooks';
import { setProducts } from '../slices/productsSlice';

const data = [
    {
        name: 'Cable Utp RJ45',
        description: 'Cable para instalación de internet',
        type: 'Consumible',
        brand: 'Tecratronik',
        model: 'Interior Blanco',
        partNumber: 'PA-121-AZ',
        unitType: 'm-Metros',
        stock: 30,
        status: 'active',
    },
    {
        name: 'Router',
        description: 'WiFi 5G',
        type: 'Equipo',
        brand: 'MikroTik',
        model: 'RB3011',
        partNumber: 'RT-123',
        unitType: 'unidad',
        stock: 5,
        status: 'inactive',
    },
    {
        name: 'Router',
        description: 'WiFi 5G',
        type: 'Equipo',
        brand: 'MikroTik',
        model: 'RB3011',
        partNumber: 'RT-123',
        unitType: 'unidad',
        stock: 5,
        status: 'inactive',
    },
    {
        name: 'Router',
        description: 'WiFi 5G',
        type: 'Equipo',
        brand: 'MikroTik',
        model: 'RB3011',
        partNumber: 'RT-123',
        unitType: 'unidad',
        stock: 5,
        status: 'inactive',
    },
];

export default function ProductsPage() {
    const [isAddProductModalOpen, setIsAddProductModalOpen] = useState(false);
    const dispatch = useDispatch();
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
    const navigate = useNavigate();
    const [selectedProduct, setSelectedProduct] = useState(null);
    const {
        isLoading,
        isDeleting,
        meta,
        products,
        startLoadingProductsWithStock,
        startDeletingProduct,
    } = useProductsStore();
    const [page, setPage] = useState(meta.page - 1);
    const [limit, setLimit] = useState(meta.limit);
    const [search, setSearch] = useState('');
    const [hasInteracted, setHasInteracted] = useState(false);

    const columns = [
        { id: 'name', label: 'Nombre', minWidth: 200 },
        { id: 'description', label: 'Descripción', minWidth: 200 },
        {
            id: 'type',
            label: 'Tipo',
            minWidth: 50,
            render: (_, row) => (
                <Typography variant="tableCell">
                    {row['type'] === 'equipment' ? 'Equipo' : 'Consumible'}
                </Typography>
            ),
        },
        {
            id: 'brand',
            label: 'Marca',
            minWidth: 50,
            render: (_, row) => (
                <Typography variant="tableCell">{`${row['brand']['name']}`}</Typography>
            ),
        },
        {
            id: 'model',
            label: 'Modelo',
            minWidth: 150,
            render: (_, row) => (
                <Typography variant="tableCell">{`${row['model']['name']}`}</Typography>
            ),
        },
        {
            id: 'partNumber',
            label: 'Nro de Parte',
            minWidth: 100,
            render: (_, row) => (
                <Typography variant="tableCell">{`${row['part_number']['name']}`}</Typography>
            ),
        },
        {
            id: 'unitType',
            label: 'Tipo Unidad',
            minWidth: 100,
            render: (_, row) => (
                <Typography variant="tableCell">{`${row['unit_type']['simbol']} - ${row['unit_type']['name']}`}</Typography>
            ),
        },
        { id: 'stock', label: 'Stock', minWidth: 50 },
        /*
        TODO: validate how to work the status
        {
            id: 'status',
            label: 'Estado',
            minWidth: 100,
            render: (_, row) => <Chip status={row.status} />,
        },
        */
        {
            id: 'actions',
            label: 'Acciones',
            minWidth: 150,
            render: (_, row) => (
                <>
                    <IconButton
                        color="primary"
                        size="small"
                        onClick={() => handleEditButtonClick(row)}
                    >
                        <Edit />
                    </IconButton>
                    <IconButton
                        color="error"
                        size="small"
                        onClick={() => handleDeleteButtonClick(row)}
                    >
                        <Delete />
                    </IconButton>
                    <IconButton
                        color="info"
                        size="small"
                        onClick={() => handleViewButtonClick(row)}
                    >
                        <Visibility />
                    </IconButton>
                </>
            ),
        },
    ];

    useEffect(() => {
        if (!hasInteracted) return;
        const delay = setTimeout(() => {
            startLoadingProductsWithStock({ page: page + 1, limit, search });
        }, 400);
        return () => clearTimeout(delay);
    }, [page, limit, search]);

    useEffect(() => {
        startLoadingProductsWithStock({ page: page + 1, limit, search });
    }, []);

    const handleChangePage = (event, newPage) => {
        // TODO: test pagination to reset to 5
        setHasInteracted(true);
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setHasInteracted(true);
        setLimit(parseInt(event.target.value, 10));
        setPage(0);
    };

    const handleSearch = (searchTerm) => {
        setHasInteracted(true);
        setSearch(searchTerm);
        setPage(0);
    };

    const handleAddProductModalClose = () => {
        setIsAddProductModalOpen(false);
        setTimeout(() => {
            setSelectedProduct(null);
        }, 500);
    };

    const handleAddButtonClick = () => {
        setIsAddProductModalOpen(true);
    };

    const handleEditButtonClick = (product) => {
        setIsAddProductModalOpen(true);
        setSelectedProduct(product);
    };

    const handleDeleteButtonClick = (product) => {
        setIsDeleteModalOpen(true);
        setSelectedProduct(product);
    };

    const handleViewButtonClick = (product) => {
        navigate('/admin/product-details/1234');
    };

    const handleDeleteModalClose = () => {
        setIsDeleteModalOpen(false);
    };

    const handleProductDelete = async () => {
        const isOk = await startDeletingProduct(selectedProduct.id);
        if (isOk) {
            setIsDeleteModalOpen(false);
            startLoadingProductsWithStock({ page: page + 1 });
        }
    };

    return (
        <CardLayout>
            <Grid
                sx={{
                    mb: 2,
                }}
                alignItems="center"
                container
                rowGap={3}
            >
                <Grid xs={12}>
                    <Typography variant="h1" sx={{ mr: 5 }}>
                        Inventario General
                    </Typography>
                </Grid>
                <Grid xs={12}>
                    <Button
                        kind="tertiary"
                        sx={{
                            mr: 5,
                        }}
                        startIcon={<AddIcon />}
                        onClick={handleAddButtonClick}
                    >
                        Añadir
                    </Button>
                </Grid>
                <Grid xs={12}>
                    <SearchInput placeholder="Buscar..." onSearch={handleSearch} />
                </Grid>
            </Grid>
            <Table
                data={products}
                columns={columns}
                isLoading={isLoading}
                page={page}
                // TODO: review if is a neccessary
                // rowsPerPage={limit}
                total={meta.total}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
            />
            <AddProductModal
                open={isAddProductModalOpen}
                onClose={handleAddProductModalClose}
                mode={selectedProduct ? 'edit' : 'create'}
                product={selectedProduct}
            />
            <DeleteModal
                open={isDeleteModalOpen}
                onClose={handleDeleteModalClose}
                onDelete={handleProductDelete}
                isDeleting={isDeleting}
            />
        </CardLayout>
    );
}
