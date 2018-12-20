import { title } from "assets/material-kit-react.jsx";
import imageStyles from "assets/imagesStyles.jsx";

const productStyle = {
    section: {
        padding: "70px 0",
        textAlign: "center"
    },
    title: {
        ...title,
        marginBottom: "1rem",
        marginTop: "30px",
        minHeight: "32px",
        textDecoration: "none"
    },
    text: {
        color: "#000"
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

export default productStyle;
