import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { Grid, IconButton, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';

import { CardLayout, Table } from "../components";
import { SearchInput } from '../components/molecules';

const columns = [
    { id: 'serial', label: 'Serial', minWidth: 125 },
    { id: 'fixedActive', label: 'Nro de Active Fijo', minWidth: 125 },
    { id: 'name', label: 'Nombre', minWidth: 100 },
    { id: 'type', label: 'Tipo', minWidth: 50 },
    { id: 'brand', label: 'Marca', minWidth: 100 },
    { id: 'model', label: 'Modelo', minWidth: 100 },
    { id: 'partNumber', label: 'Nro de Parte', minWidth: 100 },
    { id: 'unitType', label: 'Tipo de Unidad', minWidth: 100 },
    { id: 'description', label: 'Descripción', minWidth: 150 },
    { id: 'warehouse', label: 'Bodega', minWidth: 100 },
    { id: 'stock', label: 'Stock', minWidth: 50 },
];

const data = [
    {
        serial: '-',
        fixedActive: 'ZXV-122',
        name: 'Televisor',
        type: 'Equipo',
        brand: 'Tecratronik',
        model: 'LG-Z11',
        partNumber: 'PA-121-AZ',
        unitType: 'Unidades',
        warehouse: 'Bodega 1',
        stock: 1,
    },
    {
        serial: '-',
        fixedActive: 'ZXV-122',
        name: 'Televisor',
        type: 'Equipo',
        brand: 'Tecratronik',
        model: 'LG-Z11',
        partNumber: 'PA-121-AZ',
        unitType: 'Unidades',
        warehouse: 'Bodega 1',
        stock: 1,
    },
    {
        serial: '-',
        fixedActive: 'ZXV-122',
        name: 'Televisor',
        type: 'Equipo',
        brand: 'Tecratronik',
        model: 'LG-Z11',
        partNumber: 'PA-121-AZ',
        unitType: 'Unidades',
        warehouse: 'Bodega 1',
        stock: 1,
    },
];

export default function ProductDetailsPage() {
    const navigate = useNavigate();

    const hanldeBackButtonClick = () => {
        navigate('/admin/products')
    }
    
    return (
        <CardLayout
            title="Ingresos"
        >
            <Grid container alignItems="center" sx={{ mb: 2, }}>
                <IconButton
                    sx={{
                        backgroundColor: "secondary.main",
                        borderRadius: 2,
                        boxShadow: "0px 2px 6px rgba(0, 0, 0, 0.1)",
                        padding: 1,
                        "&:hover": {
                            backgroundColor: "#f5f5f5",
                        },
                    }}
                    onClick={hanldeBackButtonClick}
                >
                    <ArrowBackIcon sx={{ color: "#C49B5B" }} />
                </IconButton>
                <Typography variant="h1" sx={{ m: 3, }}>Detalles del Artículo</Typography>
                <SearchInput
                    placeholder="Buscar..."
                    onChange={() => { }}
                />
            </Grid>
            <Table
                columns={columns}
                data={data}
            />
        </CardLayout>
    )
}
