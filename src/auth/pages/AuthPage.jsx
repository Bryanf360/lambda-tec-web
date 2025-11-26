import { useEffect, useState } from "react";

import {
    Alert,
    Box,
    Grid,
    Typography,
    useTheme,
} from "@mui/material";
import PersonIcon from '@mui/icons-material/Person';
import LockIcon from "@mui/icons-material/Lock";
import { Form, Formik } from "formik";
import { ToastContainer, toast } from 'react-toastify';
import { useNavigate } from "react-router-dom";

import { TextField, Button } from "../components";
import logo from './../assets/logo.png';
import { loginValidationSchema } from "../../admin/helpers";
import { useAuthStore } from "../hooks/useAuthStore";

export const AuthPage = () => {
    const navigate = useNavigate();
    const theme = useTheme();
    const { errorMessage, status, startLogin } = useAuthStore();
    const [isLoading, setIsLoading] = useState(false);

    const handleFormSubmit = (values) => {
        setIsLoading(true)
        startLogin(values.email, values.password)
            .then(() => setIsLoading(false))
    }

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
                    // role: 0,
                }}
                onSubmit={handleFormSubmit}
                validationSchema={loginValidationSchema}
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
                                sx={{
                                    '& .MuiFilledInput-root input': {
                                        borderTopLeftRadius: 0,
                                        borderBottomLeftRadius: 0,
                                        borderBottomRightRadius: 10,
                                    },
                                }}
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
                                sx={{
                                    '& .MuiFilledInput-root input': {
                                        borderTopLeftRadius: 0,
                                        borderBottomLeftRadius: 0,
                                        borderBottomRightRadius: 10,
                                    },
                                }}
                            />
                        </Grid>
                        {/* <Grid
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
                        </Grid> */}
                        <Grid
                            size={12}
                            sx={{ mt: 3, }}
                        >
                            <Button
                                variant="contained"
                                type="submit"
                                kind="primary"
                                fullWidth
                                loading={isLoading}
                                loadingPosition="end"
                            >
                                Ingresar
                            </Button>
                        </Grid>
                    </Grid>
                )}
            </Formik>
            <ToastContainer />
        </Grid>
    )
}
