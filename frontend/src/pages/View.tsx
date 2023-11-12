import NavBar from "../components/NavBar.tsx"
import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import { useNavigate, useLocation } from "react-router-dom"

import "../index.css"

interface PostDetails {
	id: number
	location: string
	description: string
	spots: number
	price: number
	created: string
	creator: number
}

function View() {
	const [, setSearch] = useState("")
	const [data, setData] = useState<PostDetails | undefined>()
	const { id } = useParams()
	const navigate = useNavigate()
	const location = useLocation()

	useEffect(() => {
		// Replace 'api_url' with the actual URL of your Django API endpoint
		fetch(`http://127.0.0.1:8000/api/posts/${id}/`)
			.then((response) => response.json())
			.then((data) => {
				setData(data)
			})
			.catch((error) => {
				console.error("Error fetching data:", error)
			})
	}, [id])

	function addSearchPosts(newSearch: string) {
		if (location.pathname != "/" && location.pathname != "") {
			navigate("/")
		}
		setSearch(newSearch)
	}

	return (
		<>
			<NavBar icons={3} search={addSearchPosts} searchHidden={true} />
			<div className="view-container">
				<div className="col-span-1"></div>
				<div className="col-span-1 overflow-scroll">
					<div className="col-span-1 flex flex-wrap text-3xl">
						<p className="font-semibold lg:whitespace-nowrap mr-2">
							{data?.location}
						</p>
						<p className="font-light text-gray-400 lg:whitespace-nowrap">
              {data?.spots} {data?.spots == 1 ? "spot" : "spots"} available
						</p>
					</div>
					<h2 className="font-semibold mt-3 text-2xl">
						${data?.price} <span className="font-light">month</span>
					</h2>
          <div className="h-[20vh] max-h-30">
          <p className="body-text">
						{data?.description} 
					</p>
          </div>
					
					<h2 className="font-semibold mt-3 text-2xl">Seller Information</h2>
					<p className="body-text">Johnny Appleseed</p>
					<p className="body-text">seedyapple@gmail.com</p>
					<br />
					<br />
					<button
						type="button"
						className="rounded-md bg-black px-10 py-3 text-sm font-semibold text-white shadow-sm hover:bg-gray-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gray-400"
					>
						Contact
					</button>
				</div>
			</div>
		</>
	)
}

export default View
