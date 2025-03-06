import { utils } from "../helper/utils";

export const globalProps = {
  row6: {
    gutter: [6, 6],
  },

  row12: {
    gutter: [12, 12],
  },

  row24: {
    gutter: [24, 24],
  },

  colImage: {
    xxl: 8,
    xl: 8,
    lg: 8,
    md: 8,
    xs: 24
  },

  col: {
    xxl: 8,
    xl: 8,
    lg: 8,
    md: 12,
    xs: 24
  },

  colEqual: {
    xxl: 12,
    xl: 12,
    lg: 12,
    md: 12,
    xs: 24,
  },

  colFull: {
    xxl: 24,
    xl: 24,
    lg: 24,
    md: 24,
    xs: 24
  },

  colFooterLeft: {
    xxl: 6,
    xl: 6,
    lg: 8,
    md: 8,
    xs: 24
  },

  colFooterRight: {
    xxl: 18,
    xl: 18,
    lg: 16,
    md: 16,
    xs: 24
  },

  colForm: {
    xxl: 2,
    xl: 2,
    lg: 2,
    md: 2,
    xs: 4
  },

  tableDefault: {
    size: "small",
    bordered: true,
    scroll: { x: true },
  },

  paginateDefault: {
    pageIndex: 1,
    pageSize: 10,
  },

  pageSizeOptions: [10, 20, 50, 100],

  inputFormatCurrency: {
    formatter: (value: any) => !isNaN(value) ? utils.formatCurrency(value) : "0",
    parser: (value: any) => {
      let result = utils.stringToNumber(value);
      return !isNaN(result) ? result : 0;
    },
  },

  selectSearch: {
    variant: "filled",
    showSearch: true,
    filterOption: (input: any, option: any) => utils.stringToASCII(option.children).indexOf(utils.stringToASCII(input)) >= 0
  },

  cancelButtonProps: {
    style: {
      width: "auto",
      minWidth: "110px",
      height: "40px",
      minHeight: "40px"
    },
    className: "btn-cancel"
  },

  okButtonProps: {
    style: {
      width: "auto",
      minWidth: "110px",
      height: "40px",
      minHeight: "40px"
    },
    className: "btn-confirm"
  },


};
