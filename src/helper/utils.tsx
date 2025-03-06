import dayjs from "dayjs";

export const utils = {
  stringToNumber,
  formatCurrency,
  isStringOk,
  stringToASCII,
  getTimeOffset,
  randomUUID
};


function formatCurrency(val: any, prefix: string = "") {
  if (Number.isNaN(Number.parseFloat(val))) {
    val = 0;
  }
  let value = val
    ? `${val}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",")
    : `0`;
  return `${prefix}${value}đ`;
}

function stringToNumber(val: string) {
  let result: any = `${val || "0"}`.replace(/\$\s?|(,*)/g, '');
  return result - 0;
}

function isStringOk(s: string) {
  return s !== null && s !== "null" && s !== undefined && s !== "" && s !== `""` && s !== "undefined";
}

function stringToASCII(str: string) {
  try {
    return str.toLowerCase()
      .replace(/[àáảãạâầấẩẫậăằắẳẵặ]/g, 'a')
      .replace(/[èéẻẽẹêềếểễệ]/g, 'e')
      .replace(/[đ]/g, 'd')
      .replace(/[ìíỉĩị]/g, 'i')
      .replace(/[òóỏõọôồốổỗộơờớởỡợ]/g, 'o')
      .replace(/[ùúủũụưừứửữự]/g, 'u')
      .replace(/[ỳýỷỹỵ]/g, 'y')
  } catch (e) {
    return ''
  }
}

function getTimeOffset() {
  const offset = new Date().getTimezoneOffset();
  const absOffset = Math.abs(offset);
  const hours = String(Math.floor(absOffset / 60)).padStart(2, '0');
  const minutes = String(absOffset % 60).padStart(2, '0');
  const sign = offset <= 0 ? '+' : '-';
  return `${sign}${hours}:${minutes}`;
}

function randomUUID(length: number = 15) {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  let uuid = '';
  for (let i = 0; i < length; i++) {
    uuid += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return uuid;
}