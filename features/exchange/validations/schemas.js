import * as Yup from "yup";

export const transferCodeSchema = Yup.object().shape({
  transaction_code: Yup.string().when("direct", {
    is: false,
    then: Yup.string().notRequired(),
    otherwise: Yup.string()
      .required("Debes ingresar el nro. de tu transferencia.")
      .matches(/^[0-9]{6,9}$/, "El nro. que intentas ingresar es inválido. Verifica que no tengas espacios y solo sean números."),
  }),
});
