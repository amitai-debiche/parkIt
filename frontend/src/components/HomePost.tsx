import { useNavigate } from "react-router-dom"

import "../index.css"

interface HomePost {
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
			<div className="home-post-box"></div>

			<br />

			{/* descriptor text */}
			<p className="font-semibold">{props.location}</p>
			<p className="font-light">
				{props.spots} {props.spots == 1 ? "spot" : "spots"} available
			</p>
			<p className="font-semibold">
				${props.price} <span className="font-light">month</span>
			</p>
		</div>
	)
}

export default HomePost
