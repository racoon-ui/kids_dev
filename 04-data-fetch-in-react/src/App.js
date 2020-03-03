import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Post = ({ post }) => {
  return (
    <div className="post-container">
      <div className="post-title">{post.title}</div>
      <div className="post-author">{post.author}</div>
    </div>
  );
};

const Profile = ({ profile }) => {
  return (
    <div className="profile-container">
      <div className="profile-name">{profile}</div>
    </div>
  );
};

// axios.interceptors.request.use(
//   function(config) {},
//   function(error) {
//     return Promise.reject(error);
//   },
// );

// axios.interceptors.response.use(
//   function(response) {},
//   function(error) {
//     return Promise.reject(error);
//   },
// );

function App() {
  const [posts, setPosts] = useState([]);
  const [comments, setComments] = useState([]);
  const [profile, setProfile] = useState('profile');

  /**
   * 0. library 로써의 차이점을 알아보자 (브라우저 지원, 3rd party library 사용 등)
   * 1. fetch vs axios 의 차이점을 알아보자
   * 2. fetch vs axios 의 데이터 가공하는 방식에 대한 차이를 알아보자
   * 3. error handling 기법에 대해서 알아보자
   * 4. intercepting 방법이 존재하는지 알아보자.
   * 5. async function 사용 시 어떤 차이가 있는지 알아보자.
   * 6. 호출 취소에 대한 방법이 있는지 알아보자.
   */

  useEffect(() => {
    console.log('useEffect ENTRY');

    fetch('/posts')
      .then(res => {
        if (!res.ok) {
          throw Error(res.statusText);
        }
        return res.json();
      })
      .then(json => {
        setPosts(json);
      })
      .catch(error => {
        console.log(error);
      });

    //
    // axios('/posts')
    //   .then(res => {
    //     return setPosts(res.data);
    //   })
    //   .catch(error => {
    //     console.log(error);
    //   });
    //
    // async function fetchPost() {
    //   try {
    //     const res = await fetch('/post');
    //     if (!res.ok) {
    //       throw Error(res.statusText);
    //     }

    //     setPosts(await res.json());
    //   } catch (e) {
    //     console.log(e);
    //   }
    // }
    //
    // const fetchPost = async () => {
    //   try {
    //     const res = await axios('/posts');
    //     setPosts(res.data);
    //   } catch (e) {
    //     console.log(e);
    //   }
    // };

    // fetchPost();
  }, []);

  return (
    <div className="App">
      <div className="post-list-container">
        {posts.length > 0 && posts.map(post => <Post post={post} key={post.id} />)}
        {posts.length === 0 && <div className="empty-data">데이터가 없습니다.</div>}
      </div>
      {profile && <Profile profile={profile} />}
      <button type="button" onClick={() => setProfile('dante')}>
        Change DANTE
      </button>
    </div>
  );
}

export default App;
