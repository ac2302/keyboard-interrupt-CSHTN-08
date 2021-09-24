import React, { useState, useEffect } from "react";
import axios from "axios";
import config from "../config";

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
			{self.currentModule == modules.length && "sus"}
		</div>
	);
}

export default CertificatePage;
