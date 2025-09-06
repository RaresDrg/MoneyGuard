import * as Yup from "yup";

const VALIDATIONS_MAP = {
  name: Yup.string()
    .trim()
    .min(3, "Name is too short")
    .max(50, "Name is too long")
    .required("Required *"),
  email: Yup.string()
    .trim()
    .email("Invalid email format")
    .required("Required *"),
  password: Yup.string()
    .min(8, "Password is too short")
    .max(50, "Password is too long")
    .matches(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])/, {
      message: "Missing uppercase, lowercase or digit",
    })
    .required("Required *"),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref("password")], "Password doesn't match")
    .required("Required *"),
  loginPassword: Yup.string().required("Required *"),
  type: Yup.string().oneOf(["income", "expense"]),
  category: Yup.string().when("type", {
    is: "expense",
    then: (schema) => schema.required("Required *"),
    otherwise: (schema) => schema.notRequired(),
  }),
  sum: Yup.number()
    .moreThan(0, "Amount is too low")
    .lessThan(100_000_000, "Amount is too much")
    .required("Required *"),
  comment: Yup.string()
    .trim()
    .min(5, "Comment is too short")
    .max(200, `Comment is too long`)
    .required("Required *"),
};
type ValidationKey = keyof typeof VALIDATIONS_MAP;

export function getValidationSchema(data: ValidationKey[]) {
  const schema = Yup.object(
    Object.fromEntries(
      data
        .filter((key) => key in VALIDATIONS_MAP)
        .map((key) => [key, VALIDATIONS_MAP[key]])
    )
  );

  return schema;
}
