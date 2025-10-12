import { Grid } from "@mui/material";
import { AddModal, FormAutocomplete, FormTextField } from "../";
import { brands, models, partNumbers, types, unitTypes } from "../../../data/dummyData";
import { useState } from "react";

export default function AddProductModal({
    open,
    onClose,
    mode,
}) {
    const [selectedType, setSelectedType] = useState(types[0]);
    const [selectedBrand, setSelectedBrand] = useState(types[0])
    const [selectedModel, setSelectedModel] = useState(models[0]);
    const [selectedPartNumber, setSelectedPartNumber] = useState(partNumbers[0]);
    const [selectedUnitType, setSelectedUnitType] = useState(unitTypes[0]);

    return (
        <AddModal
            title="Artículo"
            open={open}
            onClose={onClose}
            hasCenteredButtons={false}
            mode={mode}
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
                        value={selectedType}
                        onChange={(event, value) => setSelectedType(value)}
                        placeholder="Seleccione un tipo"
                        getOptionLabel={(option) => option.name}
                        isOptionEqualToValue={(option, val) => option.id === val.id}
                        mb={2}
                    />
                    <FormAutocomplete
                        labelText="Marca*"
                        options={brands}
                        value={selectedBrand}
                        onChange={(event, value) => setSelectedBrand(value)}
                        placeholder="Seleccione un tipo"
                        getOptionLabel={(option) => option.name}
                        isOptionEqualToValue={(option, val) => option.id === val.id}
                        mb={2}
                    />
                    <FormAutocomplete
                        labelText="Modelo*"
                        options={models}
                        value={selectedModel}
                        onChange={(event, value) => setSelectedModel(value)}
                        placeholder="Seleccione un modelo"
                        getOptionLabel={(option) => option.name}
                        isOptionEqualToValue={(option, val) => option.id === val.id}
                        mb={2}
                    />
                </Grid>
                <Grid size={{ xs: 12, sm: 6 }}>
                    <FormAutocomplete
                        labelText="Número de Parte*"
                        options={partNumbers}
                        value={selectedPartNumber}
                        onChange={(event, value) => setSelectedPartNumber(value)}
                        placeholder="Seleccione un número de parte"
                        getOptionLabel={(option) => option.name}
                        isOptionEqualToValue={(option, val) => option.id === val.id}
                        mb={2}
                    />
                    <FormAutocomplete
                        labelText="Tipo de Unidad*"
                        options={unitTypes}
                        value={selectedUnitType}
                        onChange={(event, type) => setSelectedUnitType(type)}
                        placeholder="Seleccione el tipo de unidad"
                        getOptionLabel={(option) => option.name}
                        isOptionEqualToValue={(option, val) => option.id === val.id}
                        mb={2}
                    />
                    <FormTextField
                        labelText="Descripción"
                        placeholder="Ingrese la descripción"
                        multiline
                        minRows={3}
                        maxRows={6}
                    />
                </Grid>
            </Grid>
        </AddModal>
    )
}
