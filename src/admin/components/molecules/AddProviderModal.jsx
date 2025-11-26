import { useState } from "react";

import { Grid } from "@mui/material";

import { AddModal, FormTextField } from "../";
import { Select } from "../../../core/components";
import { cities, provinces } from "../../../data/dummyData";

export default function AddProviderModal({
    open,
    onClose,
}) {
    const [selectedProvince, setSelectedProvince] = useState(0)
    const [selectedCity, setSelectedCity] = useState(0)

    const handleSelectedProvinceChange = (event) => {
        setSelectedProvince(event.target.value);
    }

    const handleSelectedCityChange = (event) => {
        setSelectedCity(event.target.value);
    }

    return (
        <AddModal
            title="Proveedor"
            open={open}
            onClose={onClose}
            hasCenteredButtons={false}
        >
            <Grid container spacing={1}>
                <Grid size={{ xs: 12, sm: 6 }}>
                    <FormTextField
                        labelText="Nombres*"
                        placeholder="Ingrese los nombres"
                        sx={{ mb: 2, }}
                    />
                    <FormTextField
                        labelText="Nombres*"
                        placeholder="Ingrese los nombres"
                        sx={{ mb: 2, }}
                    />
                    <FormTextField
                        labelText="Ruc*"
                        placeholder="Ingrese el ruc"
                        sx={{ mb: 2, }}
                    />
                    <FormTextField
                        labelText="Teléfono Fijo*"
                        placeholder="Ingrese el teléfono fijo"
                        sx={{ mb: 2, }}
                    />
                    <FormTextField
                        labelText="Teléfono Móvil*"
                        placeholder="Ingrese el teléfono móvil"
                        sx={{ mb: 2, }}
                    />
                </Grid>
                <Grid size={{ xs: 12, sm: 6 }}>
                    <FormTextField
                        labelText="Dirección*"
                        placeholder="Ingrese la dirección"
                        sx={{ mb: 2, }}
                    />
                    <Select
                        labelText="Provincia*"
                        options={provinces}
                        sx={{ mb: 2, }}
                        variant="form"
                        value={selectedProvince}
                        name="province"
                        onChange={handleSelectedProvinceChange}
                        placeholder="Seleccione la provincia"
                        labelId="province-select-label"
                        id="province-select"
                        required
                    />
                    <Select
                        labelText="Ciudad*"
                        options={cities}
                        sx={{ mb: 2, }}
                        variant="form"
                        value={selectedCity}
                        name="city"
                        onChange={handleSelectedCityChange}
                        placeholder="Seleccione la ciudad"
                        labelId="city-select-label"
                        id="city-select"
                        required
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
