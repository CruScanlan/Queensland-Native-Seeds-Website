/* eslint-disable jsx-a11y/anchor-is-valid */

import React from 'react';
// nodejs library that concatenates classes
import classNames from "classnames";
import PropTypes from 'prop-types';
import {withStyles} from '@material-ui/core/styles';
import { graphql, Link } from "gatsby";
import Img from 'gatsby-image';
import Lightbox from 'react-images';
import { documentToHtmlString } from '@contentful/rich-text-html-renderer';

// core components
import Layout from 'components/Layout.jsx';
import SEO from 'components/SEO/SEO.jsx';
import ParallaxHeader from "components/Parallax/ParallaxHeader.jsx";
import GridContainer from "components/Grid/GridContainer.jsx";
import GridItem from "components/Grid/GridItem.jsx";
import Badge from "components/Badge/Badge.jsx";
import Card from "components/Card/Card.jsx";
import CardBody from "components/Card/CardBody.jsx";
import { cardTitle } from "assets/material-kit-react.jsx";
import CollabsibleLinkList from "components/CollabsibleArea/CollabsibleLinkList.jsx";
import Button from "components/CustomButtons/Button.jsx";
// sections for this page
import landingPageStyle from "assets/views/landingPage.jsx";
import plantProfileStyle from "assets/views/plantProfileStyle.jsx";
import lightboxStyle from "assets/components/lightboxStyle.jsx"
import withRoot from 'withRoot';

const styles = {
    cardTitle,
    ...landingPageStyle,
    ...plantProfileStyle
}

class PlantProfile extends React.Component {
    constructor(props) {
        super(props);
        
        const { data } = this.props;
        const lightboxPhotos = data.plantProfile.pictures ? data.plantProfile.pictures.map(photo => Object.assign({ src: photo.largeFluid.src, srcSet: photo.largeFluid.srcSet, thumbnail: photo.file.url+"?w=120&q=40", caption: this.photoCreateCaption(photo)})) : [];

        this.state = {
            lightboxOpen: false,
            currentPhotoIndex: 0,
            lightboxPhotos
        }
    }

    photoCreateCaption(photo) {
        return `${this.props.data.plantProfile.scientificName}${photo.description ? ' | ' + photo.description : ''} | Queensland Native Seeds`;
    }

    openLightbox(photoIndex) {
        this.setState({
            lightboxOpen: true,
            currentPhotoIndex: photoIndex
        });
    }

    closeLightbox() {
        this.setState({
            lightboxOpen: false
        })
    }

    gotoNextLightboxImage() {
        const { currentPhotoIndex } = this.state;
        this.setState({
            currentPhotoIndex: currentPhotoIndex+1
        });
    }

    gotoPrevLightboxImage() {
        const { currentPhotoIndex } = this.state;
        this.setState({
            currentPhotoIndex: currentPhotoIndex-1
        });
    }

    gotoImage(index) {
        this.setState({
            currentPhotoIndex: index
        })
    }

    createBadges(list, color) {
        if(!list) return <div></div>
        list = this.sortAlphabetical(list, 'name');
        return list.map(item => (
            <Badge color={color} key={item.name}>
                {item.name}
            </Badge>
        ))
    }

    createImages(images, classes) {
        if(!images) return <div />;
        return images.map((image, index) => (
            <GridItem xs={12} sm={6} md={4} key={image.id}>
                <div className={classes.inLineImageContainer} style={{marginTop: "30px", cursor: "pointer"}} onClick={() => this.openLightbox(index)} onContextMenu={(e)=>  {e.preventDefault(); return false;}}>
                    <Img fluid={image.smallFluid} className={classes.inLineImage} alt={this.photoCreateCaption(image)} title={this.photoCreateCaption(image)}/>
                    <Img fluid={image.smallFluid} className={classes.inLineImageShadow}/>
                </div>
            </GridItem>
        ))
    }

    sortAlphabetical(array, objectProperty) {
        return array.sort((a, b) => {
            const textA = objectProperty ? a[objectProperty].toLowerCase() : a.toLowerCase();
            const textB = objectProperty ? b[objectProperty].toLowerCase() : b.toLowerCase();
            return (textA < textB) ? -1 : (textA > textB) ? 1 : 0;
        })
    }

    renderImageArea(data, classes) {
        if(!data.plantProfile.pictures) return <div />;
        return (
            <div>
                <hr />
                <GridContainer style={{marginBottom: "30px"}}>
                    {this.createImages(data.plantProfile.pictures, classes)}
                    <Lightbox
                        backdropClosesModal
                        enableKeyboardInput
                        showImageCount
                        showThumbnails
                        theme={lightboxStyle}
                        imageCountSeparator={'/'}
                        images={this.state.lightboxPhotos}
                        preloadNextImage
                        currentImage={this.state.currentPhotoIndex}
                        isOpen={this.state.lightboxOpen}
                        onClickThumbnail={(index) => this.gotoImage(index)}
                        onClickPrev={() => this.gotoPrevLightboxImage()}
                        onClickNext={() => this.gotoNextLightboxImage()}
                        onClose={() => this.closeLightbox()}
                    />
                </GridContainer>
                <hr/>
            </div>
        )
    }

    renderDistMap(data, classes) {
        if(data.plantProfile.doNotIncludeStaticMap || !data.map) return <div className={classes.inLineImageContainer} style={{width: "100%"}}></div>
        const name = `Distribution Map | ${data.plantProfile.scientificName} | Queensland Native Seeds`;
        return (
            <div className={classes.inLineImageContainer} style={{width: "100%"}}>
                <Img fluid={data.map.childImageSharp.fluid} className={classes.inLineImage} alt={name} title={name}/>
                <Img fluid={data.map.childImageSharp.fluid} className={classes.inLineImageShadow}/>
            </div>
        );
    }

    removeDuplicateGenuses(array) {
        const namesArray = array.map(item => item.name);
        return array.filter((item, index) => {
            return namesArray.indexOf(item.name) >= index
        })
    }

    render() {
        const {classes, data, pageContext} = this.props;

        const allPlantCategoryLinks = pageContext.allPlantCategories.edges.map(category => {
            return {
                name: category.node.name,
                url: `/plant-profiles?search=&categories=${category.node.name}&searchByCommonName=false&sortingColumn=scientificName&sortingAZ=true`
            }
        });

        const allPlantGenusLinks = this.sortAlphabetical(
            this.removeDuplicateGenuses(pageContext.allPlantProfileSciNames.edges.map(plantProfile => {
                let name = plantProfile.node.scientificName;
                let genusName = name.indexOf(' ') !== -1 ? name.substring(0, name.indexOf(' ')) : name;
                return {
                    name: genusName, //Stop at first space
                    url: `/plant-profiles?search=${genusName}&categories=&searchByCommonName=false&sortingColumn=scientificName&sortingAZ=true`
                }
            })
        ), 'name')
        const descriptionData = data.plantProfile.description ? documentToHtmlString(JSON.parse(data.plantProfile.description.raw)) : '';
        const notesData = data.plantProfile.notes ? documentToHtmlString(JSON.parse(data.plantProfile.notes.raw)) : '';
        const historicalNotesData = data.plantProfile.historicalNotes ? documentToHtmlString(JSON.parse(data.plantProfile.historicalNotes.raw)) : '';
        const distributionNotesData = data.plantProfile.distributionNotes ? documentToHtmlString(JSON.parse(data.plantProfile.distributionNotes.raw)) : '';
        const referancesRelatedLinksData = data.plantProfile.referancesRelatedLinks ? documentToHtmlString(JSON.parse(data.plantProfile.referancesRelatedLinks.raw)) : '';

        const seoPicture = data.plantProfile.pictures ? data.plantProfile.pictures[0].smallFluid.src : data.backgroundImage.childImageSharp.fluid.src;

        let schema = []

        if(data.plantProfile.pictures) {
            schema.push(...data.plantProfile.pictures.map(picture => {
                return {
                    "@context": "http://schema.org",
                    "@type": "ImageObject",
                    "contentUrl": picture.file.url,
                    "name": this.photoCreateCaption(picture)
                }
            }))
        }

        if(!data.plantProfile.doNotIncludeStaticMap && data.map) {
            schema.push({
                "@context": "http://schema.org",
                "@type": "ImageObject",
                "contentUrl": "https://qldnativeseeds.com.au"+data.map.childImageSharp.fluid.src,
                "name": `Distribution Map | ${data.plantProfile.scientificName} | Queensland Native Seeds`
            })
        }

        const title = data.plantProfile.commonName ? `${data.plantProfile.scientificName} "${data.plantProfile.commonName[0]}" - Plant Profiles` : `${data.plantProfile.scientificName} - Plant Profiles`;

        return (
            <>
                <SEO 
                    pathname={`/plant-profiles/${data.plantProfile.slug}`}
                    title={title}
                    breadCrumbs={[{name: 'Plant Profiles', url: '/plant-profiles'}, {name: data.plantProfile.scientificName, url: `/plant-profiles/${data.plantProfile.slug}`}]}
                    extraSchema={schema}
                    image={seoPicture}/>
                <Layout>
                    <ParallaxHeader filter medium image={data.backgroundImage.childImageSharp.fluid}/>
                    <div className={classNames(classes.main, classes.mainRaised)}>
                        <div className={classes.pageContainer}>
                            <div className={classes.section}>
                                <div className={classes.leftSection}>
                                    <Card className={classes.sideBar}>
                                        <CardBody>
                                            <h4 className={classes.cardTitle}>
                                                Plant Profiles
                                            </h4>
                                            <hr />
                                            <CollabsibleLinkList headerText="Plant Categories" minShown={10} links={allPlantCategoryLinks}/>
                                            <hr />
                                            <CollabsibleLinkList headerText="Genuses" minShown={10} links={allPlantGenusLinks}/>
                                            <hr />
                                            <div className={classes.alignCenter}>
                                                <Link  to="/plant-profiles?search=&categories=&searchByCommonName=false&sortingColumn=scientificName&sortingAZ=true">
                                                    <Button color="info">View All</Button>
                                                </ Link>
                                            </div>
                                        </CardBody>
                                    </Card>
                                </div>
                                <div className={classes.rightSection}>
                                    <h2 className={classes.pageTitle}>{data.plantProfile.scientificName}</h2>
                                    
                                    <GridContainer justify="center">
                                        <GridItem xs={12} sm={12} md={12} style={{paddingLeft: '13px'}} itemScope itemType="http://schema.org/Table">
                                            <table>
                                                <tr style={{display: 'none'}}>
                                                    <td>
                                                        Scientific Name
                                                    </td>
                                                    <td>
                                                        {data.plantProfile.scientificName}
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td className={classNames(classes.infoTableElement, classes.infoTableElementHeading)}>
                                                        Categories
                                                    </td>
                                                    <td className={classes.infoTableElement} style={{margin: 0}}>
                                                        {this.createBadges(data.plantProfile.categories, 'green')}
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td className={classNames(classes.infoTableElement, classes.infoTableElementHeading)}>
                                                        Common Name(s)
                                                    </td>
                                                    <td className={classNames(classes.infoTableElement, classes.infoTableElementTextContent)}>
                                                        {data.plantProfile.commonName ? data.plantProfile.commonName.join(', ') : ''}
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td className={classNames(classes.infoTableElement, classes.infoTableElementHeading)}>
                                                        Family
                                                    </td>
                                                    <td className={classNames(classes.infoTableElement, classes.infoTableElementTextContent)}>
                                                        {data.plantProfile.family}
                                                    </td>
                                                </tr>
                                            </table>
                                        </GridItem>
                                        <GridItem xs={12} sm={12} md={12}>
                                          <h4 className={classes.textBold}>Description</h4>
                                          <div className={classes.richTextContent} dangerouslySetInnerHTML={{ __html: descriptionData }} />
                                        </GridItem>
                                        <GridItem xs={12} sm={12} md={12}>
                                          <h4 className={classes.textBold}>Notes</h4>
                                          <div className={classes.richTextContent} dangerouslySetInnerHTML={{ __html: notesData }} />
                                        </GridItem>
                                        <GridItem xs={12} sm={12} md={12}>
                                          <h4 className={classes.textBold}>Historical Notes</h4>
                                          <div className={classes.richTextContent} dangerouslySetInnerHTML={{ __html: historicalNotesData }} />
                                        </GridItem>
                                        <GridItem xs={12} sm={12} md={12}>
                                            <h4 className={classes.textBold}>Distribution</h4>
                                            <GridContainer justify="center">
                                                <GridItem xs={12} sm={12} md={7} lg={8} xl={9}>
                                                    {this.createBadges(data.plantProfile.regions, 'green')}
                                                    <div className={classes.richTextContent} dangerouslySetInnerHTML={{ __html: distributionNotesData }} />
                                                </GridItem>
                                                <GridItem xs={12} sm={12} md={5} lg={4} xl={3}>
                                                    <div style={{display: "flex", alignItems: "center", justifyContent: "flex-end", width: "100%"}} >
                                                        {this.renderDistMap(data, classes)}
                                                    </div>
                                                </GridItem>
                                            </GridContainer>
                                        </GridItem>
                                        <GridItem xs={12} sm={12} md={12} style={{marginTop: "40px"}}>
                                            {this.renderImageArea(data, classes)}
                                        </GridItem>
                                        <GridItem xs={12} sm={12} md={12}>
                                            <h4 className={classes.textBold}>References and Related Links</h4>
                                            <div className={classes.richTextContent} dangerouslySetInnerHTML={{ __html: referancesRelatedLinksData }} />
                                        </GridItem>
                                    </GridContainer>
                                </div>
                            </div>
                        </div>
                    </div>
                </Layout>
            </>
        );
    }
}

export const query = graphql`
    query PlantProfileQuery($slug: String!) {
        backgroundImage: file(relativePath: { eq: "bg25.jpg" }) {
            childImageSharp {
                fluid(maxWidth: 2000, quality: 95) {
                    ...GatsbyImageSharpFluid_withWebp
                }
            }
        },
        plantProfile: contentfulPlantProfile(slug: { eq: $slug } ) {
            scientificName,
            slug,
            commonName,
            family,
            categories {
                name
            },
            regions {
                name    
            },
            description {
                raw
            },
            notes {
                raw
            },
            historicalNotes {
                raw
            },
            distributionNotes {
                raw
            },
            referancesRelatedLinks {
                raw
            },
            distMap {
                childImageSharp {
                    fluid(maxWidth: 800) {
                        ...GatsbyImageSharpFluid_withWebp
                    }
                }
            },
            pictures {
                id,
                description,
                smallFluid: fluid(quality: 50, maxWidth: 1000) {
                    ...GatsbyContentfulFluid_withWebp
                },
                largeFluid: fluid(quality: 70, maxWidth: 2200) {
                    ...GatsbyContentfulFluid_withWebp
                },
                file {
                    url
                }
            },
            doNotIncludeAvhMap,
            doNotIncludeStaticMap
        }
    }
`

PlantProfile.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withRoot(withStyles(styles)(PlantProfile));