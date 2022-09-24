const Input = (props) => {
  const { className, ...rest } = props;
  return <input className={className} {...rest} />;
};
export default Input;
