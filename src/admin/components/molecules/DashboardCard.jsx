import { useState } from 'react';

import {
    Box,
    Card,
    CardActionArea,
    CardContent,
    Typography,
    useTheme,
} from '@mui/material'


export default ({
    title,
    quantity,
    svg: SvgComponent,
}) => {
    const theme = useTheme();
    const [hover, setHover] = useState(false);

    return (
        <Card
            onMouseEnter={() => setHover(true)}
            onMouseLeave={() => setHover(false)}
            sx={{
                // maxWidth: 345,
                // width: 328,
                height: 184,
                // px: 4,
                borderRadius: 4,
                '&:hover': {
                    backgroundColor: 'tertiary.main',
                    boxShadow: 3,
                },
                '&:hover .MuiCardMedia-root': {
                    // color: 'white',
                }

            }}
        >
            <CardActionArea sx={{ pt: 4, pb: 2, }}>
                <Box sx={{ justifyContent: 'center', display: 'flex', }}>
                    <SvgComponent fill={hover ? 'white' : theme.palette.tertiary.main }/>
                </Box>
                <CardContent>
                    <Typography 
                        variant="h2" 
                        component="div" 
                        align='center' 
                        color={hover ? 'white' : theme.palette.grey[100]}
                    >
                        {title} {quantity}
                    </Typography>
                </CardContent>
            </CardActionArea>
        </Card>
    )
}
