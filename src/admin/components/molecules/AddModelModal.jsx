import { Form, Formik } from 'formik';
import { Box } from '@mui/material';
import { toast } from 'react-toastify';

import { FormAutocomplete, FormTextField } from '../atoms';
import { AddModal } from '../organisms';
import { modelValidationSchema } from '../../helpers';
import { useBrandsStore, useModelsStore } from '../../hooks';

export default function AddModelModal({ open, onClose }) {
    const { isLoading: isLoadingBrands, brands } = useBrandsStore();
    const { isLoading, startSavingModel } = useModelsStore();
    const initialValues = {
        brand: null,
        name: '',
    };

    const handleFormSubmit = async (values, { resetForm }) => {
        try {
            const message = await startSavingModel({
                brandId: values.brand?.id,
                name: values.name,
            });
            toast.success(message);
            resetForm();
            onClose();
        } catch (error) {
            toast.error(error || 'Error interno del servidor');
        }
    };

    return (
        <Formik
            initialValues={initialValues}
            onSubmit={handleFormSubmit}
            validationSchema={modelValidationSchema}
        >
            {({
                values,
                errors,
                touched,
                handleChange,
                handleSubmit,
                resetForm,
                setFieldValue,
            }) => {
                return (
                    <AddModal
                        title="Modelo"
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
                                onChange={(event, value) => {
                                    setFieldValue('brand', value);
                                }}
                                error={touched.brand && Boolean(errors.brand)}
                                helperText={touched.brand && errors.brand}
                                haveAddButton={false}
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
    );
}
