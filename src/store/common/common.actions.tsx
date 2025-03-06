import { commonType } from "./common.type";

export const commonActions = {
  startSpin,
  stopSpin,
};

function startSpin() {
  return (dispatch: any) => {
    dispatch({
      type: commonType.SPIN.SHOW,
    });
  };
}

function stopSpin() {
  return (dispatch: any) => {
    dispatch({
      type: commonType.SPIN.HIDE,
    });
  };
}
