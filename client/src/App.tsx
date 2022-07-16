import React, { Fragment, useEffect } from "react";
import { Dispatch, RootState } from "./store";
import { useDispatch, useSelector } from "react-redux";
import { Route } from "react-router-dom";
import { useMoralis } from "react-moralis";
import useMoralisHooks from "./hooks/useMoralis";
import "./index.scss"; // scss bg stylings
import "./input.css"; // manual css stylesheet
import "../../builds/app/output.css"; // compiled tw output

// pages
import Landing from "./pages/Landing/Landing";
import Explore from "./pages/Explore/Explore";
import Listen from "./pages/Listen/Listen";
import Profile from "./pages/Profile/Profile";
import About from "./pages/About/About";
import Vote from "./pages/Vote/Vote";

// components
import Navbar from "./components/Navbar/Navbar";
import Footer from "./components/Footer/Footer";
import Related from "./components/Listen/Related/Related";

const App = () => {
	const dispatch = useDispatch<Dispatch>();
	const userData = useSelector((state: RootState) => state.userModel);
	const { user } = useMoralis();
	const { getNFTs } = useMoralisHooks();
	useEffect(() => {
		if (user && !userData?.profilePicture) {
			getNFTs();
			dispatch.userModel.getUserData(user?.attributes?.ethAddress);
		}
	}, [user]);
	useEffect(() => {
		if (userData?.badges?.length === 0) {
			console.log("new user");
			dispatch.userModel.validateNewUser(user?.attributes?.ethAddress);
		}
	}, [userData]);
	return (
		<Fragment>
			<Route path="/" component={Navbar} />
			<Route exact path="/" component={Landing} />
			<Route exact path="/explore" component={Explore} />
			<Route exact path="/listen/:space?/:tape/:id" component={Listen} />
			<Route exact path="/listen/:space?/:tape/:id" component={Related} />
			<Route exact path="/vote/:space?/:tape/:id" component={Vote} />
			<Route exact path="/profile" component={Profile} />
			<Route exact path="/about" component={About} />
			<Route path="/" component={Footer} />
		</Fragment>
	);
};

export default App;
