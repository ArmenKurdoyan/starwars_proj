import React, { useState } from 'react';
import SelectedTheme from '../../context/SelectedTheme';
import ItemsList from '../../context/ItemsList';
import SelectedCategory from '../../context/SelectedCategory';
import Header from '../../components/Header';
import Homepage from '../../components/Homepage';
import Footer from '../../components/Footer';

import styles from './index.module.scss';

const setDefaultTheme = () => {
  const theme = localStorage.getItem('theme');
  if (!theme) {
    localStorage.setItem('theme', 'light');
  }
  return theme || localStorage.getItem('theme');
}

function App() {
  const [theme, setTheme] = useState(setDefaultTheme());
  const [list, setList] = useState(null);
  const [category, setCategory] = useState('');

  return (
    <div id={styles.app}>
      <SelectedTheme.Provider value={[
        theme,
        setTheme
      ]}>
        <ItemsList.Provider value={[
          list,
          setList
        ]}>
          <SelectedCategory.Provider value={[
            category,
            setCategory
          ]}>
            <Header />
            <Homepage />
          </SelectedCategory.Provider>
        </ItemsList.Provider>
        <Footer />
      </SelectedTheme.Provider>
    </div>
  );
}

export default App;
