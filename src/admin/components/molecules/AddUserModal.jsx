import { useEffect, useState } from 'react';

import { Box, Grid, IconButton, InputAdornment } from '@mui/material';

import { Form, Formik } from 'formik';
import { toast } from 'react-toastify';

import { AddModal, FormAutocomplete, FormTextField } from '../';
import { useCitiesStore, useProvidersStore, useProvincesStore, useUsersStore } from '../../hooks';
import { providerValidationSchema, userValidationSchema } from '../../helpers';
import { Select } from '../../../core/components';
import { Visibility, VisibilityOff } from '@mui/icons-material';

export default function AddUserModal({ open, onClose }) {
    const { saveUser, isLoading, isSaving, getUsers } = useUsersStore();
    const [showPassword, setShowPassword] = useState(false);
    const [showRepeatPassword, setShowRepeatPassword] = useState(false);

    const initialValues = {
        names: '',
        lastnames: '',
        email: '',
        role: '',
        status: '',
        password: '',
        repeatPassword: '',
    };

    const handleTogglePassword = () => {
        setShowPassword((prev) => !prev);
    };

    const handleRepeatPasswordToggle = () => {
        setShowRepeatPassword((prev) => !prev);
    };

    const handleFormSubmit = async (values, { resetForm }) => {
        const user = {
            names: values.names,
            lastnames: values.lastnames,
            email: values.email,
            role: values.role === 1 ? 'admin' : 'technician',
            password: values.password,
            status: values.status === 1 ? 'active' : 'inactive',
        };
        try {
            const message = await saveUser(user);
            toast.success(message);
            resetForm();
            onClose();
            console.log('asdfasdf');
            getUsers({ page: 1, limit: 5 });
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
            validationSchema={userValidationSchema}
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
                        isLoading={isSaving}
                        showDate={false}
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
                                    labelText="Rol*"
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
                                    // sx={{ mb: 2 }}
                                />
                                <Box sx={{ mb: 2 }} />
                            </Grid>
                            <Grid size={{ xs: 12, sm: 6 }}>
                                <Select
                                    labelText="Estado*"
                                    value={values.status}
                                    name="status"
                                    onChange={handleChange}
                                    placeholder="Seleccione"
                                    labelId="select-label"
                                    id="select"
                                    required
                                    error={Boolean(touched.status && errors.status)}
                                    errorMessage={errors.status}
                                    options={[
                                        { id: 1, name: 'Activo' },
                                        { id: 2, name: 'Inactivo' },
                                    ]}
                                    variant="form"
                                />
                                <Box sx={{ mb: 2 }} />
                                <FormTextField
                                    labelText="Contraseña*"
                                    placeholder="Ingrese la contraseña"
                                    value={values.password}
                                    name="password"
                                    onChange={handleChange}
                                    error={touched.password && Boolean(errors.password)}
                                    helperText={touched.password && errors.password}
                                    sx={{ mb: 2 }}
                                    type={showPassword ? 'text' : 'password'}
                                    slotProps={{
                                        input: {
                                            endAdornment: (
                                                <InputAdornment position="end">
                                                    <IconButton
                                                        onClick={handleTogglePassword}
                                                        onMouseDown={(e) => e.preventDefault()}
                                                        edge="end"
                                                    >
                                                        {showPassword ? (
                                                            <VisibilityOff />
                                                        ) : (
                                                            <Visibility />
                                                        )}
                                                    </IconButton>
                                                </InputAdornment>
                                            ),
                                            disableUnderline: true,
                                        },
                                    }}
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
                                    type={showRepeatPassword ? 'text' : 'password'}
                                    slotProps={{
                                        input: {
                                            endAdornment: (
                                                <InputAdornment position="end">
                                                    <IconButton
                                                        onClick={handleRepeatPasswordToggle}
                                                        onMouseDown={(e) => e.preventDefault()}
                                                        edge="end"
                                                    >
                                                        {showRepeatPassword ? (
                                                            <VisibilityOff />
                                                        ) : (
                                                            <Visibility />
                                                        )}
                                                    </IconButton>
                                                </InputAdornment>
                                            ),
                                            disableUnderline: true,
                                        },
                                    }}
                                />
                            </Grid>
                        </Grid>
                    </AddModal>
                );
            }}
        </Formik>
    );
}
