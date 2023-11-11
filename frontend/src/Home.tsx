import NavBar from "./components/NavBar.tsx"
import HomePost from "./components/HomePost.tsx"

import "./index.css"
import { useEffect, useState } from "react"

interface Data extends Array<Posts> {}

interface Posts {
  id: number;
  location: string;
  description: string;
  spots: number;
  price: number;
  created: string;
  creator: number
}

function Home() {
  const [data, setData] = useState<Data>([]);

  useEffect(() => {
    // Replace 'api_url' with the actual URL of your Django API endpoint
    fetch('http://127.0.0.1:8000/api/posts/')
      .then(response => response.json())
      .then(data => {
        setData(data);
      })
      .catch(error => {
        console.error('Error fetching data:', error);
      });
  }, []);

  const [search, setSearch] = useState('')
  console.log(data)
  function searchPosts(newSearch: string) {
    setSearch(newSearch)
  }

	return (
		<>
			<NavBar search={searchPosts}/>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
				{data.filter(post => post.location.toLowerCase().includes(search.trim().toLowerCase())).map((post) => {
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
