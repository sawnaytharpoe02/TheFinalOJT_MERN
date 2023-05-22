import './post.css';
import { MoreVert } from '@mui/icons-material';
import { useContext, useEffect, useState } from 'react';
import { format } from 'timeago.js';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { AuthContext } from '../../context/AuthContext';

export default function Post({ post }) {
  const PF = import.meta.env.VITE_REACT_APP_PUBLIC_FOLDER;
  const [like, setLike] = useState(post.likes.length);
  const [isLiked, setIsLiked] = useState(false);
  const [user, setUser] = useState({});

  const { user: currentUser } = useContext(AuthContext);

  const fetchUser = async () => {
    try {
      const res = await axios.get(
        `http://localhost:8800/api/users?userId=${post.userId}`
      );
      setUser(res.data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    setIsLiked(post.likes.includes(currentUser.user._id));
  }, [currentUser.user._id, post.likes]);

  useEffect(() => {
    fetchUser();
  }, [post.userId]);

  const likeHandler = () => {
    try {
      axios.put(`http://localhost:8800/api/posts/${post._id}/like`, {
        userId: currentUser.user._id,
      });
    } catch (err) {
      console.log(err);
    }
    setLike(isLiked ? like - 1 : like + 1);
    setIsLiked(!isLiked);
  };

  return (
    <div className="post">
      <div className="postWrapper">
        <div className="postTop">
          <div className="postTopLeft">
            <Link to={`profile/${user.username}`}>
              <img
                className="postProfileImg"
                src={
                  user.profilePicture
                    ? PF + user.profilePicture
                    : PF + 'person/no_avatar.jpg'
                }
                alt=""
              />
            </Link>
            <span className="postUsername">{user?.username}</span>
            <span className="postDate">{format(post.createdAt)}</span>
          </div>
          <div className="postTopRight">
            <MoreVert />
          </div>
        </div>
        <div className="postCenter">
          <span className="postText">{post?.desc}</span>
          <img className="postImg" src={`${PF}post/${post.img}`} alt="" />
        </div>
        <div className="postBottom">
          <div className="postBottomLeft">
            <img
              className="likeIcon"
              src={`${PF}like.png`}
              onClick={likeHandler}
              alt=""
            />
            <img
              className="likeIcon"
              src={`${PF}heart.png`}
              onClick={likeHandler}
              alt=""
            />
            <span className="postLikeCounter">{like} people like it</span>
          </div>
          <div className="postBottomRight">
            <span className="postCommentText">{post?.comment} comments</span>
          </div>
        </div>
      </div>
    </div>
  );
}
