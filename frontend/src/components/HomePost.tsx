import { useNavigate } from "react-router-dom"

import "../index.css"

interface HomePost {
	images: string
	location: string
	spots: number
	price: number
	creator: number
	id: number
}
function HomePost(props: HomePost) {
	const navigate = useNavigate()
	function onClickNavigate(postId: number) {
		navigate(`/view/${postId}/`)
	}
	return (
		<div onClick={() => onClickNavigate(props.id)}>
			{/* image box */}
			<div
				className="home-post-box rounded-lg"
				style={{
					backgroundImage: `url(${props.images})`, // Set the image as a background
					backgroundSize: "cover", // Cover the entire container
					backgroundPosition: "center", // Center the image
				}}
			></div>

			<br />

			{/* descriptor text */}
      <div className="pl-2 pb-2">
			<p className="font-semibold">{props.location}</p>
			<p className="font-light">
				{props.spots} {props.spots == 1 ? "spot" : "spots"} available
			</p>
			<p className="font-semibold">
				${props.price} <span className="font-light">month</span>
			</p>
      </div>

		</div>
	)
}

export default HomePost
