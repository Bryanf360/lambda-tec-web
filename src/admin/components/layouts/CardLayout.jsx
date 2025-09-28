import { Card, Typography } from "@mui/material"

export const CardLayout = ({
    title,
    children,
}) => {
    return (
        <Card
            sx={{
                borderRadius: 4,
                p: 2,
                mt: 2,
            }}
        >
            <Typography variant="h1">{title}</Typography>
            {children}
        </Card>
    )
}
