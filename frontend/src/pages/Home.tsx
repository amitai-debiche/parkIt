import NavBar from "../components/NavBar.tsx"
import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import "../index.css"
import PostList from "../components/PostList.tsx"

// make sure data is array of posts with post fields
interface Data extends Array<Posts> {}

// backend post fields
export interface Posts {
	id: number
	location: string
	description: string
	spots: number
	price: number
	created: string
	creator: number
	images: string
}

const API_BASE_URL = "http://127.0.0.1:8000/api";
const POSTS_ENDPOINT = `${API_BASE_URL}/posts/`;
const FAVORITE_POSTS_ENDPOINT = `${API_BASE_URL}/favorite-posts/`;

function Home() {
	const [data, setData] = useState<Data>([]);
	const [, setSearch] = useState("");
	const [likedPosts, setLikedPosts] = useState<number[]>([]);
	const navigate = useNavigate();

	const fetchPosts = () => {
		fetch(POSTS_ENDPOINT, {
			method: "GET",
			headers: {
				Authorization: `Token ${localStorage.getItem("authToken")}`,
			},
		})
			.then((response) => {
				if (response.status === 200) {
					return response.json();
				} else {
					throw new Error("Failed to fetch posts.");
				}
			})
			.then((postData) => {
				const postsWithImages = postData.map((post: Posts) => {
					return {
						...post,
						images: `http://127.0.0.1:8000${post.images}/`, // Change this to the actual URL or path to your images
					};
				});
				setData(postsWithImages);
			})
			.catch((error) => {
				console.error("Error fetching posts:", error);
			});
	};

	const fetchLikedPosts = () => {
		fetch(FAVORITE_POSTS_ENDPOINT, {
			method: "GET",
			headers: {
				Authorization: `Token ${localStorage.getItem("authToken")}`,
			},
		})
			.then((response) => {
				if (response.status === 200) {
					return response.json();
				} else {
					throw new Error("Failed to fetch liked posts.");
				}
			})
			.then((data) => {
				const likedPostIds = data.map((post: Posts) => post.id);
				setLikedPosts(likedPostIds);
			})
			.catch((error) => {
				console.error("Error fetching liked posts:", error);
			});
	};

	useEffect(() => {
		fetch("http://127.0.0.1:8000/api/check-auth/", {
			method: "GET",
			headers: {
				Authorization: `Token ${localStorage.getItem("authToken")}`,
			},
		})
			.then((response) => {
				if (response.status !== 200) {
					navigate("/");
				}
			})
			.catch((error) => {
				console.error("Error:", error);
			});

		fetchPosts();
	}, [navigate]);

	useEffect(() => {
		fetchLikedPosts();
	}, []);

	function homeSearchPosts(newSearch: string) {
		setSearch(newSearch)
	}

	function toggleLike(postId: number) {
		if (likedPosts.some((post) => post === postId)) {
			// Unlike the post
			const updatedLikedPosts = likedPosts.filter((post) => post !== postId)
			setLikedPosts(updatedLikedPosts)
		} else {
			// Like the post
			const updatedLikedPosts = [...likedPosts, postId] // Create a new LikedPost
			setLikedPosts(updatedLikedPosts)
		}

		// Send the like/unlike request to your API here
		// You may need to update the server-side record of liked posts
		fetch(`http://127.0.0.1:8000/api/toggle-favorite/${postId}/`, {
			method: "POST",
			headers: {
				Authorization: `Token ${localStorage.getItem("authToken")}`,
			},
		})
			.then((response) => {
				if (response.status === 200) {
					return response.json()
				} else {
					alert("Your post could not be liked.")
				}
			})
			.catch((error) => {
				console.error("Error:", error)
			})
	}
	return (
    <>
      <NavBar icons={3} search={homeSearchPosts} searchHidden={false} />
      <PostList posts={data} likedPosts={likedPosts} onToggleLike={toggleLike} />
    </>
  );
}

export default Home
