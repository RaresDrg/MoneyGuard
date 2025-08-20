import { useModals, useAppDispatch } from "../../../hooks";
import { addTransaction } from "../../../redux/transactions/operations";
import * as utils from "../../../utils";
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
    date: utils.normalizeDate(new Date()),
    comment: "",
  };
  type Values = typeof initialValues;

  const config = ["category", "sum", "comment"] as const;
  const validationSchema = utils.getValidationSchema([...config]);

  const handleSubmit = (values: Values, formikBag: FormikHelpers<Values>) => {
    const { type, category, sum, date, comment } = values;
    const data = {
      type: type === "income" ? "income" : "expense",
      category: type === "income" ? "Income" : category,
      sum: Number(sum),
      date,
      comment: utils.prettifyText(comment),
    } as const;
    dispatch(addTransaction(data))
      .unwrap()
      .then((response) => {
        utils.notify.success(response.message);
        closeModal();
      })
      .catch((error) => {
        utils.notify.error(error);
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
              />
              <DateField />
              <Input
                type="text"
                id="commentInput"
                name="comment"
                placeholder="Comment"
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
