import { useState } from "react";

import { IconButton, Typography, useTheme } from "@mui/material";
import { Delete } from "@mui/icons-material";

import { Select } from "../../../core/components";
import Table from "./Table";
import { TextField } from "../../../auth/components";
import { inputs, statuses, warehouses } from "../../../data/dummyData";
import { DeleteModal } from "../atoms";

export default function InputsTable() {
    const [selectedWarehouse, setSelectedWarehouse] = useState(warehouses[0].id);
    const [selectedStatus, setSelectedStatus] = useState(statuses[0].id);
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
    const theme = useTheme();

    const handleWarehouseSelectChange = (event) => {
        setSelectedWarehouse(event.target.value);
    }

    const handleStatusSelectChange = (event) => {
        setSelectedStatus(event.target.value);
    }

    const handleDeleteButtonClick = () => {
        setIsDeleteModalOpen(true);
    }

    const handleDeleteModalClose = () => {
        setIsDeleteModalOpen(false);
    }

    const textFieldStyles = {
        '& .MuiFilledInput-input': {
            paddingInline: 1.5,
            paddingBlock: 1,
            border: '1px solid rgba(0, 0, 0, 0.2)',
            borderRadius: 2.5,
            ...theme.typography.selectText
        }
    }

    const columns = [
        { id: 'number', label: 'N°', minWidth: 100 },
        { id: 'name', label: 'Artículo', minWidth: 100 },
        { id: 'quantity', label: 'Cantidad', minWidth: 50 },
        { id: 'unites', label: 'Unidades', minWidth: 100 },
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
                    placeholder="asdf"
                    value={selectedWarehouse}
                    onChange={handleWarehouseSelectChange}
                    options={warehouses}
                    name="warehouse"
                />
            )
        },
        {
            id: 'serialNumber',
            label: 'Nro de Serie',
            minWidth: 150,
            render: (_, row) => {
                if (row.serialNumber === 'N/A') {
                    return <Typography variant="selectText">N/A</Typography>;
                }

                return (
                    <TextField
                        placeholder="Ingrese n°"
                        sx={textFieldStyles}
                    />
                )
            }
        },
        {
            id: 'assetNumber',
            label: 'Nro de Parte',
            minWidth: 150,
            render: (_, row) => (
                <TextField
                    placeholder="Ingrese n°"
                    sx={textFieldStyles}
                />
            )
        },
        {
            id: 'status',
            label: 'Estado',
            minWidth: 150,
            render: (_, row) => (
                <Select
                    // label="label"
                    // placeholder="asdf"
                    value={selectedStatus}
                    onChange={handleStatusSelectChange}
                    options={statuses}
                    name="status"
                />
            )
        },
        {
            id: 'amountToEnter',
            label: 'Cantidad a Ingresar',
            minWidth: 170,
            render: (_, row) => (
                <TextField
                    placeholder="Ingrese cantidad"
                    sx={{
                        '& .MuiInputBase-input': {
                            textAlign: 'center',
                        },
                        ...textFieldStyles,
                    }}
                />
            )
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
                    <IconButton color="error" size="small" onClick={handleDeleteButtonClick}>
                        <Delete />
                    </IconButton>
                    {/* <IconButton color="info" size="small" onClick={() => handleViewButtonClick(row)}>
                    <Visibility />
                </IconButton> */}
                </>
            )
        }
    ];

    return (
        <>
            <Table
                columns={columns}
                data={inputs}
            />
            <DeleteModal
                open={isDeleteModalOpen}
                onClose={handleDeleteModalClose}
            />
        </>
    )
}
