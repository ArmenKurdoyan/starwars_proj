import React, { useState } from 'react';
import SelectedTheme from '../../context/SelectedTheme';
import ItemsList from '../../context/ItemsList';
import Header from '../../components/Header';
import Footer from '../../components/Footer';

function App() {
  const [theme, setTheme] = useState('light');
  const [list, setList] = useState(null);

  return (
    <div className="App">
      <SelectedTheme.Provider value={[
        theme,
        setTheme
      ]}>
        <ItemsList.Provider value={[
          list,
          setList
        ]}>
          <Header />
        </ItemsList.Provider>
        <Footer />
      </SelectedTheme.Provider>
    </div>
  );
}

export default App;
