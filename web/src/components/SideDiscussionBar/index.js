import React, { useState, useEffect, useContext } from 'react';
import DiscussionValue from '../../context/DiscussionValue';
import { Segment, Comment, Input, Header, Button } from 'semantic-ui-react';

import styles from './index.module.scss';

const SideDiscussionBar = () => {
  const [value, setValue] = useState('');
  const [discussion] = useContext(DiscussionValue);

  useEffect(() => {
    // axios get every second for new messages
  }, [])

  const handleValueChange = (e, { value }) => setValue(value);
  const handleSubmit = () => {
    console.log(value)
    // axios call to POST message goes here
  }

  return (
    <Segment id={styles.discussion_bar}>
      <Comment.Group id={styles.comments_block}>
        <Header as='h3' dividing className={styles.comments_header}>
          {discussion.item}
        </Header>

        <div className={styles.comments_section}>
          {/* temp data */}
          <Comment className={styles.comment}>
            <Comment.Content>
              <Comment.Author as='a'>Matt</Comment.Author>
              <Comment.Metadata>
                <div>Today at 5:42PM</div>
              </Comment.Metadata>
              <Comment.Text>How artistic!</Comment.Text>
            </Comment.Content>
          </Comment>

          <Comment className={styles.comment}>
            <Comment.Content>
              <Comment.Author as='a'>Matt</Comment.Author>
              <Comment.Metadata>
                <div>Today at 5:42PM</div>
              </Comment.Metadata>
              <Comment.Text>How artistic!</Comment.Text>
            </Comment.Content>
          </Comment>

          <Comment className={styles.comment}>
            <Comment.Content>
              <Comment.Author as='a'>Matt</Comment.Author>
              <Comment.Metadata>
                <div>Today at 5:42PM</div>
              </Comment.Metadata>
              <Comment.Text>How artistic!</Comment.Text>
            </Comment.Content>
          </Comment>

          <Comment className={styles.comment}>
            <Comment.Content>
              <Comment.Author as='a'>Matt</Comment.Author>
              <Comment.Metadata>
                <div>Today at 5:42PM</div>
              </Comment.Metadata>
              <Comment.Text>How artistic!</Comment.Text>
            </Comment.Content>
          </Comment>

          <Comment className={styles.comment}>
            <Comment.Content>
              <Comment.Author as='a'>Matt</Comment.Author>
              <Comment.Metadata>
                <div>Today at 5:42PM</div>
              </Comment.Metadata>
              <Comment.Text>How artistic!</Comment.Text>
            </Comment.Content>
          </Comment>

          <Comment className={styles.comment}>
            <Comment.Content>
              <Comment.Author as='a'>Matt</Comment.Author>
              <Comment.Metadata>
                <div>Today at 5:42PM</div>
              </Comment.Metadata>
              <Comment.Text>How artistic!</Comment.Text>
            </Comment.Content>
          </Comment>

          <Comment className={styles.comment}>
            <Comment.Content>
              <Comment.Author as='a'>Matt</Comment.Author>
              <Comment.Metadata>
                <div>Today at 5:42PM</div>
              </Comment.Metadata>
              <Comment.Text>How artistic!</Comment.Text>
            </Comment.Content>
          </Comment>

          <Comment className={styles.comment}>
            <Comment.Content>
              <Comment.Author as='a'>Matt</Comment.Author>
              <Comment.Metadata>
                <div>Today at 5:42PM</div>
              </Comment.Metadata>
              <Comment.Text>How artistic!</Comment.Text>
            </Comment.Content>
          </Comment>
        </div>

      </Comment.Group>
      <div className={styles.input_section}>
        <Input className={styles.input} onChange={handleValueChange} />
        <Button onClick={handleSubmit} className={styles.button} content='Send' />
      </div>
    </Segment>
  )
}

export default SideDiscussionBar;