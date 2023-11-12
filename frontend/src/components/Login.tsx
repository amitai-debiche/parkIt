import { ChangeEvent, FormEvent, useState } from "react"
import { useNavigate } from "react-router-dom"
import "../index.css"

interface LoginForm {
	username: string
	password: string
}

function Login() {
	const [loginData, setLoginData] = useState<LoginForm>({
		username: "",
		password: "",
	})

	const navigate = useNavigate()

	const handleLoginFormChange = (e: ChangeEvent<HTMLInputElement>) => {
		const { name, value } = e.target
		setLoginData({
			...loginData,
			[name]: value,
		})
	}

	// backend login post
	const handleLoginSubmit = (e: FormEvent) => {
		e.preventDefault()

		fetch("http://127.0.0.1:8000/api/login/", {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify(loginData),
		})
			.then((response) => {
				if (response.status === 200) {
					return response.json()
				} else {
					alert("Either your login is incorrect or could not be completed.")
				}
			})
			.then((data) => {
				// store important vars locally
				const token = data.token
				const userId = data.user_id

				localStorage.setItem("authToken", token)
				localStorage.setItem("userId", userId)

				navigate("/home")
			})
			.catch((error) => {
				console.error("Error:", error)
			})
	}

	return (
		<div className="register-container">
			<h2 className="register-title">Sign In To Your Account</h2>

			<div className="register-form-container">
				<div className="register-form-style">
					<form className="space-y-6" onSubmit={handleLoginSubmit}>
						{/* Username */}
						<div>
							<label
								htmlFor="username"
								className="block text-sm font-medium leading-6 text-gray-900"
							>
								Username
							</label>
							<div className="mt-2">
								<input
									id="username"
									name="username"
									type="text"
									maxLength={15}
									required
									className="register-input-style"
									onChange={handleLoginFormChange}
								/>
							</div>
						</div>

						{/* Password */}
						<div>
							<label
								htmlFor="password"
								className="block text-sm font-medium leading-6 text-gray-900"
							>
								Password
							</label>
							<div className="mt-2">
								<input
									id="password"
									name="password"
									type="password"
									autoComplete="current-password"
									maxLength={15}
									required
									className="register-input-style"
									onChange={handleLoginFormChange}
								/>
							</div>
						</div>
						<div>
							<button type="submit" className="register-button">
								Sign in
							</button>
						</div>
					</form>
				</div>
			</div>
		</div>
	)
}

export default Login
