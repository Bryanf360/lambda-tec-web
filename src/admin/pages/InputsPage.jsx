import { useState } from "react"

import {
    Box,
    Grid,
    IconButton,
    Typography,
    useTheme,
} from "@mui/material"
import dayjs from "dayjs"
import { Delete } from "@mui/icons-material"
import AddIcon from '@mui/icons-material/Add';

import {
    CardLayout,
    FormAutocomplete,
    Table,
    DatePicker,
    FormTextField,
    AddProviderModal,
    AddReasonModal,
} from "../components"
import { Button, TextField } from "../../auth/components"
import {
    inputs,
    providers,
    reasons,
    statuses,
    warehouses,
} from "../../data/dummyData";
import { Select } from "../../core/components";

export const InputsPage = () => {
    const [selectedProvider, setSelectedProvider] = useState(providers[0]);
    const [selectedDate, setSelectedDate] = useState(dayjs());
    const [selectedReason, setSelectedReason] = useState(reasons[0])
    const [selectedWarehouse, setSelectedWarehouse] = useState(warehouses[0].id)
    const [selectedStatus, setSelectedStatus] = useState(statuses[0].id);
    const [isAddProviderModalOpen, setIsAddProviderModalOpen] = useState(false);
    const [isAddReasonModalOpen, setIsAddReasonModalOpen] = useState(false);

    const theme = useTheme();
    const [isAddReasonModal, setIsAddReasonModal] = useState(false);

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
                    placeholder="asdf"
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

    const handleAddProviderModalClose = () => {
        setIsAddProviderModalOpen(false);
    }

    const handleAddProviderButtonClick = () => {
        setIsAddProviderModalOpen(true);
    }

    const handleAddReasonButtonClick = () => {
        setIsAddReasonModalOpen(true);
    }

    const handleAddReasonModalClose = () => {
        setIsAddReasonModalOpen(false);
    }

    return (
        <>
            <CardLayout>
                <Grid xs={12}>
                    <Typography variant="h1" sx={{ mr: 5, mb: 2, }}>Ingresos</Typography>
                </Grid>
                <Grid container spacing={1}>
                    <Grid>
                        <FormAutocomplete
                            variant="inline"
                            labelText="Proveedor*"
                            options={providers}
                            onChange={(_, value) => setSelectedProvider(value)}
                            placeholder="Buscar..."
                            getOptionLabel={(option) => option.name}
                            isOptionEqualToValue={(option, value) => option.id === value.id}
                            marginEnd={3}
                            onAddButtonClick={handleAddProviderButtonClick}
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
                            onAddButtonClick={handleAddReasonButtonClick}
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
                    data={inputs}
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
            <AddProviderModal
                open={isAddProviderModalOpen}
                onClose={handleAddProviderModalClose}
            />
            <AddReasonModal
                open={isAddReasonModalOpen}
                onClose={handleAddReasonModalClose}
            />
        </>
    )
}
