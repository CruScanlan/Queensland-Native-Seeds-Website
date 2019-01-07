const modifyPaths = [
    {
        original: "/about/",
        new: "/about-us/"
    },
    {
        original: "/contact/",
        new: "/contact-us/"
    }
]

const replacePath = path => {
    let modifyPath = modifyPaths.find(modifyPath => modifyPath.original === path);
    if(modifyPath) return modifyPath.new;
    return path;
};

module.exports = function(page, actions) {
    const { createPage, deletePage } = actions;
    return new Promise(resolve => {
        const oldPage = Object.assign({}, page)

        page.path = replacePath(page.path);
        if (page.path !== oldPage.path) {
          // Replace new page with old page
          deletePage(oldPage)
          createPage(page)
        }
        resolve()
      })
}