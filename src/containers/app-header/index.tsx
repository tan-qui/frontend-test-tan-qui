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
import { motion } from 'framer-motion';


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
  menuActive: string,
  subMenuActive: string,
};

class AppHeader extends Component<IProps, IState> {
  constructor(props: any) {
    super(props);
    this.state = {
      collapsed: false,
      menuActive: "",
      subMenuActive: "",
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
              if (index == 4) return null;
              const isActive = this.state.menuActive === item;
              return (
                <motion.label
                  key={index}
                  onClick={() => this.setState({ menuActive: item })}
                  style={{ color: isActive ? '#F2542D' : '#fff' }}
                  animate={{ scale: isActive ? 1.2 : 1 }}
                  transition={{ duration: 0.5 }}
                  whileHover={{ scale: 1.2, color: '#F2542D' }}
                >
                  {item}
                </motion.label>
              )
            })}
          </div>

          <div className="sub-menu">
            {hardMenu.map((item: any, index: number) => {
              const isActive = this.state.subMenuActive === item.index;
              return (
                <motion.div
                  key={index}
                  onClick={() => this.setState({ subMenuActive: item.index })}
                  style={{ cursor: 'pointer' }}
                  animate={{ scale: isActive ? 1.5 : 1 }}
                  transition={{ duration: 0.5 }}
                >
                  <Image src={item.image} preview={false} />
                </motion.div>
              )
            })}
            <Button
              type="default"
              shape="round"
              className="btn-send"
            >
              <span>{menu?.length > 4 ? menu?.[4] : "Contactez-nous"}</span>
              <img className="" src={SVG.arrowUpRightWhite} alt="btn-img" />
            </Button>
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
            {lang == LangEnum.FR && (
              <div className="lang-group">
                <img loading='lazy' onClick={() => onChangeLang(LangEnum.EN)} src={SVG.fr} />
              </div>
            )}
            {lang == LangEnum.EN && (
              <div className="lang-group">
                <img loading='lazy' onClick={() => onChangeLang(LangEnum.FR)} src={SVG.en} />
              </div>
            )}
          </div>
        </Header>

        <Drawer
          title={
            <div className="logo">
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
          <AppMenu mode="inline" menu={menu} collapsed={collapsed} />
        </Drawer>

      </React.Fragment>
    );
  }
}
export default withLocalize(AppHeader)
