import { useState } from 'react';

import { IconButton, Typography, useTheme } from '@mui/material';
import { Delete } from '@mui/icons-material';

import { Select } from '../../../core/components';
import Table from './Table';
import { TextField } from '../../../auth/components';
import { inputs, statuses, warehouses } from '../../../data/dummyData';
import { DeleteModal } from '../atoms';
import { useRows } from '../../hooks';
import { decreaseQuantity } from '../../slices/inputsSlice';
import { useDispatch } from 'react-redux';

export default function InputsTable({
    data = [],
    updateRow,
    deleteRow,
    isLoading = false,
    total,
    page,
    limit,
    onPageChange,
    onRowsPerPageChange,
    ...props
}) {
    const [selectedWarehouse, setSelectedWarehouse] = useState(warehouses[0].id);
    const [selectedStatus, setSelectedStatus] = useState(statuses[0].id);
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
    console.log(total);
    const dispatch = useDispatch();

    const theme = useTheme();

    const handleWarehouseSelectChange = (event) => {
        setSelectedWarehouse(event.target.value);
    };

    const handleStatusSelectChange = (event) => {
        // setSelectedStatus(event.target.value);
        // updateRow(row.rowId, 'status', e.target.value);
    };

    const handleDeleteButtonClick = () => {
        setIsDeleteModalOpen(true);
    };

    const handleDeleteModalClose = () => {
        setIsDeleteModalOpen(false);
    };

    const textFieldStyles = {
        '& .MuiFilledInput-input': {
            paddingInline: 1.5,
            paddingBlock: 1,
            border: '1px solid rgba(0, 0, 0, 0.2)',
            borderRadius: 2.5,
            ...theme.typography.selectText,
        },
    };

    const columns = [
        {
            id: 'productIndex',
            label: 'N°',
            minWidth: 100,
            render: (_, row) => {
                return row.index === 1 ? row.productIndex : '';
            },
        },
        {
            id: 'name',
            label: 'Artículo',
            minWidth: 100,
            render: (_, row) => {
                return row.index === 1 ? row.name : '';
            },
        },
        {
            id: 'quantity',
            label: 'Catindad',
            minWidth: 100,
            render: (_, row) => {
                return row.index === 1 ? row.quantity : '';
            },
        },
        // { id: 'quantity', label: 'Cantidad', minWidth: 50 },
        {
            id: 'unites',
            label: 'Unidades',
            minWidth: 100,
            render: (_, row) => {
                return row.index === 1 ? row.unites : '';
            },
        },
        {
            id: 'warehouse',
            label: 'Bodega',
            minWidth: 150,
            render: (_, row) => (
                // <FormAutocomplete
                //     options={warehouses}
                //     value={selectedWarehouse}
                //     onChange={(event, value) => setSelectedWarehouse(value)}
                //     placeholder="-"
                //     getOptionLabel={(option) => option.value}
                //     isOptionEqualToValue={(option, val) => option.id === val.id}
                //     haveAddButton={false}
                // />
                <Select
                    // label="label"
                    placeholder="--"
                    value={row.warehouse}
                    onChange={(e) => {
                        updateRow(row.rowId, 'warehouse', e.target.value);
                    }}
                    options={warehouses}
                    name="warehouse"
                />
            ),
        },
        {
            id: 'serialNumber',
            label: 'Nro de Serie',
            minWidth: 150,
            render: (_, row) => {
                if (row.isConsumable) {
                    return <Typography variant="selectText">N/A</Typography>;
                }

                return (
                    <TextField
                        placeholder="Ingrese n°"
                        sx={textFieldStyles}
                        onChange={(e) => updateRow(row.rowId, 'serialNumber', e.target.value)}
                    />
                );
            },
        },
        {
            id: 'assetNumber',
            label: 'Nro de Activo',
            minWidth: 150,
            render: (_, row) => {
                if (row.isConsumable) {
                    return <Typography variant="selectText">N/A</Typography>;
                }

                return (
                    <TextField
                        placeholder="Ingrese n°"
                        sx={textFieldStyles}
                        onChange={(e) => updateRow(row.rowId, 'assetNumber', e.target.value)}
                    />
                );
            },
        },
        {
            id: 'status',
            label: 'Estado',
            minWidth: 150,
            render: (_, row) => {
                if (row.isConsumable) {
                    return <Typography variant="selectText">N/A</Typography>;
                }

                return (
                    <Select
                        // label="label"
                        placeholder="--"
                        value={row.status}
                        // onChange={(e) => handleStatusSelectChange(row)}
                        onChange={(e) => {
                            updateRow(row.rowId, 'status', e.target.value);
                        }}
                        options={statuses}
                        name="status"
                    />
                );
            },
        },
        {
            id: 'amountToEnter',
            label: 'Cantidad a Ingresar',
            minWidth: 170,
            render: (_, row) => {
                return row.isConsumable ? (
                    <TextField
                        placeholder="Ingrese cantidad"
                        sx={{
                            '& .MuiInputBase-input': {
                                textAlign: 'center',
                            },
                            ...textFieldStyles,
                        }}
                        onChange={(e) => updateRow(row.rowId, 'amountToEnter', e.target.value)}
                    />
                ) : (
                    'N/A'
                );
            },
        },
        // {
        //     id: 'status',
        //     label: 'Estado',
        //     minWidth: 100,
        //     render: (value) => (
        //         <Chip
        //             status={value}
        //         />
        //     )
        // },
        {
            id: 'actions',
            label: 'Acciones',
            minWidth: 100,
            render: (_, row) => (
                <>
                    {/* <IconButton color="primary" size="small" onClick={() => handleEditButtonClick(row)}>
                    <Edit />
                </IconButton> */}
                    <IconButton
                        color="error"
                        size="small"
                        onClick={() => {
                            dispatch(decreaseQuantity(row.productId));
                            deleteRow(row.rowId);
                        }}
                    >
                        <Delete />
                    </IconButton>
                    {/* <IconButton color="info" size="small" onClick={() => handleViewButtonClick(row)}>
                    <Visibility />
                </IconButton> */}
                </>
            ),
        },
    ];

    return (
        <>
            <Table
                isLoading={false}
                columns={columns}
                data={data}
                page={page}
                rowsPerPage={limit}
                total={total}
                onPageChange={onPageChange}
                onRowsPerPageChange={onRowsPerPageChange}
                {...props}
            />
            <DeleteModal open={isDeleteModalOpen} onClose={handleDeleteModalClose} />
        </>
    );
}
