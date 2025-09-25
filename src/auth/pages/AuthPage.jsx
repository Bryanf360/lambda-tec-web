import {
    Box,
    FormControl,
    Grid,
    InputAdornment,
    InputLabel,
    MenuItem,
    Typography,
} from "@mui/material";
import PersonIcon from '@mui/icons-material/Person';
import LockIcon from "@mui/icons-material/Lock";
import { useNavigate } from "react-router";

// import { useForm } from "../../ui/hooks/useForm";
import { useState } from "react";
import { TextField, Select, Button } from "../components";
import { useForm } from "../../core/hooks";

export const AuthPage = () => {
    const { email, password, rol, handleFormInputChange, resetForm } = useForm({
        email: '',
        password: '',
        rol: ''
    });
    const [role, setRole] = useState(null);

    const handleRoleChange = (event) => {
        setRole(event.target.value)
    }

    const navigate = useNavigate();

    const handleLoginButtonPress = (e) => {
        e.preventDefault();
        console.log({
            email, password, rol
        })
        resetForm();
        navigate('/admin/products')
    }

    return (
        <Grid
            sx={{ height: '100vh' }}
            container
            justifyContent="center"
            alignItems="center"
            bgcolor="#E4E4E4"
        >
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
                component="form"
                bgcolor="white"
            >
                <Grid
                    size={12}
                    alignItems="center"
                    container
                    sx={{}}
                >
                    <Box
                        component="img"
                        src="/public/logo.png"
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
                        requiered
                        iconLeft={<PersonIcon sx={{ color: '#CFA968', opacity: 0.5 }} />}
                        labelText="E-email"
                    />
                </Grid>
                <Grid
                    size={12}
                >
                    <TextField
                        name="password"
                        placeholder="Ingrese su contraseña"
                        requiered
                        iconLeft={<LockIcon sx={{ color: '#CFA968', opacity: 0.5 }} />}
                        labelText="Password"
                    />
                </Grid>

                <Grid
                    size={12}
                    sx={{ my: 1, }}
                >
                    <Select
                        textLabel="Rol"
                        value={role}
                        name="role"
                        onChange={handleRoleChange}
                        placeholder="Seleccione"
                        labelId="select-label"
                        id="select"
                    >
                        <MenuItem value="admin">Admin</MenuItem>
                        <MenuItem value="technical">Técnico</MenuItem>
                    </Select>
                </Grid>

                <Grid
                    size={12}
                    sx={{ mt: 3, }}
                >
                    <Button
                        variant="contained"
                        onClick={handleLoginButtonPress}
                        type="submit"
                        kind="primary"
                    >
                        Ingresar
                    </Button>
                </Grid>
            </Grid>
        </Grid>
    )
}
