/* eslint-disable eqeqeq */
import { Menu, MenuProps } from "antd";
import React, { Component } from "react";
import { LocalizeContextProps, Translate, withLocalize } from "react-localize-redux";
import { leftMenu } from "../../data/left-menu";
import { NavLink } from "react-router-dom";

type MenuItem = Required<MenuProps>['items'][number];

type IProps = LocalizeContextProps & {
  mode: any
};

interface IState {
};

class AppMenu extends Component<IProps, IState> {
  constructor(props: any) {
    super(props);
    this.state = {
    }
  }

  getMenu(leftMenu: any[]) {
    let lstMenu: MenuItem[] = [];
    leftMenu.filter(x => x.enable)?.forEach(item => {
      if (item.children?.length > 0) {
        let subMenu = this.getMenu(item.children);
        let menuItem = this.getMenuItem(
          <Translate id={item.label} />,
          item.url,
          item.icon,
          subMenu
        );
        lstMenu.push(menuItem)
      } else {
        let menuItem = this.getMenuItem(
          <NavLink to={item.url}><Translate id={item.label} /></NavLink>,
          item.url,
          item.icon,
        );
        lstMenu.push(menuItem)
      }
    });
    return lstMenu;
  }

  getMenuItem(label: React.ReactNode, key: React.Key, icon?: React.ReactNode, children?: MenuItem[]): MenuItem {
    return { key, icon, children, label } as MenuItem;
  }

  render() {
    let { mode } = this.props;
    return (
      <Menu
        theme="light"
        mode={mode}
        items={this.getMenu(leftMenu)}
      />
    );
  }
}
export default withLocalize(AppMenu)
