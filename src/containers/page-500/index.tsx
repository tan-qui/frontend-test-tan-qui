import { Result } from "antd";
import { Component } from "react";
import { LocalizeContextProps, Translate, withLocalize, } from "react-localize-redux";

type IProps = LocalizeContextProps & {
  message?: any
};

interface IState { };

class Page500 extends Component<IProps, IState> {

  render() {
    let { message } = this.props;
    return (
      <div className="page-common-error">
        <Result
          status="500"
          title="500"
          subTitle={<Translate id="lbl_something_went_wrong"></Translate>}
        />
        <div className="title">
          <label>{message}</label>
        </div>
      </div>
    )
  }
}

export default withLocalize(Page500);