import { Grid, Typography } from '@mui/material';

import { CardLayout } from '../components';
import { Button } from '../../auth/components';
import { useNavigate } from 'react-router-dom';

export default function ReportsPage() {
    const navigate = useNavigate();

    const handleInstancesButtonClick = () => {
        navigate('/report/instances');
    };

    return (
        <CardLayout>
            <Grid xs={12}>
                <Typography variant="h1" sx={{ mr: 5, mb: 2 }}>
                    Recepción de artículos
                </Typography>
            </Grid>
            <Button kind="tertiary" onClick={handleInstancesButtonClick}>
                Productos en Bodega
            </Button>
            {/* <Button variant="contained" kind="primary" onClick={handleInstancesButtonClick}>
                Instancias
            </Button>
            <Button variant="contained" kind="primary" onClick={handleInstancesButtonClick}>
                Instancias
            </Button> */}
        </CardLayout>
    );
}
