const path = require(`path`);
const replacePagePaths = require('./replacePagePaths');

exports.onCreatePage = ({page, actions}) => {
    return replacePagePaths(page, actions)
}

exports.createPages = ({graphql, actions}) => {
    const {createPage} = actions;
    return new Promise((resolve, reject) => {
      const plantProfileTemplate = path.resolve('src/templates/plantProfile.jsx')
      resolve(
        graphql(`
          {
            allContentfulPlantProfile {
              edges {
                node {
                    slug
                }
              }
            }
          }
        `).then((result) => {
          if (result.errors) {
            reject(result.errors)
          }
          result.data.allContentfulPlantProfile.edges.forEach((edge) => {
            createPage ({
              path: `plant-profiles/${edge.node.slug}`,
              component: plantProfileTemplate,
              context: {
                slug: edge.node.slug
              }
            })
          })
          return
        })
      )
    })
  }

