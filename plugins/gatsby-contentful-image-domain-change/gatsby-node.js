const fs = require('fs');
const path = require('path');

exports.onCreateNode = async ({node, actions, store, createNodeId}) => {
    if (node.internal.owner === 'gatsby-source-contentful' && node.internal.type === 'ContentfulAsset') {
        node.file.url = `https://imagescdn.qldnativeseeds.com.au${node.file.url.substring(22, node.file.url.length)}`;
    }
};