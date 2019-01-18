const fs = require('fs');
const Jimp = require('jimp');
const path = require('path');
const {createFileNode} = require('gatsby-source-filesystem/create-file-node')

const cacheId = name => `create-avh-distribution-map-${name}`

const compositeImages = (dotImage, baseImage, writePath) => {
    return new Promise((resolve) => {
        baseImage.composite(dotImage, 0, 0, {
            mode: Jimp.BLEND_SOURCE_OVER,
            opacitySource: 0.9,
            opacityDest: 1
        }).quality(65).write(writePath, resolve)
    })
}

const createDir = (dir) => {
    return new Promise((resolve, reject) => {
        fs.mkdir(dir, { recursive: true }, (err) => {
            if (err) return reject(err);
            resolve();
        });
    })
}

exports.onCreateNode = async ({node, actions, store, createNodeId }) => {
    const {createNode} = actions;
    const program = store.getState().program
    if (node.internal.owner === 'gatsby-source-contentful' && node.internal.type === 'ContentfulPlantProfile') {
        return new Promise(async (resolve) => {
            const scientificName = node.scientificName;
            try {
                let writeDir = path.join(program.directory, '.cache/distributionMaps/');
                if(process.env.NETLIFY_BUILD_BASE) writeDir = path.join(process.env.NETLIFY_BUILD_BASE, 'cache/gatsby/distributionMaps');
                const writePath = `${writeDir}/${scientificName}.jpg`;
                if(!fs.existsSync(writeDir)) await createDir(writeDir);
                if(!fs.existsSync(writePath)) {
                    console.time(`Created AVH Dist Map for: ${scientificName}, in`);
                    let dotImage = await Jimp.read(`https://biocache-ws.ala.org.au/ws/webportal/wms/image?q=${scientificName}&extents=112,-44,155,-10&format=png&dpi=600&pradiusmm=0.7&popacity=1&pcolour=7DA831&widthmm=60&scale=off&outline=true&outlineColour=0x000000&baselayer=nobase&fileName=MyMap.png`);
                    let baseImage = await Jimp.read('./src/assets/img/basemap.png');
                    await compositeImages(dotImage, baseImage, writePath);
                    console.timeEnd(`Created AVH Dist Map for: ${scientificName}, in`);
                } else {
                    console.log(`Using Cached Dist Map for: ${scientificName}`);
                }
                let fileNode = await createFileNode(writePath, createNodeId, {})
                fileNode.internal.description = `distMap "${scientificName}"`;
                fileNode.internal.type = 'distMap';
                fileNode.parent = node.id;
                createNode(fileNode, { name: `gatsby-source-avh-distribution-map`});
            } catch(err) {
                console.error(err);
            }
            resolve();
        })
    }
    return
};