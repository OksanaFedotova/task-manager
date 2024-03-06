import Button from '../../../components/Button/Button';
import { useNavigate } from 'react-router-dom';
import { MainAnimated } from '../../../components/animation/MainAnimated';
import styles from './main.module.css';

export default function Main() {
  const navigate = useNavigate();
  return (
    <main className={styles.main}>
      <h1>Организуйте работу и жизнь.</h1>
      <h4>
        Todoist – список дел и таск-менеджер № 1 в мире. Он поможет вам обрести концентрацию,
        организованность и покой.
      </h4>

      <Button
        className="basic-button"
        onClick={() => navigate('auth/signup')}
        label="Начать бесплатно"
      />
      <div className={styles['anim-container']}>
        <MainAnimated />
      </div>
    </main>
  );
}
