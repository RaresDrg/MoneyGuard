type Props = {
  className?: string;
  text: string;
};

const FormTitle = ({ className: styles, text }: Props) => {
  return <h2 className={styles}>{text}</h2>;
};

export default FormTitle;
