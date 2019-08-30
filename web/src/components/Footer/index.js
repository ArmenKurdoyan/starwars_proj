import React, { useContext } from 'react';
import SelectedTheme from '../../context/SelectedTheme';
import classnames from "classnames";
import { Segment } from 'semantic-ui-react';

import styles from './index.module.scss';

const Footer = () =>  {
  const [ theme ] = useContext(SelectedTheme);
  return (
    <Segment id={styles.footer} className={classnames({
      [styles.light]: theme === 'light',
      [styles.dark]: theme === 'dark',
    })}>
      <div className={styles.link_block}>
        <div>
          <span className={styles.title}>API FROM</span>
          <a className={styles.url} href="https://swapi.co/">SWAPI</a>
        </div>
        <div>
          <span className={styles.title}>CREATOR</span>
          <a className={styles.url} href="https://www.linkedin.com/in/armen-kurdoyan-904a93110/">My LinkedIn</a>
        </div>
      </div>

      <div className={styles.starwars_quote}>
        May the force be with you... always
      </div>
    </Segment>
  )
}

export default Footer;