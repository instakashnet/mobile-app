import * as Yup from "yup";

export const accountsSchema = Yup.object().shape({
  bank_id: Yup.number().required("Debes seleccionar un banco a enviar."),
  account_to_id: Yup.number().required("Debes seleccionar una cuenta a recibir."),
  funds_origin: Yup.string().when("origin", {
    is: true,
    then: Yup.string().required("Debes seleccionar el origen de tus fondos."),
    otherwise: Yup.string().notRequired(),
  }),
  funds_input: Yup.string().when("funds_origin", {
    is: "otros",
    then: Yup.string().required("Debes escribir el origen de tus fondos."),
    otherwise: Yup.string().notRequired(),
  }),
});

export const transferCodeSchema = Yup.object().shape({
  transaction_code: Yup.string().when("direct", {
    is: false,
    then: Yup.string().notRequired(),
    otherwise: Yup.string()
      .required("Debes ingresar el nro. de tu transferencia.")
      .matches(/^[0-9]{6,9}$/, "El nro. que intentas ingresar es inválido. Verifica que no tengas espacios y solo sean números."),
  }),
});
