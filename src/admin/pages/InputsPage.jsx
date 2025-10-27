import { useEffect, useState } from 'react';

import { Box, Grid, IconButton, Typography, useTheme } from '@mui/material';
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
import { inputs, providers, reasons, statuses, warehouses } from '../../data/dummyData';
import SearchProductModal from '../components/organisms/SearchProductModal';
import { useProvidersStore, useReasonsStore } from '../hooks';

export default function InputsPage() {
    const [selectedDate, setSelectedDate] = useState(dayjs());
    const [isAddProviderModalOpen, setIsAddProviderModalOpen] = useState(false);
    const [isAddReasonModalOpen, setIsAddReasonModalOpen] = useState(false);
    const [isSearchModalOpen, setIsSearchModalOpen] = useState(false);
    const { providers, isLoading: isLoadingProviders, getProviders } = useProvidersStore();
    const theme = useTheme();
    const { isLoading: isLoadingReasons, reasons, startLoadingReasonsByType } = useReasonsStore();

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
                            sx={{ miWidth: 84, width: 120, mr: 2 }}
                        />
                    </Grid>
                    <Grid>
                        <FormAutocomplete
                            variant="inline"
                            labelText="Motivo*"
                            options={reasons}
                            onChange={(_, value) => {
                                console.log(value);
                                // setSelectedReason(value)
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
                <InputsTable />
            </CardLayout>
            <Box
                sx={{
                    display: 'flex',
                    justifyContent: 'flex-end',
                    mt: 5,
                }}
            >
                <Button sx={{ minWidth: 144.5 }}>Guardar</Button>
            </Box>
            <AddProviderModal open={isAddProviderModalOpen} onClose={handleAddProviderModalClose} />
            <AddReasonModal open={isAddReasonModalOpen} onClose={handleAddReasonModalClose} />
            <SearchProductModal open={isSearchModalOpen} onClose={handleSearchModalClose} />
        </>
    );
}
