import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import axios from "axios";

import config from "../config";

function useQuery() {
	return new URLSearchParams(useLocation().search);
}

function WatchPage({ auth }) {
	const [modules, setModules] = useState([]);
	const [videoUrl, setVideoUrl] = useState("");

	useEffect(() => {
		axios.get(`${config.locations.backend}/modules`).then((res) => {
			setModules(res.data);
		});
	}, []);

	const query = useQuery();
	const module = query.get("module");
	const lecture = query.get("lesson");

	useEffect(() => {
		if (modules.length > 0) {
			const currentLecture = modules[module].lectures[lecture];
			setVideoUrl(`/videos/${currentLecture.videoName}`);
		}
	}, [modules]);

	return (
		<div>
			{videoUrl && (
				<>
					<video autoPlay controls>
						<source src={videoUrl} type="video/mp4" />
						Your browser does not support the video tag.
					</video>
				</>
			)}
		</div>
	);
}

export default WatchPage;
