import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import axios from "axios";
import ReactPlayer from "react-player/lazy";
import { FaPlay } from "react-icons/fa";
import { AiOutlineClockCircle } from "react-icons/ai";

import config from "../config";

import "./WatchPage.css";

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
					<div className="video-container">
						<ReactPlayer
							playing
							url={videoUrl}
							controls
							width="100%"
							height="100%"
							onEnded={() => {
								axios
									.post(
										`${config.locations.backend}/complete/lesson`,
										{ lecture: { module: module, index: lecture } },
										{
											headers: { "auth-token": auth },
										}
									)
									.then((res) => {
										console.log(res);
										if (lecture + 1 < modules[module].lectures.length) {
											window.location = `/watch?module=${module}&lesson=${
												Number(lecture) + 1
											}`;
										} else {
											alert("eom");
										}
									});
							}}
						/>
						<h2>{modules[module].lectures[lecture].title}</h2>
						<p>{modules[module].lectures[lecture].description}</p>
					</div>
					<VideosList
						auth={auth}
						module={module}
						lecture={lecture}
						modules={modules}
					/>
				</>
			)}
		</div>
	);
}

function VideosList({ auth, module, lecture, modules }) {
	const [progress, setProgress] = useState(false);
	useEffect(() => {
		axios
			.get(`${config.locations.backend}/user/progress/self`, {
				headers: { "auth-token": auth },
			})
			.then((res) => {
				setProgress(res.data);
			});
	}, []);

	console.log({ progress });

	return progress ? (
		<div className="videos-list">
			{modules.map((m) => (
				<div className="module" key={m._id}>
					<h4>{m.name}</h4>
					{m.lectures.map((l, lessonIndex) => (
						<div className="lesson" key={l._id}>
							<a href={`/watch?module=${m.index}&lesson=${lessonIndex}`}>
								<FaPlay
									className={`icon ${
										progress.currentModule > m.index ||
										(progress.currentModule == m.index &&
											progress.lastLesson >= lessonIndex)
											? "completed"
											: ""
									} ${
										module == m.index && lecture == lessonIndex ? "current" : ""
									}`}
								/>
							</a>
							<span className="title">{l.title}</span>
							<span className="duration">
								<AiOutlineClockCircle className="clock-icon" />
								10 min
							</span>
						</div>
					))}
				</div>
			))}
		</div>
	) : (
		""
	);
}

export default WatchPage;
