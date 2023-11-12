import NavBar from "../components/NavBar.tsx"
import HomePost from "../components/HomePost.tsx"
import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import "../index.css"

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

function Home() {
	const [data, setData] = useState<Data>([])
	const [search, setSearch] = useState("")
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

		fetch("http://127.0.0.1:8000/api/posts/")
			.then((response) => response.json())
			.then((data) => {
				setData(data)
			})
			.catch((error) => {
				console.error("Error fetching data:", error)
			})
	}, [navigate])

	function homeSearchPosts(newSearch: string) {
		setSearch(newSearch)
	}

	// go to specific post view page
	function onClickNavigate(postId: number) {
		navigate(`/view/${postId}/`)
	}

	return (
		<>
			<NavBar icons={3} search={homeSearchPosts} searchHidden={false} />

			{/* search filter */}
			<div className="home-grid">
				{data
					.filter((post) =>
						post.location.toLowerCase().includes(search.trim().toLowerCase())
					)
					.map((post) => {
						return (
							<div
								className="hover:cursor-pointer"
								onClick={() => onClickNavigate(post.id)}
								key={post.id}
							>
								<HomePost
									location={post.location}
									spots={post.spots}
									price={post.price}
									creator={post.creator}
									id={post.id}
								/>
							</div>
						)
					})}
			</div>
		</>
	)
}

export default Home
