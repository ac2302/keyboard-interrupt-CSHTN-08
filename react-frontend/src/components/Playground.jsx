import React, { useState, useEffect } from "react";

import "./Playground.css";

function Playground() {
	return (
		<>
			<div id="playground-target">
				<h1>Hello, World</h1>
			</div>
			<div className="playground">
				<textarea
					id="playground-source"
					spellCheck="false"
					onChange={(e) => {
						document.getElementById("playground-target").innerHTML =
							e.target.value;
					}}
				>
					{"<h1>Hello, World</h1>"}
				</textarea>
			</div>
		</>
	);
}

export default Playground;
