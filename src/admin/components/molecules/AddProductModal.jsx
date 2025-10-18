import { Grid } from "@mui/material";
import { AddModal, FormAutocomplete, FormTextField } from "../";
import { models, partNumbers, types, unitTypes } from "../../../data/dummyData";
import { useState } from "react";
import { Form, Formik, useFormikContext } from "formik";
import { productValidationSchema } from "../../helpers/validationsSchemes";
import { useBrandsStore } from "../../hooks";

export default function AddProductModal({
    open,
    onClose,
    mode,
}) {
    // TODO: get brand of custom hook
    const { brands } = useBrandsStore();
    
    const initialValues = {
        type: null,
        name: '',
        brand: null,
        model: null,
        partNumber: null,
        unitType: null,
        // description: '',
        // fk_brand_id: 1,
        // fk_model_id: 1,
        // fk_part_number_id: 1,
        // fk_unit_type: 1,
        // status: 'active'
    }

    const handleFormSubmit = (values, { resetForm }) => {
        console.log(values)
        resetForm();
    }

    return (
        <Formik
            initialValues={initialValues}
            onSubmit={handleFormSubmit}
            validationSchema={productValidationSchema}
        >
            {({ values, errors, touched, handleSubmit, handleChange, setFieldValue }) => (
                <AddModal
                    title="Artículo"
                    open={open}
                    onClose={onClose}
                    hasCenteredButtons={false}
                    mode={mode}
                    onSubmit={handleSubmit}
                >
                    <Grid
                        container
                        spacing={1}
                        component={Form}
                    >
                        <Grid size={{ xs: 12, sm: 6 }}>
                            <FormTextField
                                labelText="Nombre*"
                                placeholder="Ingrese el nombre"
                                value={values.name}
                                name="name"
                                onChange={handleChange}
                                error={touched.name && Boolean(errors.name)}
                                helperText={touched.name && errors.name}
                                sx={{
                                    mb: 2, 
                                    '& .MuiFilledInput-root input': {
                                        borderBottomLeftRadius: 10,
                                        borderBottomRightRadius: 10,
                                    },
                                }}
                            />
                            <FormAutocomplete
                                labelText="Tipo*"
                                options={types}
                                placeholder="Seleccione un tipo"
                                getOptionLabel={(option) => option.name}
                                isOptionEqualToValue={(option, val) => option.id === val.id}
                                mb={2}
                                name="type"
                                value={values.type}
                                onChange={(event, value) => setFieldValue('type', value)}
                                error={touched.type && Boolean(errors.type)}
                                helperText={touched.type && errors.type}
                            />
                            <FormAutocomplete
                                labelText="Marca*"
                                options={brands}
                                placeholder="Seleccione una marca"
                                getOptionLabel={(option) => option.name}
                                isOptionEqualToValue={(option, val) => option.id === val.id}
                                mb={2}
                                name="brand"
                                value={values.brand}
                                onChange={(event, value) => setFieldValue('brand', value)}
                                error={touched.brand && Boolean(errors.brand)}
                                helperText={touched.brand && errors.brand}
                            />
                            <FormAutocomplete
                                labelText="Modelo*"
                                options={models}
                                placeholder="Seleccione un modelo"
                                getOptionLabel={(option) => option.name}
                                isOptionEqualToValue={(option, val) => option.id === val.id}
                                mb={2}
                                name="model"
                                value={values.model}
                                onChange={(event, value) => setFieldValue('model', value)}
                                error={touched.model && Boolean(errors.model)}
                                helperText={touched.model && errors.model}
                            />
                        </Grid>
                        <Grid size={{ xs: 12, sm: 6 }}>
                            <FormAutocomplete
                                labelText="Número de Parte*"
                                options={partNumbers}
                                placeholder="Seleccione un número de parte"
                                getOptionLabel={(option) => option.name}
                                isOptionEqualToValue={(option, val) => option.id === val.id}
                                mb={2}
                                name="partNumber"
                                value={values.partNumber}
                                onChange={(event, value) => setFieldValue('partNumber', value)}
                                error={touched.partNumber && Boolean(errors.partNumber)}
                                helperText={touched.partNumber && errors.partNumber}
                            />
                            <FormAutocomplete
                                labelText="Tipo de Unidad*"
                                options={unitTypes}
                                placeholder="Seleccione el tipo de unidad"
                                getOptionLabel={(option) => option.name}
                                isOptionEqualToValue={(option, val) => option.id === val.id}
                                mb={2}
                                name="unitType"
                                value={values.unitType}
                                onChange={(event, value) => setFieldValue('unitType', value)}
                                error={touched.unitType && Boolean(errors.unitType)}
                                helperText={touched.unitType && errors.unitType}
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
            )}
        </Formik>

    )
}
