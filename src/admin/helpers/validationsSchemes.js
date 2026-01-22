import * as Yup from 'yup';
import { isValidRuc } from './validations';

export const loginValidationSchema = Yup.object({
    email: Yup.string().email('El correo no es válido').required('El correo es requerido'),
    password: Yup.string().required('La contraseña es requerida'),
    role: Yup.number().notOneOf([0], 'El rol es requerido'),
});

export const productValidationSchema = Yup.object({
    type: Yup.object().nullable().required('El tipo es requerido'),
    name: Yup.string().required('El nombre es requerido'),
    brand: Yup.object().nullable().required('La marca es requerida'),
    model: Yup.object().nullable().required('El modelo es requerido'),
    partNumber: Yup.object().nullable().required('El número de parte es requerido'),
    unitType: Yup.object().nullable().required('El tipo de unidad es requerido'),
    // password: Yup.string()
    //     .required("La contraseña es requerida"),
    // role: Yup.number()
    //     .notOneOf([0], "El rol es requerido")
});

export const brandValidationSchema = Yup.object({
    name: Yup.string().required('El nombre es requerido'),
});

export const unitTypeValidationSchema = Yup.object({
    name: Yup.string().required('El nombre es requerido'),
    simbol: Yup.string().required('El símbolo es requerido'),
});

export const modelValidationSchema = Yup.object({
    brand: Yup.object().nullable().required('La marca es requerida'),
    name: Yup.string().required('El nombre es requerido'),
});

export const partNumberValidationSchema = Yup.object({
    brand: Yup.object().nullable().required('La marca es requerida'),
    model: Yup.object().nullable().required('El modelo es requerido'),
    name: Yup.string().required('El nombre es requerido'),
});

export const reasonValidationSchema = Yup.object({
    name: Yup.string().required('El nombre es requerido'),
});

export const providerValidationSchema = Yup.object({
    names: Yup.string().required('Los nombres son requeridos'),
    lastnames: Yup.string().required('Los apellidos son requeridos'),
    ruc: Yup.string()
        .required('El ruc es requerido')
        .test('ec-ruc', 'El RUC no es válido', isValidRuc),
    landline: Yup.string()
        .required('El teléfono fijo es requerido')
        .min(9, 'El teléfono no es válido')
        .max(9, 'El teléfono no es válido'),
    mobilePhone: Yup.string()
        .required('La teléfono móvil es requerido')
        .min(10, 'El teléfono no es válido')
        .max(10, 'El teléfono no es válido'),
    address: Yup.string().required('La dirección es requerida'),
    province: Yup.object().nullable().required('La provincia es requerida'),
    city: Yup.object().nullable().required('La ciudad es requerida'),
});

export const userValidationSchema = Yup.object({
    names: Yup.string().required('Los nombres son requeridos'),
    lastnames: Yup.string().required('Los apellidos son requeridos'),
    email: Yup.string().email('El correo no es válido').required('El correo es requerido'),
    role: Yup.mixed().test(
        'required',
        'El rol es requerido',
        (value) => value !== '' && value !== undefined && value !== null
    ),
    status: Yup.mixed().test(
        'required',
        'El estado es requerido',
        (value) => value !== '' && value !== undefined && value !== null
    ),
    password: Yup.string().required('La contraseña es requerida').min(6, 'Mínimo 6 caracteres'),
    repeatPassword: Yup.string()
        .required('Debe repetir la contraseña')
        .oneOf([Yup.ref('password')], 'Las contraseñas no coinciden'),
});
