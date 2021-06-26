import { Loader } from "utils/relay";
import { isEmpty } from "utils/utils";
import { lazy, Suspense } from "react";
import { useStoreState } from "easy-peasy";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";
import { BrowserRouter, Switch, Route } from "react-router-dom";

const AuthRoutes = lazy(() => import("routes/auth/Routes"));
const AppNavigation = lazy(() => import("components/Navigation"));

const App = () => {
	const authToken = useStoreState((state: any) => state.auth.authToken);
	return (
		<BrowserRouter>
			<div className="app">
				<Suspense fallback={<Loader />}>
					<Switch>
						{isEmpty(authToken) ? (
							<Route path={"/"} component={AuthRoutes} />
						) : (
							<Route path="/" component={AppNavigation} />
						)}
					</Switch>
					<ToastContainer />
				</Suspense>
			</div>
		</BrowserRouter>
	);
};

export default App;
