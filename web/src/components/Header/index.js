import React, { useState, useContext, useEffect } from 'react';
import { API_PATH } from '../../config';
import ItemsList from '../../context/ItemsList';
import SelectedTheme from '../../context/SelectedTheme';
import axios from 'axios';
import { keys } from 'lodash';
import { Segment, Dropdown, Input, Icon } from 'semantic-ui-react';
import classnames from 'classnames';

import styles from './index.module.scss';

import { ReactComponent as Logo } from '../../styles/svgs/Logo.svg';

const Header = () => {
  const [category, setCategory] = useState('');
  const [value, setValue] = useState('');
  const [theme, setTheme] = useContext(SelectedTheme);
  const [list, setList] = useContext(ItemsList);

  useEffect(() => {
    const fetchData = async () => {
      const result = await axios(`${API_PATH}/${category}`);

      setList(result.data);
    }
      fetchData();
  }, []);

  const handleSearch = async () => {
    if (!value) {
      return null;
    }

    const result = await axios(`${API_PATH}/${value}`);
    setList(result.data.results);
  }

  const handleLightTheme = () => setTheme('light');
  const handleDarkTheme = () => setTheme('dark');
  const handleResultSelect = (e, { value }) => setCategory(value);
  const handleInputChange = (e, { value }) => setValue(value);

  const categoryOptions = keys(list).map(value => {
    return {
      value: value,
      text: value.toUpperCase(),
    }
  })

  return (
    <Segment id={styles.header} className={classnames({
      [styles.light_side]: theme === 'light',
      [styles.dark_side]: theme === 'dark',
    })}>
      <Logo className={styles.logo} />

      <div className={styles.search_block}>
        <Dropdown
          onChange={handleResultSelect}
          className={styles.categories}
          icon="align justify"
          text=' '
          options={categoryOptions}
          loading={!categoryOptions.length}
        />

        <Input
          className={styles.search_bar}
          onChange={handleInputChange}
        />

        <Icon className={styles.searchbar_icon} name='search' onClick={handleSearch} />
      </div>

      <div className={styles.theme_options}>
        <div onClick={handleLightTheme}>Light</div>
        <div onClick={handleDarkTheme}>Dark</div>
      </div>
    </Segment>
  )
}

export default Header;