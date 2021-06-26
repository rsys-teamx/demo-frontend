import "index.scss";
import Store from "store";
import ReactDOM from "react-dom";
import { Loader } from "utils/relay";
import React, { lazy, Suspense } from "react";
import reportWebVitals from "reportWebVitals";
import { createStore, StoreProvider } from "easy-peasy";

const LazyApp = lazy(() => import("App"));
const store = createStore(Store);

const AppRoot = (
	<React.StrictMode>
		<StoreProvider store={store}>
			<Suspense fallback={<Loader />}>
				<LazyApp />
			</Suspense>
		</StoreProvider>
	</React.StrictMode>
);

ReactDOM.render(AppRoot, document.getElementById("root"));

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
