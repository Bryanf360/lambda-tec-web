import { useState } from 'react';

import { Grid } from '@mui/material';

import { AddModal, FormAutocomplete, FormTextField } from '../';
import { useCitiesStore, useProvincesStore } from '../../hooks';
import { Form, Formik } from 'formik';
import { providerValidationSchema } from '../../helpers';

export default function AddProviderModal({ open, onClose }) {
    const [selectedProvince, setSelectedProvince] = useState(0);
    const [selectedCity, setSelectedCity] = useState(0);
    const { isLoading: isLoadingProvinces, provinces } = useProvincesStore();
    const initialValues = {
        names: '',
        lastnames: '',
        ruc: '',
        landline: '',
        mobilePhone: '',
        address: '',
        province: null,
        city: null,
        description: '',
    };

    const handleSelectedCityChange = (event) => {
        setSelectedCity(event.target.value);
    };

    const handleFormSubmit = async (values, { resetForm }) => {
        console.log(values);
        resetForm();
    };

    return (
        <Formik
            initialValues={initialValues}
            onSubmit={handleFormSubmit}
            validationSchema={providerValidationSchema}
        >
            {({
                values,
                errors,
                touched,
                handleSubmit,
                handleChange,
                setFieldValue,
                resetForm,
                setValues,
            }) => {
                const { isLoading: isLoadingCities, cities } = useCitiesStore(values.province?.id);

                return (
                    <AddModal
                        title="Proveedor"
                        open={open}
                        onClose={() => {
                            resetForm();
                            onClose();
                        }}
                        hasCenteredButtons={false}
                        onSubmit={handleSubmit}
                    >
                        <Grid container spacing={1} component={Form}>
                            <Grid size={{ xs: 12, sm: 6 }}>
                                <FormTextField
                                    labelText="Nombres*"
                                    placeholder="Ingrese los nombres"
                                    value={values.names}
                                    name="names"
                                    onChange={handleChange}
                                    error={touched.names && Boolean(errors.names)}
                                    helperText={touched.names && errors.names}
                                    sx={{ mb: 2 }}
                                />
                                <FormTextField
                                    labelText="Apellidos*"
                                    placeholder="Ingrese los apellidos"
                                    value={values.lastnames}
                                    name="lastnames"
                                    onChange={handleChange}
                                    error={touched.lastnames && Boolean(errors.lastnames)}
                                    helperText={touched.lastnames && errors.lastnames}
                                    sx={{ mb: 2 }}
                                />
                                <FormTextField
                                    labelText="Ruc*"
                                    placeholder="Ingrese el ruc"
                                    value={values.ruc}
                                    name="ruc"
                                    onChange={handleChange}
                                    error={touched.ruc && Boolean(errors.ruc)}
                                    helperText={touched.ruc && errors.ruc}
                                    sx={{ mb: 2 }}
                                />
                                <FormTextField
                                    labelText="Teléfono Fijo*"
                                    placeholder="Ingrese el teléfono fijo"
                                    value={values.landline}
                                    name="landline"
                                    onChange={handleChange}
                                    error={touched.landline && Boolean(errors.landline)}
                                    helperText={touched.landline && errors.landline}
                                    sx={{ mb: 2 }}
                                />
                                <FormTextField
                                    labelText="Teléfono Móvil*"
                                    placeholder="Ingrese el teléfono móvil"
                                    value={values.mobilePhone}
                                    name="mobilePhone"
                                    onChange={handleChange}
                                    error={touched.mobilePhone && Boolean(errors.mobilePhone)}
                                    helperText={touched.mobilePhone && errors.mobilePhone}
                                    sx={{ mb: 2 }}
                                />
                            </Grid>
                            <Grid size={{ xs: 12, sm: 6 }}>
                                <FormTextField
                                    labelText="Dirección*"
                                    placeholder="Ingrese la dirección"
                                    value={values.address}
                                    name="address"
                                    onChange={handleChange}
                                    error={touched.address && Boolean(errors.address)}
                                    helperText={touched.address && errors.address}
                                    sx={{ mb: 2 }}
                                />
                                {/* <Select
                                    labelText="Provincia*"
                                    options={provinces}
                                    sx={{ mb: 2 }}
                                    variant="form"
                                    value={values.province}
                                    name="province"
                                    // onChange={handleSelectedProvinceChange}
                                    onChange={(event) => {
                                        setFieldValue('province', event.target.value);
                                    }}
                                    placeholder={
                                        !values.province
                                            ? 'Selecciona una provincia'
                                            : isLoadingProvinces
                                            ? 'Cargando provincias...'
                                            : 'No se encontraron provincias'
                                    }
                                    labelId="province-select-label"
                                    id="province-select"
                                    required
                                    error={touched.province && Boolean(errors.province)}
                                    errorMessage={touched.province && errors.province}
                                /> */}
                                <FormAutocomplete
                                    labelText="Provincia*"
                                    options={provinces}
                                    placeholder="Seleccione una provincia"
                                    getOptionLabel={(option) => option.name}
                                    isOptionEqualToValue={(option, val) => option.id === val.id}
                                    mb={2}
                                    name="province"
                                    noOptionsText={
                                        isLoadingProvinces
                                            ? 'Cargando'
                                            : 'No se encontraron provincias'
                                    }
                                    value={values.province}
                                    onChange={(event, value) => {
                                        console.log('value: ', value);
                                        setValues((prev) => ({
                                            ...prev,
                                            province: value,
                                            city: null,
                                        }));
                                    }}
                                    error={touched.province && Boolean(errors.province)}
                                    helperText={touched.province && errors.province}
                                    haveAddButton={false}
                                />
                                <FormAutocomplete
                                    labelText="Ciudad*"
                                    options={cities}
                                    placeholder="Seleccione una ciudad"
                                    getOptionLabel={(option) => option.name}
                                    isOptionEqualToValue={(option, val) => option.id === val.id}
                                    mb={2}
                                    name="city"
                                    noOptionsText={
                                        !values.province
                                            ? 'Selecciona una provincia primero'
                                            : isLoadingCities
                                            ? 'Cargando ciudades...'
                                            : 'No se encontraron ciudades'
                                    }
                                    value={values.city}
                                    onChange={(event, value) => {
                                        setFieldValue('city', value);
                                    }}
                                    error={touched.city && Boolean(errors.city)}
                                    helperText={touched.city && errors.city}
                                    haveAddButton={false}
                                />
                                {/* <Select
                                    labelText="Ciudad*"
                                    options={cities}
                                    sx={{ mb: 2 }}
                                    variant="form"
                                    value={selectedCity}
                                    name="city"
                                    onChange={handleSelectedCityChange}
                                    placeholder="Seleccione la ciudad"
                                    labelId="city-select-label"
                                    id="city-select"
                                    required
                                /> */}
                                <FormTextField
                                    labelText="Descripción"
                                    placeholder="Ingrese la descripción"
                                    multiline
                                    name="description"
                                    value={values.description}
                                    onChange={handleChange}
                                    minRows={3}
                                    maxRows={6}
                                />
                            </Grid>
                        </Grid>
                    </AddModal>
                );
            }}
        </Formik>
    );
}
