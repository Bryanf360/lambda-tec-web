import * as Yup from "yup";

export const loginValidationSchema = Yup.object({
    email: Yup.string()
        .email("El correo no es válido")
        .required("El correo es requerido"),
    password: Yup.string()
        .required("La contraseña es requerida"),
    role: Yup.number()
        .notOneOf([0], "El rol es requerido")
})