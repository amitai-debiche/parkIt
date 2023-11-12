import { MagnifyingGlassIcon } from "@heroicons/react/20/solid"
import { PlusIcon, HeartIcon } from "@heroicons/react/24/outline"
import { Link } from "react-router-dom"
import "../index.css"

interface NavProps {
	// 1 - Add, 2 - Favorites, 3 - both
	icons: 1 | 2 | 3
	search: (newSearch: string) => void
	searchHidden: boolean
}

function NavBar(props: NavProps) {
	return (
		<div className="nav-container">
			<div className="nav-align">
				{/* parkIt logo */}
				<div className="title-container">
					<Link to="/home">
						<h1 className="font-semibold text-4xl">parkIt</h1>
					</Link>
				</div>

				{/* Conditionally render the search bar based on searchHidden */}
				{!props.searchHidden ? (
					<div className="search-bar-container">
						<div className="search-bar-align">
							<div className="w-full">
								<label htmlFor="search" className="sr-only">
									Search
								</label>
								<div className="relative">
									<div className="search-icon-overlay">
										<MagnifyingGlassIcon
											className="h-5 w-5 text-gray-400"
											aria-hidden="true"
										/>
									</div>
									<input
										id="search"
										name="search"
										className="search-bar"
										placeholder="Search"
										type="search"
										onChange={(e) => props.search(e.target.value)}
									/>
								</div>
							</div>
						</div>
					</div>
				) : (
					<div className="search-bar-container mt-9">
						<div className="search-bar-align"></div>
					</div>
				)}

				{/* buttons */}
				<div className="nav-button-container">
					{props.icons === 1 ? (
						<button type="button" className="nav-button">
							<PlusIcon className="h-6 w-6" aria-hidden="true" />
						</button>
					) : props.icons === 2 ? (
						<button type="button" className="nav-button">
							<HeartIcon className="h-6 w-6" aria-hidden="true" />
						</button>
					) : (
						<>
							<button type="button" className="nav-button">
								<PlusIcon className="h-6 w-6" aria-hidden="true" />
							</button>
							<button type="button" className="nav-button">
								<HeartIcon className="h-6 w-6" aria-hidden="true" />
							</button>
						</>
					)}
				</div>
			</div>
		</div>
	)
}

export default NavBar
