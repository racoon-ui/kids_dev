import React, { useState, useEffect } from 'react';

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
      <div className="profile-name">{profile.name}</div>
    </div>
  );
};

function App() {
  const [posts, setPosts] = useState([]);
  const [comments, setComments] = useState([]);
  const [profile, setProfile] = useState(null);

  useEffect(() => {
    fetch('/posts')
      .then(res => {
        return res.json();
      })
      .then(json => {
        setPosts(...posts, json);
      });

    fetch('/profile')
      .then(res => {
        return res.json();
      })
      .then(json => {
        setProfile(json);
      });
  }, []);

  return (
    <div className="App">
      <div className="post-list-container">
        {posts.length > 0 &&
          posts.map(post => {
            return <Post post={post} key={post.id} />;
          })}
        {posts.length === 0 && <div className="empty-data">데이터가 없습니다.</div>}
      </div>
      {profile && <Profile profile={profile} />}
    </div>
  );
}

export default App;
