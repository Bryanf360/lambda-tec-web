import { Form, Formik } from 'formik';

import { AddModal, FormTextField } from '../';
import { reasonValidationSchema } from '../../helpers';
import { Box } from '@mui/material';
import { useReasonsStore } from '../../hooks';
import { toast } from 'react-toastify';

export default function AddReasonModal({ open, onClose }) {
    const { isLoading, startSavingReason } = useReasonsStore();
    const initialValues = {
        name: '',
    };

    const handleFormSubmit = async (values, { resetForm }) => {
        const reason = {
            type: 'input',
            name: values.name,
        };
        try {
            const message = await startSavingReason(reason);
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
            validationSchema={reasonValidationSchema}
        >
            {({ values, errors, touched, handleChange, handleSubmit, resetForm }) => (
                <AddModal
                    title="Motivo"
                    open={open}
                    onClose={() => {
                        resetForm();
                        onClose();
                    }}
                    onSubmit={handleSubmit}
                    showDate={false}
                    isLoading={isLoading}
                    maxWidth="xs"
                    fullWidth
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
                            sx={{ mb: 2 }}
                        />
                    </Box>
                </AddModal>
            )}
        </Formik>
    );
}
