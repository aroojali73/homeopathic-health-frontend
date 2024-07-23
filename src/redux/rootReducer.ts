import { combineReducers } from "redux";

// import slices
import authSliceReducer from "./slices/authSlice";

const rootReducer = combineReducers({
  auth: authSliceReducer,
});

export default rootReducer;
