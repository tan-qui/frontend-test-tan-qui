import { endPoint } from "../data/end-point";
import { serviceApi } from "./api.service";

export const soaService = {
  getLang,
};

function getLang(lang: any) {
  console.log("url", process.env.REACT_APP_BASE_API_SOA + endPoint.SOA.LANG.replace(":lang", lang));
  return serviceApi.get(process.env.REACT_APP_BASE_API_SOA + endPoint.SOA.LANG.replace(":lang", lang));
}
