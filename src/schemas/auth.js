import * as Yup from 'yup'

const passRegexp = /^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])[a-zA-Z0-9!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]{5,}$/

export const loginValidationSchema = Yup.object({
  email: Yup.string().required('Ingresa tu correo'),
  password: Yup.string().required('Ingresa tu contraseña')
}).required()

export const registerValidationSchema = Yup.object({
  email: Yup.string().required('Ingresa tu correo').email('Ingresa un correo válido'),
  password: Yup.string()
    .required('Ingresa una contraseña')
    .matches(passRegexp, 'Debe contener al menos una mayúscula, una minúscula y un número'),
  affiliate: Yup.string().notRequired(),
  acceptTerms: Yup.bool().oneOf([true], 'Debes aceptar nuestros términos y condiciones')
}).required()

export const verifyCodeValidationSchema = Yup.object({
  verificationCode: Yup.string().required('Ingresa el código de verificación').matches(/^\d+$/, 'El código solo deben ser números')
}).required()

export const completeValidationSchema = Yup.object({
  first_name: Yup.string().required('Ingresa tu(s) nombre(s)'),
  last_name: Yup.string().required('Ingresa tu(s) apellido(s)'),
  identity_sex: Yup.string().required('Selecciona una opción'),
  phone: Yup.string()
    .required('Ingresa tu número de teléfono')
    .matches(/^(?:\+\d{1,3}\s?)?(?:\d{1,4}[-.\s]?)?\(?\d{1,4}\)?[-.\s]?\d{1,4}[-.\s]?\d{1,9}$/, 'Ingresa un número de teléfono válido'),
  document_type: Yup.string().required('Selecciona tu documento'),
  document_identification: Yup.string().required('Ingresa el nro. de tu documento')
}).required()

export const recoverPasswordSchema = Yup.object({
  email: Yup.string().required('Ingresa tu correo electrónico').email('Ingresa un correo válido')
}).required()

export const resetPasswordSchema = Yup.object({
  password: Yup.string()
    .required('Ingresa la nueva contraseña')
    .matches(passRegexp, 'Debe contener al menos una mayúscula, una minúscula y un número'),
  confirmPassword: Yup.string().oneOf([Yup.ref('password'), null], 'Las contraseñas deben coincidir')
}).required()
