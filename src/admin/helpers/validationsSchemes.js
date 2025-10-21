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

export const productValidationSchema = Yup.object({
    type: Yup.object()
        .nullable()
        .required("El tipo es requerido"),
    name: Yup.string()
        .required('El nombre es requerido'),
    brand: Yup.object()
        .nullable()
        .required("La marca es requerida"),
    model: Yup.object()
        .nullable()
        .required("La marca es requerida"),
    partNumber: Yup.object()
        .nullable()
        .required("El número de parte es requerido"),
    unitType: Yup.object()
        .nullable()
        .required("El tipo de unidad es requerido"),
    // password: Yup.string()
    //     .required("La contraseña es requerida"),
    // role: Yup.number()
    //     .notOneOf([0], "El rol es requerido")
})

export const brandValidationSchema = Yup.object({
    name: Yup.string()
        .required('El nombre es requerido'),
})