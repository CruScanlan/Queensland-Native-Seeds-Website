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
    inLineImage: {
        ...imageStyles.imgRounded,
        ...imageStyles.imgRaised
    }
};

export default productStyle;
