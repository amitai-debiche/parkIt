// PostList.tsx
import { HeartIcon } from "@heroicons/react/24/solid"
import HomePost from "./HomePost"

interface Props {
	posts: Posts[]
	likedPosts: number[]
	onToggleLike: (postId: number) => void
}
export interface Posts {
	id: number
	location: string
	description: string
	spots: number
	price: number
	created: string
	creator: number
	images: string
}

const PostList: React.FC<Props> = ({ posts, likedPosts, onToggleLike }) => {
	return (
	  <div className="home-grid">
		{posts.map((post) => (
		  <div key={post.id} className="home-post-container">
			<div className="hover:cursor-pointer relative">
			  <div className="heart-icon">
				<button
				  type="button"
				  className={`nav-button z-10 absolute top-2 right-2 ${
					likedPosts.includes(post.id)
					  ? "text-red-500 active:text-red-300 hover:text-red-500"
					  : "hover:text-red-500 text-gray-500"
				  }`}
				  onClick={() => {
					onToggleLike(post.id);
				  }}
				>
				  <HeartIcon className="h-6 w-6" aria-hidden="true" />
				</button>
			  </div>
			  {/* Add an image element here */}
			  <img
				src={post.images} // Assuming `image` is the URL to the image
				alt={`Image for ${post.description}`}
				className="w-full h-40 object-cover rounded-t-md"
			  />
			  <HomePost
				location={post.location}
				spots={post.spots}
				price={post.price}
				creator={post.creator}
				id={post.id}
			  />
			</div>
		  </div>
		))}
	  </div>
	);
  };
  
  export default PostList;
