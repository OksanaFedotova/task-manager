import { Link } from 'react-router-dom';
import { TMenu } from './Navigation';
import { Dispatch, SetStateAction } from 'react';
import styles from './navigaionNested.module.css';

export default function NavigationNested({
  menu,
  handleMouse,
}: {
  menu: TMenu[];
  handleMouse: Dispatch<SetStateAction<boolean>>;
}) {
  return (
    <div
      className={styles.menu}
      onMouseEnter={() => handleMouse(true)}
      onMouseLeave={() => handleMouse(false)}
    >
      {menu.map(({ title, to }, i) => (
        <Link key={i} to={to}>
          {title}
        </Link>
      ))}
    </div>
  );
}
