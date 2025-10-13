import { Box, Grid, Typography, useTheme } from "@mui/material";

import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';

import { Button } from "../../../auth/components";
import { Modal } from "../atoms";

const containerStyles = {
    display: 'flex',
    justifyContent: 'center',
    flexDirection: 'column',
    alignItems: 'center',
    textAlign: 'center'
}

const iconContainerStyles = {
    textAlign: 'center',
    verticalAlign: 'center',
    alignItems: 'center',
    justifyContent: 'center',
    display: 'flex',
    width: 24,
    height: 24,
    borderRadius: 7,
    backgroundColor: "error.light",
    padding: 2,
}

export default function DeleteModal({
    open,
    onClose,
    onDelete
}) {
    const theme = useTheme();

    return (
        <Modal
            open={open}
            onClose={onClose}
            maxWidth="xs"
            fullWidth
            padding={4}
        >
            <Box sx={containerStyles}>
                <Box sx={iconContainerStyles}>
                    <ErrorOutlineIcon color="error.dark" />
                </Box>
                <Typography variant="h1" color="black.100" sx={{ my: 3, }}>Borrar Registro</Typography>
                <Typography variant="h3" color="black.50" sx={{ opacity: 0.5, }}>¿Está seguro de eliminar este registro de forma permanente?</Typography>
                <Typography variant="h3" color="black.50" sx={{ opacity: 0.5, mt: 0.5, mb: 3, }}>Esta acción no podrá deshacer.</Typography>
                <Grid container sx={{ width: '100%', }} spacing={1}>
                    <Grid size={6}>
                        <Button kind="secondary" fullWidth onClick={onClose}>Cancelar</Button>
                    </Grid>
                    <Grid size={6}>
                        <Button kind="danger" fullWidth onClick={onDelete}>Eliminar</Button>
                    </Grid>
                </Grid>
            </Box>
        </Modal>
    )
}
