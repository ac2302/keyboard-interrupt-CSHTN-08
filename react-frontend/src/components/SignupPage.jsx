import React from "react";
import axios from "axios";

import config from "../config";

import "./SignupPage.css";

function SignupPage({ setAuth }) {
	return (
		<div className="signup-form-container">
			<form
				onSubmit={(e) => {
					e.preventDefault();

					const username = e.target.username.value;
					const password = e.target.password.value;
					const email = e.target.email.value;
					const firstName = e.target.firstName.value;
					const lastName = e.target.lastName.value;

					console.log({ username, password, email, firstName, lastName });

					axios
						.post(`${config.locations.backend}/auth/register`, {
							user: {
								username,
								password,
								email,
								firstName,
								lastName,
							},
						})
						.then((res) => {
							setAuth(res.headers["auth-token"]);
							window.location = "/login";
						})
						.catch((err) => {
							console.error(err);
							alert("username already taken");
						});
				}}
			>
				<h2>Sign Up</h2>
				<div className="form-group">
					<label htmlFor="inputFirstName">First Name</label>
					<input
						name="firstName"
						type="text"
						className="form-control"
						id="inputFirstName"
						placeholder="First Name"
					/>
				</div>
				<div className="form-group">
					<label htmlFor="inputLastName">Last Name</label>
					<input
						name="lastName"
						type="text"
						className="form-control"
						id="inputLastName"
						placeholder="Last Name"
					/>
				</div>

				<div className="form-group">
					<label htmlFor="inputUsername">Username</label>
					<input
						name="username"
						type="text"
						className="form-control"
						id="inputUsername"
						placeholder="Username"
					/>
				</div>

				<div className="form-group">
					<label htmlFor="inputEmail">Email</label>
					<input
						name="email"
						type="email"
						className="form-control"
						id="inputEmail"
						placeholder="Email"
					/>
				</div>

				<div className="form-group">
					<label htmlFor="inputPassword">Password</label>
					<input
						name="password"
						type="password"
						className="form-control"
						id="inputPassword"
						placeholder="Password"
					/>
				</div>

				<button type="submit" class="btn btn-primary">
					Sign up
				</button>
			</form>
		</div>
	);
}

export default SignupPage;
