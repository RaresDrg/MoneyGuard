import { useModal, useAppDispatch } from "../../../../hooks";
import { transactionsService } from "../../../../services";
import { addTransaction } from "../../../../redux/transactions/actions";
import { updateUserBalance } from "../../../../redux/auth/actions";
import * as utils from "../../../../utils";
import { Form, Formik, FormikHelpers } from "formik";
import {
  ModalContainer,
  FormContainer,
  FormButton,
  TypeSwitcher,
  CategoryDropdown,
  DateField,
  Input,
} from "../../../common";

type Props = {
  className?: string;
};

const AddTransactionModal = ({ className }: Props) => {
  const { closeModal } = useModal();
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

  function handleSubmit(values: Values, formikBag: FormikHelpers<Values>) {
    const { type, category, sum, date, comment } = values;
    const data = {
      type: type === "income" ? "income" : "expense",
      category: type === "income" ? "Income" : category,
      sum: Number(sum),
      date,
      comment: utils.prettifyText(comment),
    } as const;

    utils.handleRequestFlow({
      request: () => transactionsService.addTransaction(data),
      delay: 500,
      loadingType: "spinner",
      onSuccess: (res) => {
        dispatch(addTransaction(res.data.addedTransaction));
        dispatch(updateUserBalance(res.data.updatedBalance));
        utils.notify.success(res.message);
        closeModal();
      },
      onError: (error) => {
        utils.notify.error(error);
        formikBag.setSubmitting(false);
      },
    });
  }

  return (
    <ModalContainer className={className}>
      <FormContainer>
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          {({ isSubmitting, errors, touched, values }) => (
            <Form>
              <h2 className="form-title">Add transaction</h2>
              <TypeSwitcher />
              {values.type === "expense" && <CategoryDropdown />}
              <Input
                type="decimal"
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
                maxLength={201}
              />
              <FormButton
                type="submit"
                variant="gradient"
                text="add"
                isDisabled={
                  isSubmitting || utils.shouldBlockSubmit(errors, touched)
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
