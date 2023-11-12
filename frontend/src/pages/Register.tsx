import "../index.css"

function Register() {
	return (
		<div className="register-container">
			<h2 className="register-title">Register For An Account</h2>

			<div className="register-form-container">
				<div className="register-form-style">
					<form className="space-y-6" action="#" method="POST">
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
								/>
							</div>
						</div>

						{/* Confirm Password */}
						<div>
							<label
								htmlFor="password"
								className="block text-sm font-medium leading-6 text-gray-900"
							>
								Confirm Password
							</label>
							<div className="mt-2">
								<input
									id="confirm_password"
									name="confirm_password"
									type="password"
									maxLength={15}
									required
									className="register-input-style"
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

export default Register
