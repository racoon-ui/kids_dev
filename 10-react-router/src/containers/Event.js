import React, { useState } from 'react';
import axios from 'axios';
import { Layout } from './Layout';
import { useParams } from 'react-router-dom';

import QuillEditor from '../components/Editor';

function Event() {
  const { slug } = useParams();

  const [content, setContent] = useState('');
  const [files, setFiles] = useState([]);

  const onEditorChange = value => {
    setContent(value);
    console.log(content);
  };

  const onFilesChange = files => {
    setFiles(files);
  };

  const onSubmit = event => {
    event.preventDefault();

    setContent('');

    // if (user.userData && !user.userData.isAuth) {
    //   return alert('Please Log in first');
    // }

    // const variables = {
    //   content: content,
    //   userID: user.userData._id,
    // };

    // axios.post('/api/blog/createPost', variables).then(response => {
    //   if (response) {
    //     message.success('Post Created!');

    //     setTimeout(() => {
    //       props.history.push('/blog');
    //     }, 2000);
    //   }
    // });
  };

  return (
    <Layout>
      <QuillEditor placeholder={'포스트를 작성하세요'} onEditorChange={onEditorChange} onFilesChange={onFilesChange} />
      <div>Event page: event id = {slug}</div>
    </Layout>
  );
}

export default Event;
