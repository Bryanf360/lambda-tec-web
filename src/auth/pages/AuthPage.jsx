import { useState } from "react";

import {
    Box,
    Grid,
    Typography,
    useTheme,
} from "@mui/material";
import PersonIcon from '@mui/icons-material/Person';
import LockIcon from "@mui/icons-material/Lock";
import { Form, Formik } from "formik";
import * as Yup from "yup";

import { TextField, Button } from "../components";
import logo from './../assets/logo.png';
import { useNavigate } from "react-router-dom";
import { Select } from "../../core/components";
import { roles } from "../../data/dummyData";

export const AuthPage = () => {
    const navigate = useNavigate();
    const theme = useTheme();

    return (
        <Grid
            sx={{ height: '100vh' }}
            container
            justifyContent="center"
            alignItems="center"
            bgcolor={theme.palette.grey[300]}
        >
            <Formik
                initialValues={{
                    email: '',
                    password: '',
                    role: 0,
                }}
                onSubmit={(values) => {
                    navigate('/admin/dashboard')
                }}
                validationSchema={Yup.object({
                    email: Yup.string()
                        .email("Correo no válido")
                        .required("El correo es requerido"),
                    password: Yup.string()
                        .required("La contraseña es requerida"),
                    role: Yup.number()
                        .notOneOf([0], "El rol es requerido"),
                })}
            >
                {({ values, errors, touched, handleSubmit, handleChange }) => (
                    <Grid
                        container
                        sx={{
                            width: 366,
                            px: 6,
                            borderRadius: 6,
                            paddingBlock: 5,
                            boxShadow: 3,
                        }}
                        rowSpacing={1}
                        component={Form}
                        bgcolor={theme.palette.white[100]}
                        onSubmit={handleSubmit}
                        noValidate
                    >
                        <Grid
                            size={12}
                            alignItems="center"
                            container
                        >
                            <Box
                                component="img"
                                src={logo}
                                alt="Logo"
                                sx={{
                                    height: 57,
                                    width: '100%',
                                }}
                            />
                        </Grid>
                        <Grid
                            sx={{ my: 1 }}
                            size={12}
                        >
                            <Typography variant="h5" sx={{ fontWeight: 'bold' }}>Login</Typography>
                        </Grid>
                        <Grid
                            size={12}
                            sx={{ mb: 1, }}
                        >
                            <TextField
                                name="email"
                                placeholder="Ingrese su correo"
                                required
                                iconLeft={<PersonIcon sx={{ color: '#CFA968', opacity: 0.5 }} />}
                                labelText="E-email"
                                value={values.email}
                                onChange={handleChange}
                                error={Boolean(touched.email && errors.email)}
                                helperText={touched.email && errors.email}
                            />
                        </Grid>
                        <Grid
                            size={12}
                        >
                            <TextField
                                name="password"
                                placeholder="Ingrese su contraseña"
                                required
                                iconLeft={<LockIcon sx={{ color: '#CFA968', opacity: 0.5 }} />}
                                labelText="Password"
                                value={values.password}
                                onChange={handleChange}
                                error={Boolean(touched.password && errors.password)}
                                helperText={touched.password && errors.password}
                            />
                        </Grid>

                        <Grid
                            size={12}
                            sx={{ my: 1, }}
                        >
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
                                options={roles}
                                variant="auth"
                            />
                        </Grid>
                        <Grid
                            size={12}
                            sx={{ mt: 3, }}
                        >
                            <Button
                                variant="contained"
                                type="submit"
                                kind="primary"
                                fullWidth
                            >
                                Ingresar
                            </Button>
                        </Grid>
                    </Grid>
                )}

            </Formik>
        </Grid>
    )
}
