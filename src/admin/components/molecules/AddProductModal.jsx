import { Grid } from '@mui/material';
import {
    AddBrandModal,
    AddModal,
    AddModelModal,
    AddPartNumberModal,
    AddUnitTypeModal,
    FormAutocomplete,
    FormTextField,
} from '../';
import { types } from '../../../data/dummyData';
import { useEffect, useState } from 'react';
import { Form, Formik } from 'formik';
import { productValidationSchema } from '../../helpers/validationsSchemes';
import {
    useBrandsStore,
    useBrandWatcher,
    useModelsStore,
    useProductsStore,
    useUnitTypesStore,
} from '../../hooks';
import usePartNumbersStore from '../../hooks/usePartNumbersStore';
import { toast } from 'react-toastify';

export default function AddProductModal({ open, onClose, mode, product }) {
    const { isLoading: isLoadingBrands, brands, startLoadingBrands } = useBrandsStore();
    const { isLoading: isLoadingUnitTypes, unitTypes, startLoadingUnitTypes } = useUnitTypesStore();
    const [isAddBrandModalOpen, setIsAddBrandModalOpen] = useState(false);
    const [isAddUnitTypeModalOpen, setIsAddUnitTypeModalOpen] = useState(false);
    const [isAddModelModalOpen, setIsAddModelModalOpen] = useState(false);
    const [isAddPartNumberModalOpen, setIsAddPartNumberModalOpen] = useState(false);
    const { isSaving, isUpdating, startLoadingProductsWithStock, startSavingProduct } =
        useProductsStore();

    const initialValues = {
        type: types.find((type) => type.id === product?.type),
        name: product?.name ?? '',
        brand: product?.brand ?? null,
        model: product?.model ?? null,
        partNumber: product?.part_number ?? null,
        unitType: product?.unit_type ?? null,
        description: product?.description ?? '',
    };

    useEffect(() => {
        startLoadingBrands();
        startLoadingUnitTypes();
    }, []);

    const handleFormSubmit = async (values, { resetForm }) => {
        const productToSave = {
            id: product?.id ?? null,
            type: values.type.id,
            name: values.name,
            description: values.description,
            brandId: values.brand.id,
            modelId: values.model.id,
            partNumberId: values.partNumber.id,
            unitTypeId: values.unitType.id,
            status: 'active',
            stock: product?.stock ?? 0,
        };
        const isOk = await startSavingProduct(productToSave);
        if (isOk) {
            resetForm();
            onClose();
        }
        if (isOk && !product?.id) {
            console.log('@@@@@@');
            startLoadingProductsWithStock({ page: 1 });
        }
    };

    const handleAddBrandButtonClick = () => {
        setIsAddBrandModalOpen(true);
    };

    const handleAddBrandModalClose = () => {
        setIsAddBrandModalOpen(false);
    };

    const handleAddUnitTypeButtonClick = () => {
        setIsAddUnitTypeModalOpen(true);
    };

    const handleAddUnitTypeModalClose = () => {
        setIsAddUnitTypeModalOpen(false);
    };

    const handleAddModelButtonClick = () => {
        setIsAddModelModalOpen(true);
    };

    const handleAddModelModalClose = () => {
        setIsAddModelModalOpen(false);
    };

    const handleAddPartNumberButtonClick = () => {
        setIsAddPartNumberModalOpen(true);
    };

    const handleAddPartNumberModalClose = () => {
        setIsAddPartNumberModalOpen(false);
    };

    return (
        <>
            <Formik
                initialValues={initialValues}
                onSubmit={handleFormSubmit}
                validationSchema={productValidationSchema}
                enableReinitialize
            >
                {({
                    values,
                    errors,
                    touched,
                    handleSubmit,
                    handleChange,
                    setFieldValue,
                    resetForm,
                    setValues,
                }) => {
                    useBrandWatcher(values.brand?.id);
                    const {
                        isLoading: isLoadingModels,
                        models,
                        setSelectedModel,
                    } = useModelsStore();
                    const { isLoading: isLoadingPartNumbers, partNumbers } = usePartNumbersStore(
                        values.model?.id
                    );

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
                            isLoading={mode === 'edit' ? isUpdating : isSaving}
                        >
                            <Grid container spacing={1} component={Form}>
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
                                        noOptionsText={
                                            isLoadingBrands
                                                ? 'Cargando'
                                                : 'No se encontraron marcas'
                                        }
                                        value={values.brand}
                                        onChange={(event, value) => {
                                            setValues((prev) => ({
                                                ...prev,
                                                brand: value,
                                                model: null,
                                            }));
                                            setSelectedModel(null);
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
                                                ? 'Selecciona una marca primero'
                                                : isLoadingModels
                                                ? 'Cargando modelos...'
                                                : 'No se encontraron modelos'
                                        }
                                        value={values.model}
                                        onChange={(event, value) => {
                                            setValues((prev) => ({
                                                ...prev,
                                                model: value,
                                                partNumber: null,
                                            }));
                                            setSelectedModel(value);
                                        }}
                                        onAddButtonClick={handleAddModelButtonClick}
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
                                                ? 'Selecciona un modelo primero'
                                                : isLoadingPartNumbers
                                                ? 'Cargando números de parte...'
                                                : 'No se encontraron números de parte'
                                        }
                                        getOptionLabel={(option) => option.name}
                                        isOptionEqualToValue={(option, val) => option.id === val.id}
                                        mb={2}
                                        name="partNumber"
                                        value={values.partNumber}
                                        onChange={(event, value) =>
                                            setFieldValue('partNumber', value)
                                        }
                                        onAddButtonClick={handleAddPartNumberButtonClick}
                                        error={touched.partNumber && Boolean(errors.partNumber)}
                                        helperText={touched.partNumber && errors.partNumber}
                                    />
                                    <FormAutocomplete
                                        labelText="Tipo de Unidad*"
                                        options={unitTypes}
                                        placeholder="Seleccione tipo unidad"
                                        noOptionsText={
                                            isLoadingUnitTypes
                                                ? 'Cargando'
                                                : 'No se encontraron tipos de unidades'
                                        }
                                        getOptionLabel={(option) =>
                                            `${option.simbol} - ${option.name}`
                                        }
                                        isOptionEqualToValue={(option, val) => option.id === val.id}
                                        mb={2}
                                        name="unitType"
                                        value={values.unitType}
                                        onChange={(event, value) =>
                                            setFieldValue('unitType', value)
                                        }
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
                    );
                }}
            </Formik>
            <AddBrandModal open={isAddBrandModalOpen} onClose={handleAddBrandModalClose} />
            <AddModelModal open={isAddModelModalOpen} onClose={handleAddModelModalClose} />
            <AddPartNumberModal
                open={isAddPartNumberModalOpen}
                onClose={handleAddPartNumberModalClose}
            />
            <AddUnitTypeModal open={isAddUnitTypeModalOpen} onClose={handleAddUnitTypeModalClose} />
        </>
    );
}
