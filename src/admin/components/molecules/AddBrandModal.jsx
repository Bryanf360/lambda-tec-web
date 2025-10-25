import { Form, Formik } from 'formik';
import { FormTextField } from '../atoms';
import { AddModal } from '../organisms';
import { brandValidationSchema } from '../../helpers';
import { useBrandsStore } from '../../hooks';
import { Box } from '@mui/material';
import { toast } from 'react-toastify';

export default function AddBrandModal({ open, onClose }) {
    const { isLoading, startSavingBrand } = useBrandsStore();
    const initialValues = {
        name: '',
    };

    const handleFormSubmit = async (values, { resetForm }) => {
        try {
            const message = await startSavingBrand(values);
            toast.success(message);
            resetForm();
            onClose();
        } catch (error) {
            toast.error(error || 'Error interno del servidor');
        }
    };

    return (
        <Formik
            initialValues={initialValues}
            onSubmit={handleFormSubmit}
            validationSchema={brandValidationSchema}
        >
            {({ values, errors, touched, handleChange, handleSubmit, resetForm }) => {
                return (
                    <AddModal
                        title="Marca"
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
                        </Box>
                    </AddModal>
                );
            }}
        </Formik>
    );
}
