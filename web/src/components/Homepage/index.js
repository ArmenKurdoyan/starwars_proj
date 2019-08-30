import React, { useContext, useEffect, useState } from 'react';
import { API_PATH } from '../../config';
import ItemsList from '../../context/ItemsList';
import classnames from 'classnames';
import { size } from 'lodash';
import axios from 'axios';
import Item from '../Item';
import SelectedCategory from '../../context/SelectedCategory';
import SelectedTheme from '../../context/SelectedTheme';
import { Segment, Button } from 'semantic-ui-react';

import styles from './index.module.scss';

const Homepage = () => {
  const [theme] = useContext(SelectedTheme);
  const [category] = useContext(SelectedCategory);
  const [list] = useContext(ItemsList);
  const [page, setPage] = useState(1);
  const [categoryList, setCategoryList] = useState({});
  //list of discussions ex. people => list of discussions,
  //Darth Vader => discussion of Darth Vader
  //comes from backend

  useEffect(() => {
    const fetchData = async () => {
      const result = await axios(`${API_PATH}/${category}/?page=${page}`);

      setCategoryList(result.data)
    }
      fetchData();
  }, [category, page]);

  useEffect(() => setPage(1), [category]);

  const nextPage = () => setPage(page + 1);
  const previousPage = () => setPage(page - 1);

  return (
    <Segment id={styles.homepage} className={classnames({
      [styles.light]: theme === 'light',
      [styles.dark]: theme === 'dark',
    })}>

      {!!size(categoryList) && categoryList.count > 10 ?
        <div className={styles.page_block}>
          <div className={styles.current_page}>
            Current page {page}
          </div>
          <div className={styles.page_controllers}>
            <Button onClick={previousPage} disabled={page === 1} content='Previous page'/>
            <Button onClick={nextPage} disabled={Math.floor(categoryList.count / 10) === page} content='Next page'/>
          </div>
        </div> : <div className={styles.pre_text}>Please search for discussions or select a category</div>
      }

      {!!size(categoryList) ? categoryList.results.map((value, index) => <Item key={index} item={value} />) :  null}
    </Segment>
  )
}

export default Homepage;