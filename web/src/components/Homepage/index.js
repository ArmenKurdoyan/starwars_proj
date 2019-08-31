import React, { useContext, useEffect, useState } from 'react';
import { API_PATH } from '../../config';
import ItemsList from '../../context/ItemsList';
import classnames from 'classnames';
import { size } from 'lodash';
import axios from 'axios';
import Item from '../Item';
import DiscussionSideBar from '../../context/DiscussionSideBar';
import SideDiscussionBar from '../SideDiscussionBar';
import SelectedCategory from '../../context/SelectedCategory';
import SelectedTheme from '../../context/SelectedTheme';
import { Segment, Button, Sidebar, Menu } from 'semantic-ui-react';

import styles from './index.module.scss';

const Homepage = () => {
  const [theme] = useContext(SelectedTheme);
  const [category] = useContext(SelectedCategory);
  const [list] = useContext(ItemsList);
  const [show ,setShow] = useContext(DiscussionSideBar);
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
  const handleSidebarHide = () => setShow(!show);

  return (
    <Segment id={styles.homepage} className={classnames({
      [styles.light]: theme === 'light',
      [styles.dark]: theme === 'dark',
    })}>

        <Sidebar
          as={Menu}
          animation='overlay'
          icon='labeled'
          inverted
          direction='right'
          onHide={handleSidebarHide}
          vertical
          visible={show}
          className={styles.sidebar}
        >
          <SideDiscussionBar />
        </Sidebar>

      {!!size(categoryList) && categoryList.count > 10 ?
        <div className={styles.page_block}>
          <div className={styles.current_page}>
            {category.toUpperCase()} | Page {page} | Total {Math.floor(categoryList.count / 10)}
          </div>
          <div className={styles.page_controllers}>
            <Button onClick={previousPage} disabled={page === 1} content='Previous page'/>
            <Button onClick={nextPage} disabled={Math.floor(categoryList.count / 10) === page} content='Next page'/>
          </div>
        </div> : null
      }

      {!size(categoryList) &&
        <div className={styles.pre_text}>Please search for discussions or select a category</div>
      }

      {!!size(categoryList) ? categoryList.results.map((value, index) => <Item key={index} item={value} />) :  null}
    </Segment>
  )
}

export default Homepage;