import NavBar from "../components/NavBar.tsx"
import HomePost from "../components/HomePost.tsx"
import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import "../index.css"

interface Data extends Array<Posts> {}

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
  const [loggedIn, setLoggedIn] = useState(true)
	const navigate = useNavigate()
	useEffect(() => {
		// Replace 'api_url' with the actual URL of your Django API endpoint
    fetch("http://127.0.0.1:8000/api/check-auth/")
			.then((response) => {
        setLoggedIn(response.status === 200)}
      )
			.then(() => {
				if(!loggedIn) {
          navigate("/")
        }
			})
			.catch(() => {
        navigate("/")
			})
    
		fetch("http://127.0.0.1:8000/api/posts/")
			.then((response) => response.json())
			.then((data) => {
				setData(data)
			})
			.catch((error) => {
				console.error("Error fetching data:", error)
			})
	}, [loggedIn, navigate])

	function homeSearchPosts(newSearch: string) {
		setSearch(newSearch)
	}

	function onClickNavigate(postId: number) {
		// You can specify the URL or path you want to navigate to here
		navigate(`/view/${postId}/`)
	}

	return (
		<>
			<NavBar icons={3} search={homeSearchPosts} searchHidden={false} />

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
