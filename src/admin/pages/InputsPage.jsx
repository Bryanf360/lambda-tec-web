import { useEffect, useState } from 'react';

import { Box, CircularProgress, Grid, IconButton, Typography, useTheme } from '@mui/material';
import dayjs from 'dayjs';
import { Delete } from '@mui/icons-material';
import AddIcon from '@mui/icons-material/Add';

import {
    CardLayout,
    FormAutocomplete,
    Table,
    DatePicker,
    FormTextField,
    AddProviderModal,
    AddReasonModal,
    InputsTable,
} from '../components';
import { Button, TextField } from '../../auth/components';
import SearchProductModal from '../components/organisms/SearchProductModal';
import { useInputsStore, useProvidersStore, useReasonsStore, useRows } from '../hooks';
import { toast } from 'react-toastify';
import { transformRowsToDetails } from '../helpers';

export default function InputsPage() {
    const [selectedDate, setSelectedDate] = useState(dayjs());
    const [isAddProviderModalOpen, setIsAddProviderModalOpen] = useState(false);
    const [isAddReasonModalOpen, setIsAddReasonModalOpen] = useState(false);
    const [isSearchModalOpen, setIsSearchModalOpen] = useState(false);
    const { providers, isLoading: isLoadingProviders, getProviders } = useProvidersStore();
    const theme = useTheme();
    const { isLoading: isLoadingReasons, reasons, startLoadingReasonsByType } = useReasonsStore();
    const { startSavingInputs, selectedProducts, isLoading } = useInputsStore();
    const { rows, updateRow, deleteRow, errors, validate } = useRows(selectedProducts);
    const [movement, setMovement] = useState({
        providerId: null,
        reasonId: null,
        date: dayjs(),
        code: '',
    });

    useEffect(() => {
        startLoadingReasonsByType('input');
        getProviders();
    }, []);

    const handleAddProviderModalClose = () => {
        setIsAddProviderModalOpen(false);
    };

    const handleAddProviderButtonClick = () => {
        setIsAddProviderModalOpen(true);
    };

    const handleAddReasonButtonClick = () => {
        setIsAddReasonModalOpen(true);
    };

    const handleAddReasonModalClose = () => {
        setIsAddReasonModalOpen(false);
    };

    const handleSearchButtonClick = () => {
        setIsSearchModalOpen(true);
    };

    const handleSearchModalClose = () => {
        setIsSearchModalOpen(false);
    };

    const handleSaveButtonClick = async () => {
        const firstError = validate();
        if (firstError) {
            toast.error(firstError.message);
            return;
        }

        /* create a detail movement product on the same warehouse
        const details = visibleRows.map((row) => ({
            productId: row.productId,
            quantity: 1,
            warehouseId: row.warehouse,
            instances: [
                {
                    serialNumber: row.serialNumber,
                    assetNumber: row.assetNumber,
                    status: row.status === 1 ? 'used' : 'new',
                },
            ],
        }));
        */

        const details = transformRowsToDetails(rows);
        const movementToCreate = {
            type: 'input',
            ...movement,
            groupCode: 'GRP-20240502-005',
            date: '2026-01-09T15:30:00.000Z',
            details,
        };
        console.log('movementToCreate: ', movementToCreate);
        try {
            const message = await startSavingInputs(movementToCreate);
            toast.success(message);
        } catch (error) {
            toast.error(error || 'Error interno del servidor');
        }
    };

    const handleMovementChange = (field, value) => {
        setMovement((prev) => ({
            ...prev,
            [field]: value,
        }));
    };

    return (
        <>
            <CardLayout>
                <Grid xs={12}>
                    <Typography variant="h1" sx={{ mr: 5, mb: 2 }}>
                        Ingresos
                    </Typography>
                </Grid>
                <Grid container spacing={1}>
                    <Grid>
                        <FormAutocomplete
                            variant="inline"
                            labelText="Proveedor*"
                            options={providers}
                            // onChange={(_, value) => setSelectedProvider(value)}
                            // onChange={(_, value) => {
                            //     setFieldValue('brand', value);
                            // }}
                            onChange={(_, provider) =>
                                handleMovementChange('providerId', provider?.id)
                            }
                            noOptionsText={
                                isLoadingReasons ? 'Cargando' : 'No se encontraron proveedores'
                            }
                            placeholder="Buscar..."
                            getOptionLabel={(option) => `${option.names} ${option.lastnames}`}
                            isOptionEqualToValue={(option, value) => option.id === value.id}
                            marginEnd={3}
                            onAddButtonClick={handleAddProviderButtonClick}
                        />
                    </Grid>
                    <Grid>
                        <DatePicker
                            labelText="Fecha"
                            value={movement.date}
                            onChange={(newValue) => handleMovementChange('date', newValue)}
                            marginEnd={3}
                        />
                    </Grid>
                    <Grid>
                        <FormTextField
                            labelText="Nro"
                            placeholder="1201"
                            // disabled
                            variant="inline"
                            sx={{ miWidth: 84, width: 120, mr: 2 }}
                            onChange={(e) => handleMovementChange('code', e.target.value)}
                        />
                    </Grid>
                    <Grid>
                        <FormAutocomplete
                            variant="inline"
                            labelText="Motivo*"
                            options={reasons}
                            onChange={(_, value) => {
                                handleMovementChange('reasonId', value?.id);
                            }}
                            noOptionsText={
                                isLoadingReasons ? 'Cargando' : 'No se encontraron reasons'
                            }
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
                    sx={{ my: 2 }}
                    onClick={handleSearchButtonClick}
                >
                    Buscar Producto
                </Button>
                <InputsTable data={rows} updateRow={updateRow} deleteRow={deleteRow} />
            </CardLayout>
            <Box
                sx={{
                    display: 'flex',
                    justifyContent: 'flex-end',
                    mt: 5,
                }}
            >
                <Button
                    sx={{ minWidth: 144.5 }}
                    onClick={handleSaveButtonClick}
                    disabled={isLoading}
                    startIcon={isLoading ? <CircularProgress size={20} color="inherit" /> : null}
                >
                    {isLoading ? '' : 'Guardar'}
                </Button>
            </Box>
            <AddProviderModal open={isAddProviderModalOpen} onClose={handleAddProviderModalClose} />
            <AddReasonModal open={isAddReasonModalOpen} onClose={handleAddReasonModalClose} />
            <SearchProductModal open={isSearchModalOpen} onClose={handleSearchModalClose} />
        </>
    );
}
