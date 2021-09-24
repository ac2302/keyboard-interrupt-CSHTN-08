import React, { useState, useEffect } from "react";
import axios from "axios";
import config from "../config";

import "./HomePage.css";

function HomePage({ auth }) {
	const [modules, setModules] = useState([]);
	const [self, setSelf] = useState(false);

	useEffect(() => {
		axios.get(`${config.locations.backend}/modules`).then((res) => {
			setModules(res.data);
		});

		axios
			.get(`${config.locations.backend}/user`, {
				headers: { "auth-token": window.localStorage.getItem("token") },
			})
			.then((res) => {
				console.log(res);
				setSelf(res.data);
			});
	}, []);
	return (
		self && (
			<div className="home-page">
				<h1>
					Welcome {self.name.first} {self.name.last}
				</h1>
				<button
					type="button"
					className="btn btn-primary"
					onClick={() => {
						if (self.currentModule == modules.length)
							window.location = "/certificate";
						else
							window.location = `/watch?module=${self.currentModule}&lesson=${
								Number(self.lastLesson) + 1
							}`;
					}}
				>
					{self.currentModule == modules.length
						? "Get Certificate"
						: `Continue: Module ${Number(self.currentModule) + 1}, Lecture ${
								Number(self.lastLesson) + 2
						  }`}
				</button>
			</div>
		)
	);
}

export default HomePage;
