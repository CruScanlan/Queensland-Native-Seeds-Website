import { title as materialKitTitle } from "assets/material-kit-react.jsx";
import imageStyles from "assets/imagesStyles.jsx";

const title = {
    ...materialKitTitle,
    marginBottom: "1rem",
    marginTop: "30px",
    minHeight: "32px",
    textDecoration: "none",
    textAlign: 'center'
}

const generalStyle = {
    section: {
        padding: "70px 0",
        textAlign: "left"
    },
    centerText: {
        textAlign: 'center'
    },
    title,
    smallTitle: {
        ...title,
        marginTop: "12px"
    },
    text: {
        color: "#000"
    },
    heavyText: {
        color: "#000",
        fontWeight: 250
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

export default generalStyle;
