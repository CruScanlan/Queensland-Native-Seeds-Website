const fs = require('fs');
const path = require('path');
const request = require('request');
const {createFileNode} = require('gatsby-source-filesystem/create-file-node');

exports.onCreateNode = async ({node, actions, store, createNodeId}) => {
    if (node.internal.owner === 'gatsby-source-contentful' && node.internal.type === 'ContentfulPlantProfile' && !node.doNotIncludeStaticMap) { //If node is contentful plant profile and needs static map
        return new Promise(async (resolve) => {
            const program = store.getState().program;
            const {createNode} = actions;
            const scientificName = node.scientificName;
            const bracketPos = scientificName.indexOf('(');
            const avhSearchName = bracketPos !== -1 ? scientificName.substring(0, bracketPos).trim() : scientificName;

            const writeDir = path.join(program.directory, 'distMaps/').split('\\').join('/'); //get write directory for maps
            if(!fs.existsSync(writeDir)) await createDir(writeDir); //create write directory if not exists

            const writePath = `${writeDir}${scientificName}.jpg`;

            const randomWaitTime = Math.floor(Math.random() * 30);

            console.log(`Getting AVH Dist Map for ${scientificName} ,Using Search Name: ${avhSearchName}`);
            if(process.env.NETLIFY_BUILD_BASE || !fs.existsSync(writePath)) {
                await wait(randomWaitTime);
                await downloadMap(avhSearchName, writePath);
                console.log(`Downloaded AVH Dist Map for ${scientificName} ,Using Search Name: ${avhSearchName}`);
            } else {
                console.log(`Using cached AVH Dist Map for ${scientificName} ,Using Search Name: ${avhSearchName}`);
            } 
            
            let fileNode = await createFileNode(writePath, createNodeId, {}) //create file node for downloaded map
            fileNode.internal.description = `distMap "${scientificName}"`;
            fileNode.internal.type = 'distMap'; //grapql schema name
            fileNode.parent = node.id; //set as child of contentful plant profile node
            createNode(fileNode, { name: `gatsby-source-avh-distribution-map`}); //create final image node
            resolve();
        })
    }
    return
};
const createDir = (dir) => {
    return new Promise((resolve, reject) => {
        fs.mkdir(dir, { recursive: true }, (err) => {
            if (err) return reject(err);
            resolve();
        });
    })
}

const downloadMap = async (avhSearchName, writePath) => {
    return new Promise((resolve) => {
        request(`https://qns-dist-map-generator.qldnativeseeds.com.au/?avhSearchName=${avhSearchName}`).pipe(fs.createWriteStream(writePath)).on('close', resolve);
    })
};

const wait = (time) => {
    return new Promise((resolve) => {
        setTimeout(resolve, time*1000);
    })
}