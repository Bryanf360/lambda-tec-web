import { useEffect, useState } from 'react';

import { Grid, Typography } from '@mui/material';
import { toast } from 'react-toastify';
import PrintIcon from '@mui/icons-material/Print';

import { CardLayout, DatePicker, InputsReportTable, InstancesReportTable } from '../components';
import { useInstancesStore, useMovementsStore } from '../hooks';
import { Button } from '../../auth/components';
import lambdaTecApi from '../../core/api/lambdaTecApi';
import dayjs from 'dayjs';

export default function InputsReportPage() {
    const { isLoading, movements, meta, startLoadingMovements } = useMovementsStore();
    const [page, setPage] = useState(meta.page - 1);
    const [limit, setLimit] = useState(meta.limit);
    const [dateFrom, setDateFrom] = useState(dayjs());
    const [dateTo, setDateTo] = useState(dayjs());

    useEffect(() => {
        if (dateFrom && dateTo && dayjs(dateFrom).isAfter(dayjs(dateTo), 'day')) {
            toast.error('La fecha "Desde" no puede ser mayor que "Hasta"');
            return;
        }
        startLoadingMovements({
            page: page + 1,
            limit,
            dateFrom: dateFrom.format('YYYY-MM-DD'),
            dateTo: dateTo.format('YYYY-MM-DD'),
        });
    }, [page, limit, dateFrom, dateTo]);

    const handleChangePage = (event, newPage) => {
        // TODO: test pagination to reset to 5
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setLimit(parseInt(event.target.value, 10));
        setPage(0);
    };

    const handleExportButtonClick = async () => {
        const dDateFrom = dateFrom.format('YYYY-MM-DD');
        const dDateTo = dateTo.format('YYYY-MM-DD');
        try {
            // TODO: move consume of api to custom hook de instances
            const response = await lambdaTecApi.get(
                `/reports/inputs/export?dateFrom=${dDateFrom}&dateTo=${dDateTo}`,
                {
                    responseType: 'blob',
                }
            );

            const blob = new Blob([response.data], {
                type: 'application/pdf',
            });

            const url = window.URL.createObjectURL(blob);

            const link = document.createElement('a');
            link.href = url;
            link.download = 'historial-ingresos-productos.pdf';
            document.body.appendChild(link);
            link.click();
            link.remove();

            window.URL.revokeObjectURL(url);
        } catch (err) {
            console.error('Error descargando PDF', err);
            alert('No se pudo descargar el reporte');
        }
    };

    return (
        <CardLayout>
            <Grid xs={12}>
                <Typography variant="h1" sx={{ mr: 5, mb: 2 }}>
                    Historial de Ingresos de Productos
                </Typography>
            </Grid>
            <Grid container sx={{ flexDirection: 'row', justifyContent: 'space-between', mb: 3 }}>
                <Grid container>
                    <DatePicker
                        labelText="Fecha desde"
                        value={dateFrom}
                        onChange={(newValue) => {
                            console.log('dateFrom: ', newValue);
                            setDateFrom(newValue);
                        }}
                        marginEnd={3}
                        maxDate={dayjs()}
                        containerStyles={{ mb: 1, mt: 1 }}
                    />
                    <DatePicker
                        labelText="Fecha hasta"
                        value={dateTo}
                        onChange={(newValue) => {
                            console.log('dateTo: ', dateTo);
                            setDateTo(newValue);
                        }}
                        marginEnd={3}
                        maxDate={dayjs()}
                        containerStyles={{ mb: 1, mt: 1 }}
                    />
                </Grid>
                <Grid>
                    <Button
                        kind="tertiary"
                        startIcon={<PrintIcon />}
                        sx={{ mt: 1 }}
                        onClick={handleExportButtonClick}
                    >
                        Exportar Pdf
                    </Button>
                </Grid>
            </Grid>

            {/* <Button variant="contained" kind="primary" onClick={handleInstancesButtonClick}>
                Instancias
            </Button>
            <Button variant="contained" kind="primary" onClick={handleInstancesButtonClick}>
                Instancias
            </Button> */}
            {/* <InstancesReportTable
                isLoading={isLoading}
                data={instances}
                page={page}
                total={meta.total}
                rowsPerPage={limit}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
            /> */}
            <InputsReportTable
                isLoading={isLoading}
                data={movements}
                page={page}
                total={meta.total}
                rowsPerPage={limit}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
            />
        </CardLayout>
    );
}
