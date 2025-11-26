import { useState } from "react";
import { AddModal, FormTextField } from "../";

export default function AddReasonModal({
    open,
    onClose,
}) {

    return (
        <AddModal
            title="Motivo"
            open={open}
            onClose={onClose}
            maxWidth="xs"
            fullWidth
        >
            <FormTextField
                labelText="Nombre*"
                placeholder="Ingrese el nombre"
                sx={{ mb: 2, }}
            />
        </AddModal>
    )
}
