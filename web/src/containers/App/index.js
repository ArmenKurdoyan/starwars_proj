import React, { useState } from 'react';
import SelectedTheme from '../../context/SelectedTheme';
import ItemsList from '../../context/ItemsList';
import DiscussionSideBar from '../../context/DiscussionSideBar';
import SelectedCategory from '../../context/SelectedCategory';
import DiscussionValue from '../../context/DiscussionValue';
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
  const [show, setShow] = useState(false);
  const [category, setCategory] = useState('');
  const [discussion, setDiscussion] = useState({});

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
            <DiscussionSideBar.Provider value={[
              show,
              setShow
            ]}>
              <DiscussionValue.Provider value={[
                discussion,
                setDiscussion
              ]}>
                <Header />
                <Homepage />
              </DiscussionValue.Provider>
            </DiscussionSideBar.Provider>
          </SelectedCategory.Provider>
        </ItemsList.Provider>
        <Footer />
      </SelectedTheme.Provider>
    </div>
  );
}

export default App;
