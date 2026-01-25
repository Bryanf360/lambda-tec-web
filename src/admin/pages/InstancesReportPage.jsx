import { useEffect, useState } from 'react';

import { Grid, IconButton, Typography } from '@mui/material';
import { toast } from 'react-toastify';
import PrintIcon from '@mui/icons-material/Print';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

import { CardLayout, DatePicker, InstancesReportTable } from '../components';
import { useInstancesStore } from '../hooks';
import { Button } from '../../auth/components';
import lambdaTecApi from '../../core/api/lambdaTecApi';
import dayjs from 'dayjs';
import { useNavigate } from 'react-router-dom';

export default function InstancesReportPage() {
    const { isLoading, instances, meta, startLoadingInstances } = useInstancesStore();
    const [page, setPage] = useState(meta.page - 1);
    const [limit, setLimit] = useState(meta.limit);
    const [dateFrom, setDateFrom] = useState(dayjs());
    const [dateTo, setDateTo] = useState(dayjs());
    const navigate = useNavigate();

    useEffect(() => {
        if (dateFrom && dateTo && dayjs(dateFrom).isAfter(dayjs(dateTo), 'day')) {
            toast.error('La fecha "Desde" no puede ser mayor que "Hasta"');
            return;
        }
        startLoadingInstances({
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
                `/reports/instances/export?dateFrom=${dDateFrom}&dateTo=${dDateTo}`,
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
            link.download = 'productos-en-bodega.pdf';
            document.body.appendChild(link);
            link.click();
            link.remove();

            window.URL.revokeObjectURL(url);
        } catch (err) {
            console.error('Error descargando PDF', err);
            alert('No se pudo descargar el reporte');
        }
    };

    const hanldeBackButtonClick = () => {
        navigate('/reports');
    };

    return (
        <CardLayout>
            <Grid container alignItems="center" sx={{ mb: 2 }}>
                <IconButton
                    sx={{
                        backgroundColor: 'secondary.main',
                        borderRadius: 2,
                        boxShadow: '0px 2px 6px rgba(0, 0, 0, 0.1)',
                        padding: 1,
                        '&:hover': {
                            backgroundColor: '#f5f5f5',
                        },
                    }}
                    onClick={hanldeBackButtonClick}
                >
                    <ArrowBackIcon sx={{ color: '#C49B5B' }} />
                </IconButton>
                <Typography variant="h1" sx={{ m: 3 }}>
                    Productos en Bodega
                </Typography>
            </Grid>
            <Grid container sx={{ flexDirection: 'row', justifyContent: 'space-between', mb: 3 }}>
                <Grid container>
                    <DatePicker
                        labelText="Fecha desde"
                        value={dateFrom}
                        onChange={(newValue) => {
                            if (
                                newValue &&
                                dateTo &&
                                dayjs(newValue).isAfter(dayjs(dateTo), 'day')
                            ) {
                                toast.error('La fecha "Desde" no puede ser mayor que "Hasta"');
                                return;
                            }
                            setPage(0);
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
                            if (
                                dateFrom &&
                                newValue &&
                                dayjs(dateFrom).isAfter(dayjs(newValue), 'day')
                            ) {
                                toast.error('La fecha "Desde" no puede ser mayor que "Hasta"');
                                return;
                            }
                            setPage(0);
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
            <InstancesReportTable
                isLoading={isLoading}
                data={instances}
                page={page}
                total={meta.total}
                limit={limit}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
            />
        </CardLayout>
    );
}
