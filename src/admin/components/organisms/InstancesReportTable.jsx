import { Typography } from '@mui/material';

import Table from './Table';

export default function InstancesReportTable({ data = [], isLoading = false, ...props }) {
    const columns = [
        { id: 'type', label: 'Tipo', minWidth: 200 },
        { id: 'name', label: 'Nombre', minWidth: 200 },
        { id: 'description', label: 'Descripción', minWidth: 200 },
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
            minWidth: 150,
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
        { id: 'serialNumber', label: 'Número de Serie', minWidth: 200 },
        { id: 'assetNumber', label: 'Número de Activo', minWidth: 200 },
        { id: 'warehouse', label: 'Bodega', minWidth: 200 },
        { id: 'createdAt', label: 'Fecha de Creación', minWidth: 200 },
    ];

    return (
        <>
            <Table isLoading={isLoading} columns={columns} data={[]} {...props} />
        </>
    );
}
