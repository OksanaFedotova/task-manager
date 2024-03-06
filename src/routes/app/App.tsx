import { Outlet } from 'react-router-dom';
import UserMenu from '../../components/UserMenu/UserMenu';
import styles from './app.module.css';

export default function App() {
  return (
    <div className={styles['app-container']}>
      <UserMenu />
      <div>
        <Outlet />
      </div>
    </div>
  );
}
