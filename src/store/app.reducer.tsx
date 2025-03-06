import { combineReducers } from "redux";
import { commonReducer } from "./common/common.reducers";
import { soaReducer } from "./soa/soa.reducers";

const appReducer = combineReducers({
  commonReducer: commonReducer,
  soaReducer: soaReducer,
});
export type RootState = ReturnType<typeof appReducer>;
export type FGetState = () => RootState;
export default appReducer;