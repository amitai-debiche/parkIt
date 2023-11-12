import { useState } from "react"
import Register from "../components/Register"
import Login from "../components/Login"
import "../index.css"

// only want tab options to be one of two
interface Auth {
	tab: "register" | "login"
}

function Auth() {
	// login page by default
	const [activeTab, setActiveTab] = useState<Auth>({ tab: "login" })

	const handleTabSwitch = (tabName: Auth["tab"]) => {
		setActiveTab({ tab: tabName })
	}

	return (
		<div className="auth-container">
			{activeTab.tab === "register" ? <Register /> : <Login />}
			<div className="auth-tabs">
				<button
					className={
						activeTab.tab === "login" ? "text-black text-lg" : "text-gray-500"
					}
					onClick={() => handleTabSwitch("login")}
				>
					Log in
				</button>
				<button
					className={
						activeTab.tab === "register"
							? "text-black text-lg"
							: "text-gray-500"
					}
					onClick={() => handleTabSwitch("register")}
				>
					Register
				</button>
			</div>
		</div>
	)
}

export default Auth
