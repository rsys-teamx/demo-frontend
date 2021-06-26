import { Loader } from "utils/relay";
import { lazy, Suspense } from "react";
import { AUTH_ROUTES } from "utils/route";
import { Switch, Route, Redirect } from "react-router-dom";

const Auth = lazy(() => import("routes/auth/Auth"));

const Routes = () => {
	return (
		<Suspense fallback={<Loader />}>
			<Switch>
				<Route path={`${AUTH_ROUTES}/:key/:id?`} component={Auth} />
				<Route
					path={"*"}
					render={() => <Redirect to={`/auth/login`} />}
					exact
				/>
			</Switch>
		</Suspense>
	);
};

export default Routes;
