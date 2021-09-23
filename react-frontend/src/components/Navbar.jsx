import React from "react";
import { FcGlobe } from "react-icons/fc";

import "./Navbar.css";

function Navbar() {
	return (
		<>
			<nav
				class="navbar navbar-expand-md navbar-dark bg-dark"
				aria-label="Fourth navbar example"
			>
				<div class="container-fluid">
					<a class="navbar-brand" href="/">
						<FcGlobe className="logo" />
						Keyboard Interrupt
					</a>
					<button
						class="navbar-toggler"
						type="button"
						data-bs-toggle="collapse"
						data-bs-target="#navbarsExample04"
						aria-controls="navbarsExample04"
						aria-expanded="false"
						aria-label="Toggle navigation"
					>
						<span class="navbar-toggler-icon"></span>
					</button>

					<div class="collapse navbar-collapse" id="navbarsExample04">
						<ul class="navbar-nav me-auto mb-2 mb-md-0">
							<li class="nav-item">
								<a class="nav-link active" href="/home">
									Home
								</a>
							</li>
							<li class="nav-item">
								<a class="nav-link" href="/roadmap">
									Roadmap
								</a>
							</li>
							<li class="nav-item dropdown">
								<a
									class="nav-link dropdown-toggle"
									href="#"
									id="dropdown04"
									data-bs-toggle="dropdown"
									aria-expanded="false"
								>
									More
								</a>
								<ul class="dropdown-menu" aria-labelledby="dropdown04">
									<li>
										<a class="dropdown-item" href="#">
											Action
										</a>
									</li>
									<li>
										<a class="dropdown-item" href="#">
											Another action
										</a>
									</li>
									<li>
										<a class="dropdown-item" href="#">
											Something else here
										</a>
									</li>
								</ul>
							</li>
						</ul>
						<form>
							<input
								class="form-control"
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

function Logo() {
	return (
		<div className="logo-container">
			<FcGlobe className="logo" />
			{/* <span className="logo-text">Keyboad Interrupt</span> */}
		</div>
	);
}

export default Navbar;
