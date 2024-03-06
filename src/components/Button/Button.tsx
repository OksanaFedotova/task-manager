import { IButton } from '../../interfaces/components';
import styles from './button.module.css';

const Button: React.FunctionComponent<IButton> = ({ label, onClick, className }) => {
  return (
    <button className={styles[`${className}`]} onClick={onClick}>
      {label}
    </button>
  );
};
export default Button;
