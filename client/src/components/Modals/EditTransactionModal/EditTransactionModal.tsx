import { useModals, useAppDispatch, useTransactions } from "../../../hooks";
import { updateTransaction } from "../../../redux/transactions/operations";
import { getValidationSchema, notify, renderIcon } from "../../../utils";
import { Form, Formik, FormikHelpers } from "formik";
import {
  ModalContainer,
  FormContainer,
  FormTitle,
  FormButton,
  CategoryDropdown,
  DateField,
  Input,
} from "../../common";

type Props = {
  className?: string;
};

const EditTransactionModal = ({ className: styles }: Props) => {
  const { closeModal } = useModals();
  const dispatch = useAppDispatch();

  const { targetedTransaction } = useTransactions();
  const { _id: ID, type, category, sum, date, comment } = targetedTransaction!;

  const initialValues = { type, category, sum, date, comment };
  type Values = typeof initialValues;

  const validationSchema = getValidationSchema(["sum", "comment"]);

  const handleSubmit = (values: Values, formikBag: FormikHelpers<Values>) => {
    if (JSON.stringify(values) === JSON.stringify(initialValues)) {
      closeModal();
      return;
    }

    const { date, comment } = values;
    const type = values.type === "income" ? "income" : "expense";
    const category = type === "income" ? "Income" : values.category;
    const sum = Number(values.sum);

    // todo: const updates: { type, category, sum, date, comment }

    dispatch(
      updateTransaction({ ID, updates: { type, category, sum, date, comment } })
    )
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
              <FormTitle text="Edit transaction" />
              <div className={`type ${targetedTransaction!.type}`}>
                <span>Income</span>
                {renderIcon("icon-typeSeparator")}
                <span>Expense</span>
              </div>
              {values.type === "expense" && <CategoryDropdown />}
              <Input
                type="number"
                id="sumInput"
                name="sum"
                placeholder="0.00"
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
                text="edit"
                isDisabled={
                  !!(
                    isSubmitting ||
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

export default EditTransactionModal;
