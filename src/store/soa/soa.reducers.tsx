import { soaType } from "./soa.type";

const initialState = {
  dataLang: [],
};

export function soaReducer(state = initialState, action: any) {
  switch (action.type) {
    case soaType.SET_DATA_LANG:
      return {
        ...state,
        dataLang: action.payload,
      };
    default:
      return state;
  }
}
