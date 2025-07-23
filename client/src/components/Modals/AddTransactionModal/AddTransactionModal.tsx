import { useModals, useAppDispatch } from "../../../hooks";
import { addTransaction } from "../../../redux/transactions/operations";
import { getValidationSchema, notify } from "../../../utils";
import { Form, Formik, FormikHelpers } from "formik";
import {
  ModalContainer,
  FormContainer,
  FormTitle,
  FormButton,
  TypeSwitcher,
  CategoryDropdown,
  DateField,
  Input,
} from "../../common";

type Props = {
  className?: string;
};

const AddTransactionModal = ({ className: styles }: Props) => {
  const { closeModal } = useModals();
  const dispatch = useAppDispatch();

  const initialValues = {
    type: "income",
    category: "",
    sum: "",
    date: new Date().toISOString(),
    comment: "",
  };
  type Values = typeof initialValues;

  const validationSchema = getValidationSchema(["category", "sum", "comment"]);

  const handleSubmit = (values: Values, formikBag: FormikHelpers<Values>) => {
    const { date, comment } = values;
    const type = values.type === "income" ? "income" : "expense";
    const category = type === "income" ? "Income" : values.category;
    const sum = Number(values.sum);

    dispatch(addTransaction({ type, category, sum, date, comment }))
      .unwrap()
      .then((response) => {
        notify.success(response.message);
        closeModal();
      })
      .catch((error) => {
        notify.error(error);
        formikBag.setSubmitting(false);
      });
  };

  return (
    <ModalContainer className={styles}>
      <FormContainer>
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          {({ values, errors, touched, isSubmitting }) => (
            <Form>
              <FormTitle text="Add transaction" />
              <TypeSwitcher />
              {values.type === "expense" && <CategoryDropdown />}
              <Input
                type="number"
                id="sumInput"
                name="sum"
                placeholder="$ 0.00"
                hasErrors={!!(errors.sum && touched.sum)}
              />
              <DateField />
              <Input
                type="text"
                id="commentInput"
                name="comment"
                placeholder="Comment"
                hasErrors={!!(errors.comment && touched.comment)}
              />
              <FormButton
                type="submit"
                variant="gradient"
                text="add"
                isDisabled={
                  !!(
                    isSubmitting ||
                    (errors.category && touched.category) ||
                    (errors.sum && touched.sum) ||
                    (errors.comment && touched.comment)
                  )
                }
              />
              <FormButton
                type="button"
                variant="white"
                text="cancel"
                handlerFunction={closeModal}
              />
            </Form>
          )}
        </Formik>
      </FormContainer>
    </ModalContainer>
  );
};

export default AddTransactionModal;
