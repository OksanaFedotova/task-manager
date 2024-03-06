import Navigation from '../Navigation/Navigation';
import Button from '../Button/Button';
import menu from '../../data/menu';
import { useNavigate } from 'react-router-dom';
import styles from './header.module.css';

export default function Header() {
  const navigate = useNavigate();
  return (
    <header className={styles.header}>
      <div className={styles.logo} onClick={() => navigate('app/boards')}>
        Todo App
      </div>
      <Navigation menu={menu} />
      <div className="auth-buttons">
        <Button className={'button-light'} label={'Войти'} onClick={() => navigate('./signin')} />
        <Button
          className={'basic-button'}
          label="Начать бесплатно"
          onClick={() => navigate('./signup')}
        />
      </div>
    </header>
  );
}
