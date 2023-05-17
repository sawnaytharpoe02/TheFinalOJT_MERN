import Post from '../post/Post';
import Share from '../share/Share';
import './feed.css';
import { useEffect, useState } from 'react';
import axios from 'axios';

const Feed = ({ username }) => {
	const [posts, setPosts] = useState([]);

	const fetchPosts = async () => {
		try {
			const res = username
				? await axios.get(`http://localhost:8800/api/posts/profile/${username}`)
				: await axios.get(
						'http://localhost:8800/api/posts/timeline/6461d7b2182f7d24d8ba574d'
				  );
			setPosts(res.data);
		} catch (error) {
			console.error(error);
		}
	};

	useEffect(() => {
		fetchPosts();
	}, [username]);

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
