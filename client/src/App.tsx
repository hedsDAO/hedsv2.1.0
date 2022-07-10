import React, { Fragment } from "react";
import { Route } from "react-router-dom";
import "./input.css"; // manual css stylesheet
import "../../builds/app/output.css"; // compiled tw output

// pages
import Landing from "./pages/Landing/Landing";
import Explore from "./pages/Explore/Explore";
import Listen from "./pages/Listen/Listen";
import Profile from "./pages/Profile/Profile";
import About from "./pages/About/About";

// components
import Navbar from "./components/Navbar/Navbar";
import Footer from "./components/Footer/Footer";

const App = () => {
	return (
		<Fragment>
			<Route path="/" component={Navbar} />
			<Route exact path="/" component={Landing} />
			<Route exact path="/explore" component={Explore} />
			<Route exact path="/listen/:space?/:tape/:id" component={Listen} />
			<Route exact path="/profile" component={Profile} />
			<Route exact path="/about" component={About} />
			<Route path="/" component={Footer} />
		</Fragment>
	);
};

export default App;
