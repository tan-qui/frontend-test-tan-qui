import { Result } from "antd";
import { Component } from "react";
import { LocalizeContextProps, Translate, withLocalize, } from "react-localize-redux";

type IProps = LocalizeContextProps & {};

interface IState { };

class Page404 extends Component<IProps, IState> {

  render() {
    return (
      <div className="page-common-error">
        <Result
          status="404"
          title="404"
          subTitle={<Translate id="lbl_page_you_visited_does_not_exist"></Translate>}
        />
      </div>
    )
  }
}

export default withLocalize(Page404);