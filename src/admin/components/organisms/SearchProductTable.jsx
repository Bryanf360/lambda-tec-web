import { CheckBox, ShoppingCartCheckout } from "@mui/icons-material";
import { TextField } from "../../../auth/components";
import Table from "./Table";
import { products } from "../../../data/dummyData";
import { IconButton, useTheme } from "@mui/material";

export default function SearchProductTable({
    ...props
}) {
    const theme = useTheme();

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
        { id: 'code', label: 'Código', minWidth: 100 },
        { id: 'product', label: 'Producto', minWidth: 150 },
        { id: 'provider', label: 'Proveedor', minWidth: 100 },
        { id: 'description', label: 'Descripción', minWidth: 100 },
        { id: 'type', label: 'Tipo', minWidth: 50 },
        { id: 'unity', label: 'Unidad', minWidth: 100 },
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
                        ...textFieldStyles
                    }}
                />
            )
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
                    <CheckBox
                        sx={{
                            color: "primary.main"
                        }}
                    />
                )
            }
        },
        {
            id: 'assetNumber',
            label: 'Nro de Parte',
            minWidth: 125,
            render: (_, row) => (
                <TextField
                    sx={{
                        '& .MuiInputBase-input': {
                            textAlign: 'center',
                        },
                        ...textFieldStyles
                    }}
                />
            )
        },
        {
            id: 'actions',
            label: 'Acciones',
            minWidth: 125,
            render: (_, row) => (
                <>
                    {/* <IconButton color="primary" size="small" onClick={() => handleEditButtonClick(row)}>
                    <Edit />
                </IconButton> */}
                    <IconButton color="error" size="small" onClick={handleShoppingCartButtonClick}>
                        <ShoppingCartCheckout sx={{ color: "primary.main" }} />
                    </IconButton>
                    {/* <IconButton color="info" size="small" onClick={() => handleViewButtonClick(row)}>
                    <Visibility />
                </IconButton> */}
                </>
            )
        }
    ];

    const handleShoppingCartButtonClick = () => {

    }
    
    return (
        <Table
            columns={columns}
            data={products}
            {...props}
        />
  )
}

