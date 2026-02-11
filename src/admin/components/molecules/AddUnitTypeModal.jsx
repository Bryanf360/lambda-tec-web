import { Form, Formik } from "formik"
import { toast } from "react-toastify"
import { Box } from "@mui/material"

import { FormTextField } from "../atoms"
import { AddModal } from "../organisms"
import { unitTypeValidationSchema } from "../../helpers"
import { useUnitTypesStore } from "../../hooks"

export default function AddUnitTypeModal({
    open,
    onClose,
}) {
    const { isLoading, startSavingUnitType } = useUnitTypesStore();
    const initialValues = {
        name: '',
        simbol: '',
    }

    const handleFormSubmit = async (values, { resetForm }) => {
        console.log('values: ', values)
        try {
            const message = await startSavingUnitType(values);
            toast.success(message);
            resetForm();
            onClose();
        } catch(error) {
            toast.error(error || 'Error interno del servidor')
        }
    }

    return (
        <Formik
            initialValues={initialValues}
            onSubmit={handleFormSubmit}
            validationSchema={unitTypeValidationSchema}
        >
            {({ values, errors, touched, handleChange, handleSubmit, resetForm }) => {

                return (
                    <AddModal
                        title="Tipo Unidad"
                        open={open}
                        onClose={() => {
                            resetForm();
                            onClose();
                        }}
                        onSubmit={handleSubmit}
                        maxWidth="xs"
                        fullWidth
                        showDate={false}
                        isLoading={isLoading}
                    >
                        <Box component={Form}>
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
                            <FormTextField
                                labelText="Símbolo*"
                                placeholder="Ingrese el símbolo"
                                value={values.simbol}
                                name="simbol"
                                onChange={handleChange}
                                error={touched.simbol && Boolean(errors.simbol)}
                                helperText={touched.simbol && errors.simbol}
                                sx={{
                                    mb: 2,
                                    '& .MuiFilledInput-root input': {
                                        borderBottomLeftRadius: 10,
                                        borderBottomRightRadius: 10,
                                    },
                                }}
                            />
                        </Box>
                    </AddModal>
                )
            }}
        </Formik>
    )
}
