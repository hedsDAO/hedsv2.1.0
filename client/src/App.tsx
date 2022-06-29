import React, { useEffect } from "react";
import { Route, Switch } from "react-router-dom";

import Navbar from "./components/Navbar/Navbar";
import Landing from "./pages/Landing/Landing";
import Tapes from "./pages/Tapes/Tapes";
import Profile from "./pages/Profile/Profile";
import HedsTapes from "./pages/HedsTapes/HedsTapes";
import About from "./pages/About/About";
import NotFound from "./pages/NotFound/NotFound";
import Vote from "./pages/Vote/Vote";
import AuthWrapper from "./common/wrappers/AuthWrapper/AuthWrapper";

// TODO: TOKEN BURN WRAPPER
// import OGsWrapper from "./common/wrappers/OGsWrapper/OGsWrapper";

import { Dispatch } from "./store";
import { useDispatch } from "react-redux";
import "./input.css"; // base styling
import "../../builds/app/output.css"; // tailwind output

const App = () => {
	const dispatch = useDispatch<Dispatch>();
	useEffect(() => {
		dispatch?.audioModel?.getAllAudio("heds");
		dispatch?.audioModel?.getAllTapes(["heds", "hedstape"]);
		dispatch.globalModel.getGlobalData();
		dispatch.globalTapesModel.getGlobalTapesData("heds");
	}, []);

	return (
		<>
			<Switch>
				<Route path="/" component={Navbar}></Route>
			</Switch>
			<Switch>
				<Route exact path="/" component={Landing}></Route>
				<Route exact path="/:space?/tapes" component={Tapes}></Route>
				<Route exact path="/about" component={About}></Route>
				<Route exact path="/listen/:space?/:tape/:id" component={HedsTapes}></Route>
				<AuthWrapper>
					<Route exact path="/profile" component={Profile}></Route>
					<Route exact path="/vote/:space?/:tape/:id" component={Vote}></Route>
				</AuthWrapper>
				<Route path="*" component={NotFound}></Route>
			</Switch>
		</>
	);
};

export default App;
