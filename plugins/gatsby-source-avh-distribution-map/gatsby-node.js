const fs = require('fs');
const Jimp = require('jimp');
const path = require('path');
const {createFileNode} = require('gatsby-source-filesystem/create-file-node')

const compositeImages = (dotImage, baseImage, writePath) => {
    return new Promise((resolve) => {
        baseImage.composite(dotImage, 0, 0, {
            mode: Jimp.BLEND_SOURCE_OVER,
            opacitySource: 0.9,
            opacityDest: 1
        }).quality(65).write(writePath, resolve) //write to cache directory. This will make a fine addition to my collection.
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

exports.onCreateNode = async (onCreateNode) => {
    if (onCreateNode.node.internal.owner === 'gatsby-source-contentful' && onCreateNode.node.internal.type === 'ContentfulPlantProfile' && !onCreateNode.doNotIncludeStaticMap) { //If node is contentful plant profile and needs static map
        return new Promise(async (resolve) => {
           if(!(await createDistMap(onCreateNode))) return resolve();
           await wait(2000);
           if(!(await createDistMap(onCreateNode))) return resolve();
           await wait(6000);
           if(!(await createDistMap(onCreateNode))) return resolve();
        })
    }
    return
};

const createDistMap = async ({node, actions, store, createNodeId}) => {
    const program = store.getState().program;
    const {createNode} = actions;
    const scientificName = node.scientificName;
    const bracketPos = scientificName.indexOf('(');
    const avhSearchName = bracketPos !== -1 ? scientificName.substring(0, bracketPos).trim() : scientificName;
    try {
        let writeDir = path.join(program.directory, '.cache/distributionMaps/'); //get write directory for maps
        if(process.env.NETLIFY_BUILD_BASE) writeDir = path.join(process.env.NETLIFY_BUILD_BASE, 'cache/gatsby/distributionMaps'); //use netlify cache for write directory
        const writePath = `${writeDir}/${scientificName}.jpg`;
        if(!fs.existsSync(writeDir)) await createDir(writeDir); //create write dirtectory if not exists
        if(!fs.existsSync(writePath)) { //map is does not cached
            console.time(`Created AVH Dist Map for: ${scientificName} ,Using Search Name: ${avhSearchName}, in`);
            let dotImage = await Jimp.read(`https://biocache-ws.ala.org.au/ws/webportal/wms/image?q=${avhSearchName}&extents=112,-44,155,-10&format=png&dpi=600&pradiusmm=0.7&popacity=1&pcolour=7DA831&widthmm=60&scale=off&outline=true&outlineColour=0x000000&baselayer=nobase&fileName=MyMap.png`);
            let baseImage = await Jimp.read('./src/assets/img/basemap.png');
            await compositeImages(dotImage, baseImage, writePath);
            console.timeEnd(`Created AVH Dist Map for: ${scientificName} ,Using Search Name: ${avhSearchName}, in`);
        } else {
            console.log(`Using Cached Dist Map for: ${scientificName} ,With Search Name: ${avhSearchName}`);
        }
        let fileNode = await createFileNode(writePath, createNodeId, {}) //create file node for downloaded map
        fileNode.internal.description = `distMap "${scientificName}"`;
        fileNode.internal.type = 'distMap'; //grapql schema name
        fileNode.parent = node.id; //set as child of contentful plant profile node
        createNode(fileNode, { name: `gatsby-source-avh-distribution-map`}); //create final image node
        return false;
    } catch(err) {
        console.log(`Error when creating dist map for ${node.scientificName}`);
        console.error(err);
        return true;
    }
}

const wait = async (time) => {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve();
        }, time)
    })
}