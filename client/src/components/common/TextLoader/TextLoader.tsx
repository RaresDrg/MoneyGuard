type Props = {
  className?: string;
  text: string;
};

const TextLoader = ({ className, text }: Props) => {
  const styles = `${className} text-loader animate__animated animate__fadeIn animate__infinite`;

  return <p className={styles}>{text}</p>;
};

export default TextLoader;
