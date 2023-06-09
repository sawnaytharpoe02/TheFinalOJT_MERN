import './topbar.css';
import { Search, Person, Chat, Notifications } from '@mui/icons-material';
import { useContext } from 'react';
import { AuthContext } from '../../context/AuthContext';
import { Link } from 'react-router-dom';

export default function Topbar() {
  const PF = import.meta.env.VITE_REACT_APP_PUBLIC_FOLDER;
  const { user } = useContext(AuthContext);

  return (
    <div className="topbarContainer">
      <div className="topbarLeft">
        <Link to="/" style={{ textDecoration: 'none' }}>
          <span className="logo">Scmsocial</span>
        </Link>
      </div>
      <div className="topbarCenter">
        <div className="searchbar">
          <Search className="searchIcon" />
          <input
            placeholder="Search for friend, post or video"
            className="searchInput"
          />
        </div>
      </div>
      <div className="topbarRight">
        <div className="topbarLinks">
          <Link to="/" style={{ textDecoration: 'none' }}>
            <span className="topbarLink" style={{ color: '#fff' }}>
              Timeline
            </span>
          </Link>
        </div>
        <div className="topbarIcons">
          <div className="topbarIconItem">
            <Person />
            <span className="topbarIconBadge">1</span>
          </div>
          <div className="topbarIconItem">
            <Chat />
            <span className="topbarIconBadge">2</span>
          </div>
          <div className="topbarIconItem">
            <Notifications />
            <span className="topbarIconBadge">1</span>
          </div>
        </div>
        <Link to={`/profile/${user?.user.username}`}>
          <img
            src={
              user?.user.profilePicture
                ? PF + user.user.profilePicture
                : PF + 'person/no_avatar.jpg'
            }
            alt=""
            className="topbarImg"
          />
        </Link>
      </div>
    </div>
  );
}
