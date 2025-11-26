import { useState } from "react"

import { Box, Grid, IconButton, Typography, useTheme } from "@mui/material"
import dayjs from "dayjs"
import { BorderRight, Delete } from "@mui/icons-material"
import AddIcon from '@mui/icons-material/Add';

import { CardLayout, FormAutocomplete, InputLabel, Select, Table } from "../components"
import { DatePicker, SearchInput } from "../components/molecules"
import FormTextField from "../components/atoms/FormTextField"
import { Button, TextField } from "../../auth/components"

const providers = [
    { id: 1, name: 'Jhon Smith' },
    { id: 2, name: 'Jorge Vedón' },
    { id: 3, name: 'Andrés Hernández' },
    { id: 4, name: 'Liseth Vargas' },
    { id: 5, name: 'Jhon Doe' }
]

const reasons = [
    { id: 1, name: 'Venta' },
    { id: 2, name: 'Salida de prueba' }
]

const warehouses = [
    { id: 1, value: 'Bodega 1' },
    { id: 2, value: 'Bodega 2' }
];

const statuses = [
    { id: 1, value: 'Usado' },
    { id: 2, value: 'Nuevo' }
];

const data = [
    {
        number: '1',
        name: 'Monitor LCD',
        quantity: 4,
        unites: 'u - Unidades',
        warehouse: 'Tecratronik',
        serialNumber: '1234ASDFQ',
        assetNumber: 'ASDF1234',
        status: 'Usado',
        amountToEnter: 30,
    },
    {
        number: '2',
        name: 'Cable RJ45',
        quantity: 30,
        unites: 'm - Metros',
        warehouse: 'Tecratronik',
        serialNumber: 'N/A',
        assetNumber: 'ASDF1234',
        status: 'Usado',
        amountToEnter: 30,
    },
];

export const OutputsPage = () => {
    const [selectedProvider, setSelectedProvider] = useState(providers[0]);
    const [selectedDate, setSelectedDate] = useState(dayjs());
    const [selectedReason, setSelectedReason] = useState(reasons[0])
    const [selectedWarehouse, setSelectedWarehouse] = useState(0)
    const [selectedStatus, setSelectedStatus] = useState(statuses[0].id)
    const theme = useTheme();

    const handleWarehouseSelectChange = (event) => {
        setSelectedWarehouse(event.target.value);
    }

    const handleStatusSelectChange = (event) => {
        setSelectedStatus(event.target.value);
    }

    const textFieldStyles = {
        '& .MuiFilledInput-input': {
            paddingInline: 1.5,
            paddingBlock: 1,
            border: '1px solid rgba(0, 0, 0, 0.2)',
            borderRadius: 2.5,
            ...theme.typography.selectText
        }
    }

    const columns = [
        { id: 'number', label: 'N°', minWidth: 100 },
        { id: 'name', label: 'Artículo', minWidth: 100 },
        { id: 'quantity', label: 'Cantidad', minWidth: 50 },
        { id: 'unites', label: 'Unidades', minWidth: 100 },
        {
            id: 'warehouse',
            label: 'Bodega',
            minWidth: 150,
            render: (_, row) => (
                // <FormAutocomplete
                //     options={warehouses}
                //     value={selectedWarehouse}
                //     onChange={(event, value) => setSelectedWarehouse(value)}
                //     placeholder="-"
                //     getOptionLabel={(option) => option.value}
                //     isOptionEqualToValue={(option, val) => option.id === val.id}
                //     haveAddButton={false}
                // />
                <Select
                    // label="label"
                    placeholder="-"
                    value={selectedWarehouse}
                    onChange={handleWarehouseSelectChange}
                    options={warehouses}
                    name="warehouse"
                />
            )
        },
        {
            id: 'serialNumber',
            label: 'Nro de Serie',
            minWidth: 150,
            render: (_, row) => {
                if (row.serialNumber === 'N/A') {
                    return <Typography variant="selectText">N/A</Typography>;
                }

                return (
                    <TextField
                        placeholder="Ingrese n°"
                        sx={textFieldStyles}
                    />
                )
            }
        },
        {
            id: 'assetNumber',
            label: 'Nro de Parte',
            minWidth: 150,
            render: (_, row) => (
                <TextField
                    placeholder="Ingrese n°"
                    sx={textFieldStyles}
                />
            )
        },
        {
            id: 'status',
            label: 'Estado',
            minWidth: 150,
            render: (_, row) => (
                <Select
                    // label="label"
                    // placeholder="asdf"
                    value={selectedStatus}
                    onChange={handleStatusSelectChange}
                    options={statuses}
                    name="status"
                />
            )
        },
        {
            id: 'amountToEnter',
            label: 'Cantidad a Ingresar',
            minWidth: 170,
            render: (_, row) => (
                <TextField
                    placeholder="Ingrese cantidad"
                    sx={{
                        '& .MuiInputBase-input': {
                            textAlign: 'center',
                        },
                        ...textFieldStyles,
                    }}
                />
            )
        },
        // {
        //     id: 'status',
        //     label: 'Estado',
        //     minWidth: 100,
        //     render: (value) => (
        //         <Chip
        //             status={value}
        //         />
        //     )
        // },
        {
            id: 'actions',
            label: 'Acciones',
            minWidth: 100,
            render: (_, row) => (
                <>
                    {/* <IconButton color="primary" size="small" onClick={() => handleEditButtonClick(row)}>
                    <Edit />
                </IconButton> */}
                    <IconButton color="error" size="small" onClick={() => { }}>
                        <Delete />
                    </IconButton>
                    {/* <IconButton color="info" size="small" onClick={() => handleViewButtonClick(row)}>
                    <Visibility />
                </IconButton> */}
                </>
            )
        }
    ];

    return (
        <>
            <CardLayout>
                <Grid xs={12}>
                    <Typography variant="h1" sx={{ mr: 5, mb: 2, }}>Salidas</Typography>
                </Grid>
                <Grid container spacing={1}>
                    <Grid>
                        <FormAutocomplete
                            variant="inline"
                            labelText="Cliente/Destinatario*"
                            options={providers}
                            onChange={(_, value) => setSelectedProvider(value)}
                            placeholder="Buscar..."
                            getOptionLabel={(option) => option.name}
                            isOptionEqualToValue={(option, value) => option.id === value.id}
                            marginEnd={3}
                        />
                    </Grid>
                    <Grid>
                        <DatePicker
                            labelText="Fecha"
                            value={selectedDate}
                            onChange={(newValue) => setSelectedDate(newValue)}
                            marginEnd={3}
                        />
                    </Grid>
                    <Grid>
                        <FormTextField
                            labelText="Nro"
                            placeholder="1201"
                            disabled
                            variant="inline"
                            sx={{ miWidth: 84, width: 120, mr: 2, }}
                        />
                    </Grid>
                    <Grid>
                        <FormAutocomplete
                            variant="inline"
                            labelText="Motivo*"
                            options={reasons}
                            onChange={(_, value) => setSelectedReason(value)}
                            placeholder="Buscar..."
                            getOptionLabel={(option) => option.name}
                            isOptionEqualToValue={(option, value) => option.id === value.id}
                        />
                    </Grid>
                </Grid>
                <Button
                    kind="tertiary"
                    startIcon={<AddIcon />}
                    sx={{ my: 2, }}
                >
                    Buscar Producto
                </Button>
                <Table
                    columns={columns}
                    data={data}
                />
            </CardLayout>
            <Box
                sx={{ 
                    display: 'flex',
                    justifyContent: 'flex-end',
                    mt: 5,
                }}
            >
                <Button
                    sx={{ minWidth: 144.5, }}
                >
                    Guardar
                </Button>
            </Box>
        </>
    )
}
