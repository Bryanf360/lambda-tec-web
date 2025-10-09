import { Chip, Dialog, DialogActions, DialogTitle, Grid, Typography, useTheme } from "@mui/material";

import AddBoxIcon from '@mui/icons-material/AddBox';

import Modal from "./Modal";
import { Button } from "../../../auth/components";

export default function AddModal({
    open,
    title,
    onClose,
    children
}) {
    const theme = useTheme()

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
        >
            <Grid
                container
                alignItems="center"
            >
                <AddBoxIcon sx={{ color: theme.palette.green[100] }} />
                <DialogTitle
                    sx={{ pl: 1, pr: 1.2, }}
                >
                    <Typography
                        variant="modalTitle"
                    >
                        {title}
                    </Typography>
                </DialogTitle>
                <Chip
                    label="Registro 08-04-2024"
                    sx={chipStyles}
                />
            </Grid>
            {children}
            <DialogActions>
                <Grid container justifyContent="center">
                    <Button kind="secondary" onClick={onClose} sx={{ minWidth: 144.5, mb: { xs: 1, sm: 0 }, mr: { md: 1 } }}>
                        Cancel
                    </Button>
                    <Button type="submit" form="subscription-form" sx={{ minWidth: 144.5, }}>
                        Guardar
                    </Button>
                </Grid>
            </DialogActions>
        </Modal>
    )
}
