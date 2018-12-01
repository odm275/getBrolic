import { GET_SETTINGS } from "./types";
import {
  localStorageSetItems,
  localStorageGetItems
} from "../helpers/localStorage";

// On App Load
// @desc Set up localStorage for all and settings reducer;

export const getUserInfo = () => dispatch => {
  const localStorage = localStorageGetItems();
  const userInfo = {
    gender: localStorage.gender,
    age: localStorage.age,
    height: localStorage.height,
    currentWeight: localStorage.currentWeight,
    goalWeight: localStorage.goalWeight
  };
  dispatch({
    type: GET_SETTINGS,
    payload: userInfo
  });
};

export const setSettings = userInfo => dispatch => {
  localStorageSetItems(userInfo); //Set local storage to new status
  dispatch(getUserInfo()); // Get that information, and put it in redux cycle
};
