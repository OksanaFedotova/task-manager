import { Fragment, useState } from 'react';
import { Link } from 'react-router-dom';
import NavigationNested from './NavigationNested';
import styles from './navigation.module.css';
import { Typography } from '@mui/material';

export type TMenu = {
  to: string;
  title: string;
};
export type TNestedMenu = {
  title: string;
  to: string | TMenu[];
};
export interface INavigation {
  menu: TNestedMenu[];
}

export default function Navigation({ menu }: INavigation) {
  const [showNested, setShowNested] = useState(false);
  return (
    <nav className={styles.menu}>
      {menu.map(({ title, to }, i) =>
        typeof to === 'string' ? (
          <Link key={`${title}${i}`} to={to}>
            {title}
          </Link>
        ) : (
          <div key={`container${i}`}>
            <p
              key={`${title}${i}`}
              onMouseEnter={() => setShowNested(true)}
              onMouseLeave={() => setShowNested(false)}
            >
              {title}
            </p>
            {showNested && <NavigationNested key={i} handleMouse={setShowNested} menu={to} />}
          </div>
        )
      )}
    </nav>
  );
}
