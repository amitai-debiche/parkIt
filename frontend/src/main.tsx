import React from "react"
import ReactDOM from "react-dom/client"
import View from "./pages/View.tsx"
import Home from "./pages/Home.tsx"
import Auth from "./pages/Auth.tsx"
import Favorites from "./pages/Favorites.tsx"
import { createBrowserRouter, RouterProvider } from "react-router-dom"

import "./index.css"

const router = createBrowserRouter([
	{
		path: "/",
		element: <Auth />,
	},
	{
		path: "/home",
		element: <Home />,
	},
  {
		path: "/favorites",
		element: <Favorites />,
	},
	{
		path: "/view/:id/",
		element: <View />,
	},
	{
		path: "*",
		element: (
			<p className="mt-[40vh] text-center font-bold justify-center">
				Page Does Not Exist!
			</p>
		),
	},
])

ReactDOM.createRoot(document.getElementById("root")!).render(
	<React.StrictMode>
		<RouterProvider router={router} />
	</React.StrictMode>
)