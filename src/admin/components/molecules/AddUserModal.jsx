import { useEffect, useState } from 'react';

import { Grid } from '@mui/material';

import { Form, Formik } from 'formik';
import { toast } from 'react-toastify';

import { AddModal, FormAutocomplete, FormTextField } from '../';
import { useCitiesStore, useProvidersStore, useProvincesStore, useUsersStore } from '../../hooks';
import { providerValidationSchema } from '../../helpers';
import { Select } from '../../../core/components';

export default function AddUserModal({ open, onClose }) {
    const { saveUser, isLoading } = useUsersStore();
    const initialValues = {
        names: '',
        lastnames: '',
        email: '',
        role: '',
        password: '',
        repeatPassword: '',
    };

    const handleFormSubmit = async (values, { resetForm }) => {
        const user = {
            names: values.names,
            lastnames: values.lastnames,
            email: values.email,
            role: values.role === 1 ? 'admin' : 'technician',
            password: values.password,
            status: 'active',
        };
        try {
            const message = await saveUser(user);
            toast.success(message);
            resetForm();
            onClose();
        } catch (error) {
            toast.error(error || 'Error interno del servidor');
        }
    };

    const handleSelectedRoleChange = ({ target }) => {
        const { value } = target;
    };

    return (
        <Formik
            initialValues={initialValues}
            onSubmit={handleFormSubmit}
            // validationSchema={providerValidationSchema}
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
                        title="Usuario"
                        open={open}
                        onClose={() => {
                            resetForm();
                            onClose();
                        }}
                        hasCenteredButtons={false}
                        onSubmit={handleSubmit}
                        isLoading={isLoading}
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
                                    labelText="Email*"
                                    placeholder="Ingrese el email"
                                    value={values.email}
                                    name="email"
                                    onChange={handleChange}
                                    error={touched.email && Boolean(errors.email)}
                                    helperText={touched.email && errors.email}
                                    sx={{ mb: 2 }}
                                />
                                {/* <Select
                                    labelText="Rol*"
                                    options={[
                                        { id: 1, name: 'Administrador' },
                                        { id: 2, name: 'Técnico' },
                                    ]}
                                    sx={{ mb: 2 }}
                                    variant="form"
                                    value={selectedRole}
                                    name="role"
                                    onChange={handleChange}
                                    placeholder="Seleccione el rol"
                                    labelId="role-select-label"
                                    id="role-select"
                                    required
                                /> */}
                                <Select
                                    labelText="Rol"
                                    value={values.role}
                                    name="role"
                                    onChange={handleChange}
                                    placeholder="Seleccione"
                                    labelId="select-label"
                                    id="select"
                                    required
                                    error={Boolean(touched.role && errors.role)}
                                    errorMessage={errors.role}
                                    options={[
                                        { id: 1, name: 'Administrador' },
                                        { id: 2, name: 'Técnico' },
                                    ]}
                                    variant="form"
                                />
                            </Grid>
                            <Grid size={{ xs: 12, sm: 6 }}>
                                <FormTextField
                                    labelText="Contraseña*"
                                    placeholder="Ingrese la contraseña"
                                    value={values.password}
                                    name="password"
                                    onChange={handleChange}
                                    error={touched.password && Boolean(errors.password)}
                                    helperText={touched.password && errors.password}
                                    sx={{ mb: 2 }}
                                />
                                <FormTextField
                                    labelText="Repite Contraseña*"
                                    placeholder="Repite la contraseña"
                                    value={values.repeatPassword}
                                    name="repeatPassword"
                                    onChange={handleChange}
                                    error={touched.repeatPassword && Boolean(errors.repeatPassword)}
                                    helperText={touched.repeatPassword && errors.repeatPassword}
                                    sx={{ mb: 2 }}
                                />
                            </Grid>
                        </Grid>
                    </AddModal>
                );
            }}
        </Formik>
    );
}
