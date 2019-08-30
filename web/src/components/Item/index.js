import React, { useState, useContext } from 'react';
import classnames from 'classnames';
import { TITLES } from '../../constants';
import { keys } from 'lodash';
import SelectedTheme from '../../context/SelectedTheme';
import { Button } from 'semantic-ui-react';

import styles from './index.module.scss';

const Item = ({item}) => {
  const [theme] = useContext(SelectedTheme);
  const [show, setShow] = useState(false);

  const handleOpenClose = () => setShow(!show);

  const currentItem = () => {
    // open discussion block
    console.log(item.url);
  }

  const itemInfo = keys(item);

  return (
    <div id={styles.item_box} className={classnames({
      [styles.light]: theme === 'light',
      [styles.dark]: theme === 'dark',
    })}>
      <div className={styles.button_block}>
        <Button onClick={currentItem} className={styles.item_button}>Open discussion</Button>
        <Button onClick={handleOpenClose} className={styles.item_button}>{item.name || item.title}</Button>
      </div>
      {show &&
        itemInfo.map((value, index) => {
          if (!TITLES[value] || value === 'url' || value === 'title' || value === 'name') {
            return null;
          }

          return (
          <div key={index} className={styles.info_row}>{TITLES[value]} : {item[value]}</div>
          )
        })
      }
    </div>
  )
}

export default Item;