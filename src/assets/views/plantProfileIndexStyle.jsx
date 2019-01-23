import { title } from "assets/material-kit-react.jsx";
import imageStyles from "assets/imagesStyles.jsx";

const plantProfileStyle = {
    section: {
        padding: "70px 0",
        textAlign: "left"
    },
    pageContainer: {
        paddingRight: "30px",
        paddingLeft: "30px",
        width: "100%",
        "@media (max-width: 576px)" : {
            paddingRight: "5px",
            paddingLeft: "5px"
        }
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
    },
    tableArrowIcon: {
        float: 'right', 
        color: '#7DA831', 
        fontSize: 32,
        verticalAlign: 'middle'
    },
    table: {
        display: 'table',
        width: '100%',
        overflow: 'auto',
        borderSpacing: 0,
        borderCollapse: 'collapse'
    },
    tableHeader: {
        display: 'table-header-group'
    },
    tableHeaderRow: {
        height: 'auto',
        display: 'table-row',
        verticleAlign: 'middle'
    },
    tableHeaderColumn: {
        padding: '0 10px 0 10px',
        textAlign: 'left',
        fontSize: '1.125rem',
        fontWeight: 500,
        borderTopWidth: '0 !important',
        borderBottomWidth: '1px',
        '&:hover': {
            backgroundColor: '#f9f9f9',
            cursor: 'pointer'
        }
    },
    tableBody: {
        display: 'table-row-group',
        borderTop: '2px solid #bbb'
    },
    tableRow: {
        height: 'auto',
        display: 'table-row',
        verticalAlign: 'middle',
        '&:hover': {
            backgroundColor: '#f9f9f9',
            cursor: 'pointer'
        }
    },
    tableCell: {
        textAlign: 'left',
        padding: '12px 10px !important',
        position: 'relative',
        borderRight: '1px solid #ddd',
        borderTop: '1px solid #ddd',
        verticalAlign: 'middle'
    },
    tableCellLast: {
        textAlign: 'left',
        padding: '12px 10px !important',
        position: 'relative',
        borderTop: '1px solid #ddd',
        verticalAlign: 'middle'
    }
};

export default plantProfileStyle;