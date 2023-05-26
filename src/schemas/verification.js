import * as Yup from 'yup'

export const addAddressSchema = Yup.object({
  city: Yup.string()
    .required('Introduce una ciudad')
    .matches(/^[a-zA-Z\s]+$/, 'Introduce una ciudad válida'),
  district: Yup.string()
    .required('Introduce un distrito')
    .matches(/^[a-zA-Z\s]+$/, 'Introduce un distrito válido'),
  address: Yup.string()
    .required('Introduce tu dirección de residencia')
    .matches(/^[a-zA-Z0-9\s\-.,#]+$/, 'Indrotuce una dirección válida')
}).required()

export const addAdditionalInfoSchema = Yup.object({
  job: Yup.string().required('Selecciona o ingresa tu ocupación'),
  profession: Yup.string().required('Ingresa tu profesión'),
  date_birth: Yup.date('Ingresa una fecha válida').required('Selecciona tu fecha de nacimiento')
}).required()
