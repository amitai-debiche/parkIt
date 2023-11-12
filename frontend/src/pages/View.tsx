import NavBar from "../components/NavBar.tsx"
import { useEffect, useState } from "react"
import { useParams } from 'react-router-dom';

import "../index.css"

// interface PostDetails {
// 	id: number
// 	location: string
// 	description: string
// 	spots: number
// 	price: number
// 	created: string
// 	creator: number
// }

function View() {
	const [search, setSearch] = useState("")
  const [data, setData] = useState({})
  const {id} = useParams()

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
	}, [])

	function addSearchPosts(newSearch: string) {
		setSearch(newSearch)
	}

	return (
		<>
			<NavBar icons={3} search={addSearchPosts} />
			<div className="add-container grid grid-cols-2 gap-4 h-[80vh]">
				<div className="col-span-1"></div>
				<div className="col-span-1 overflow-scroll">
					<div className="col-span-1 flex text-3xl">
						<p className="font-semibold lg:whitespace-nowrap">props.location</p>
						<p className="font-light ml-3 text-gray-400 lg:whitespace-nowrap">
							props.spots available
						</p>
            {/* {props.spots == 1 ? "spot" : "spots"}  */}
					</div>
					<h2 className="font-semibold mt-3 text-2xl">
						$props.price <span className="font-light">month</span>
					</h2>
					<p className="text-base mt-3 text-gray-500">
						props.description Contrary to popular belief, Lorem Ipsum is not
						simply random text. It has roots in a piece of classical Latin
						literature from 45 BC, making it over 2000 years old. Richard
						McClintock, a Latin professor at Hampden-Sydney College in Virginia,
						looked up one of the more obscure Latin words, consectetur, from a
						Lorem Ipsum passage, and going through the cites of the word in
						classical literature, discovered the undoubtable source. Lorem Ipsum
						comes from sections 1.10.32 and 1.10.33 of "de Finibus Bonorum et
						Malorum".
					</p>
					<h2 className="font-semibold mt-3 text-2xl">Seller Information</h2>
					<p className="text-base mt-3 text-gray-500">Johnny Appleseed</p>
					<br />
					<p className="text-base mt-3 text-gray-500">seedyapple@gmail.com</p>
					<p className="text-base mt-3 text-gray-500">262-APP-SEED</p>
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
