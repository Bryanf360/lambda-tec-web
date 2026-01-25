import { useEffect, useState } from 'react';

import { IconButton, Typography, useTheme } from '@mui/material';
import { Delete } from '@mui/icons-material';

import { Select } from '../../../core/components';
import Table from './Table';
import { TextField } from '../../../auth/components';
import {
    activeNumbers,
    inputs,
    productInstances,
    serialNumbers,
    statuses,
    // warehouses,
} from '../../../data/dummyData';
import { DeleteModal, SerialNumberSelect } from '../atoms';
import { useRows, useWarehousesStore } from '../../hooks';
import { decreaseQuantity, deleteSelectedProduct } from '../../slices/inputsSlice';
import { useDispatch } from 'react-redux';
import { toast } from 'react-toastify';

export default function InputsTable({
    data = [],
    updateRow,
    deleteRow,
    isLoading = false,
    mode = 'input',
    ...props
}) {
    const [selectedStatus, setSelectedStatus] = useState(statuses[0].id);
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
    const dispatch = useDispatch();
    const theme = useTheme();
    const usedInstanceIds = data.map((r) => r.instanceId).filter(Boolean);
    // const [selectedWarehouse, setSelectedWarehouse] = useState(warehouses[0].id);
    const { warehouses, startLoadingWarehouses } = useWarehousesStore();

    useEffect(() => {
        startLoadingWarehouses();
    }, []);

    const handleWarehouseSelectChange = (event) => {
        // setSelectedWarehouse(event.target.value);
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
                        updateRow(row.rowId, 'status', '');
                    }}
                    options={warehouses}
                    name="warehouse"
                    disabled={
                        (mode === 'output' && row.isConsumable) ||
                        (row.singleWarehouse && row.index !== 1)
                    }
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

                return mode === 'input' ? (
                    <TextField
                        placeholder="Ingrese n°"
                        sx={textFieldStyles}
                        onChange={(e) => {
                            const validatedValue = e.target.value.replace(/[^A-Za-z0-9-]/g, '');
                            e.target.value = validatedValue;
                            updateRow(row.rowId, 'serialNumber', validatedValue);
                        }}
                    />
                ) : (
                    <SerialNumberSelect
                        productId={row.productId}
                        warehouseId={row.warehouse}
                        value={row.instanceId}
                        onSelect={(instance) => {
                            updateRow(
                                row.rowId,
                                'instanceId',
                                instance?.product_instance_id ?? null
                            );
                            // TODO: validate if is neccessary serialNumber and assetNumber
                            // updateRow(row.rowId, 'serialNumber', instance.serialNumber);
                            // updateRow(row.rowId, 'assetNumber', instance.assetNumber);
                            // const value = instance.status === 'new' ? 1 : 2;
                            const value =
                                instance?.status === 'new'
                                    ? 1
                                    : instance?.status === 'used'
                                      ? 2
                                      : '';
                            updateRow(row.rowId, 'status', value);
                        }}
                        usedInstanceIds={usedInstanceIds}
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

                return mode === 'input' ? (
                    <TextField
                        placeholder="Ingrese n°"
                        sx={textFieldStyles}
                        onChange={(e) => {
                            const validatedValue = e.target.value.replace(/[^A-Za-z0-9-]/g, '');
                            e.target.value = validatedValue;
                            updateRow(row.rowId, 'assetNumber', validatedValue);
                        }}
                    />
                ) : (
                    // TODO: mejorar componente reusable
                    <SerialNumberSelect
                        productId={row.productId}
                        warehouseId={row.warehouse}
                        value={row.instanceId}
                        onSelect={(instance) => {
                            updateRow(
                                row.rowId,
                                'instanceId',
                                instance?.product_instance_id ?? null
                            );
                            // TODO: validate if is neccessary serialNumber and assetNumber
                            // updateRow(row.rowId, 'serialNumber', instance.serialNumber);
                            // updateRow(row.rowId, 'assetNumber', instance.assetNumber);
                            // const value = instance.status === 'new' ? 1 : 2;
                            const value =
                                instance?.status === 'new'
                                    ? 1
                                    : instance?.status === 'used'
                                      ? 2
                                      : '';
                            updateRow(row.rowId, 'status', value);
                        }}
                        getOptionLabel={(o) => o.asset_number}
                        usedInstanceIds={usedInstanceIds}
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
                        disabled={mode === 'output'}
                    />
                );
            },
        },
        {
            id: 'amountToEnter',
            label: mode === 'input' ? 'Cantidad a Ingresar' : 'Cantidad a Salir',
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
                        onChange={(e) => {
                            const validatedValue = e.target.value.replace(/[^0-9]/g, '');
                            e.target.value = validatedValue;
                            if (validatedValue > row.quantity) {
                                return toast.error(
                                    'La cantidad a ingresar no debe ser mayor a la cantidad escogida'
                                );
                            }
                            updateRow(row.rowId, 'amountToEnter', validatedValue);
                        }}
                        value={row.quantity}
                        disabled
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
                            // console.log('row: ', row);
                            /*
                            if (row.index === 1) {
                                const isSure = confirm(
                                    '¿Estás seguro de que deseas quitar este producto?'
                                );
                                if (isSure) {
                                    // Aquí va la lógica para borrar
                                    dispatch(deleteSelectedProduct(row.productId));
                                }
                                return;
                            }
                                */
                            if (row.isConsumable) {
                                dispatch(deleteSelectedProduct(row.productId));
                                return;
                            }
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
                havePagination={false}
                {...props}
            />
            <DeleteModal open={isDeleteModalOpen} onClose={handleDeleteModalClose} />
        </>
    );
}
