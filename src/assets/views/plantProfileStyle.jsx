import { title } from "assets/material-kit-react.jsx";
import imageStyles from "assets/imagesStyles.jsx";

const plantProfileStyle = {
    pageContainer: {
        paddingRight: "30px",
        paddingLeft: "30px",
        width: "100%"
    },
    section: {
        padding: "70px 0",
        display: "flex",
        flexFlow: "row nowrap",
        justifyContent: "center",
        "@media (max-width: 768px)": {
            flexFlow: "column nowrap",
        }
    },
    leftSection: {
        width: "30%",
        order: 1,
        "@media (max-width: 768px)": {
            order: 3,
            width: "100%"
        },
    },
    rightSection: {
        width: "70%",
        order: 2,
        "@media (max-width: 768px)": {
            width: "100%"
        },
        paddingRight: "30px",
        paddingLeft: "30px",
    },
    pageTitle: {
        ...title,
        marginBottom: "1rem",
        marginTop: "30px",
        minHeight: "32px",
        textDecoration: "none",
        textAlign: 'center'
    },
    text: {
        color: "#000"
    },
    textBold: {
        color: "#000",
        fontWeight: 700
    },
    richTextContent: {
        "& p": {
            fontSize: '1.0625rem',
            lineHeight: '1.55em',
            marginTop: '10px',
            marginBotton: '10px',
            color: 'inherit',
            fontFamily: 'Roboto, Helvetica, Arial, sans-serif',
            fontWeight: 300
        }
    },
    alignCenter: {
        textAlign: 'center'
    },
    inLineImageContainer: {
        position: "relative"
    },
    inLineImage: {
        ...imageStyles.imgRounded,
        ...imageStyles.imgRaised
    },
    inLineImageShadow: {
        position: "absolute !important",
        transform: "scale(0.94)",
        filter: "blur(12px)",
        top: "10px",
        width: "100%",
        height: "100%",
        zIndex: "-1"
    }
};

export default plantProfileStyle;