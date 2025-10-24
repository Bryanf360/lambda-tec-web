import { Form, Formik } from 'formik';
import { Box } from '@mui/material';
import { toast } from 'react-toastify';
import { useState } from 'react';

import { FormAutocomplete, FormTextField } from '../atoms';
import { AddModal } from '../organisms';
import { partNumberValidationSchema } from '../../helpers';
import { useBrandsStore, useBrandWatcher, useModelsStore } from '../../hooks';
import usePartNumbersStore from '../../hooks/usePartNumbersStore';
import { AddBrandModal, AddModelModal } from './';

export default function AddPartNumberModal({ open, onClose }) {
    const { isLoading, startSavingPartNumber } = usePartNumbersStore();
    const { isLoading: isLoadingBrands, brands } = useBrandsStore();
    const { isLoading: isLoadingModels, models } = useModelsStore();
    const [isAddBrandModalOpen, setIsAddBrandModalOpen] = useState(false);
    const [isAddModelModalOpen, setIsAddModelModalOpen] = useState(false);
    const initialValues = {
        brand: null,
        model: null,
        name: '',
    };

    const handleFormSubmit = async (values, { resetForm }) => {
        try {
            const message = await startSavingPartNumber({
                modelId: values.model?.id,
                name: values.name,
            });
            toast.success(message);
            resetForm();
            onClose();
        } catch (error) {
            toast.error(error || 'Error interno del servidor');
        }
    };

    const handleAddBrandButtonClick = () => {
        setIsAddBrandModalOpen(true);
    };

    const handleAddBrandModalClose = () => {
        setIsAddBrandModalOpen(false);
    };

    const handleAddModelButtonClick = () => {
        setIsAddModelModalOpen(true);
    };

    const handleAddModelModalClose = () => {
        setIsAddModelModalOpen(false);
    };

    return (
        <>
            <Formik
                initialValues={initialValues}
                onSubmit={handleFormSubmit}
                validationSchema={partNumberValidationSchema}
            >
                {({
                    values,
                    errors,
                    touched,
                    handleChange,
                    handleSubmit,
                    resetForm,
                    setFieldValue,
                    setValues,
                }) => {
                    useBrandWatcher(values.brand?.id);

                    return (
                        <AddModal
                            title="Nro de Parte"
                            open={open}
                            onClose={() => {
                                resetForm();
                                onClose();
                            }}
                            onSubmit={handleSubmit}
                            maxWidth="xs"
                            fullWidth
                            showDate={false}
                            isLoading={isLoading}
                        >
                            <Box component={Form}>
                                <FormAutocomplete
                                    labelText="Marca*"
                                    options={brands}
                                    placeholder="Seleccione una marca"
                                    getOptionLabel={(option) => option.name}
                                    isOptionEqualToValue={(option, val) => option.id === val.id}
                                    mb={2}
                                    name="brand"
                                    noOptionsText={
                                        isLoadingBrands ? 'Cargando' : 'No se encontraron marcas'
                                    }
                                    value={values.brand}
                                    onChange={(event, value) =>
                                        setValues((prev) => ({
                                            ...prev,
                                            brand: value,
                                            model: null,
                                        }))
                                    }
                                    error={touched.brand && Boolean(errors.brand)}
                                    helperText={touched.brand && errors.brand}
                                    onAddButtonClick={handleAddBrandButtonClick}
                                />
                                <FormAutocomplete
                                    labelText="Modelo*"
                                    options={models}
                                    placeholder="Seleccione un modelo"
                                    getOptionLabel={(option) => option.name}
                                    isOptionEqualToValue={(option, val) => option.id === val.id}
                                    mb={2}
                                    name="model"
                                    noOptionsText={
                                        !values.brand
                                            ? 'Selecciona una marca primero'
                                            : isLoadingModels
                                            ? 'Cargando modelos...'
                                            : 'No se encontraron modelos'
                                    }
                                    value={values.model}
                                    onChange={(event, value) => {
                                        setFieldValue('model', value);
                                    }}
                                    onAddButtonClick={handleAddModelButtonClick}
                                    error={touched.model && Boolean(errors.model)}
                                    helperText={touched.model && errors.model}
                                />
                                <FormTextField
                                    labelText="Nombre*"
                                    placeholder="Ingrese el nombre"
                                    value={values.name}
                                    name="name"
                                    onChange={handleChange}
                                    error={touched.name && Boolean(errors.name)}
                                    helperText={touched.name && errors.name}
                                    sx={{
                                        mb: 2,
                                        '& .MuiFilledInput-root input': {
                                            borderBottomLeftRadius: 10,
                                            borderBottomRightRadius: 10,
                                        },
                                    }}
                                />
                            </Box>
                        </AddModal>
                    );
                }}
            </Formik>
            <AddBrandModal open={isAddBrandModalOpen} onClose={handleAddBrandModalClose} />
            <AddModelModal open={isAddModelModalOpen} onClose={handleAddModelModalClose} />
        </>
    );
}
