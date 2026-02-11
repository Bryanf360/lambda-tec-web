import { Typography } from '@mui/material';

import Table from './Table';
import dayjs from 'dayjs';

export default function InputsReportTable({ mode = 'input', ...props }) {
    const columns = [
        {
            id: 'code',
            label: 'Movimiento',
            minWidth: 100,
        },
        {
            id: 'date',
            label: 'Fecha',
            minWidth: 100,
            render: (_, row) => (
                <Typography variant="tableCell">
                    {dayjs(row.createdAt).format('DD/MM/YYYY')}
                </Typography>
            ),
        },
        { id: 'product', label: 'Producto', minWidth: 175 },
        {
            id: 'brand',
            label: 'Marca',
            minWidth: 100,
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
            id: 'quantity',
            label: 'Cantidad',
            minWidth: 100,
            // render: (_, row) => (
            //     <Typography variant="tableCell">{`${row['unit_type']['simbol']} - ${row['unit_type']['name']}`}</Typography>
            // ),
        },
        { id: 'reason', label: 'Motivo', minWidth: 175 },
        {
            id: mode === 'input' ? 'supplier' : 'client',
            label: mode === 'input' ? 'Proveedor' : 'Cliente',
            minWidth: 100,
            // render: (_, row) => (
            //     <Typography variant="tableCell">{`${row['unit_type']['simbol']} - ${row['unit_type']['name']}`}</Typography>
            // ),
        },
    ];

    return (
        <>
            <Table columns={columns} {...props} />
        </>
    );
}
