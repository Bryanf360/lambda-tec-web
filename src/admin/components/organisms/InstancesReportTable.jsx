import { Typography } from '@mui/material';

import Table from './Table';
import dayjs from 'dayjs';

export default function InstancesReportTable(props) {
    const columns = [
        { id: 'type', label: 'Tipo', minWidth: 100 },
        { id: 'name', label: 'Nombre', minWidth: 175 },
        { id: 'description', label: 'Descripción', minWidth: 225 },
        {
            id: 'brand',
            label: 'Marca',
            minWidth: 50,
            // render: (_, row) => (
            //     <Typography variant="tableCell">{`${row['brand']['name']}`}</Typography>
            // ),
        },
        {
            id: 'model',
            label: 'Modelo',
            minWidth: 125,
            // render: (_, row) => (
            //     <Typography variant="tableCell">{`${row['model']['name']}`}</Typography>
            // ),
        },
        {
            id: 'partNumber',
            label: 'Nro de Parte',
            minWidth: 100,
            // render: (_, row) => (
            //     <Typography variant="tableCell">{`${row['part_number']['name']}`}</Typography>
            // ),
        },
        {
            id: 'unitType',
            label: 'Tipo Unidad',
            minWidth: 100,
            // render: (_, row) => (
            //     <Typography variant="tableCell">{`${row['unit_type']['simbol']} - ${row['unit_type']['name']}`}</Typography>
            // ),
        },
        { id: 'serialNumber', label: 'Número de Serie', minWidth: 125 },
        { id: 'assetNumber', label: 'Número de Activo', minWidth: 125 },
        { id: 'warehouse', label: 'Bodega', minWidth: 150 },
        { id: 'status', label: 'Estado', minWidth: 100 },
        {
            id: 'createdAt',
            label: 'Fecha de Creación',
            minWidth: 150,
            render: (_, row) => (
                <Typography variant="tableCell">
                    {dayjs(row.createdAt).format('DD/MM/YYYY')}
                </Typography>
            ),
        },
    ];

    return (
        <>
            <Table columns={columns} {...props} />
        </>
    );
}
