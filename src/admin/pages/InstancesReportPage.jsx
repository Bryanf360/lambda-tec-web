import { useEffect, useState } from 'react';

import { Grid, Typography } from '@mui/material';

import { CardLayout, InstancesReportTable } from '../components';
import { useInstancesStore } from '../hooks';

export default function InstancesReportPage() {
    const { isLoading, instances, meta, startLoadingInstances } = useInstancesStore();
    const [page, setPage] = useState(meta.page - 1);
    const [limit, setLimit] = useState(meta.limit);

    useEffect(() => {
        startLoadingInstances({ page: page + 1, limit });
    }, [page, limit]);

    const handleChangePage = (event, newPage) => {
        // TODO: test pagination to reset to 5
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setLimit(parseInt(event.target.value, 10));
        setPage(0);
    };

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
            <InstancesReportTable
                isLoading={isLoading}
                data={instances}
                page={page}
                total={meta.total}
                rowsPerPage={limit}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
            />
        </CardLayout>
    );
}
