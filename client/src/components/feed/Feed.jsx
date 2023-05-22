import Post from '../post/Post';
import Share from '../share/Share';
import './feed.css';
import { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../../context/AuthContext';
import axios from 'axios';

const Feed = ({ username }) => {
  const [posts, setPosts] = useState([]);
  const { user } = useContext(AuthContext);
  const fetchPosts = async () => {
    try {
      const res = username
        ? await axios.get(`http://localhost:8800/api/posts/profile/${username}`)
        : await axios.get(
            `http://localhost:8800/api/posts/timeline/${user.user._id}`
          );
      setPosts(res.data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchPosts();
  }, [username, user?.user._id]);

  return (
    <div className="feed">
      <div className="feedWrapper">
        <Share />
        {posts.map((post) => (
          <Post key={post._id} post={post} />
        ))}
      </div>
    </div>
  );
};

export default Feed;
