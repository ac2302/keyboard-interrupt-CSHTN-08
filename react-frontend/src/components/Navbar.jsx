import React from "react";
import { FcGlobe } from "react-icons/fc";

import "./Navbar.css";

function Navbar({ auth, setAuth }) {
	console.log("auth is ");
	return (
		<>
			<nav
				className="navbar navbar-expand-md navbar-dark bg-dark"
				aria-label="Fourth navbar example"
			>
				<div className="container-fluid">
					<a className="navbar-brand" href="/">
						<FcGlobe className="logo" />
						Keyboard Interrupt
					</a>
					<button
						className="navbar-toggler"
						type="button"
						data-bs-toggle="collapse"
						data-bs-target="#navbarsExample04"
						aria-controls="navbarsExample04"
						aria-expanded="false"
						aria-label="Toggle navigation"
					>
						<span className="navbar-toggler-icon"></span>
					</button>

					<div className="collapse navbar-collapse" id="navbarsExample04">
						<ul className="navbar-nav me-auto mb-2 mb-md-0">
							<li className="nav-item">
								<a className="nav-link active" href="/home">
									Home
								</a>
							</li>
							<li className="nav-item">
								<a className="nav-link" href="/roadmap">
									Roadmap
								</a>
							</li>
							<li className="nav-item dropdown">
								<a
									className="nav-link dropdown-toggle"
									href="#"
									id="dropdown04"
									data-bs-toggle="dropdown"
									aria-expanded="false"
								>
									More
								</a>
								<ul className="dropdown-menu" aria-labelledby="dropdown04">
									<li>
										<a className="dropdown-item" href="/playground">
											Playground
										</a>
									</li>
									<li>
										<a
											className="dropdown-item"
											href="https://discord.gg/jZhMFh9g"
											target="_blank"
										>
											Discord
										</a>
									</li>
									<li>
										<a className="dropdown-item" href="#">
											Something else here
										</a>
									</li>
								</ul>
							</li>
						</ul>

						<LoginButtons auth={auth} setAuth={setAuth} />

						<form>
							<input
								className="form-control"
								type="text"
								placeholder="Search For Users"
								aria-label="Search"
							/>
						</form>
					</div>
				</div>
			</nav>
		</>
	);
}

function LoginButtons({ auth, setAuth }) {
	if (auth) {
		console.log("buttons think loggged in " + String(auth));
		return (
			<div className="login-buttons">
				<button
					type="button"
					className="btn btn-dark"
					onClick={() => {
						console.log("logging out");
						setAuth("");
					}}
				>
					Log Out
				</button>
			</div>
		);
	} else {
		console.log("buttons think loggged out " + String(auth));
		return (
			<div className="login-buttons">
				<button
					type="button"
					className="btn btn-dark"
					onClick={() => {
						console.log("redirecting to login");
						window.location = "/login";
					}}
				>
					Log in
				</button>
				<button
					type="button"
					className="btn btn-primary"
					onClick={() => {
						console.log("redirecting to login");
						window.location = "/signup";
					}}
				>
					Sign Up
				</button>
			</div>
		);
	}
}

export default Navbar;
