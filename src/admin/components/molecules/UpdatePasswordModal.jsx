import { Box, IconButton, InputAdornment, useTheme } from '@mui/material';
import LockIcon from '@mui/icons-material/Lock';
import { Form, Formik } from 'formik';
import { toast } from 'react-toastify';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import { useState } from 'react';

import { FormTextField } from '../atoms';
import { AddModal } from '../organisms';
import { updatePasswordValidationSchema } from '../../helpers';
import { useUsersStore } from '../../hooks';

export default function UpdatePasswordModal({ open, onClose, user }) {
    const [showPassword, setShowPassword] = useState(false);
    const [showRepeatPassword, setShowRepeatPassword] = useState(false);
    const { isChangingPassword, changePasswordByUserId } = useUsersStore();
    const theme = useTheme();

    const initialValues = {
        password: '',
        repeatPassword: '',
    };

    const handleFormSubmit = async (values, { resetForm }) => {
        const { password } = values;
        try {
            const message = await changePasswordByUserId(user.user_id, password);
            toast.success(message);
            resetForm();
            onClose();
        } catch (error) {
            console.log('asdf');
            toast.error(error || 'Error interno del servidor');
        }
    };

    const handleTogglePassword = () => {
        setShowPassword((prev) => !prev);
    };

    const handleRepeatPasswordToggle = () => {
        setShowRepeatPassword((prev) => !prev);
    };

    return (
        <Formik
            initialValues={initialValues}
            onSubmit={handleFormSubmit}
            validationSchema={updatePasswordValidationSchema}
        >
            {({ values, errors, touched, handleChange, handleSubmit, resetForm }) => {
                return (
                    <AddModal
                        title="Cambiar Contraseña"
                        open={open}
                        onClose={() => {
                            resetForm();
                            onClose();
                        }}
                        onSubmit={handleSubmit}
                        maxWidth="xs"
                        fullWidth
                        showDate={false}
                        isLoading={isChangingPassword}
                        mode="none"
                        titleIcon={<LockIcon sx={{ color: theme.palette.green[100] }} />}
                    >
                        <Box component={Form}>
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
                        </Box>
                    </AddModal>
                );
            }}
        </Formik>
    );
}
