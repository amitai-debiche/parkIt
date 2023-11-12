import NavBar from "../components/NavBar.tsx"
import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import { useNavigate } from "react-router-dom"

import "../index.css"

// detailed post fields
interface PostDetails {
	id: number
	location: string
	description: string
	spots: number
	price: number
	created: string
	creator: number
	creator_email: string
}

function Create() {
	const [data, setData] = useState<PostDetails | undefined>()
	const { id } = useParams()
	const navigate = useNavigate()

  // check if user is logged in, else boot to login page
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
			.catch(() => {})
		fetch(`http://127.0.0.1:8000/api/posts/${id}/`)
			.then((response) => response.json())
			.then((data) => {
				setData(data)
			})
			.catch((error) => {
				console.error("Error fetching data:", error)
			})
	}, [id, navigate])

	return (
		<>
			<NavBar icons={3} search={() => {}} searchHidden={true} />
      {/* image view on one side, data on the other */}
			<div className="view-container">
				<div className="col-span-1"></div>
				<div className="col-span-1 mx-1 overflow-scroll">

          {/* Location */}
          <div className="mx-1">
							<label
								htmlFor="location"
								className="block text-sm font-medium leading-6 text-gray-900"
							>
								Location
							</label>
							<div className="mt-2">
								<input
									id="location"
									name="location"
									type="text"
									maxLength={70}
									required
									className="register-input-style w-full"
								/>
							</div>
						</div>
					<br />
					<br />
          {/* Send email to seller expressing interest and providing buyer's email for further contact */}
					<button
						type="button"
						className="contact-button"
						onClick={() => {}}
					>
						Create
					</button>
				</div>
			</div>
		</>
	)
}

export default Create
