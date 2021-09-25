import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import axios from "axios";
import ReactPlayer from "react-player/lazy";
import { FaComment, FaPlay } from "react-icons/fa";
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
		<div className="watch-page">
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
										console.log({
											module,
											lecture,
											totalModules: modules.length,
											totalLectures: modules[module].lectures,
										});
										if (lecture + 1 < modules[module].lectures.length) {
											window.location = `/watch?module=${module}&lesson=${
												Number(lecture) + 1
											}`;
										} else if (
											module == modules.length - 1 &&
											lecture == modules[module].lectures.length - 1
										) {
											// alert("end");
											axios
												.post(
													`${config.locations.backend}/complete/lesson`,
													{
														lecture: { module: Number(module) + 1, index: -1 },
													},
													{
														headers: { "auth-token": auth },
													}
												)
												.then((res) => {
													window.location = "/certificate";
												});
										} else {
											// alert("eom");
											window.location = `/watch?module=${
												Number(module) + 1
											}&lesson=${0}`;
										}
									});
							}}
						/>
						<h2>{modules[module].lectures[lecture].title}</h2>
						<p>{modules[module].lectures[lecture].description}</p>
						<a href="#comments">comments</a>
					</div>
					<VideosList
						auth={auth}
						module={module}
						lecture={lecture}
						modules={modules}
					/>
					<hr />
					<CommentSection auth={auth} module={module} lecture={lecture} />
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

function CommentSection({ auth, module, lecture }) {
	const [comments, setComments] = useState([]);
	const [self, setSelf] = useState(false);
	const [userComment, setUserComment] = useState("");

	useEffect(() => {
		axios
			.get(`${config.locations.backend}/comment/${module}/${lecture}`)
			.then((res) => {
				console.log(res);
				setComments(res.data);
			});
		axios
			.get(`${config.locations.backend}/user`, {
				headers: { "auth-token": auth },
			})
			.then((res) => {
				console.log(res);
				setSelf(res.data);
			});
	}, []);

	const slug = `${module}-${lecture}`;
	return (
		<div className="comment-section" id="comments">
			<h4>Comments</h4>

			<div className="new-comment">
				<h5>new comment</h5>
				<input
					type="text"
					className="comment-input"
					onChange={(e) => {
						console.log(e.target.value);
						setUserComment(e.target.value);
					}}
					value={userComment}
				/>
				<button
					type="button"
					className="btn btn-primary"
					onClick={() => {
						if (userComment.length > 1)
							axios
								.post(
									`${config.locations.backend}/comment/${module}/${lecture}`,
									{ comment: userComment },
									{ headers: { "auth-token": auth } }
								)
								.then((res) => {
									console.log(res.data);
									setUserComment("");

									axios
										.get(
											`${config.locations.backend}/comment/${module}/${lecture}`
										)
										.then((res) => {
											console.log(res);
											setComments(res.data);
										});
								});
					}}
				>
					<FaComment />
				</button>
			</div>

			{comments.map((comment) => (
				<Comment
					auth={auth}
					setComments={setComments}
					comment={comment}
					lecture={lecture}
					module={module}
					key={comment._id}
				/>
			))}
			<br />
			<br />
			<br />
			<br />
		</div>
	);
}

function Comment({ auth, comment, lecture, module, setComments }) {
	const [userReply, setUserReply] = useState("");

	return (
		<div className="comment">
			<h6>{comment.user.username}</h6>
			<p>{comment.text}</p>
			<span className="timestamp">
				{timeElapsed(Date.parse(comment.createdAt))}
			</span>
			<input
				type="text"
				className="comment-input"
				onChange={(e) => {
					console.log(e.target.value);
					setUserReply(e.target.value);
				}}
				value={userReply}
			/>
			<button
				type="button"
				className="btn btn-primary"
				onClick={() => {
					if (userReply.length > 1)
						axios
							.post(
								`${config.locations.backend}/comment/${module}/${lecture}/${comment._id}`,
								{ comment: userReply },
								{ headers: { "auth-token": auth } }
							)
							.then((res) => {
								console.log(res.data);
								setUserReply("");

								axios
									.get(
										`${config.locations.backend}/comment/${module}/${lecture}`
									)
									.then((res) => {
										console.log(res);
										setComments(res.data);
									});
							});
				}}
			>
				<FaComment />
			</button>
			{comment.replies.length > 0 && (
				<div className="reply-container">
					{comment.replies.map((reply) => (
						<div className="reply">
							<h6>{reply.user.username}</h6>
							<p>{reply.text}</p>
							<span className="timestamp">
								{timeElapsed(Date.parse(reply.createdAt))}
							</span>
						</div>
					))}
				</div>
			)}
		</div>
	);
}

function timeElapsed(timestamp) {
	let seconds = (Date.now() - timestamp) / 1000;

	let isDue = seconds < 0;
	if (isDue) seconds *= -1;

	seconds -= seconds % 1;
	let minuites = seconds / 60;
	minuites -= minuites % 1;
	seconds -= minuites * 60;
	let hours = minuites / 60;
	hours -= hours % 1;
	minuites -= hours * 60;
	let days = hours / 24;
	days -= days % 1;
	hours -= days * 24;

	let prettyCountdown = "";
	if (days) prettyCountdown += `${days} days, `;
	if (hours) prettyCountdown += `${hours} hours and `;
	prettyCountdown += `${minuites} min `;
	if (isDue) prettyCountdown += "time-travel";
	else prettyCountdown += "ago";

	return prettyCountdown;
}

export default WatchPage;
