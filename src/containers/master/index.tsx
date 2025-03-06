import React, { Component } from 'react';
import { LocalizeContextProps, withLocalize } from "react-localize-redux";
import { bindActionCreators } from "@reduxjs/toolkit";
import { ConnectedProps, connect } from "react-redux";
import { commonActions } from "../../store/common/common.actions";

const mapStateToProps = () => {
  return {};
};

const mapDispatchToProps = (dispatch: any) => {
  return bindActionCreators({
    startSpin: commonActions.startSpin,
    stopSpin: commonActions.stopSpin,
  }, dispatch);
};

const connector = connect(mapStateToProps, mapDispatchToProps);
type PropsFromRedux = ConnectedProps<typeof connector>;

type IProps = PropsFromRedux & LocalizeContextProps & {};

interface IState {

};

class Master extends Component<IProps, IState> {
  intervalCountDown: NodeJS.Timeout | undefined;
  intervalOrder: NodeJS.Timeout | undefined;
  constructor(props: any) {
    super(props);
    this.state = {

    };

  }

  componentDidMount() {
  }

  componentWillUnmount() {
    this.props.stopSpin();
  }




  render() {
    let { } = this.state;

    return (
      <div className="screen-master">
        Master
      </div>
    );
  }
}


export default connector(withLocalize(Master));
