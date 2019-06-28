const customSnackbarStyles = theme => ({
    content: {
        margin: theme.spacing.unit,
    },
    success: {
        backgroundColor: '#43A047',
    },
    error: {
        backgroundColor: theme.palette.error.dark,
    },
    icon: {
        fontSize: 20,
    },
    iconVariant: {
        opacity: 0.9,
        marginRight: theme.spacing.unit,
    },
    message: {
        display: 'flex',
        alignItems: 'center',
    }
})

export default customSnackbarStyles;