import React from "react";
import { AUTH_TOKEN } from "utils/constants";
import {
	Environment,
	Network,
	RecordSource,
	Store,
	fetchQuery as fQ,
} from "relay-runtime";
import { commitMutation, QueryRenderer as QR } from "react-relay";

const handlerProvider = null;
const source = new RecordSource();
const store = new Store(source);
const Loader = () => <h2>Loading... </h2>;

const network = Network.create(function fetchQuery(
	operation,
	variables,
	cacheConfig,
	uploadables
) {
	// MIGRATE TO: https://github.com/relay-tools/react-relay-network-modern
	const authToken = window.localStorage.getItem(AUTH_TOKEN);
	let headers: any = { "Content-Type": "application/json" };
	if (authToken) {
		headers["Authorization"] = "JWT " + authToken;
	}
	return fetch(`${process.env.REACT_APP_BASE_URL}/graphql`, {
		method: "POST",
		headers: headers,
		body: JSON.stringify({
			query: operation.text, // GraphQL text from input
			variables,
		}),
	}).then((response) => {
		return response.json();
	});
});

const environment = new Environment({
	handlerProvider,
	network,
	store,
});

function mutateBase(props: any) {
	const onCompleted = (response: any, errors: any) => {
		if (errors && errors.length > 0) {
			var messages: string[] = [];
			errors.forEach((err: any) => {
				messages.push(err.message);
			});
			if (props.onFailure) {
				return props.onFailure(messages);
			} else {
				return alert(messages.join("; "));
			}
		}
		return props.onSuccess(response);
	};
	return commitMutation(environment, {
		mutation: props.mutation,
		variables: props.variables,
		onCompleted: onCompleted,
	});
}

function mutate(props: any) {
	const variables = { input: props.input };
	return mutateBase({
		mutation: props.mutation,
		variables: variables,
		onSuccess: props.onSuccess,
		onFailure: props.onFailure,
	});
}

function QueryRenderer(_props: any) {
	const component = (
		<QR
			environment={environment}
			render={({ error, props }: { error: any; props: any }) => {
				if (error) {
					return <div> {error.message} </div>;
				}
				if (props && Object.keys(props).length > 0) {
					return _props.onSuccess(props);
				}
				if (_props.isTable) {
					return (
						<tr>
							<td>Loading...</td>
						</tr>
					);
				}
				if (_props.isSelect) {
					return <option>Loading...</option>;
				} else {
					return <Loader />;
				}
			}}
			{..._props}
		/>
	);
	return component;
}

function fetchQuery(query: any, variables = {}) {
	return fQ(environment, query, variables);
}

export { QueryRenderer, mutate, fetchQuery, environment, mutateBase, Loader };
