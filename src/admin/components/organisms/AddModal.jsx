import {
    Chip,
    DialogActions,
    DialogTitle,
    Grid,
    Typography,
    useTheme,
} from "@mui/material";

import AddBoxIcon from '@mui/icons-material/AddBox';
import EditIcon from '@mui/icons-material/Edit';

import { Button } from "../../../auth/components";
import { Modal } from "../atoms";

export default function AddModal({
    open,
    title,
    mode = "create",
    onClose,
    children,
    hasCenteredButtons = true,
    ...props
}) {
    const theme = useTheme();

    const chipStyles = {
        pointerEvents: 'none',
        borderRadius: 1.25,
        paddingInline: 1,
        paddingBlock: 0.25,
        height: 19,
        backgroundColor: theme.palette.grey[200],
        fontSize: '0.625rem',
        color: 'text.secondary',
        letterSpacing: '-0.011em',
        fontWeight: 500,
        opacity: 0.5,
        '& .MuiChip-label': {
            p: 0,
        }
    }

    return (
        <Modal
            open={open}
            onClose={onClose}
            maxWidth="sm"
            fullWidth
            {...props}
        >
            <Grid
                container
                alignItems="center"
            >
                {mode === "create" ? (
                    <AddBoxIcon sx={{ color: theme.palette.green[100] }} />
                ) : (
                    <EditIcon sx={{ color: theme.palette.green[100] }} />
                )}
                <DialogTitle
                    sx={{ pl: 1, pr: 1.2, }}
                >
                    <Typography
                        variant="modalTitle"
                    >
                        {mode === "create" ? "Crear" : "Editar"} {title}
                    </Typography>
                </DialogTitle>
                <Chip
                    label="Registro 08-04-2024"
                    sx={chipStyles}
                />
            </Grid>
            {children}
            <DialogActions sx={{ padding: 0, }}>
                <Grid container justifyContent={hasCenteredButtons ? "center" : "flex-end"} sx={{ flex: 1, }}>
                    <Button kind="secondary" fullWidth onClick={onClose} sx={{ minWidth: 144.5, width: { sm: 144.5 }, my: { xs: 1, sm: 0, }, mr: { xs: 0, sm: 1, } }}>
                        Cancelar
                    </Button>
                    <Button type="submit" fullWidth form="subscription-form" sx={{ minWidth: 144.5, width: { sm: 144.5 } }}>
                        Guardar
                    </Button>
                </Grid>
            </DialogActions>
        </Modal>
    )
}
