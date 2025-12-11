import { Grid, IconButton, TextField, Typography } from "@mui/material";
import AddIcon from '@mui/icons-material/Add';
import { useState } from "react";
import { Edit, Delete, Visibility } from "@mui/icons-material";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import { 
    AddProductModal, 
    CardLayout, 
    DeleteModal, 
    SearchInput,
    Table, 
} from "../components";
import { Button, Chip } from "../../auth/components";
import FormTextField from "../components/atoms/FormTextField";
import { useProductsStore } from "../hooks";
import { setSelectedProduct } from "../slices/productsSlice";

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
        status: 'active'
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
        status: 'inactive'
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
        status: 'inactive'
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
        status: 'inactive'
    },
];

export const ProductsPage = () => {
    const [isAddProductModalOpen, setIsAddProductModalOpen] = useState(false);
    const dispatch = useDispatch()
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false)
    const navigate = useNavigate();
    const { selectedProduct } = useProductsStore();

    const columns = [
        { id: 'name', label: 'Nombre', minWidth: 200 },
        { id: 'description', label: 'Descripción', minWidth: 200 },
        { id: 'type', label: 'Tipo', minWidth: 50 },
        { id: 'brand', label: 'Marca', minWidth: 50 },
        { id: 'model', label: 'Modelo', minWidth: 150 },
        { id: 'partNumber', label: 'Nro de Parte', minWidth: 100 },
        { id: 'unitType', label: 'Tipo Unidad', minWidth: 100 },
        { id: 'stock', label: 'Stock', minWidth: 50 },
        {
            id: 'status',
            label: 'Estado',
            minWidth: 100,
            render: (value) => (
                <Chip
                    status={value}
                />
            )
        },
        {
            id: 'actions',
            label: 'Acciones',
            minWidth: 150,
            render: (_, row) => (
                <>
                    <IconButton color="primary" size="small" onClick={() => handleEditButtonClick(row)}>
                        <Edit />
                    </IconButton>
                    <IconButton color="error" size="small" onClick={() => handleDeleteButtonClick(row)}>
                        <Delete />
                    </IconButton>
                    <IconButton color="info" size="small" onClick={() => handleViewButtonClick(row)}>
                        <Visibility />
                    </IconButton>
                </>
            )
        }
    ];


    const handleSearchTextChange = (event) => {
        // TODO: implement search
    }

    const handleAddProductModalClose = () => {
        setIsAddProductModalOpen(false);
        setTimeout(() => {
            dispatch(setSelectedProduct(null))
        }, 500)
    }

    const handleAddButtonClick = () => {
        setIsAddProductModalOpen(true);
    }

    const handleEditButtonClick = (product) => {
        setIsAddProductModalOpen(true);
        dispatch(setSelectedProduct(product))
    }

    const handleDeleteButtonClick = (product) => {
        setIsDeleteModalOpen(true);
    }

    const handleViewButtonClick = (product) => {
        navigate('/admin/product-details/1234');
    }

    const handleDeleteModalClose = () => {
        setIsDeleteModalOpen(false);
    }

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
                    <Typography variant="h1" sx={{ mr: 5, }}>Inventario General</Typography>
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
                    <SearchInput
                        placeholder="Buscar..."
                        onChange={handleSearchTextChange}
                    />
                </Grid>
            </Grid>
            <Table
                data={data}
                columns={columns}
                onEdit={handleEditButtonClick}
                onDelete={handleDeleteButtonClick}
                onView={handleViewButtonClick}
            />
            <AddProductModal
                open={isAddProductModalOpen}
                onClose={handleAddProductModalClose}
                mode={selectedProduct ? "edit" : "create"}
            />
            <DeleteModal
                open={isDeleteModalOpen}
                onClose={handleDeleteModalClose}
            />
        </CardLayout>
    )
}
