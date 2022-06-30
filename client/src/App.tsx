import React from "react";
import { Route } from "react-router-dom";
import "./input.css"; // manual css stylesheet
import "../../builds/app/output.css"; // compiled tw output

// pages
import Landing from "./pages/Landing/Landing";
import Tapes from "./pages/Tapes/Tapes";

const App = () => {
	return (
		<>
			<Route exact path="/" component={Landing}></Route>
			<Route exact path="/tapes" component={Tapes}></Route>
		</>
	);
};

export default App;
