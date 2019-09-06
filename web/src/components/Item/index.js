import React, { useState, useContext } from 'react';
import classnames from 'classnames';
import { TITLES } from '../../constants';
import { keys } from 'lodash';
import DiscussionSideBar from '../../context/DiscussionSideBar';
import DiscussionValue from '../../context/DiscussionValue';
import SelectedTheme from '../../context/SelectedTheme';
import { Button } from 'semantic-ui-react';

import styles from './index.module.scss';

const Item = ({item}) => {
  const [theme] = useContext(SelectedTheme);
  const [open, setOpen] = useState(false);
  const [show, setShow] = useContext(DiscussionSideBar);
  const [discussion, setDiscussion] = useContext(DiscussionValue);

  const handleOpenClose = () => setOpen(!open);
  const currentItem = () => {
    if (!show) {
      setDiscussion({item: item.title || item.name, link: item.url})
      return setShow(true);
    }

    setDiscussion({});
    setShow(false);
  };

  const itemInfo = keys(item);
  const discussionStatus = (item.hasOwnProperty('title') && discussion.item === item.title) || (item.hasOwnProperty('name') && discussion.item === item.name) ? 'Close' : 'Open';

  return (
    <div id={styles.item_box} className={classnames({
      [styles.light]: theme === 'light',
      [styles.dark]: theme === 'dark',
    })}>
      <div className={styles.button_block}>
        <Button onClick={currentItem} className={styles.item_button}>{discussionStatus} discussion</Button>
        <Button onClick={handleOpenClose} className={styles.item_button}>{item.name || item.title}</Button>
      </div>
      <div className={styles.items}>
        {open &&
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
    </div>
  )
}

export default Item;