import NavBar from "../components/NavBar.tsx"
import { ChangeEvent, FormEvent, useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import { useNavigate } from "react-router-dom"
import { PhotoIcon } from "@heroicons/react/20/solid"

import "../index.css"

function Create() {
	const { id } = useParams()
	const navigate = useNavigate()
	const [postData, setPostData] = useState({
		location: "",
		spots: 0,
		price: 0,
		description: "",
	})

	const [selectedImage, setSelectedImage] = useState<File>() // Initialize with null

	// Function to handle file input change
	const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const file = e.target.files ? e.target.files[0] : null

		if (file) {
			// Display the selected image
			setSelectedImage(file)
		}
	}

	const handlePostFormChange = (
		e: ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLTextAreaElement>
	) => {
		const { name, value } = e.target
		setPostData({
			...postData,
			[name]: value,
		})
	}

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
	}, [id, navigate])

	const handleCreate = (e: FormEvent) => {
		e.preventDefault()
		const formData = new FormData()
		console.log(formData)
		formData.append("location", postData.location)
		formData.append("spots", postData.spots.toString())
		formData.append("price", postData.price.toString())
		formData.append("description", postData.description)
		if (selectedImage) formData.append("images", selectedImage)

		fetch("http://127.0.0.1:8000/api/posts/", {
			method: "POST",
			headers: {
				Authorization: `Token ${localStorage.getItem("authToken")}`,
			},
			body: formData,
		})
			.then((response) => {
				if (response.status === 201) {
					navigate("/home")
					return response.json()
				} else {
					alert("Either your post could not be created.")
				}
			})
			.catch((error) => {
				console.error("Error:", error)
			})
	}

	return (
		<>
			<NavBar icons={2} search={() => {}} searchHidden={true} />
			{/* image view on one side, data on the other */}
			<div className="view-container">
				<div className="col-span-1">
					<div className="col-span-full flex items-center">
						<label
							htmlFor="spot-photo"
							className="block text-sm font-medium leading-6 text-white"
						>
							Spot photo
						</label>
						<div className="photo-container">
							<div className="text-center">
								{selectedImage ? (
									<img
										src={URL.createObjectURL(selectedImage)}
										alt="Selected"
										className="photo-uploaded-style"
									/>
								) : (
									<div className="self-center min-w-[150px] mt-40">
										<PhotoIcon
											className="mx-auto h-12 w-12 text-gray-500"
											aria-hidden="true"
										/>
										<div className="mt-4 flex text-sm leading-6 text-gray-400">
											<label htmlFor="file-upload" className="upload-label">
												<span>Upload a file</span>
												<input
													id="file-upload"
													name="file-upload"
													type="file"
													className="sr-only"
													onChange={handleImageChange}
												/>
											</label>
											<p className="pl-1">or drag and drop</p>
										</div>
										<p className="text-xs leading-5 mt-2 text-gray-400">
											PNG or JPG up to 10MB
										</p>
									</div>
								)}
							</div>
						</div>
					</div>
				</div>
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
								onChange={handlePostFormChange}
								required
								className="register-input-style w-full"
							/>
						</div>
					</div>

					{/* Description */}
					<div className="col-span-full mx-1 mt-10">
						<label
							htmlFor="about"
							className="block text-sm font-medium leading-6 text-black"
						>
							Description
						</label>
						<div className="mt-2">
							<textarea
								id="description"
								name="description"
								rows={3}
								onChange={handlePostFormChange}
								className="description-style"
								defaultValue={""}
							/>
						</div>
						<p className="mt-3 text-sm leading-6 text-gray-400">
							Describe the spot your offering. Consider mentioning how long is
							it available, where specifically the spot is located - road,
							driveway, parking lot, etc. Furthermore, share any contact
							information you would like.
						</p>
					</div>

					{/* Price and Spots */}
					<div className="flex mt-10">
						<div className="mx-1 flex-wrap flex-1">
							<label
								htmlFor="location"
								className="block text-sm font-medium leading-6 text-gray-900"
							>
								Price ($/Month)
							</label>
							<div className="mt-2">
								<input
									id="price"
									name="price"
									type="number"
									max={1000}
									onChange={handlePostFormChange}
									required
									className="register-input-style w-full"
								/>
							</div>
						</div>
						<div className="mx-1 flex-1">
							<label
								htmlFor="spots"
								className="block text-sm font-medium leading-6 text-gray-900"
							>
								Spots Currently Available
							</label>
							<div className="mt-2">
								<input
									id="spots"
									name="spots"
									type="number"
									max={1000}
									onChange={handlePostFormChange}
									required
									className="register-input-style w-full"
								/>
							</div>
						</div>
					</div>
					<br />
					<br />
					{/* Send email to seller expressing interest and providing buyer's email for further contact */}
					<button
						type="submit"
						className="contact-button"
						onClick={handleCreate}
					>
						Create
					</button>
				</div>
			</div>
		</>
	)
}

export default Create
