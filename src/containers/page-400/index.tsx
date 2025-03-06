import { Result } from "antd";
import { Component } from "react";
import { LocalizeContextProps, Translate, withLocalize, } from "react-localize-redux";

type IProps = LocalizeContextProps & {
  message?: any
};

interface IState { };

class Page400 extends Component<IProps, IState> {

  render() {
    let { message } = this.props;
    return (
      <div className="page-common-error">
        <div className="title">
          <Result
            status="500"
            subTitle={<Translate id="Không tìm thấy thông tin"></Translate>}
          />
        </div>
        <div className="title">
          <label>{message}</label>
        </div>
      </div>
    )
  }
}

export default withLocalize(Page400);