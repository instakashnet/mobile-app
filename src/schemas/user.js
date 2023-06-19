import * as Yup from 'yup'

export const addCompanyProfileSchema = Yup.object({
  ruc: Yup.string()
    .required('Debes colocar un RUC.')
    .matches(/^[0-9]{11,}$/, 'El RUC debe ser de al menos 11 caracteres.'),
  razon_social: Yup.string().required('Debes ingresar la razón social'),
  address: Yup.string().required('Debes ingresar la dirección fiscal'),
  accept: Yup.bool().oneOf([true], 'Debes aceptar la declaración de datos')
}).required()

export const changePasswordSchema = Yup.object({
  currentPassword: Yup.string().required('Debes ingresar tu contraseña actual'),
  newPassword: Yup.string()
    .notOneOf([Yup.ref('currentPassword')], 'La nueva contraseña no puede ser igual a la actual')
    .required('Debes ingresar tu nueva contraseña'),
  confirmPassword: Yup.string().oneOf([Yup.ref('newPassword')], 'Las contraseñas no coinciden')
}).required()
