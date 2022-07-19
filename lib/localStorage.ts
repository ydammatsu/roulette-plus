import { State } from "../stateManagement/states";

export const saveAppStateToLS = (name: string, data: any) => {
  window.localStorage.setItem(name, JSON.stringify(data));
};

export const getAppStateFromLS = (name: string) => {
  const item = window.localStorage.getItem(name);
  if (item) {
    return JSON.parse(item) as State;
  } else {
    throw Error;
  }
};
