import React, { lazy, Suspense } from "react";
import { Redirect, Route, Switch } from "react-router-dom";

const HomeRoutes = lazy(() => import("routes/home/Home"));

const Navigation = () => {
	return (
		<Suspense fallback={<h2>Loading... </h2>}>
			<Switch>
				<Route path={`/`} component={HomeRoutes}></Route>
				<Route path={"*"} render={() => <Redirect to={`/`} />} exact />
			</Switch>
		</Suspense>
	);
};

export default Navigation;
