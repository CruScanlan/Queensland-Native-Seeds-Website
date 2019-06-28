import React, {useMemo} from 'react';
import Img from 'gatsby-image';
import classNames from "classnames";
import { useStaticQuery , graphql } from "gatsby"
import { BLOCKS, MARKS, INLINES } from "@contentful/rich-text-types";
import { documentToReactComponents  } from "rich-text-react-renderer-material-ui";

import generalStyle from "assets/views/generalStyle.jsx";
import articleRichTextStyle from 'assets/articleRichTextStyle.jsx';
import { withStyles } from '@material-ui/core/styles';

const styles = {
    ...generalStyle,
    ...articleRichTextStyle
}

const validTags = [
    {
        name: 'layout',
        type: 'node'
    },
    {
        name: 'column',
        type: 'node',
        args: [
            {name: 'width', type: 'number'}
        ]
    },
    {
        name: 'centerText',
        type: 'node'
    }
];

const defaultInline = (type, node) => <span>type: {type} id: {node.data.target.sys.id}</span>;

const options = {
    renderMark: {
        [MARKS.BOLD]: text => <b>{text}</b>,
        [MARKS.ITALIC]: text => <i>{text}</i>,
        [MARKS.UNDERLINE]: text => <u>{text}</u>,
        [MARKS.CODE]: text => <code>{text}</code>,
    },
    renderNode: {
        [BLOCKS.PARAGRAPH]: (node, children, classes) => <p className={classes.p}>{children}</p>,
        [BLOCKS.HEADING_1]: (node, children, classes) => <h1 className={classes.h1}>{children}</h1>,
        [BLOCKS.HEADING_2]: (node, children, classes) => <h2 className={classes.h2}>{children}</h2>,
        [BLOCKS.HEADING_3]: (node, children, classes) => <h3 className={classes.h3}>{children}</h3>,
        [BLOCKS.HEADING_4]: (node, children, classes) => <h4 className={classes.h4}>{children}</h4>,
        [BLOCKS.HEADING_5]: (node, children, classes) => <h5 className={classes.h5}>{children}</h5>,
        [BLOCKS.HEADING_6]: (node, children, classes) => <h6 className={classes.h6}>{children}</h6>,
        [BLOCKS.EMBEDDED_ENTRY]: (node, children) => <div>{children}</div>,
        [BLOCKS.UL_LIST]: (node, children) => <ul>{children}</ul>,
        [BLOCKS.OL_LIST]: (node, children) => <ol>{children}</ol>,
        [BLOCKS.LIST_ITEM]: (node, children) => <li>{children}</li>,
        [BLOCKS.QUOTE]: (node, children, classes) => <blockquote className={classes.blockquote}>{children}</blockquote>,
        [BLOCKS.HR]: () => <hr />,
        [BLOCKS.EMBEDDED_ASSET]: (node, children, classes) => {
            const url = node.data.target.fields.file['en-US'].url;

            const data = useStaticQuery(graphql`
                query {
                    pictures: allContentfulAsset {
                        edges {
                            node {
                                file {
                                    url
                                },
                                fluid(quality: 80, maxWidth: 1000) {
                                    ...GatsbyContentfulFluid_withWebp
                                }
                            }
                        }
                    }
                }
          `);
          
            const match = useMemo(() => (
                data.pictures.edges.find(({ node }) => node.file.url === url)
            ), [ data, url ]);

            return (
                <div className={classes.imageContainer}>
                    <div className={classNames(classes.inLineImageContainer, classes.image)}>
                        <Img fluid={match.node.fluid} className={classes.inLineImage} />
                        <Img fluid={match.node.fluid} className={classes.inLineImageShadow} />
                    </div>
                </div>
            )
        },
        [INLINES.ASSET_HYPERLINK]: node => defaultInline(INLINES.ASSET_HYPERLINK, node),
        [INLINES.ENTRY_HYPERLINK]: node => defaultInline(INLINES.ENTRY_HYPERLINK, node),
        [INLINES.EMBEDDED_ENTRY]: node => defaultInline(INLINES.EMBEDDED_ENTRY, node),
        [INLINES.HYPERLINK]: (node, children, classes) => <a href={node.data.uri} className={classes.a}>{children}</a>,
        layout: (node, children, classes) => <div className={classes.layout}>{children}</div>,
        column: (node, children, classes) => <div className={classes.column} style={{'--width': node.data.width ? `${node.data.width}%` : `50%`, '--minWidthModifier': node.data.width ? Number(`0.${node.data.width}`) : 0.5}}>{children}</div>,
        centerText: (node, children, classes) => <div className={classes.centerText}>{children}</div>
    },
  } 

class ArticlesRichTextParser {
    convertRichTextToReact(richText, classes) {
        return documentToReactComponents(this.convertTagsToRichTextAST(richText), {...options, classes});
    }

    convertTagsToRichTextAST(richTextASTDoc) {
        const richTextAST = richTextASTDoc.content;
        let textNodesWithTags = this.searchNodeListForTextTagsNode(richTextAST, []);
        const {cleanRichTextAST, textNodesWithTagsUpdated} = this.removeTagsFromAST(richTextAST, textNodesWithTags);
        textNodesWithTags = textNodesWithTagsUpdated;
        const validatedParsedTags = this.validateParseTextNodeTags(textNodesWithTags);
        const newRichTextAST = this.addTagsToRichTextAST(cleanRichTextAST, validatedParsedTags);
        const newRichTextASTNoNull = this.removeNullNodesFromRichTextAST(newRichTextAST);
        return {
            data: {},
            content: newRichTextASTNoNull,
            nodeType: "document"
        }
    }

    searchNodeListForTextTagsNode(nodeList, nodeAddress) {
        let textNodesWithTags = []; //create empty list of tags to be added to
        for(let i=0; i<nodeList.length; i++) { //cycle through current node list
            const node = nodeList[i];
            const newNodeAddress = [...nodeAddress] //copy the array
            newNodeAddress.push(i); //push the index of the current node to address array
            if(node.nodeType === "text") { //is the node a text node?
                const tags = []; //search for tags with regex in text
                let text = node.value.slice(); //copy text
                let match;
                const regex = /<%(.+?)%>/;
                while(match = text.match(regex)) { //for every occurance of a tag, push it to the array and remove it from the orginal string
                    tags.push(match[0]);
                    text = text.substring(0, match.index) + text.substring(match.index+match[0].length, text.length);
                }
                if(tags.length > 0) { //check if node contains a tag
                    node.value = text;
                    textNodesWithTags.push({node, nodeAddress: newNodeAddress, tags}); //push the node address and tag info to array
                }
                continue;
            }
            //if the node is not a text node, recursively check the children list of nodes and any text nodes with tags to the list of currently found ones
            textNodesWithTags.push(...this.searchNodeListForTextTagsNode(node.content, newNodeAddress));
        }
        return textNodesWithTags;
    }

    validateParseTextNodeTags(textNodesWithTags) {
        let validIndividualTags = [];
        for(let i=0; i<textNodesWithTags.length; i++) { //cycle through text nodes
            const textNodeWithTag = textNodesWithTags[i];
            for(let j=0; j<textNodeWithTag.tags.length; j++) {  //cyle through tags
                const tag = textNodeWithTag.tags[j];
                const tagContents = tag.slice(2, tag.length-2);
                let tagArgs = tagContents.split(' '); //args separated by spaces
                const tagName = tagArgs.splice(0, 1)[0];
                for(let k=0; k<validTags.length; k++) {
                    if(tagName === validTags[k].name) { //check if tag is in the list of valid tags
                        validIndividualTags.push({
                            name: tagName,
                            type: validTags[k].type,
                            endTag: (tagArgs.length > 0 && tagArgs[tagArgs.length-1] === "end"), //if the last arg is "end" then its the end tag
                            tagArgs,
                            nodeAddress: textNodeWithTag.nodeAddress
                        });
                        break;
                    }
                }
            }
        }

        return this.getValidTagPairs(validIndividualTags);
    }

    getValidTagPairs(validIndividualTags) {
        const validTagPairs = [];
        for(let i=0; i<validIndividualTags.length; i++) { //cycle through valid individual tags
            const tag = validIndividualTags[i];
            if(tag.endTag) { //tag is an end tag
                const newValidIndividualTags = [...validIndividualTags]; //copy array
                if(tag.name !== validIndividualTags[i-1].name) return []; //stop checking for tags, syntax is wrong
                const tagPairArray = newValidIndividualTags.splice(i-1, 2); //delete the tag pair from the individual tags array
                const tagPair = {
                    tag1: tagPairArray[0],
                    tag2: tagPairArray[1],
                    type: tagPairArray[0].type,
                    name: tag.name
                }
                //if(tagPair.tag1.nodeAddress.length === tagPair.tag2.nodeAddress.length) 
                validTagPairs.push(tagPair);
                validTagPairs.push(...this.getValidTagPairs(newValidIndividualTags)); //recursive function
                return validTagPairs;
            }
        }
        return validTagPairs;
    }

    removeTagsFromAST(richTextAST, textNodesWithTags) {
        let cleanRichTextAST = JSON.parse(JSON.stringify(richTextAST)); //deep copy
        for(let i=0; i<textNodesWithTags.length; i++) {
            if(textNodesWithTags[i].node.value === "") { //only delet if node is empty
                textNodesWithTags[i].nodeAddress = this.nullNestedTag(cleanRichTextAST, textNodesWithTags[i].nodeAddress) //null tag if node is empty and update the node address if changed
                continue;
            }
        }
        return {cleanRichTextAST, textNodesWithTagsUpdated: textNodesWithTags};
    }

    nullNestedTag(richTextAST, nodeAddress){
        let i = 0;
        while (i < nodeAddress.length-1) {
            if(i === nodeAddress.length-2 && richTextAST[nodeAddress[i]].nodeType === "paragraph" && richTextAST[nodeAddress[i]].content.length < 2) {//if the node above is a paragraph with only a single child, null it instead of the text node
                nodeAddress.pop(); //remove the last node address since we are targeting the paragraph now
                break; 
            }
            if(i === nodeAddress.length-3 && richTextAST[nodeAddress[i]].nodeType === "list-item" && richTextAST[nodeAddress[i]].content.length < 2) {//if the node two above is a list item with only a single child, null it instead of the text node
                nodeAddress.pop(); //remove the last node address since we are targeting the paragraph now
                break; 
            }
            richTextAST = richTextAST[nodeAddress[i++]].content;
        }
        richTextAST[nodeAddress[i]] = null;
        return nodeAddress; //return the node address in case of any change
    }

    addTagsToRichTextAST(cleanRichTextAST, validatedParsedTags) {
        /*
            To identify what nodes need to be wrapped by a new node, what matters is the last address the two nodes share.
            Everything below that will be wrapped in the new node.
            In the case of a tag that is at the root of the AST, the last address shared will be -1 as they do not share any addresses.
            Therefore we can wrap everything from the first index of address 1 to the first index of address 2. i.e lastSameAddressIndex+1
            address 1 = [2, 0]
            address 2 = [9]
            wrapping element = [2] and its children will be all the nodes that are [2-9]
        */
        let newRichTextAST = JSON.parse(JSON.stringify(cleanRichTextAST));
        for(let i=0; i<validatedParsedTags.length; i++) {
            const tagPair = validatedParsedTags[i];
            if(tagPair.type !== "node") continue; //only look at nodes
            const tag1Address = tagPair.tag1.nodeAddress;
            const tag2Address = tagPair.tag2.nodeAddress;
            if(tag1Address !== tag2Address) { //not the same node
                let lastSameAddressIndex;
                for(let j=0; j<tag1Address.length; j++) {
                    if(tag1Address[j] != tag2Address[j]) { //address positions do not match
                        lastSameAddressIndex = j-1; //take the previous address position, -1 will mean they have no similar addresses and will be wrapping the base nodes
                        break;
                    }
                }
                
                this.addNodeTagToRichTextAST(newRichTextAST, tagPair, lastSameAddressIndex, validatedParsedTags);
                continue;
            }
            this.addNodeTagToRichTextAST(newRichTextAST, tagPair, tag1Address.length-2, validatedParsedTags, true);
        }

        return newRichTextAST;
    }

    addNodeTagToRichTextAST(newRichTextAST, tagPair, lastSameAddressIndex, validatedParsedTags, sameNode) {
        const tag1Address = tagPair.tag1.nodeAddress;
        const tag2Address = tagPair.tag2.nodeAddress;
        let i=-1; //start from -1 because that is the lowest possible address postion

        while(i<lastSameAddressIndex) {
            if(sameNode && i === lastSameAddressIndex-1 && [BLOCKS.PARAGRAPH, BLOCKS.HEADING_1, BLOCKS.HEADING_2, BLOCKS.HEADING_3, BLOCKS.HEADING_4, BLOCKS.HEADING_5, BLOCKS.HEADING_6, 'list-item'].includes(newRichTextAST[tag1Address[i+1]].nodeType)) break; 
            newRichTextAST = newRichTextAST[tag1Address[i+1]].content;
            i++;
        }

        //Add argumnets as data on node
        let data = {};
        for(let i=0; i<validTags.length; i++) {
            if(tagPair.name === validTags[i].name
                && tagPair.tag1.tagArgs.length > 0
                && validTags[i].args && validTags[i].args.length > 0
                && tagPair.tag1.tagArgs.length <= validTags[i].args.length) { //Only include if tag has a set of valid args and has args itself. Only include if the number of args is not more than the number of valid args
                const tagArgs = tagPair.tag1.tagArgs;
                const validArgs = validTags[i].args;
                for(let j=0; j<tagArgs.length; j++) {
                    if(validArgs[j].type === "number") { //Deal with number types
                        if(!isNaN(tagArgs[j])) {
                            data[validArgs[j].name] = tagArgs[j];
                            continue;
                        }
                    }
                    if(typeof tagArgs[j] === validArgs[j].type) { //Check if arg is of the right type for all other cases
                        data[validArgs[j].name] = tagArgs[j];
                    }
                }
            }
        }

        let newNode = {
            data,
            content: [],
            nodeType: tagPair.name
        }

        /*
            If the tag at the location of the first tag search location is null or not a previously inserted one, do not include it
            So
            first tag = null then do not include
            first tag node type = a previously inserted tag then include
            first tag node type = a contentful created tag then do not include
         */

        if(!sameNode) {
            const startPos = !newRichTextAST[tag1Address[i+1]] || validatedParsedTags.find(tag => tag.name === newRichTextAST[tag1Address[i+1]].nodeType) || newRichTextAST[tag1Address[i+1]].nodeType === "paragraph" ? tag1Address[i+1] : tag1Address[i+1]+1;
            for(let j=startPos; j<tag2Address[i+1]; j++) {
                newNode.content.push(newRichTextAST[j]);
            };

            newRichTextAST[tag1Address[i+1]] = newNode;

            for(let j=tag1Address[lastSameAddressIndex+1]+1; j<tag2Address[lastSameAddressIndex+1]; j++) {
                newRichTextAST[j] = null;
            }
        } else {
            newNode.content.push(newRichTextAST[tag1Address[lastSameAddressIndex]]);
            newRichTextAST[tag1Address[lastSameAddressIndex]] = newNode;
        }
    }

    removeNullNodesFromRichTextAST(content) {
        const newRichTextASTNoNull = [];
        for(let i=0; i<content.length; i++) {
            if(content[i]) {
                if(content[i].content && content[i].content.length > 0) content[i].content = this.removeNullNodesFromRichTextAST(content[i].content);
                newRichTextASTNoNull.push(content[i]);
            }
        }
        return newRichTextASTNoNull;
    }
}

const articlesRichTextParser = new ArticlesRichTextParser();

const ArticlesRichText = ({ classes, richText }) => {
    return (
        <>
            {articlesRichTextParser.convertRichTextToReact(richText, classes)}
        </>
    )
}

export default withStyles(styles)(ArticlesRichText);