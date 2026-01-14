import { useEffect, useState } from 'react';

import { Box, Grid, IconButton, Typography, useTheme } from '@mui/material';
import dayjs from 'dayjs';
import { BorderRight, Delete } from '@mui/icons-material';
import AddIcon from '@mui/icons-material/Add';

import {
    CardLayout,
    FormAutocomplete,
    InputLabel,
    InputsTable,
    SearchProductWithStockModal,
    Select,
    Table,
} from '../components';
import { DatePicker, SearchInput } from '../components/molecules';
import FormTextField from '../components/atoms/FormTextField';
import { Button, TextField } from '../../auth/components';
import { useClientsStore, useInputsStore, useReasonsStore, useRows } from '../hooks';
import { transformRowsToExitDetails } from '../helpers';
import { toast } from 'react-toastify';
import { resetSelectedProducts } from '../slices/inputsSlice';
import { useDispatch } from 'react-redux';

const providers = [
    { id: 1, name: 'Jhon Smith' },
    { id: 2, name: 'Jorge Vedón' },
    { id: 3, name: 'Andrés Hernández' },
    { id: 4, name: 'Liseth Vargas' },
    { id: 5, name: 'Jhon Doe' },
];

const reasons = [
    { id: 1, name: 'Venta' },
    { id: 2, name: 'Salida de prueba' },
];

const warehouses = [
    { id: 1, value: 'Bodega 1' },
    { id: 2, value: 'Bodega 2' },
];

const statuses = [
    { id: 1, value: 'Usado' },
    { id: 2, value: 'Nuevo' },
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

export default function OutputsPage() {
    const [selectedWarehouse, setSelectedWarehouse] = useState(0);
    const [selectedStatus, setSelectedStatus] = useState(statuses[0].id);
    const { clients, isLoading: isLoadingClients, getClients } = useClientsStore();
    const { isLoading: isLoadingReasons, reasons, startLoadingReasonsByType } = useReasonsStore();
    const [isSearchModalOpen, setIsSearchModalOpen] = useState(false);
    const { startSavingInputs, startSavingOutputs, selectedProducts, isLoading } = useInputsStore();
    const { rows, updateRow, deleteRow, errors, validate, resetRows } = useRows(selectedProducts);
    const [movementHeader, setMovementHeader] = useState({
        companyId: null,
        reasonId: null,
        date: dayjs(),
    });
    const [clientInput, setClientInput] = useState('');
    const [reasonInput, setReasonInput] = useState('');
    const dispatch = useDispatch();

    const theme = useTheme();

    const selectedClient = clients.find((client) => client.id === movementHeader.companyId) || null;
    const selectedReason = reasons.find((reason) => reason.id === movementHeader.reasonId) || null;

    useEffect(() => {
        startLoadingReasonsByType('output');
        getClients();
    }, []);

    const handleStatusSelectChange = (event) => {
        setSelectedStatus(event.target.value);
    };

    const handleSearchButtonClick = () => {
        setIsSearchModalOpen(true);
    };

    const handleSearchModalClose = () => {
        setIsSearchModalOpen(false);
    };

    const handleSaveButtonClick = async () => {
        const error = validateMovementHeader();
        if (error) {
            toast.error(error);
            return;
        }
        const firstError = validate();
        if (firstError) {
            toast.error(firstError.message);
            return;
        }
        if (rows.length === 0) return toast.error('Debe ingresar productos');
        const details = transformRowsToExitDetails(rows);
        const movementToCreate = {
            type: 'input',
            ...movementHeader,
            details,
        };
        try {
            const message = await startSavingOutputs(movementToCreate);
            toast.success(message);
            resetMovement();
        } catch (error) {
            toast.error(error || 'Error interno del servidor');
        }
    };

    const validateMovementHeader = () => {
        if (!movementHeader.companyId) return 'Debe seleccionar un cliente antes de guardar';
        if (!movementHeader.reasonId) return 'Debe seleccionar un motivo antes de guardar';
        return null;
    };

    const resetMovement = () => {
        setMovementHeader({
            companyId: null,
            reasonId: null,
            date: dayjs(),
        });
        resetRows();
        setClientInput('');
        setReasonInput('');
        dispatch(resetSelectedProducts());
    };

    const handleMovementChange = (field, value) => {
        setMovementHeader((prev) => ({
            ...prev,
            [field]: value,
        }));
    };

    const textFieldStyles = {
        '& .MuiFilledInput-input': {
            paddingInline: 1.5,
            paddingBlock: 1,
            border: '1px solid rgba(0, 0, 0, 0.2)',
            borderRadius: 2.5,
            ...theme.typography.selectText,
        },
    };

    const columns = [
        { id: 'number', label: 'N°', minWidth: 100 },
        { id: 'name', label: 'Artículo', minWidth: 100 },
        { id: 'quantity', label: 'Cantidad', minWidth: 50 },
        { id: 'unites', label: 'Unidades', minWidth: 100 },
        {
            id: 'warehouse',
            label: 'Bodega',
            minWidth: 150,
            render: (_, row) => {
                console.log('myRow: ', row);
                return (
                    <Select
                        // label="label"
                        placeholder="-"
                        value={row.warehouseId}
                        // onChange={handleWarehouseSelectChange}
                        options={warehouses}
                        name="warehouse"
                        disabled={row.type === 'consumable'}
                    />
                );
            },
        },
        {
            id: 'serialNumber',
            label: 'Nro de Serie',
            minWidth: 150,
            render: (_, row) => {
                if (row.serialNumber === 'N/A') {
                    return <Typography variant="selectText">N/A</Typography>;
                }

                return <TextField placeholder="Ingrese n°" sx={textFieldStyles} />;
            },
        },
        {
            id: 'assetNumber',
            label: 'Nro de Parte',
            minWidth: 150,
            render: (_, row) => <TextField placeholder="Ingrese n°" sx={textFieldStyles} />,
        },
        {
            id: 'status',
            label: 'Estado',
            minWidth: 150,
            render: (_, row) => (
                <Select
                    value={selectedStatus}
                    onChange={handleStatusSelectChange}
                    options={statuses}
                    name="status"
                />
            ),
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
            ),
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
                    <IconButton color="error" size="small" onClick={() => {}}>
                        <Delete />
                    </IconButton>
                    {/* <IconButton color="info" size="small" onClick={() => handleViewButtonClick(row)}>
                    <Visibility />
                </IconButton> */}
                </>
            ),
        },
    ];

    return (
        <>
            <CardLayout>
                <Grid xs={12}>
                    <Typography variant="h1" sx={{ mr: 5, mb: 2 }}>
                        Salidas
                    </Typography>
                </Grid>
                <Grid container spacing={1}>
                    <Grid>
                        <FormAutocomplete
                            variant="inline"
                            labelText="Cliente/Destinatario*"
                            options={clients}
                            onChange={(_, client) => {
                                handleMovementChange('companyId', client?.id);
                            }}
                            noOptionsText={
                                isLoadingClients ? 'Cargando' : 'No se encontraron clientes'
                            }
                            onInputChange={(_, newInputValue) => {
                                setClientInput(newInputValue);
                            }}
                            inputValue={clientInput}
                            placeholder="Buscar..."
                            getOptionLabel={(option) => `${option.names} ${option.lastnames}`}
                            isOptionEqualToValue={(option, value) => option.id === value.id}
                            marginEnd={3}
                            value={selectedClient}
                        />
                    </Grid>
                    <Grid>
                        <DatePicker
                            labelText="Fecha"
                            value={movementHeader.date}
                            onChange={(newValue) => handleMovementChange('date', newValue)}
                            marginEnd={3}
                            maxDate={dayjs()}
                        />
                    </Grid>
                    <Grid>
                        {/* 
                        TODO: validate if is neccessary the nro
                        <FormTextField
                            labelText="Nro"
                            placeholder="1201"
                            disabled
                            variant="inline"
                            sx={{ miWidth: 84, width: 120, mr: 2 }}
                        /> */}
                    </Grid>
                    <Grid>
                        <FormAutocomplete
                            variant="inline"
                            labelText="Motivo*"
                            options={reasons}
                            onChange={(_, reason) => {
                                handleMovementChange('reasonId', reason?.id);
                                // setSelectedReason(value)
                            }}
                            noOptionsText={
                                isLoadingReasons ? 'Cargando' : 'No se encontraron reasons'
                            }
                            placeholder="Buscar..."
                            getOptionLabel={(option) => option.name}
                            isOptionEqualToValue={(option, value) => option.id === value.id}
                            onInputChange={(_, newInputValue) => {
                                setReasonInput(newInputValue);
                            }}
                            value={selectedReason}
                            inputValue={reasonInput}
                        />
                    </Grid>
                </Grid>
                <Button
                    kind="tertiary"
                    startIcon={<AddIcon />}
                    sx={{ my: 2 }}
                    onClick={handleSearchButtonClick}
                >
                    Buscar Producto
                </Button>
                <InputsTable
                    data={rows}
                    updateRow={updateRow}
                    deleteRow={deleteRow}
                    mode="output"
                />
            </CardLayout>
            <Box
                sx={{
                    display: 'flex',
                    justifyContent: 'flex-end',
                    mt: 5,
                }}
            >
                <Button sx={{ minWidth: 144.5 }} onClick={handleSaveButtonClick}>
                    Guardar
                </Button>
            </Box>
            <SearchProductWithStockModal
                open={isSearchModalOpen}
                onClose={handleSearchModalClose}
            />
        </>
    );
}
