export type TInput = {
  type: string;
  name: string;
  value: string;
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
};

const Input: React.FunctionComponent<TInput> = ({ type, name, value, handleChange }) => {
  return <input type={type} name={name} value={value} onChange={handleChange} />;
};

export default Input;
