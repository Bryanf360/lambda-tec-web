import { Grid } from "@mui/material";
import { AddBrandModal, AddModal, AddUnitTypeModal, FormAutocomplete, FormTextField } from "../";
import { models, partNumbers, types, unitTypes } from "../../../data/dummyData";
import { useEffect, useState } from "react";
import { Form, Formik, useFormikContext } from "formik";
import { productValidationSchema } from "../../helpers/validationsSchemes";
import { useBrandsStore, useModelsStore, useUnitTypesStore } from "../../hooks";
import usePartNumbersStore from "../../hooks/usePartNumbersStore";

export default function AddProductModal({
    open,
    onClose,
    mode,
}) {
    const { isLoading: isLoadingBrands, brands, startLoadingBrands } = useBrandsStore();
    const { isLoading: isLoadingUnitTypes, unitTypes, startLoadingUnitTypes } = useUnitTypesStore();
    const [isAddBrandModalOpen, setIsAddBrandModalOpen] = useState(false)
    const [isAddUnitTypeModalOpen, setIsAddUnitTypeModalOpen] = useState(false)
    // const { values: { brand } } = useFormikContext();
    // console.log({ brand })

    const initialValues = {
        type: null,
        name: '',
        brand: null,
        model: null,
        partNumber: null,
        unitType: null,
        description: '',
        // description: '',
        // fk_brand_id: 1,
        // fk_model_id: 1,
        // fk_part_number_id: 1,
        // fk_unit_type: 1,
        // status: 'active'
    }

    useEffect(() => {
        startLoadingBrands();
        startLoadingUnitTypes();
    }, [])
    
    const handleFormSubmit = (values, { resetForm }) => {
        resetForm();
    }

    const handleAddBrandButtonClick = () => {
        setIsAddBrandModalOpen(true)
    }

    const handleAddBrandModalClose = () => {
        setIsAddBrandModalOpen(false)
    }

    const handleAddUnitTypeButtonClick = () => {
        setIsAddUnitTypeModalOpen(true)
    }

    const handleAddUnitTypeModalClose = () => {
        setIsAddUnitTypeModalOpen(false)
    }

    return (
        <>
            <Formik
                initialValues={initialValues}
                onSubmit={handleFormSubmit}
                validationSchema={productValidationSchema}
            >
                {({ values, errors, touched, handleSubmit, handleChange, setFieldValue, resetForm }) => {
                    const { isLoading: isLoadingModels, models } = useModelsStore(values.brand?.id);
                    const { isLoading: isLoadingPartNumbers, partNumbers } = usePartNumbersStore(values.model?.id);

                    return (
                        <AddModal
                            title="Artículo"
                            open={open}
                            onClose={() => {
                                resetForm();
                                onClose();
                            }}
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
                                        helperText={touched.namehandleAddBrandButtonClick && errors.name}
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
                                        haveAddButton={false}
                                    />
                                    <FormAutocomplete
                                        labelText="Marca*"
                                        options={brands}
                                        placeholder="Seleccione una marca"
                                        getOptionLabel={(option) => option.name}
                                        isOptionEqualToValue={(option, val) => option.id === val.id}
                                        mb={2}
                                        name="brand"
                                        noOptionsText={isLoadingBrands ? "Cargando" : 'No se encontraron marcas'}
                                        value={values.brand}
                                        onChange={(event, value) => {
                                            setFieldValue('brand', value);
                                            setFieldValue('model', null)
                                        }}
                                        error={touched.brand && Boolean(errors.brand)}
                                        helperText={touched.brand && errors.brand}
                                        onAddButtonClick={handleAddBrandButtonClick}
                                    />
                                    <FormAutocomplete
                                        labelText="Modelo*"
                                        options={models}
                                        placeholder="Seleccione un modelo"
                                        getOptionLabel={(option) => option.name}
                                        isOptionEqualToValue={(option, val) => option.id === val.id}
                                        mb={2}
                                        name="model"
                                        noOptionsText={
                                            !values.brand
                                                ? "Selecciona una marca primero"
                                                : isLoadingModels
                                                    ? "Cargando modelos..."
                                                    : "No se encontraron modelos"
                                        }
                                        value={values.model}
                                        onChange={(event, value) => {
                                            setFieldValue('model', value);
                                            setFieldValue('partNumber', null);
                                        }}
                                        error={touched.model && Boolean(errors.model)}
                                        helperText={touched.model && errors.model}
                                    />
                                </Grid>
                                <Grid size={{ xs: 12, sm: 6 }}>
                                    <FormAutocomplete
                                        labelText="Número de Parte*"
                                        options={partNumbers}
                                        placeholder="Seleccione un número de parte"
                                        noOptionsText={
                                            !values.model
                                                ? "Selecciona un modelo primero"
                                                : isLoadingPartNumbers
                                                    ? "Cargando números de parte..."
                                                    : "No se encontraron números de parte"
                                        }
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
                                        placeholder="Seleccione tipo unidad"
                                        noOptionsText={isLoadingUnitTypes ? "Cargando" : 'No se encontraron tipos de unidades'}
                                        getOptionLabel={(option) => `${option.simbol} - ${option.name}`}
                                        isOptionEqualToValue={(option, val) => option.id === val.id}
                                        mb={2}
                                        name="unitType"
                                        value={values.unitType}
                                        onChange={(event, value) => setFieldValue('unitType', value)}
                                        error={touched.unitType && Boolean(errors.unitType)}
                                        helperText={touched.unitType && errors.unitType}
                                        onAddButtonClick={handleAddUnitTypeButtonClick}
                                    />
                                    <FormTextField
                                        labelText="Descripción"
                                        placeholder="Ingrese la descripción"
                                        multiline
                                        name="description"
                                        value={values.description}
                                        onChange={handleChange}
                                        minRows={3}
                                        maxRows={6}
                                    />
                                </Grid>
                            </Grid>
                        </AddModal>
                    )
                }}
            </Formik>
            <AddBrandModal
                open={isAddBrandModalOpen}
                onClose={handleAddBrandModalClose}
            />
            <AddUnitTypeModal
                open={isAddUnitTypeModalOpen}
                onClose={handleAddUnitTypeModalClose}
            />
        </>
    )
}
