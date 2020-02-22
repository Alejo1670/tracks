import { AsyncStorage } from "react-native";
import createDataContext from "./createDataContext";
import trackerApi from "../api/tracker";
import { navigate } from "../navigationRef";

const authReducer = (state, action) => {
  switch (action.type) {
    case "add_error":
      return { ...state, errorMessage: action.payload };
    case "signin":
      return { errorMessage: "", token: action.payload };
    case "clear_error_message":
      return { ...state, errorMessage: "" };
    case "signout":
      return { token: null, errorMessage: "" };
    default:
      return state;
  }
};

const tryLocalSingin = dispatch => async () => {
  const token = await AsyncStorage.getItem("token");
  if (token) {
    dispatch({ type: "signin", payload: token });
    navigate("TrackList");
  } else {
    navigate("loginFlow");
  }
};

const clearErrorMessage = dispatch => () => {
  dispatch({ type: "clear_error_message" });
};

const signup = dispatch => async ({ email, password }) => {
  // Make API requesto to sign up with the email and password
  try {
    const response = await trackerApi.post("/signup", { email, password });

    /*Take JWT we get from the API and store it on the device 
      (will use a long-term storage, if checks there is a token, the session is running)
      We do this to avoid that in every restart of the app the user info.
      got lost, this will happen every re-render
      */
    await AsyncStorage.setItem("token", response.data.token);
    //if we sign up, modify our state, and say that we're authenticated
    //Dispatch an action to put the token in state object

    dispatch({ type: "signin", payload: response.data.token });

    //Navigate the user to the 'mainFlow'
    navigate("TrackList");
  } catch (err) {
    //if signing up fails, we need to reflect an error message somewhere
    console.log(err);
    dispatch({
      type: "add_error",
      payload: "Something went wrong with sign up"
    });
  }
};

const signin = dispatch => async ({ email, password }) => {
  try {
    const response = await trackerApi.post("/signin", { email, password });
    await AsyncStorage.setItem("token", response.data.token);
    dispatch({ type: "signin", payload: response.data.token });
    console.log(response.data.token);
    navigate("TrackList");
  } catch (err) {
    console.log(err);
    dispatch({
      type: "add_error",
      payload: "Something went wrong with sign in"
    });
  }

  //Try to signin
  //Handle success by updating state
  //Handle faiure by showing an error message
};

const signout = dispatch => async () => {
  //
  await AsyncStorage.removeItem("token");
  dispatch({ type: "signout" });
  navigate("loginFlow");
};

export const { Provider, Context } = createDataContext(
  authReducer,
  { signup, signin, signout, clearErrorMessage, tryLocalSingin },
  { token: null, errorMessage: "" }
);
