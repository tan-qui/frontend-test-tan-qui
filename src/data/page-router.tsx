import React from "react";
import { pathUrl } from "./path-url";

const page500 = React.lazy(() => import("../containers/page-500"));
const page400 = React.lazy(() => import("../containers/page-400"));
const home = React.lazy(() => import("../containers/home/index"));

export interface IRouter {
  path: string;
  title: string;
  component: any;
}

export const pageRouter: IRouter[] = [
  {
    path: pathUrl.HOME,
    title: "Home",
    component: home,
  },
  {
    path: pathUrl.PAGE_500,
    title: "Page 500",
    component: page500,
  },
  {
    path: pathUrl.PAGE_400,
    title: "Page 400",
    component: page400,
  },
];






