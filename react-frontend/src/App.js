import { React, useState, useEffect } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import LoginPage from "./components/LoginPage";
import SignupPage from "./components/SignupPage";
import RoadmapPage from "./components/RoadmapPage";
import "./App.css";

function App() {
	const [auth, setAuth] = useState("");
	useEffect(() => {
		const retrieved = window.localStorage.getItem("token");
		console.log({ retrieved });
		if (retrieved) {
			console.log("auto login");
			setAuth(retrieved);
		}
	}, []);
	useEffect(() => {
		console.log("update auth in localstorage to");
		console.log({ auth });
		window.localStorage.setItem("token", auth);
	}, [auth]);

	return (
		<Router>
			<Navbar auth={auth} setAuth={setAuth} />
			<div className="main-scroller"></div>
			<main>
				<Switch>
					<Route path="/" exact>
						welcome {String(auth)}
					</Route>
					<Route path="/login" exact>
						<LoginPage setAuth={setAuth} />
					</Route>
					<Route path="/signup" exact>
						<SignupPage setAuth={setAuth} />
					</Route>
					<Route path="/roadmap" exact>
						<RoadmapPage />
					</Route>
				</Switch>
			</main>
			<Footer />
		</Router>
	);
}

export default App;
