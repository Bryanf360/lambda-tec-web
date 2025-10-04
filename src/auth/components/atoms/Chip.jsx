import { Chip, useTheme } from "@mui/material";

export default function({
    status
}) {
    const theme = useTheme();
    
    return (
        <Chip
            label={status === "active" ? "Activo" : "Inactivo"}
            sx={{
                bgcolor: status === "active" ? theme.palette.quaternary.main : theme.palette.grey[150],
                color: status === "active" ? theme.palette.white[100] : theme.palette.quaternary.contrastText,
                borderRadius: 1,
                ...theme.typography.h4,
                fontWeight: 500,
                width: 80,
            }}
            size="medium"
        />
    )
}
