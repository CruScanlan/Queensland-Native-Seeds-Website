const path = require(`path`);
const replacePagePaths = require('./replacePagePaths');

exports.createPages = ({actions, graphql}) => {
  const {createPage} = actions;
  return Promise.all([createPlantProfilePages, createArticlePages].map(callback => callback(createPage, graphql)));
}

const createPlantProfilePages = (createPage, graphql) => {
    if(process.env.ARTICLES_PREVIEW) return Promise.resolve();
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

const createArticlePages = (createPage, graphql) => {
    return new Promise((resolve) => {
        graphql(`
            {
                allContentfulArticles {
                    edges {
                        node {
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
            const articleTemplate = path.resolve('src/templates/article.jsx')
            result.data.allContentfulArticles.edges.forEach((edge) => {
              createPage ({
                path: `articles/${edge.node.slug}`,
                component: articleTemplate,
                context: {
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