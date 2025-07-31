import { Box, Button, Grid, InputAdornment, MenuItem, Select, TextField, Typography } from "@mui/material";
import PersonIcon from '@mui/icons-material/Person';
import LockIcon from '@mui/icons-material/Lock';
import { useState } from "react";

export const AuthPage = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [rol, setRole] = useState("technical");

    const handleLoginButtonPress = (e) => {
        e.preventDefault();
        console.log({
            email,
            password,
            rol
        })
    }
    
    const handleRolSelectChange = (e) => {
        // console.log('e: ', e)
        // e.preventDefault();
        // const { value } = target;
        // setRole(value);
    }
    
    return (
        <Grid
            sx={{ height: '100vh', }}
            container
            justifyContent="center"
            alignItems="center"
        >
            <Grid 
                container
                sx={{ width: 366, px: 6, }}
                rowSpacing={1}
                component="form"
            >
                <Grid
                    size={12}
                    alignItems="center"
                    container
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
                    size={12}
                >
                    <Typography variant="h5" sx={{ fontWeight: 'bold' }}>Login</Typography>
                </Grid>
                <Grid
                    size={12}
                >
                    <TextField 
                        label="E-mail" 
                        variant="filled"
                        value={email}
                        onChange={e => setEmail(e.target.value)}
                        required
                        slotProps={{
                            input: {
                                startAdornment: (
                                    <InputAdornment position="start">
                                        <PersonIcon />
                                    </InputAdornment>
                                )
                            }
                        }}
                    />
                </Grid>
                <Grid
                    size={12}
                >
                    <TextField 
                        label="Password" 
                        variant="filled" 
                        type="password"
                        value={password}
                        onChange={e => setPassword(e.target.value)}
                        required
                        slotProps={{
                            input: {
                                startAdornment: (
                                    <InputAdornment position="start">
                                        <LockIcon />
                                    </InputAdornment>
                                )
                            }
                        }}
                    />
                </Grid>
                <Grid>
                    <Select
                        value={rol}
                        label="Rol"
                        onChange={handleRolSelectChange}
                    >
                        <MenuItem value="admin">Admin</MenuItem>
                        <MenuItem value="technical">Técnico</MenuItem>
                    </Select>
                </Grid>
                <Grid
                    size={12}
                >
                    <Button variant="contained" onClick={handleLoginButtonPress} type="submit">Ingresar</Button>
                </Grid>
            </Grid>
        </Grid>
    )
}
