import React, { useState, useEffect } from "react";
import axios from "axios";
import config from "../config";

import "./RoadmapPage.css";

function RoadmapPage() {
	const [modules, setModules] = useState([]);
	useEffect(() => {
		axios.get(`${config.locations.backend}/modules`).then((res) => {
			setModules(res.data);
		});
	}, []);

	return (
		<div className="roadmap-container">
			<div className="index-container">
				<h1>Index</h1>
				<ol>
					{modules.map((module) => (
						<li key={module._id}>
							<a href={`#${module._id}`}>{module.name}</a>
						</li>
					))}
				</ol>
			</div>

			<div className="expanded-container">
				{modules.map((module) => (
					<div key={module._id} id={module._id} className="module-card">
						<h4>module.name</h4>
						<hr />
						<p>{module.description}</p>
						<ol>
							{module.lectures.map((lesson) => (
								<li>
									<a href="#">{lesson.title}</a>
									<p>{lesson.description}</p>
								</li>
							))}
						</ol>
					</div>
				))}
			</div>
		</div>
	);
}

export default RoadmapPage;
