import { useModals, useAppDispatch, useTransactions } from "../../../hooks";
import { updateTransaction } from "../../../redux/transactions/operations";
import * as utils from "../../../utils";
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
  const { id, type, category, sum, date, comment } = targetedTransaction!;

  const initialValues = { type, category, sum, date, comment };
  type Values = typeof initialValues;

  const validationSchema = utils.getValidationSchema(["sum", "comment"]);

  const handleSubmit = (values: Values, formikBag: FormikHelpers<Values>) => {
    const { type, category, sum, date, comment } = values;
    const updates = {
      type,
      category,
      sum: Number(sum),
      date,
      comment: utils.prettifyText(comment),
    };

    const hasUpdates = Object.keys(initialValues).some((key) => {
      const typedKey = key as keyof Values;
      return initialValues[typedKey] !== updates[typedKey];
    });

    if (!hasUpdates) {
      utils.notify.warning("No changes detected");
      formikBag.resetForm();
      return;
    }

    dispatch(updateTransaction({ id, updates }))
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
          {({ values, errors, touched, isSubmitting, dirty }) => (
            <Form>
              <FormTitle text="Edit transaction" />
              <div className={`type ${type}`}>
                <span>Income</span>
                {utils.renderIcon("icon-typeSeparator")}
                <span>Expense</span>
              </div>
              {values.type === "expense" && <CategoryDropdown />}
              <Input
                type="decimalInput"
                id="sumInput"
                name="sum"
                placeholder="0.00"
              />
              <DateField />
              <Input
                type="text"
                id="commentInput"
                name="comment"
                placeholder="Comment"
                maxLength={201}
              />
              <FormButton
                type="submit"
                variant="gradient"
                text="edit"
                isDisabled={
                  !!(
                    isSubmitting ||
                    !dirty ||
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
