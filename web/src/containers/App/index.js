import React, { useState } from 'react';
import SelectedTheme from '../../context/SelectedTheme';
import ItemsList from '../../context/ItemsList';
import SelectedCategory from '../../context/SelectedCategory';
import Header from '../../components/Header';
import Homepage from '../../components/Homepage';

import styles from './index.module.scss';

function App() {
  const [theme, setTheme] = useState('light');
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
      </SelectedTheme.Provider>
    </div>
  );
}

export default App;
