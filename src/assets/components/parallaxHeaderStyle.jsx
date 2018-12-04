const parallaxHeaderStyle = {
    parallax: {
        height: "90vh",
        maxHeight: "1000px",
        overflow: "hidden",
        position: "relative",
        backgroundPosition: "center center",
        backgroundSize: "cover",
        margin: "0",
        padding: "0",
        border: "0",
        display: "flex",
        alignItems: "center"
    },
    filter: {
        "&:before": {
            backgroundImage: "linear-gradient(to bottom,#efefef,transparent)",
            opacity: 0.6
        },
        "&:after,&:before": {
            position: "absolute",
            zIndex: "1",
            width: "100%",
            height: "100%",
            display: "block",
            left: "0",
            top: "0",
            content: "''"
        }
    },
    small: {
        height: "380px"
    },
    medium: {
        height: "580px"
    }
};

export default parallaxHeaderStyle;
