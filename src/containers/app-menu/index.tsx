/* eslint-disable eqeqeq */
import { Menu, MenuProps } from "antd";
import React, { Component } from "react";
import { LocalizeContextProps, Translate, withLocalize } from "react-localize-redux";
// import { leftMenu } from "../../data/left-menu";
import { NavLink } from "react-router-dom";
import { AnimatePresence, motion } from 'framer-motion';


type MenuItem = Required<MenuProps>['items'][number];

type IProps = LocalizeContextProps & {
  mode: any,
  collapsed: any,
  menu: any[],
};

interface IState {
};

const menuVariants = {
  hidden: { opacity: 0, y: -20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.3, ease: "easeOut", staggerChildren: 0.1 } },
  exit: { opacity: 0, y: -20, transition: { duration: 0.2 } },
};

class AppMenu extends Component<IProps, IState> {
  constructor(props: any) {
    super(props);
    this.state = {
    }
  }

  // getMenu(leftMenu: any[]) {
  //   let lstMenu: MenuItem[] = [];
  //   leftMenu.filter(x => x.enable)?.forEach(item => {
  //     if (item.children?.length > 0) {
  //       let subMenu = this.getMenu(item.children);
  //       let menuItem = this.getMenuItem(
  //         <Translate id={item.label} />,
  //         item.url,
  //         item.icon,
  //         subMenu
  //       );
  //       lstMenu.push(menuItem)
  //     } else {
  //       let menuItem = this.getMenuItem(
  //         <NavLink to={item.url}><Translate id={item.label} /></NavLink>,
  //         item.url,
  //         item.icon,
  //       );
  //       lstMenu.push(menuItem)
  //     }
  //   });
  //   return lstMenu;
  // }

  getMenuItem(label: React.ReactNode, key: React.Key, icon?: React.ReactNode, children?: MenuItem[]): MenuItem {
    return { key, icon, children, label } as MenuItem;
  }
  render() {
    let { mode, collapsed, menu } = this.props;
    return (
      // <Menu
      //   theme="light"
      //   mode={mode}
      //   items={this.getMenu(leftMenu)}
      // />

      // <Menu
      //   theme="light"
      //   mode={mode}
      // >
      //   {menu.map((item, index) => (
      //     <Menu.Item key={index}>
      //       <NavLink to={item}>{item}</NavLink>
      //     </Menu.Item>
      //   ))}
      // </Menu>

      <AnimatePresence>
        {collapsed && (
          <motion.ul
            initial="hidden"
            animate="visible"
            exit="exit"
            variants={menuVariants}
            className="menu-container"
          >
            <Menu theme="light" mode={mode}>
              {menu.map((item, index) => (
                <motion.li key={index} variants={menuVariants}>
                  <Menu.Item>
                    <div><label>{item}</label></div>
                  </Menu.Item>
                </motion.li>
              ))}
            </Menu>
          </motion.ul>
        )}
      </AnimatePresence>

    );
  }
}
export default withLocalize(AppMenu)
