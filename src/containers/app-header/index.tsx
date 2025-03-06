/* eslint-disable eqeqeq */
import { Button, Drawer, Flex, Image, Select, } from "antd";
import React, { Component } from "react";
import { LocalizeContextProps, withLocalize } from "react-localize-redux";
import { LangEnum } from "../../constants/enums";
import { IMAGE } from "../../assets/images";
import { Header } from "antd/es/layout/layout";
import { MenuUnfoldOutlined, MenuFoldOutlined } from '@ant-design/icons';
import AppMenu from "../app-menu";
import { SVG } from "../../assets/svg";


const hardMenu = [
  { index: 0, image: SVG.mountainsWhite },
  { index: 1, image: SVG.fishingWhite },
  { index: 2, image: SVG.crosshairWhite },
];

type IProps = LocalizeContextProps & {
  lang: any,
  menu: any[],
  onChangeLang: (newLang: string) => void;
};

interface IState {

  collapsed: boolean,
};

class AppHeader extends Component<IProps, IState> {
  constructor(props: any) {
    super(props);
    this.state = {
      collapsed: false,
    }
  }
  onChangeCollapsed(value: boolean) {
    this.setState({
      collapsed: value
    })
  }

  render() {

    let { collapsed, } = this.state;
    let { lang, onChangeLang, menu } = this.props;

    return (
      <React.Fragment>
        <Header className="app-header">
          <div className="left-menu"><strong>LOGO SAMPLE</strong></div>

          <div className="center-menu">
            {menu.map((item: any, index: number) => {
              return (
                <label key={index}>{item}</label>
              )
            })}
          </div>
          <div className="sub-menu">
            {hardMenu.map((item: any, index: number) => {
              return (
                <Image key={index} src={item.image} preview={false} />
              )
            })}
            <Image src={IMAGE.btnSend} preview={false} />
          </div>
          <div className="right-menu">
            <div className="collapsed">
              <Button
                type="text"
                className="icon-collapsed"
                icon={collapsed ? <MenuUnfoldOutlined size={24} /> : <MenuFoldOutlined size={24} />}
                onClick={() => this.onChangeCollapsed(!collapsed)}
              />
            </div>
            {/* <Select
              defaultValue={lang}
              className="select-lang"
              onChange={(e) => onChangeLang(e)}
              options={[
                { value: `${LangEnum.EN}`, label: `${LangEnum.EN.toUpperCase()}` },
                { value: `${LangEnum.FR}`, label: `${LangEnum.FR.toUpperCase()}` },
              ]}
            /> */}
            {lang == LangEnum.FR && (
              <div className="lang-group">
                <Image loading='lazy' onClick={() => onChangeLang(LangEnum.EN)} preview={false} src={SVG.fr} />
                {/* <div><strong>VN</strong></div> */}
              </div>
            )}
            {lang == LangEnum.EN && (
              <div className="lang-group">
                <Image loading='lazy' onClick={() => onChangeLang(LangEnum.FR)} preview={false} src={SVG.en} />
                {/* <div><strong>EN</strong></div> */}
              </div>
            )}
          </div>
        </Header>

        <Drawer
          title={
            <div className="logo">
              {/* <Image loading='lazy' src={IMAGE.logo} preview={false} /> */}
              <div><label>LOGO SAMPLE</label></div>
            </div>
          }
          size="default"
          placement="right"
          width={200}
          closable={false}
          onClose={(_) => this.onChangeCollapsed(!collapsed)}
          open={collapsed}
          className="drawer-menu"
        >
          <AppMenu mode="inline" />
        </Drawer>

      </React.Fragment>
    );
  }
}
export default withLocalize(AppHeader)
