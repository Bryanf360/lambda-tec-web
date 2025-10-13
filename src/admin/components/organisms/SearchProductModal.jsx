import { DialogTitle, Grid, Typography, useTheme } from "@mui/material";
import { Inventory2 } from "@mui/icons-material";

import { Modal } from "../atoms";
import { SearchInput } from "../molecules";
import SearchProductTable from "./SearchProductTable";
import { Button } from "../../../auth/components";

export default function SearchProductModal({
    open,
    onClose,
}) {
    const theme = useTheme();

    return (
        <Modal
            open={open}
            onClose={onClose}
            maxWidth="md"
            fullWidth
        >
            {/* <Grid sx={{ border: '1px solid', }}>
                <DialogTitle sx={{ border: '1px solid', }}>
                    <Typography>asdf</Typography>
                </DialogTitle>
            </Grid> */}
            <Grid
                container
                alignItems="center"
                sx={{ mb: 1.5, }}
            >
                <Inventory2 sx={{ color: theme.palette.green[100] }} />
                <DialogTitle
                    sx={{ padding: 0, pl: 0.5, }}
                >
                    <Typography
                        variant="searchModalTitle"
                    >
                        Buscar Productos
                    </Typography>
                </DialogTitle>
            </Grid>
            <SearchInput
                sx={{ 
                    minWidth: {
                        xs: '100%',
                        sm: 450, 
                    },
                    width: '50%',
                }}
                onChange={() => { }}
            />
            <SearchProductTable
                sx={{ mt: 1.5, }}
            />
            <Grid container justifyContent="flex-end">
                <Button
                    sx={{ width: 200, }}
                >
                    Listo
                </Button>
            </Grid>
        </Modal>
    )
}
