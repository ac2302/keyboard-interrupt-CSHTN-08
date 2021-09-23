import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import "./App.css";

function App() {
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
