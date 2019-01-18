const path = require(`path`);
const replacePagePaths = require('./replacePagePaths');

exports.createPages = ({actions, graphql}) => {
  const {createPage} = actions;
  return new Promise((resolve) => {
    graphql(`
        {
          allContentfulPlantProfile {
            edges {
              node {
                scientificName,
                slug
              }
            }
          }
        }
      `).then(async (result) => {
        if (result.errors) {
          console.error(result.errors);
          return resolve();
        }
        const plantProfileTemplate = path.resolve('src/templates/plantProfile.jsx')
        result.data.allContentfulPlantProfile.edges.forEach((edge) => {
          createPage ({
            path: `plant-profiles/${edge.node.slug}`,
            component: plantProfileTemplate,
            context: {
              scientificName: edge.node.scientificName,
              slug: edge.node.slug
            }
          })
        })
        resolve();
      })
  })
}

exports.onCreatePage = (args) => {
  return replacePagePaths(args);
}