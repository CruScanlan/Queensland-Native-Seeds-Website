const collabsibleListStyle = theme => ({
    container: {
        //borderLeft: "1px solid #ddd",
        //borderRight: "1px solid #ddd",
        margin: "40px 0 40px 0"
    },
    headerArea: {
        height: "35px",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        borderBottom: "1px solid #ddd",
        //backgroundColor: "#F9F9F9",
        textAlign: "center"
    },
    bodyArea: {
        paddingLeft: "10px",
        height: "40px",
        overflow: "hidden",
        transition: theme.transitions.create('height', {
            easing: theme.transitions.easing.easeOut,
            duration: theme.transitions.duration.enteringScreen,
        })
    },
    bodyAreaExpanded: {
        transition: theme.transitions.create('height', {
            easing: theme.transitions.easing.easeOut,
            duration: theme.transitions.duration.enteringScreen,
        })
    },
    footerArea: {
        height: "35px",
        borderTop: "1px solid #ddd",
        //backgroundColor: "#F9F9F9",
        display: "flex",
        alignItems: "center",
        cursor: "pointer"
    },
    arrow: {
        transform: "rotate(90deg)",
        marginLeft: "auto",
        transition: theme.transitions.create('transform', {
            easing: theme.transitions.easing.easeOut,
            duration: theme.transitions.duration.enteringScreen
        })
    },
    arrowFlipped: {
        transform: "rotate(270deg)",
        transition: theme.transitions.create('transform', {
            easing: theme.transitions.easing.easeOut,
            duration: theme.transitions.duration.shortest
        })
    },
    headerText: {
        fontWeight: "bolder", 
        fontSize: "17px", 
        margin: "0"
    },
    footerText: {
        fontWeight: "bolder", 
        fontSize: "15px", 
        margin: "0", 
        color: "#00acc1", 
        paddingLeft: "10px",
        paddingRight: "5px"
    },
    linkText: {
        color: '#799a42', 
        textDecoration: 'underline', 
        fontSize: "15px",
        fontWeight: 400
    }
})

export default collabsibleListStyle;