import { React, useState, useEffect } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import "./App.css";

function App() {
	const [auth, setAuth] = useState(null);
	useEffect(() => {
		const retrieved = window.localStorage.getItem("auth");
		console.log({ retrieved });
		if (retrieved) {
			console.log("auto login");
			setAuth(retrieved);
		}
	}, []);
	useEffect(() => {
		console.log("update auth in localstorage");
		window.localStorage.setItem("auth", auth);
	}, [auth]);

	return (
		<Router>
			<Navbar />
			<div className="main-scroller"></div>
			<main>
				<Switch>
					<Route path="/" exact>
						welcome
					</Route>
					<Route path="/roadmap" exact>
						roadmap
					</Route>
				</Switch>
			</main>
			<Footer />
		</Router>
	);
}

export default App;
