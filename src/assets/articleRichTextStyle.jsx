const articleRichTextStyle = {
    pageContainer: {
        paddingRight: "160px",
        paddingLeft: "160px",
        width: "100%",
        "@media (max-width: 1200px)": {
            paddingRight: "120px",
            paddingLeft: "120px",
        },
        "@media (max-width: 992px)": {
            paddingRight: "25px",
            paddingLeft: "25px",
        },
        "@media (max-width: 768px)": {
            paddingRight: "15px",
            paddingLeft: "15px",
        },
        "@media (max-width: 576px)" : {
            paddingRight: "5px",
            paddingLeft: "5px"
        }
    },
    p: {
        fontSize: '1.0625rem',
        lineHeight: '1.55em',
        marginTop: '10px',
        marginBotton: '10px',
        color: '#000',
        fontFamily: 'Roboto, Helvetica, Arial, sans-serif',
        fontWeight: 300
    },
    h1: {
        '& b': {
            fontWeight: 700
        }
    },
    h2: {
        '& b': {
            fontWeight: 700
        }
    },
    h3: {
        '& b': {
            fontWeight: 700
        }
    },
    h4: {
        '& b': {
            fontWeight: 700
        }
    },
    h5: {
        '& b': {
            fontWeight: 700
        }
    },
    h6: {
        '& b': {
            fontWeight: 700
        }
    },
    a: {
        color: '#3c80cf',
        '& :hover :focus': {
            color: '#000'
        }
    },
    blockquote: {
        margin: '0 0 20px',
        padding: '10px 20px',
        fontSize: '125rem',
        borderLeft: '5px solid #eee'
    },
    layout: {
        margin: 'auto',
        display: 'flex',
        width: '100%',
        height: 'auto',
        justifyContent: 'space-between',
        alignItems: 'flex-start',
        flexFlow: 'row wrap',
        '& > *': {
            paddingLeft: '15px',
            "@media (max-width: 768px)" : {
                paddingLeft: '0px'
            }
        },
        '& > *:first-child': {
            paddingLeft: '0px',
            paddingRight: '15px',
            "@media (max-width: 768px)" : {
                paddingRight: '0px'
            } 
        }
    },
    column: {
        minWidth: 'calc(200px + (200px * var(--minWidthModifier)))',
        flex: '1 1 var(--width)',
        display: 'flex',
        flexFlow: 'column wrap'
    },
    centerText: {
        textAlign: 'center'
    },
    imageContainer: {
        width: '100%',
        paddingBottom: '20px'
    },
    image: {
        margin: '0 auto',
        height: 'auto',
        maxHeight: '1000px',
        maxWidth: '1000px'
    },
    articleSubTitle: {
        color: '#3C4858',
        fontWeight: 400,
        marginTop: 0
    },
    articleSnippet: {
        color: '#000',
        fontSize: '1.0625rem',
        lineHeight: '1.55em',
        marginTop: '10px',
        marginBotton: '10px',
        color: 'inherit',
        fontFamily: 'Roboto, Helvetica, Arial, sans-serif',
        fontWeight: 300
    }
}

export default articleRichTextStyle;