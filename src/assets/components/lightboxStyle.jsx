const lightboxStyle = {
    content: {
        maxWidth: "1300px"
    },
    thumbnail: {
		boxSizing: 'border-box',
		display: 'block',
		float: 'left',
		lineHeight: 0,
		paddingRight: 2,
		paddingBottom: 2,
		overflow: 'hidden',

		'@media (min-width: 500px)': {
			paddingRight: 4,
			paddingBottom: 4,
		},
}
}

export default lightboxStyle;