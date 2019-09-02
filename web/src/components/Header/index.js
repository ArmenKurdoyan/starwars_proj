import React, { useState, useContext, useEffect } from 'react';
import { API_PATH } from '../../config';
import ItemsList from '../../context/ItemsList';
import SelectedTheme from '../../context/SelectedTheme';
import SelectedCategory from '../../context/SelectedCategory';
import axios from 'axios';
import { keys } from 'lodash';
import { Segment, Dropdown, Input, Icon } from 'semantic-ui-react';
import classnames from 'classnames';

import styles from './index.module.scss';

import { ReactComponent as Logo } from '../../styles/svgs/Logo.svg';

const Header = () => {
  const [category, setCategory] = useContext(SelectedCategory);
  const [allCategories, setAllCategories] = useState({});
  const [value, setValue] = useState('');
  const [theme, setTheme] = useContext(SelectedTheme);
  const [list, setList] = useContext(ItemsList);

  useEffect(() => {
    const fetchData = async () => {
      const result = await axios(`${API_PATH}/${category}`);

      setList(result.data);
      setAllCategories(result.data)
    }
      fetchData();
  }, []);

  useEffect(() => {
    localStorage.setItem('theme', theme)
  }, [theme]);

  const handleSearch = async () => {
    if (!value) {
      return null;
    }

    const result = await axios(`${API_PATH}/${value}`);
    setList(result.data.results);

    //searches for discussion(s)
    //ex 1. people => list of discussions,
    //ex 1. Darth Vader => discussion of Darth Vader
    //comes from backend
  }

  const handleLightTheme = () => setTheme('light');
  const handleDarkTheme = () => setTheme('dark');
  const handleResultSelect = (e, { value }) => setCategory(value);
  const handleInputChange = (e, { value }) => setValue(value);
  const handleEnterSubmit = (e) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  const categoryOptions = keys(allCategories).map(value => {
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
      <a href="http://starwars.com">
        <Logo className={styles.logo} />
      </a>

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
          onKeyDown={handleEnterSubmit}
          className={styles.search_bar}
          onChange={handleInputChange}
        />

        <Icon className={styles.searchbar_icon} name='search' onClick={handleSearch} />
      </div>

      <div className={styles.theme_options}>
        <div className={styles.light_button} onClick={handleLightTheme}>Light</div>
        <div className={styles.dark_button} onClick={handleDarkTheme}>Dark</div>
      </div>
    </Segment>
  )
}

export default Header;