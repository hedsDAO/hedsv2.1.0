import React, { Fragment } from "react";
import { Route } from "react-router-dom";
import "./input.css"; // manual css stylesheet
import "../../builds/app/output.css"; // compiled tw output

// pages
import Landing from "./pages/Landing/Landing";
import Tapes from "./pages/Tapes/Tapes";
import Listen from "./pages/Listen/Listen";

// components
import Navbar from "./components/Navbar/Navbar";

const App = () => {
	return (
		<Fragment>
			<Route path="/" component={Navbar}></Route>
			<Route exact path="/" component={Landing}></Route>
			<Route exact path="/tapes" component={Tapes}></Route>
			<Route exact path="/listen/:space?/:tape/:id" component={Listen}></Route>
		</Fragment>
	);
};

export default App;
