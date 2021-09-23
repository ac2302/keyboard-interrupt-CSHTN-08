import "./App.css";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

function App() {
	return (
		<>
			<Navbar />
			<div className="main-scroller"></div>
			<main></main>
			<Footer />
		</>
	);
}

export default App;
