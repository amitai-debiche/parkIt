import { ChangeEvent, FormEvent, useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"

import "../index.css"

interface RegisterData {
	username: string
	email: string
	password: string
	confirmPassword: string
}
function Register() {
	const [registerData, setFormData] = useState<RegisterData>({
		username: "",
		email: "",
		password: "",
		confirmPassword: "",
	})
	const [passwordsMatch, setPasswordsMatch] = useState(false)
	const navigate = useNavigate()

	const handleRegisterFormChange = (e: ChangeEvent<HTMLInputElement>) => {
		const { name, value } = e.target
		setFormData({
			...registerData,
			[name]: value,
		})
	}

	useEffect(() => {
		setPasswordsMatch(registerData.password === registerData.confirmPassword)
	}, [registerData, registerData.confirmPassword, passwordsMatch])

	const handleRegisterSubmit = (e: FormEvent) => {
		e.preventDefault()
		if (!passwordsMatch) {
			alert("Passwords do not match. Please make sure they match.")
			return
		}
		// register user if passwords match
		fetch("http://127.0.0.1:8000/api/register/", {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify(registerData),
		})
			.then((response) => {
				if (response.status === 201) {
					return response.json()
				} else {
					alert(
						"Your registration could not complete. Try using less special characters in your username."
					)
				}
			})
			.then((data) => {
				// set important values locally
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
			<h2 className="register-title">Register For An Account</h2>

			<div className="register-form-container">
				<div className="register-form-style">
					<form className="space-y-6" onSubmit={handleRegisterSubmit}>
						{/* Email */}
						<div>
							<label
								htmlFor="email"
								className="block text-sm font-medium leading-6 text-gray-900"
							>
								Email address
							</label>
							<div className="mt-2">
								<input
									id="email"
									name="email"
									type="email"
									autoComplete="email"
									maxLength={40}
									required
									className="register-input-style"
									onChange={handleRegisterFormChange}
								/>
							</div>
						</div>

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
									onChange={handleRegisterFormChange}
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
									onChange={handleRegisterFormChange}
								/>
							</div>
						</div>

						{/* Confirm Password */}
						<div>
							<label
								htmlFor="confirmPassword"
								className="block text-sm font-medium leading-6 text-gray-900"
							>
								Confirm Password
							</label>
							<div className="mt-2">
								<input
									id="confirm_password"
									name="confirmPassword"
									type="password"
									maxLength={15}
									required
									className="register-input-style"
									onChange={handleRegisterFormChange}
								/>
							</div>
						</div>

						<div>
							<button type="submit" className="register-button">
								Sign up
							</button>
						</div>
					</form>
				</div>
			</div>
		</div>
	)
}

export default Register
