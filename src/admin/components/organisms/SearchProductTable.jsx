import { ShoppingCartCheckout } from '@mui/icons-material';
import { Checkbox, IconButton, Typography, useTheme } from '@mui/material';
import { useEffect, useState } from 'react';

import { toast } from 'react-toastify';
import { useDispatch, useSelector } from 'react-redux';

import { TextField } from '../../../auth/components';
import Table from './Table';
import { products } from '../../../data/dummyData';
import { useProductsStore } from '../../hooks';
import { setSelectedProducts } from '../../slices/inputsSlice';

export default function SearchProductTable({
    isLoading,
    data,
    total,
    page,
    limit,
    onPageChange,
    onRowsPerPageChange,
    ...props
}) {
    const [selectedProductInputs, setSelectedProductInputs] = useState({});
    const selectedProducts = useSelector((state) => state.inputs.selectedProducts);
    const theme = useTheme();
    const dispatch = useDispatch();

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
        // { id: 'code', label: 'Código', minWidth: 100 },
        { id: 'name', label: 'Producto', minWidth: 200 },
        // { id: 'provider', label: 'Proveedor', minWidth: 100 },
        { id: 'description', label: 'Descripción', minWidth: 300 },
        {
            id: 'type',
            label: 'Tipo',
            minWidth: 75,
            render: (_, row) => (
                <Typography variant="tableCell">
                    {row['type'] === 'equipment' ? 'Equipo' : 'Consumible'}
                </Typography>
            ),
        },
        {
            id: 'unit_type',
            label: 'Unidad',
            minWidth: 100,
            render: (_, row) => (
                <Typography variant="tableCell">{`${row['unit_type']['simbol']} - ${row['unit_type']['name']}`}</Typography>
            ),
        },
        {
            id: 'quantity',
            label: 'Cantidad',
            minWidth: 125,
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
                <TextField
                    sx={{
                        '& .MuiInputBase-input': {
                            textAlign: 'center',
                        },
                        ...textFieldStyles,
                    }}
                    value={
                        selectedProductInputs[row.id]?.quantity ??
                        selectedProducts[row.id]?.quantity ??
                        ''
                    }
                    onChange={(e) => handleQuantityInputChange(row.id, e.target.value)}
                />
            ),
        },
        {
            id: 'singleWarehouse',
            label: 'Una sola Bodega',
            minWidth: 100,
            render: (_, row) => {
                // if (row.serialNumber === 'N/A') {
                //     return <Typography variant="selectText">N/A</Typography>;
                // }

                return (
                    <Checkbox
                        sx={{
                            color: 'primary.main',
                        }}
                        checked={
                            selectedProductInputs[row.id]?.singleWarehouse ??
                            selectedProducts[row.id]?.singleWarehouse ??
                            false
                        }
                        onChange={(e) => handleWarehouseCheckboxChange(row.id, e.target.checked)}
                    />
                );
            },
        },
        // {
        //     id: 'assetNumber',
        //     label: 'Nro de Parte',
        //     minWidth: 125,
        //     render: (_, row) => (
        //         <TextField
        //             sx={{
        //                 '& .MuiInputBase-input': {
        //                     textAlign: 'center',
        //                 },
        //                 ...textFieldStyles,
        //             }}
        //         />
        //     ),
        // },
        {
            id: 'actions',
            label: 'Acciones',
            minWidth: 125,
            render: (_, row) => (
                <>
                    {/* <IconButton color="primary" size="small" onClick={() => handleEditButtonClick(row)}>
                    <Edit />
                </IconButton> */}
                    <IconButton
                        color="error"
                        size="small"
                        onClick={() => handleShoppingCartButtonClick(row)}
                    >
                        <ShoppingCartCheckout sx={{ color: 'primary.main' }} />
                    </IconButton>
                    {/* <IconButton color="info" size="small" onClick={() => handleViewButtonClick(row)}>
                    <Visibility />
                </IconButton> */}
                </>
            ),
        },
    ];

    const handleQuantityInputChange = (id, value) => {
        const onlyNumsValue = value.replace(/\D/g, '');
        if (onlyNumsValue >= 0) {
            setSelectedProductInputs((prev) => ({
                ...prev,
                [id]: { ...prev[id], quantity: Number(onlyNumsValue) },
            }));
        }
    };

    const handleWarehouseCheckboxChange = (id, value) => {
        setSelectedProductInputs((prev) => ({
            ...prev,
            [id]: { ...prev[id], singleWarehouse: value },
        }));
    };

    const handleShoppingCartButtonClick = (row) => {
        const productLocalData = selectedProductInputs[row.id];
        const productStoreData = selectedProducts[row.id];

        const quantity = Number(productLocalData?.quantity ?? productStoreData?.quantity ?? 0);
        const singleWarehouse =
            productLocalData?.singleWarehouse ?? productLocalData?.singleWarehouse ?? false;

        if (!quantity || quantity <= 0) {
            toast.error('Debes ingresar una cantidad');
            return;
        }

        // ✅ Aquí sí sincronizas con Redux (tu store global)
        dispatch(
            setSelectedProducts({
                ...row,
                quantity,
                singleWarehouse,
            })
        );

        toast.success(
            `${quantity} ${quantity === 1 ? 'unidad' : 'unidades'} de ${row.name} ${
                quantity === 1 ? 'agregada' : 'agregados'
            }`
        );
    };

    return (
        <Table
            isLoading={isLoading}
            page={page}
            rowsPerPage={limit}
            total={total}
            columns={columns}
            data={data}
            onPageChange={onPageChange}
            onRowsPerPageChange={onRowsPerPageChange}
            {...props}
        />
    );
}
