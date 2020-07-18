import React from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";

/* custom imports */
import "./App.css";
import BreakingBad from "./components/BreakingBad";

toast.configure();

function App() {
	return (
		<div className="App">
			<BreakingBad />
		</div>
	);
}

export default App;
