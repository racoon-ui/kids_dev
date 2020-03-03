import React, { useState, useEffect, useRef } from 'react';
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

/**
 * React 16.8 버전부터 추가된 Hook 기능을 알아본다.
 *
 * 1. 기본 훅 (웬만하면 기본 훅만 사용해도 크게 무리는 없음)
 *    - useState: component 내의 state 값을 처리하고자 할 때 사용
 *    - useEffect: 화면이 시작될 때 / 업데이트 될 때 등에서 사용 (사용시 매우 주의해야 함)
 *    - useContext: React.createContext 로 생성된 Global Context 의 내용을 연동할 경우 사용
 *    - useRef: 특정 DOM Element 를 참조해야 할 경우 필요
 * 2. 추가 훅 (추가 훅은 기본 Hook 의 변형이거나 특별한 경우에만 사용되는 경우임)
 *    - useReducer: useState를 redux 방식으로 사용하기 위한 hook
 *    - useCallback: useMemo 와 동일하게 렌더링 효율을 올리기 위해 사용되는 hook 임
 *    - useMemo: 인자로 전달되는 값에 대한 변화가 감지될 때만 callback 수행이 될 수 있도록 하여 불필요한 랜더링 수행을 방지
 */

function App() {
  /**
   * useState 가 가지는 의미는 무엇일까?
   * 1. 기존의 React.Component 를 상속받아서 처리할 때와의 차이점은?
   * 2. useState 함수를 우리가 만들어 본다면 어떻게 만들어 볼 수 있을까?
   * 3. useState 의 인자로 들어올 수 있는 경우들은 어떤 것들이 있을까?
   *    - hash
   *    - array
   *    - boolean
   *    - number
   *    - string
   *    - etc
   */

  const [posts, setPosts] = useState([]);
  const [profile, setProfile] = useState('');

  /**
   * useRef 의 사용법을 알아보자
   * 1. onChange 를 통한 setValue 만이 해결법은 아니다.
   * 2. 특정 HTML Element 를 접근하고자 할 때 요긴하게 사용된다.
   */
  const profileEl = useRef(null);

  /**
   * useEffect 를 사용하는데 있어서 주의해야 할 점
   * 1. 마지막에 [] 인자를 넣지 않으면 엄청난 일이 벌어질 수 있다.
   * 2. return 구문을 제대로 이해하자
   * 3. 특정 값의 변경에 반응하고자 한다면?
   */

  useEffect(() => {
    console.log('useEffect ENTRY');

    const fetchPost = async () => {
      try {
        const res = await axios('/posts');
        setPosts(res.data);
      } catch (e) {
        console.log(e);
      }
    };

    fetchPost();
  }, [profile]);

  const changeProfileHandler = () => {
    setProfile(profileEl.current.value);
  };

  return (
    <div className="App">
      <div className="post-list-container">
        {posts.length > 0 && posts.map(post => <Post post={post} key={post.id} />)}
        {posts.length === 0 && <div className="empty-data">데이터가 없습니다.</div>}
      </div>
      {profile && <Profile profile={profile} />}
      <input type="text" name="profile" ref={profileEl} />
      <button type="button" onClick={changeProfileHandler}>
        Change
      </button>
    </div>
  );
}

export default App;
