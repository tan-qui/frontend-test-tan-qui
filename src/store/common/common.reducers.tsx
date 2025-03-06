import { DateTimeEnum } from "../../constants/enums";
import { commonType } from "./common.type";

const initialState = {
  loadSpin: 0,
  order: {}
};

export function commonReducer(state = initialState, action: any) {
  let _loadSpin = 0;
  switch (action.type) {
    case commonType.SPIN.SHOW:
      _loadSpin = state.loadSpin + 1;
      return {
        ...state,
        loadSpin: _loadSpin,
      };
    case commonType.SPIN.HIDE:
      _loadSpin = state.loadSpin - 1;
      _loadSpin = _loadSpin > 0 ? _loadSpin : 0;
      return {
        ...state,
        loadSpin: _loadSpin,
      };
    default:
      return state;
  }
}
