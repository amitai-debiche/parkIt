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
}

function Favorites() {
	const [data, setData] = useState<Data>([])
	const [, setSearch] = useState("")
	const [likedPosts, setLikedPosts] = useState<number[]>([])
	const navigate = useNavigate()

	// check if user is logged in, else boot them to login page
	useEffect(() => {
		fetch("http://127.0.0.1:8000/api/check-auth/", {
			method: "GET",
			headers: {
				Authorization: `Token ${localStorage.getItem("authToken")}`,
			},
		})
			.then((response) => {
				if (response.status !== 200) {
					navigate("/")
				}
			})
			.catch((error) => {
				console.error("Error:", error)
			})

		fetch("http://127.0.0.1:8000/api/favorite-posts/", {
			method: "GET",
			headers: {
				Authorization: `Token ${localStorage.getItem("authToken")}`,
			},
		})
			.then((response) => response.json())
			.then((data) => {
				setData(data)
				setLikedPosts(data.map((post: Posts) => post.id))
			})
			.catch((error) => {
				console.error("Error fetching data:", error)
			})
	}, [navigate, likedPosts])

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
			<NavBar icons={1} search={homeSearchPosts} searchHidden={false} />
			{data.length > 0 ? (
				<PostList
					posts={data}
					likedPosts={likedPosts}
					onToggleLike={toggleLike}
				/>
			) : (
				<p className="one-pager-text">You have no favorite spots, make sure to hit the heart icon to mark your favorites!</p>
			)}
		</>
	)
}

export default Favorites
