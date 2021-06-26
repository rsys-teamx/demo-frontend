import AuthStore, { AuthModel } from "store/auth";

export interface StoreModel {
  auth: AuthModel;
}

const Store: StoreModel = {
  auth: AuthStore,
};

export default Store;