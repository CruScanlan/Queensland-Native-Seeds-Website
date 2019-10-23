import {
  defaultFont,
  primaryColor,
  primaryBoxShadow,
  infoColor,
  infoBoxShadow,
  successColor,
  successBoxShadow,
  warningColor,
  warningBoxShadow,
  dangerColor,
  dangerBoxShadow,
  roseColor,
  roseBoxShadow
} from "assets/material-kit-react.jsx";

const customDropdownStyle = theme => ({
  popperClose: {
    pointerEvents: "none"
  },
  button: {
    margin: "8px 1px",
    color: "#000"
  },
  dropdown: {
    borderRadius: "3px",
    border: "0",
    boxShadow: "0 2px 5px 0 rgba(0, 0, 0, 0.26)",
    top: "100%",
    zIndex: "1000",
    minWidth: "160px",
    padding: "5px 0",
    margin: "2px 0 0",
    fontSize: "14px",
    textAlign: "left",
    listStyle: "none",
    backgroundColor: "#fff",
    backgroundClip: "padding-box"
  },
  menuList: {
    padding: "0"
  },
  pooperResponsive: {
    zIndex: "1200",
    [theme.breakpoints.down("sm")]: {
      zIndex: "1640",
      position: "static",
      float: "none",
      width: "auto",
      marginTop: "0",
      backgroundColor: "transparent",
      border: "0",
      boxShadow: "none",
      color: "black"
    }
  },
  dropdownItem: {
    ...defaultFont,
    fontSize: "14px",
    padding: "10px 20px",
    margin: "0 5px",
    borderRadius: "2px",
    position: "relative",
    transition: "all 150ms linear",
    display: "block",
    clear: "both",
    fontWeight: "400",
    height: "fit-content",
    color: "#333",
    whiteSpace: "nowrap"
  },
  blackHover: {
    "&:hover": {
      boxShadow:
        "0 4px 20px 0px rgba(0, 0, 0, 0.14), 0 7px 10px -5px rgba(33, 33, 33, 0.4)",
      backgroundColor: "#212121",
      color: "#fff"
    }
  },
  primaryHover: {
    "&:hover": {
      backgroundColor: primaryColor,
      color: "#FFFFFF",
      ...primaryBoxShadow
    }
  },
  infoHover: {
    "&:hover": {
      backgroundColor: infoColor,
      color: "#FFFFFF",
      ...infoBoxShadow
    }
  },
  successHover: {
    "&:hover": {
      backgroundColor: successColor,
      color: "#FFFFFF",
      ...successBoxShadow
    }
  },
  warningHover: {
    "&:hover": {
      backgroundColor: warningColor,
      color: "#FFFFFF",
      ...warningBoxShadow
    }
  },
  dangerHover: {
    "&:hover": {
      backgroundColor: dangerColor,
      color: "#FFFFFF",
      ...dangerBoxShadow
    }
  },
  roseHover: {
    "&:hover": {
      backgroundColor: roseColor,
      color: "#FFFFFF",
      ...roseBoxShadow
    }
  },
  dropdownItemRTL: {
    textAlign: "right"
  },
  dropdownDividerItem: {
    margin: "5px 0",
    backgroundColor: "rgba(0, 0, 0, 0.12)",
    height: "1px",
    overflow: "hidden"
  },
  buttonIcon: {
    width: "20px",
    height: "20px"
  },
  caret: {
    transition: "transform 150ms ease-in",
    display: "inline-block",
    width: "0",
    height: "0",
    marginLeft: "4px",
    verticalAlign: "middle",
    borderTop: "4px solid",
    borderRight: "4px solid transparent",
    borderLeft: "4px solid transparent"
  },
  caretActive: {
    transform: "rotate(180deg)"
  },
  caretRTL: {
    marginRight: "4px"
  },
  dropdownHeader: {
    display: "block",
    padding: "0.1875rem 1.25rem",
    fontSize: "0.75rem",
    lineHeight: "1.428571",
    color: "#777",
    whiteSpace: "nowrap",
    fontWeight: "inherit",
    marginTop: "10px",
    "&:hover,&:focus": {
      backgroundColor: "transparent",
      cursor: "auto"
    }
  },
  noLiPadding: {
    padding: "0"
  },
  navLink: {
    color: "#000",
    "& button": {
        color: "#000",
        position: "relative",
        padding: "0.9375rem",
        fontWeight: "400",
        fontSize: "14px",
        textTransform: "uppercase",
        borderRadius: "3px",
        lineHeight: "20px",
        textDecoration: "none",
        margin: "5px",
        display: "inline-flex",
        "&:hover,&:focus": {
            color: "#fff",
            background: "rgba(200, 200, 200, 0.3)"
        },
        [theme.breakpoints.down("sm")]: {
            width: "calc(100% - 30px)",
            marginLeft: "15px",
            marginBottom: "8px",
            marginTop: "8px",
            textAlign: "left",
            "& > span:first-child": {
                justifyContent: "flex-start"
            }
        }
    }
    },
    navLinkActive: {
        "& button": {
            //color: "#fff",
            backgroundColor: "rgba(200, 200, 200, 0.3)"
        }
    }
});

export default customDropdownStyle;
