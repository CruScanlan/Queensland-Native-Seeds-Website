import {
    defaultFont
  } from "assets/material-kit-react.jsx";

const customSelectStyle = {
    formControl: {
        minWidth: '100%',
        margin: "0 0 17px 0",
        paddingTop: "27px",
        position: "relative",
        "& svg,& .fab,& .far,& .fal,& .fas,& .material-icons": {
          color: "#495057"
        }
    },
    underline: {
        "&:hover:not($disabled):before,&:before": {
          borderColor: "#D2D2D2 !important",
          borderWidth: "1px !important"
        },
        "&:after": {
          borderColor: '#7DA831'
        }
      },
    labelRoot: {
        ...defaultFont,
        color: "#AAAAAA !important",
        fontWeight: "400",
        fontSize: "14px",
        lineHeight: "1.42857",
        top: "10px",
        "& + $underline": {
            marginTop: "0px"
        }
    },
    input: {
        color: "#495057",
        "&,&::placeholder": {
            fontSize: "14px",
            fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
            fontWeight: "400",
            lineHeight: "1.42857",
            opacity: "1"
        },
        "&::placeholder": {
            color: "#AAAAAA"
        }
    }
};

export default customSelectStyle;
  