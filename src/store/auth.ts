import { Action, Thunk, Computed, thunk, action, computed } from "easy-peasy";
// import graphql from "babel-plugin-relay/macro";

import { AUTH_TOKEN } from "utils/constants";
import { mutate } from "utils/relay";
import { emptyProxyObject, ProxyObjectType } from "utils/utils";

/*
const mutation = graphql`
    mutation authRefreshMutation($input: RefreshInput!) {
        refreshToken(input: $input) {
            token
            payload
        }
    }
`;
*/

export interface CurrentUserModel {
  username: string;
  email: string;
}

export interface AuthModel {
  currentUser: CurrentUserModel | ProxyObjectType;
  authToken: string | null;
  isLoggedIn: Computed<AuthModel, boolean>;
  setAuthToken: Action<AuthModel, string | null>;
  setCurrentUser: Action<AuthModel, CurrentUserModel | ProxyObjectType>;
  updateAuthToken: Thunk<AuthModel, string>;
  clearAuthToken: Thunk<AuthModel>;
  fetchAuthToken: Thunk<AuthModel, any>;
}

const AuthStore: AuthModel = {
  currentUser: emptyProxyObject,
  authToken: window.localStorage.getItem(AUTH_TOKEN),

  isLoggedIn: computed(
    (state: any) => state.currentUser !== emptyProxyObject
  ),

  setAuthToken: action((state: any, authToken) => {
    state.authToken = authToken;
  }),

  setCurrentUser: action((state: any, currentUser) => {
    state.currentUser = currentUser;
  }),

  updateAuthToken: thunk((actions, authToken) => {
    window.localStorage.setItem(AUTH_TOKEN, authToken);
    actions.setAuthToken(authToken);
  }),

  clearAuthToken: thunk((actions) => {
    window.localStorage.clear();
    actions.setAuthToken(null);
    actions.setCurrentUser(emptyProxyObject);
  }),

  fetchAuthToken: thunk(
    (actions, { mutation, input, onSuccess, onFailure }) => {
      mutate({
        mutation,
        input: input,
        onSuccess: function (data: any) {
          let token;
          if (data.login) {
            token = data.login.token;
          } else if (data.socialAuth) {
            token = data.socialAuth.token;
          }
          actions.updateAuthToken(token);
          onSuccess(data);
        },
        onFailure: function (messages: []) {
          actions.clearAuthToken();
          onFailure(messages);
        },
      });
    }
  ),

  /*
  initRefreshToken: thunk((actions) => {
      setInterval(() => {
          if (window.localStorage.getItem(AUTH_TOKEN)) {
              mutate({
                  mutation,
                  input: { token: window.localStorage.getItem(AUTH_TOKEN) },
                  onSuccess: function (data) {
                      actions.updateAuthToken(data.refreshToken.token);
                  },
                  onFailure: function (messages) {
                      actions.clearAuthToken();
                  },
              });
          }
      }, TOKEN_TTL);
  }),
  */
};

export default AuthStore;