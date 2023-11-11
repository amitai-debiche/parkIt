import NavBar from "./components/NavBar.tsx"
import HomePost from "./components/HomePost.tsx"

import "./index.css"
import { useState } from "react"

function Home() {
	const test_posts = [
		{
			creator: 1,
			location: "Edu Sciences",
			des: "test woot woot",
			spots: 1,
			price: 50,
			id: 1,
		},
		{
			creator: 2,
			location: "Frog Lane",
			des: "test woot woot woot",
			spots: 4,
			price: 500,
			id: 2,
		},
		{
			creator: 3,
			location: "Ingraham",
			des: "test woot ayyy woot",
			spots: 10,
			price: 1000,
			id: 3,
		},
	]

  const [search, setSearch] = useState('')

  function searchPosts(newSearch: string) {
    setSearch(newSearch)
    console.log(newSearch)
  }

	return (
		<>
			<NavBar search={searchPosts}/>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
				{test_posts.filter(post => post.location.toLowerCase().includes(search.trim().toLowerCase())).map((post) => {
					return (
						<HomePost
							location={post.location}
							spots={post.spots}
							price={post.price}
              creator={post.creator}
							id={post.id}
							key={post.id}
						/>
					)
				})}
			</div>
		</>
	)
}

export default Home
