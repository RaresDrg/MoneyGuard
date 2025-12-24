import { useModal, useAppDispatch, useReduxState } from "../../../../hooks";
import { transactionsService } from "../../../../services";
import { editTransaction } from "../../../../redux/transactions/actions";
import { updateUserBalance } from "../../../../redux/auth/actions";
import * as utils from "../../../../utils";
import { Form, Formik, FormikHelpers } from "formik";
import {
  ModalContainer,
  FormContainer,
  FormButton,
  CategoryDropdown,
  DateField,
  Input,
} from "../../../common";

type Props = {
  className?: string;
};

const EditTransactionModal = ({ className }: Props) => {
  const { closeModal } = useModal();
  const dispatch = useAppDispatch();

  const targetedTransaction = useReduxState("selectTargetedTransaction");
  const { id, type, category, sum, date, comment } = targetedTransaction!;

  const initialValues = { type, category, sum, date, comment };
  type Values = typeof initialValues;

  const validationSchema = utils.getValidationSchema(["sum", "comment"]);

  function handleSubmit(values: Values, formikBag: FormikHelpers<Values>) {
    const { type, category, sum, date, comment } = values;
    const updates = {
      type,
      category,
      sum: Number(sum),
      date,
      comment: utils.prettifyText(comment),
    };

    const hasUpdates = utils.checkShallowObjects(initialValues, updates);
    if (!hasUpdates) {
      utils.notify.warning("No changes detected");
      formikBag.resetForm();
      return;
    }

    utils.handleRequestFlow({
      request: () => transactionsService.updateTransaction(id, updates),
      delay: 500,
      loadingType: "spinner",
      onSuccess: (res) => {
        dispatch(editTransaction(res.data.updatedTransaction));
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
          {({ isSubmitting, errors, touched, values, dirty }) => (
            <Form>
              <h2 className="form-title">Edit transaction</h2>
              <div className={`type ${type}`}>
                <span>Income</span>
                {utils.renderIcon("icon-typeSeparator")}
                <span>Expense</span>
              </div>
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
                text="edit"
                isDisabled={
                  isSubmitting ||
                  !dirty ||
                  utils.shouldBlockSubmit(errors, touched)
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
