const ParallaxDividerStyle = {
    parallax: {
        overflow: "hidden",
        position: "relative",
        width: "100%",
        margin: "0",
        padding: "0",
        border: "4px black",
        display: "flex",
        alignItems: "center",
        top: 0,
        zIndex: 1,
        left: "0",
        boxShadow: "inset 0 0 10px #000"
    },
    image: {
        display: "block",
        minWidth: "100vw",
        objectFit: "cover",
        zIndex: -1,
    }
};

export default ParallaxDividerStyle;
