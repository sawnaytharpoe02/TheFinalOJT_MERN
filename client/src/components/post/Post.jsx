import './post.css';
import { MoreVert, PermMedia, Cancel } from '@mui/icons-material';
import { useContext, useEffect, useState, useRef } from 'react';
import { format } from 'timeago.js';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { AuthContext } from '../../context/AuthContext';

// material
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';

export default function Post({ post }) {
  const PF = import.meta.env.VITE_REACT_APP_PUBLIC_FOLDER;

  const [like, setLike] = useState(post.likes.length);
  const [isLiked, setIsLiked] = useState(false);
  const [user, setUser] = useState({});
  const { user: currentUser } = useContext(AuthContext);

  useEffect(() => {
    setIsLiked(post.likes.includes(currentUser?.user._id));
  }, [currentUser?.user._id, post.likes]);

  // fetch user
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
    fetchUser();
  }, [post.userId]);

  // like unlike handler
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

  // handle delete edit post
  const [showDropdown, setShowDropdown] = useState(false);
  const [open, setOpen] = useState(false);
  const [file, setFile] = useState(null);
  const desc = useRef();

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleDropdown = () => {
    setShowDropdown(!showDropdown);
  };

  const handleDelete = async () => {
    try {
      const config = {
        headers: {
          Authorization: `Bearer ${currentUser.token}`,
        },
      };
      const data = { userId: currentUser.user._id };
      await axios.delete(`http://localhost:8800/api/posts/${post._id}`, {
        data,
        ...config,
      });
      window.location.reload();
    } catch (err) {
      console.log(err);
    }
  };

  const handleEdit = async () => {
    const updatePost = {
      userId: currentUser.user._id,
      desc: desc.current.value,
    };

    if (file) {
      const data = new FormData();
      const fileName = Date.now() + file.name;
      data.append('name', fileName);
      data.append('file', file);
      updatePost.img = fileName;
      console.log(updatePost);
      try {
        await axios.post('http://localhost:8800/api/upload', data);
      } catch (err) {
        console.log(err);
      }
    }

    try {
      const config = {
        headers: {
          Authorization: `Bearer ${currentUser.token}`,
        },
      };
      await axios.put(
        `http://localhost:8800/api/posts/${post._id}`,
        updatePost,
        config
      );

      window.location.reload();
    } catch (err) {
      console.log(err);
    }
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

          {currentUser.user._id === post.userId && (
            <div>
              {/* edit delete post dropdown */}
              <div className="postTopRight" onClick={handleDropdown}>
                <MoreVert className="more_vert" />
                {showDropdown && (
                  <div className="dropdown">
                    <p onClick={handleClickOpen}>Edit</p>
                    <p onClick={handleDelete}>Delete</p>
                  </div>
                )}
              </div>
              {/* dialog box for edit post */}
              <div>
                <Dialog
                  open={open}
                  className="updatePostForm"
                  onClose={handleClose}>
                  <DialogContent>
                    <form onSubmit={handleEdit}>
                      <div className="updateDescText">
                        <TextField
                          autoFocus
                          margin="dense"
                          label="Description"
                          type="text"
                          fullWidth
                          variant="standard"
                          inputRef={desc}
                        />
                      </div>
                      {file && (
                        <div className="updateImgContainer">
                          <img
                            src={URL.createObjectURL(file)}
                            alt=""
                            className="updateImg"
                          />
                          <Cancel
                            className="updateCancelImg"
                            onClick={() => setFile(null)}
                          />
                        </div>
                      )}
                      <label htmlFor="updateFile" className="updateOption">
                        <PermMedia htmlColor="tomato" className="updateIcon" />
                        <span className="updateOptionText">Photo or Video</span>
                        <input
                          style={{ display: 'none' }}
                          type="file"
                          id="updateFile"
                          accept=".jpg, .png, .jpeg"
                          onChange={(e) => setFile(e.target.files[0])}
                        />
                      </label>
                    </form>
                  </DialogContent>
                  <DialogActions>
                    <Button onClick={handleClose}>Cancel</Button>
                    <Button type="submit" onClick={handleEdit}>
                      Update
                    </Button>
                  </DialogActions>
                </Dialog>
              </div>
            </div>
          )}
        </div>
        <div className="postCenter">
          <span className="postText">{post?.desc}</span>
          <img className="postImg" src={PF + post.img} alt="" />
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
