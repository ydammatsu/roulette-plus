import { State } from "../stateManagement/states";

const KEY = "AppState";
export const saveAppStateToLS = (data: any) => {
  window.localStorage.setItem(KEY, JSON.stringify(data));
};

export const getAppStateFromLS = () => {
  const item = window.localStorage.getItem(KEY);
  if (item) {
    return JSON.parse(item) as State;
  } else {
    throw Error;
  }
};
