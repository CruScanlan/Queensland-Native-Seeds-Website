const replacePagePaths = require('./replacePagePaths');

exports.onCreatePage = ({page, actions}) => {
    return replacePagePaths(page, actions)
}