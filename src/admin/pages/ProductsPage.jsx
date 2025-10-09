import { Grid, TextField, Typography } from "@mui/material";
import AddIcon from '@mui/icons-material/Add';
import { useState } from "react";

import { AddModal, CardLayout, DeleteModal, FormAutocomplete, Table } from "../components";
import { Button } from "../../auth/components";
import FormTextField from "../components/atoms/FormInput";
import { SearchInput } from "../components/molecules";
import { useProductsStore } from "../hooks";
import { useDispatch } from "react-redux";
import { setSelectedProduct } from "../slices/productsSlice";

const types = [
    { label: 'Consumible', value: 'consumible' },
    { label: 'Equipo', value: 'equipment' },
];

const brands = [
    { id: 1, value: 'Tecatronik' },
    { id: 2, value: 'Panasonic' },
];

const models = [
    { id: 1, value: '1ZAAA' },
    { id: 2, value: 'PPOSA' }
]

const partNumbers = [
    { id: 1, value: 'PA-1ZAAA' },
    { id: 2, value: 'ZQ-PPOSA' }
]

const unitTypes = [
    { id: 1, value: 'm - Metros' },
    { id: 2, value: 'u - Unidades' }
]

export const ProductsPage = () => {
    const [isOpenModal, setIsOpenModal] = useState(false);
    const [value, setValue] = useState(types[0]);
    const [selectedBrand, setSelectedBrand] = useState(types[0])
    const [selectedModel, setSelectedModel] = useState(models[0]);
    const [selectedPartNumber, setSelectedPartNumber] = useState(partNumbers[0]);
    const [selectedUnitType, setSelectedUnitType] = useState(unitTypes[0]);
    const { selectedProduct } = useProductsStore();
    const dispatch = useDispatch()
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false)
    

    const handleSearchTextChange = (event) => {
        // TODO: implement search
    }

    const handleAddModalClose = () => {
        setIsOpenModal(false);
        setTimeout(() => {
            dispatch(setSelectedProduct(null))
        }, 500)
    }

    const handleAddButtonClick = () => {
        setIsOpenModal(true);
    }

    const handleEditButtonClick = (product) => {
        setIsOpenModal(true);
        dispatch(setSelectedProduct(product))
    }

    const handleDeleteButtonClick = (product) => {
        setIsDeleteModalOpen(true);
    }

    const handleViewButtonClick = (product) => {
    }

    const handleDeleteModalClose = () => {
        setIsDeleteModalOpen(false);
    }   

    return (
        <CardLayout>
            <Grid
                sx={{
                    mb: 2,
                }}
                alignItems="center"
                container
                rowGap={3}
            >
                <Grid xs={12}>
                    <Typography variant="h1" sx={{ mr: 5, }}>Artículos</Typography>
                </Grid>
                <Grid xs={12}>
                    <Button
                        kind="tertiary"
                        sx={{
                            mr: 5,
                        }}
                        startIcon={<AddIcon />}
                        onClick={handleAddButtonClick}
                    >
                        Añadir
                    </Button>
                </Grid>
                <Grid xs={12}>
                    <SearchInput 
                        placeholder="Buscar..."
                        onChange={handleSearchTextChange}
                    />
                </Grid>
            </Grid>
            <Table 
                onEdit={handleEditButtonClick}
                onDelete={handleDeleteButtonClick}
                onView={handleViewButtonClick}
            />
            <AddModal
                title="Artículo"
                open={isOpenModal}
                onClose={handleAddModalClose}
            >
                <Grid container spacing={1}>
                    <Grid size={{ xs: 12, sm: 6 }}>
                        <FormTextField
                            labelText="Nombre*"
                            placeholder="Ingrese el nombre"
                            sx={{ mb: 2, }}
                        />
                        <FormAutocomplete
                            labelText="Tipo*"
                            options={types}
                            value={value}
                            onChange={(event, value) => setValue(value)}
                            placeholder="Seleccione un tipo"
                            getOptionLabel={(option) => option.label}
                            isOptionEqualToValue={(option, val) => option.value === val.value}
                            mb={2}
                        />
                        <FormAutocomplete
                            labelText="Marca*"
                            options={brands}
                            value={selectedBrand}
                            onChange={(event, value) => setSelectedBrand(value)}
                            placeholder="Seleccione un tipo"
                            getOptionLabel={(option) => option.value}
                            isOptionEqualToValue={(option, val) => option.id === val.id}
                            mb={2}
                        />
                        <FormAutocomplete
                            labelText="Modelo*"
                            options={models}
                            value={selectedModel}
                            onChange={(event, value) => setSelectedModel(value)}
                            placeholder="Seleccione un modelo"
                            getOptionLabel={(option) => option.value}
                            isOptionEqualToValue={(option, val) => option.id === val.id}
                            mb={2}
                        />handleDeleteModalClose
                    </Grid>
                    <Grid size={{ xs: 12, sm: 6 }}>
                        <FormAutocomplete
                            labelText="Número de Parte*"
                            options={partNumbers}
                            value={selectedPartNumber}
                            onChange={(event, value) => setSelectedPartNumber(value)}
                            placeholder="Seleccione un número de parte"
                            getOptionLabel={(option) => option.value}
                            isOptionEqualToValue={(option, val) => option.id === val.id}
                            mb={2}
                        />
                        <FormAutocomplete
                            labelText="Tipo de Unidad*"
                            options={unitTypes}
                            value={selectedUnitType}
                            onChange={(event, type) => setSelectedUnitType(type)}
                            placeholder="Seleccione el tipo de unidad"
                            getOptionLabel={(option) => option.value}
                            isOptionEqualToValue={(option, val) => option.id === val.id}
                            mb={2}
                        />
                        <FormTextField
                            labelText="Descripción"
                            placeholder="Ingrese la descripción"
                            multiline
                            minRows={3}        // 👈 altura mínima
                            maxRows={6}
                        />
                    </Grid>
                </Grid>
            </AddModal>
            <DeleteModal
                open={isDeleteModalOpen}
                onClose={handleDeleteModalClose}
            />
        </CardLayout>
    )
}
