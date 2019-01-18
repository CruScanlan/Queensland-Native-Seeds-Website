/* eslint-disable jsx-a11y/anchor-is-valid */

import React from 'react';
// nodejs library that concatenates classes
import classNames from "classnames";
import PropTypes from 'prop-types';
import {withStyles} from '@material-ui/core/styles';
import { graphql } from "gatsby";
import Img from 'gatsby-image';
import Lightbox from 'react-images';
import Layout from 'components/Layout.jsx';

// core components
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
        const lightboxPhotos = data.plantProfile.pictures ? data.plantProfile.pictures.map(photo => Object.assign({ src: photo.largeFluid.src, srcSet: photo.largeFluid.srcSet, thumbnail: photo.file.url+"?w=120&q=40"})) : [];

        this.state = {
            lightboxOpen: false,
            currentPhotoIndex: 0,
            lightboxPhotos
        }
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
                <div className={classes.inLineImageContainer} style={{marginTop: "30px", cursor: "pointer"}} onClick={() => this.openLightbox(index)}>
                    <Img fluid={image.smallFluid} className={classes.inLineImage}/>
                    <Img fluid={image.smallFluid} className={classes.inLineImageShadow}/>
                </div>
            </GridItem>
        ))
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

    render() {
        const {classes, data} = this.props;

        console.log(data)

        const allPlantCategoryLinks = data.allPlantCategories.edges.map(category => {
            return {
                name: category.node.name,
                url: "/"
            }
        });

        const allPlantGenusLinks = data.allPlantProfileSciNames.edges.map(plantProfile => {
            let name = plantProfile.node.scientificName;
            let genusName = name.indexOf(' ') !== -1 ? name.substring(0, name.indexOf(' ')) : name;
            return {
                name: genusName, //Stop at first space
                url: "/"
            }
        });

        const descriptionData = data.plantProfile.description ? data.plantProfile.description.childContentfulRichText.html : '';
        const notesData = data.plantProfile.notes ? data.plantProfile.notes.childContentfulRichText.html : '';
        const historicalNotesData = data.plantProfile.historicalNotes ? data.plantProfile.historicalNotes.childContentfulRichText.html : '';
        const distributionNotesData = data.plantProfile.distributionNotes ? data.plantProfile.distributionNotes.childContentfulRichText.html : '';
        const relatedLinksData = data.plantProfile.relatedLinks ? data.plantProfile.relatedLinks.childContentfulRichText.html : '';

        return (
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
                                            <Button color="info">View All</Button>
                                        </div>
                                    </CardBody>
                                </Card>
                            </div>
                            <div className={classes.rightSection}>
                                <h2 className={classes.pageTitle}>{data.plantProfile.scientificName}</h2>
                                
                                <GridContainer justify="center">
                                    <GridItem xs={12} sm={12} md={12}>
                                        <h4 className={classes.textBold}>Categories</h4>
                                        {this.createBadges(data.plantProfile.categories, 'green')}
                                    </GridItem>
                                    <GridItem xs={12} sm={12} md={12}>
                                        <h4 className={classes.textBold}>Common Names</h4>
                                        <h5>{data.plantProfile.commonName ? data.plantProfile.commonName.join(', ') : ''}</h5>
                                    </GridItem>
                                    <GridItem xs={12} sm={12} md={12}>
                                        <h4 className={classes.textBold}>Family</h4>
                                        <h5>{data.plantProfile.family}</h5>
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
                                            <GridItem xs={12} sm={12} md={9}>
                                                {this.createBadges(data.plantProfile.regions, 'green')}
                                                <div className={classes.richTextContent} dangerouslySetInnerHTML={{ __html: distributionNotesData }} />
                                            </GridItem>
                                            <GridItem xs={12} sm={12} md={3}>
                                                <div style={{display: "flex", alignItems: "center", justifyContent: "flex-end", width: "100%"}} >
                                                    <div className={classes.inLineImageContainer} style={{width: "100%"}}>
                                                        <Img fluid={data.map.childImageSharp.fluid} className={classes.inLineImage}/>
                                                        <Img fluid={data.map.childImageSharp.fluid} className={classes.inLineImageShadow}/>
                                                    </div>
                                                </div>
                                            </GridItem>
                                        </GridContainer>
                                    </GridItem>
                                    <GridItem xs={12} sm={12} md={12} style={{marginTop: "40px"}}>
                                        {this.renderImageArea(data, classes)}
                                    </GridItem>
                                    <GridItem xs={12} sm={12} md={12}>
                                        <h4 className={classes.textBold}>Related Links</h4>
                                        <div className={classes.richTextContent} dangerouslySetInnerHTML={{ __html: relatedLinksData }} />
                                    </GridItem>
                                </GridContainer>
                            </div>
                        </div>
                    </div>
                </div>
            </Layout>
        );
    }
}

export const query = graphql`
    query PlantProfileQuery($slug: String!, $scientificName: String!) {
        backgroundImage: file(relativePath: { eq: "bg1.jpg" }) {
            childImageSharp {
                fluid(maxWidth: 1920, quality: 45) {
                    ...GatsbyImageSharpFluid_withWebp
                }
            }
        },
        map: distMap(name: { eq: $scientificName }) {
            childImageSharp {
                fluid(maxWidth: 1920) {
                    ...GatsbyImageSharpFluid_withWebp
                }
            }
        },
        allPlantCategories: allContentfulPlantCategory {
            edges {
                node {
                    name
                }
            }
        },
        allPlantProfileSciNames: allContentfulPlantProfile {
            edges {
                node {
                    scientificName
                }
            }
        },
        plantProfile: contentfulPlantProfile(slug: { eq: $slug } ) {
            scientificName,
            commonName,
            family,
            categories {
                name
            },
            regions {
                name
            },
            description {
                childContentfulRichText {
                    html
                }
            },
            notes {
                childContentfulRichText {
                    html
                }
            },
            historicalNotes {
                childContentfulRichText {
                    html
                }
            },
            distributionNotes {
                childContentfulRichText {
                    html
                }
            },
            relatedLinks {
                childContentfulRichText {
                    html
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
            }
        }
    }
`

PlantProfile.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withRoot(withStyles(styles)(PlantProfile));