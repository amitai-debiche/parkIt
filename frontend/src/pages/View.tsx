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

function View() {
	const [data, setData] = useState<PostDetails | undefined>()
	const { id } = useParams()
	const navigate = useNavigate()

  // check if user is logged in, else boot to login page
	useEffect(() => {
		fetch("http://127.0.0.1:8000/api/check-auth/", {
			method: "GET",
			headers: {
				"Authorization": `Token ${localStorage.getItem("authToken")}`,
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

	// Function to handle contact button click
	// Function to handle contact button click
	const handleContactButtonClick = () => {
		// Make a POST request to the specified endpoint
		fetch(`http://127.0.0.1:8000/api/send-email/${id}/`, {
		  method: "POST",
		  headers: {
			"Content-Type": "application/json",
			Authorization: `Token ${localStorage.getItem("authToken")}`,
		  },
		  // You can include a request body if needed
		  // body: JSON.stringify({ /* your data here */ }),
		})
		  .then((response) => {
			if (response.status === 200) {
			  // Handle success, e.g., show a success message
			  alert(
				`An email has been sent to ${data?.creator_email} expressing your interest in their parking spot!`
			  );
			} else {
			  // Handle other status codes
			  alert("Error sending contact request");
			}
		  })
		  .catch((error) => {
			console.error("Error sending contact request:", error);
		  });
	  };

	return (
		<>
			<NavBar icons={3} search={() => {}} searchHidden={true} />
      {/* image view on one side, data on the other */}
			<div className="view-container">
				<div className="col-span-1">
					{data?.images && (
            		<img
              		src={`http://127.0.0.1:8000${data.images}`}
              		alt={data.location}
					style={{
						width: '100%',  // Set width to 100% of the parent container
						height: 'auto',  // Maintain the aspect ratio
						objectFit: 'cover',
					  }}
            	/>
          	)}
				</div>
				<div className="col-span-1 overflow-scroll">
				<div className="col-span-1"></div>
				<div className="col-span-1 mx-1 overflow-scroll">
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
						<p className="body-text">{data?.description}</p>
					</div>

          {/* User contact data */}
					<h2 className="font-semibold mt-3 text-2xl">Seller Information</h2>
					<p className="body-text">Johnny Appleseed</p>
					<p className="body-text">{data?.creator_email}</p>
					<br />
					<br />
          {/* Send email to seller expressing interest and providing buyer's email for further contact */}
					<button
						type="button"
						className="contact-button"
						onClick= {handleContactButtonClick}
						
					>
						Contact
					</button>
				</div>
			</div>
		</>
	)
}

export default View
