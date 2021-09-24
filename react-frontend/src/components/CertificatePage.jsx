import React, { useState, useEffect } from "react";
import axios from "axios";
import config from "../config";

import "./CertificatePage.css"

function CertificatePage({ auth }) {
	const [modules, setModules] = useState([]);
	const [self, setSelf] = useState(false);

	useEffect(() => {
		axios.get(`${config.locations.backend}/modules`).then((res) => {
			setModules(res.data);
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

	return (
		<div className="certificate-page">
			{self.currentModule == modules.length && <Certificate self={self} />}
			<button
				type="button"
				className="btn btn-primary"
				onClick={() => {
					window.print();
				}}
			>
				Download Certificate
			</button>
		</div>
	);
}

function Certificate({ self }) {
	return (
		<div className="certificate" id="section-to-print">
			<h1>Certificate Of Completion</h1>
			<h3>Keyboard Interrupt Full Stack Web Dev (MERN Stack)</h3>

			<p>
				This is to certify that the individual{" "}
				<b>
					{self.name.first} {self.name.last}
				</b>{" "}
				with the email address <b>{self.email}</b> has completed the full stack
				web development course offered by Keyboard Interrupt and now possesses
				the skill and knowledge nessecary to function as a full stack MERN stack
				developer.
			</p>
			<h4>Keyboad Interrupt</h4>
		</div>
	);
}

export default CertificatePage;
