import React, { Fragment, useEffect } from "react";
import { Dispatch, RootState } from "./store";
import { useDispatch, useSelector } from "react-redux";
import { Route } from "react-router-dom";
import { useMoralis } from "react-moralis";
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
	const dispatch = useDispatch<Dispatch>();
	const userData = useSelector((state: RootState) => state.userModel);
	const { user } = useMoralis();
	useEffect(() => {
		if (user && !userData?.profilePicture) dispatch.userModel.getUserData(user?.attributes?.ethAddress);
	}, [user]);
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
