import React from "react";
import axios from "axios";

import config from "../config";

import "./LoginPage.css";

function LoginPage({ setAuth }) {
	return (
		<div className="login-form-container">
			<form
				onSubmit={(e) => {
					e.preventDefault();

					const username = e.target.username.value;
					const password = e.target.password.value;

					console.log({ username, password });

					axios
						.post(`${config.locations.backend}/auth/login`, {
							user: {
								username,
								password,
							},
						})
						.then((res) => {
							setAuth(res.headers["auth-token"]);
							window.location = "/home";
						})
						.catch((err) => {
							console.error(err);
							alert("incorrect username or password");
						});
				}}
			>
				<h2>Log In</h2>

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
					<label htmlFor="inputPassword">Password</label>
					<input
						name="password"
						type="password"
						className="form-control"
						id="inputPassword"
						placeholder="Password"
					/>
				</div>

				<button type="submit" className="btn btn-primary">
					Sign in
				</button>
			</form>
		</div>
	);
}

export default LoginPage;
