import { useEffect } from 'react';

import { Grid, Typography } from '@mui/material';

import { CardLayout, InstancesReportTable } from '../components';
import { useInstancesStore } from '../hooks';

export default function InstancesReportPage() {
    const { isLoading, instances, startLoadingInstances } = useInstancesStore();

    useEffect(() => {
        startLoadingInstances();
    }, []);

    return (
        <CardLayout>
            <Grid xs={12}>
                <Typography variant="h1" sx={{ mr: 5, mb: 2 }}>
                    Instancias
                </Typography>
            </Grid>
            {/* <Button variant="contained" kind="primary" onClick={handleInstancesButtonClick}>
                Instancias
            </Button>
            <Button variant="contained" kind="primary" onClick={handleInstancesButtonClick}>
                Instancias
            </Button> */}
            <InstancesReportTable isLoading={isLoading} data={[]} />
        </CardLayout>
    );
}
