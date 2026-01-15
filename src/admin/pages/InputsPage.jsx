import { useEffect, useState } from 'react';

import { Box, CircularProgress, Grid, Typography, useTheme } from '@mui/material';
import dayjs from 'dayjs';
import AddIcon from '@mui/icons-material/Add';
import { toast } from 'react-toastify';
import { useDispatch } from 'react-redux';

import {
    CardLayout,
    FormAutocomplete,
    DatePicker,
    AddProviderModal,
    AddReasonModal,
    InputsTable,
} from '../components';
import { Button, TextField } from '../../auth/components';
import SearchProductModal from '../components/organisms/SearchProductModal';
import { useInputsStore, useProvidersStore, useReasonsStore, useRows } from '../hooks';
import { transformRowsToDetails } from '../helpers';
import { resetSelectedProducts } from '../slices/inputsSlice';

export default function InputsPage() {
    const [isAddProviderModalOpen, setIsAddProviderModalOpen] = useState(false);
    const [isAddReasonModalOpen, setIsAddReasonModalOpen] = useState(false);
    const [isSearchModalOpen, setIsSearchModalOpen] = useState(false);
    const { providers, isLoading: isLoadingProviders, getProviders } = useProvidersStore();
    const theme = useTheme();
    const { isLoading: isLoadingReasons, reasons, startLoadingReasonsByType } = useReasonsStore();
    const { startSavingInputs, selectedProducts, isLoading } = useInputsStore();
    const { rows, updateRow, deleteRow, errors, validate, resetRows } = useRows(selectedProducts);
    const [movementHeader, setMovementHeader] = useState({
        companyId: null,
        reasonId: null,
        date: dayjs(),
    });
    const [providerInput, setProviderInput] = useState('');
    const [reasonInput, setReasonInput] = useState('');
    const dispatch = useDispatch();

    const selectedProvider =
        providers.find((provider) => provider.id === movementHeader.companyId) || null;
    const selectedReason = reasons.find((reason) => reason.id === movementHeader.reasonId) || null;

    useEffect(() => {
        startLoadingReasonsByType('input');
        getProviders();
    }, []);

    useEffect(() => {
        return () => {
            resetMovement();
        };
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
        const details = transformRowsToDetails(rows);
        const movementToCreate = {
            type: 'input',
            ...movementHeader,
            details,
        };
        try {
            const message = await startSavingInputs(movementToCreate);
            toast.success(message);
            resetMovement();
        } catch (error) {
            toast.error(error || 'Error interno del servidor');
        }
    };

    const validateMovementHeader = () => {
        if (!movementHeader.companyId) return 'Debe seleccionar un proveedor antes de guardar';
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
        setProviderInput('');
        setReasonInput('');
        dispatch(resetSelectedProducts());
    };

    const handleMovementChange = (field, value) => {
        setMovementHeader((prev) => ({
            ...prev,
            [field]: value,
        }));
    };

    return (
        <>
            <CardLayout>
                <Grid xs={12}>
                    <Typography variant="h1" sx={{ mr: 5, mb: 2 }}>
                        Recepción de artículos
                    </Typography>
                </Grid>
                <Grid container spacing={1}>
                    <Grid>
                        <FormAutocomplete
                            variant="inline"
                            labelText="Proveedor*"
                            options={providers}
                            onChange={(_, provider) =>
                                handleMovementChange('companyId', provider?.id)
                            }
                            noOptionsText={
                                isLoadingReasons ? 'Cargando' : 'No se encontraron proveedores'
                            }
                            inputValue={providerInput}
                            onInputChange={(_, newInputValue) => {
                                setProviderInput(newInputValue);
                            }}
                            placeholder="Buscar..."
                            getOptionLabel={(option) => `${option.names} ${option.lastnames}`}
                            isOptionEqualToValue={(option, value) => option.id === value.id}
                            marginEnd={3}
                            onAddButtonClick={handleAddProviderButtonClick}
                            value={selectedProvider}
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
                    {/* TODO: validar si lo necesitamos o no */}
                    {/* <Grid>
                        <FormTextField
                            labelText="Nro"
                            placeholder="1201"
                            // disabled
                            variant="inline"
                            sx={{ miWidth: 84, width: 120, mr: 2 }}
                            onChange={(e) => handleMovementChange('code', e.target.value)}
                        />
                    </Grid> */}
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
