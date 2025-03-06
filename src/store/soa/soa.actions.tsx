import { soaType } from "./soa.type";

export const soaActions = {
  setDataLang,
};

function setDataLang(data: any) {
  return (dispatch: any) => {
    dispatch({
      type: soaType.SET_DATA_LANG,
      payload: data,
    });
  };
}
