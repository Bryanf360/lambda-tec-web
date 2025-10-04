import { Card, CardContent, Typography } from "@mui/material"

export const CardLayout = ({
    children,
}) => {
    return (
        <Card
            sx={{
                borderRadius: 4,
                p: 2,
                mt: 2,
                width: '100%',
                maxWidth: '100vw',
            }}
        >
            {children}
        </Card>
    )
}
