/* eslint-disable jsx-a11y/anchor-is-valid */

import React from 'react';
// nodejs library that concatenates classes
import classNames from "classnames";
import PropTypes from 'prop-types';
import {withStyles} from '@material-ui/core/styles';
import { graphql } from "gatsby";
import Img from 'gatsby-image'
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
import withRoot from 'withRoot';

const styles = {
    cardTitle,
    ...landingPageStyle,
    ...plantProfileStyle
}

class PlantProfile extends React.Component {

    createBadges(list, color) {
        return list.map(item => (
            <Badge color={color} key={item.name}>
                {item.name}
            </Badge>
        ))
    }

    render() {
        const {classes, data} = this.props;

        const allPlantCategoryLinks = data.allPlantCategories.edges.map(category => {
            return {
                name: category.node.name,
                url: "/"
            }
        });

        const allPlantGenusLinks = data.allPlantProfileSciNames.edges.map(plantProfile => {
            let name = plantProfile.node.scientificName;
            return {
                name: name.substring(0, name.indexOf(' ')), //Stop at first space
                url: "/"
            }
        })

        console.log(data.map)

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
                                        <h4 className={classes.textBold}>Common Name</h4>
                                        <h5>{data.plantProfile.commonName}</h5>
                                    </GridItem>
                                    <GridItem xs={12} sm={12} md={12}>
                                        <h4 className={classes.textBold}>Family</h4>
                                        <h5>{data.plantProfile.family}</h5>
                                    </GridItem>
                                    <GridItem xs={12} sm={12} md={12}>
                                        <h4 className={classes.textBold}>Regions</h4>
                                        {this.createBadges(data.plantProfile.regions, 'green')}
                                    </GridItem>
                                    <GridItem xs={12} sm={12} md={12}>
                                        <h4 className={classes.textBold}>Description</h4>
                                        <div className={classes.richTextContent} dangerouslySetInnerHTML={{ __html: data.plantProfile.description.childContentfulRichText.html }} />
                                    </GridItem>
                                    <GridItem xs={12} sm={12} md={12}>
                                        <h4 className={classes.textBold}>Notes</h4>
                                        <div className={classes.richTextContent} dangerouslySetInnerHTML={{ __html: data.plantProfile.notes.childContentfulRichText.html }} />
                                    </GridItem>
                                    <GridItem xs={12} sm={12} md={12}>
                                        <h4 className={classes.textBold}>Historical Notes</h4>
                                        <div className={classes.richTextContent} dangerouslySetInnerHTML={{ __html: data.plantProfile.historicalNotes.childContentfulRichText.html }} />
                                    </GridItem>
                                    <GridItem xs={12} sm={12} md={12}>
                                        <h4 className={classes.textBold}>Related Links</h4>
                                        <div className={classes.richTextContent} dangerouslySetInnerHTML={{ __html: data.plantProfile.relatedLinks.childContentfulRichText.html }} />
                                    </GridItem>
                                    <GridItem xs={12} sm={12} md={12} style={{marginTop: "40px"}}>
                                        <div style={{display: "flex", alignItems: "center", justifyContent: "flex-start", width: "100%"}} >
                                            <div className={classes.inLineImageContainer} style={{width: "30%"}}>
                                                <Img fluid={data.map.childImageSharp.fluid} className={classes.inLineImage}/>
                                                <Img fluid={data.map.childImageSharp.fluid} className={classes.inLineImageShadow}/>
                                            </div>
                                        </div>
                                    </GridItem>
                                    <GridItem xs={12} sm={12} md={12} style={{marginTop: "40px"}}>
                                        <GridContainer>
                                            <GridItem xs={12} sm={6} md={4}>
                                                <div className={classes.inLineImageContainer}>
                                                    <Img fluid={data.plant1.childImageSharp.fluid} className={classes.inLineImage}/>
                                                    <Img fluid={data.plant1.childImageSharp.fluid} className={classes.inLineImageShadow}/>
                                                </div>
                                            </GridItem>
                                            <GridItem xs={12} sm={6} md={4}>
                                                <div className={classes.inLineImageContainer}>
                                                    <Img fluid={data.plant2.childImageSharp.fluid} className={classes.inLineImage}/>
                                                    <Img fluid={data.plant2.childImageSharp.fluid} className={classes.inLineImageShadow}/>
                                                </div>
                                            </GridItem>
                                            <GridItem xs={12} sm={6} md={4}>
                                                <div className={classes.inLineImageContainer}>
                                                    <Img fluid={data.plant3.childImageSharp.fluid} className={classes.inLineImage}/>
                                                    <Img fluid={data.plant3.childImageSharp.fluid} className={classes.inLineImageShadow}/>
                                                </div>
                                            </GridItem>
                                            <GridItem xs={12} sm={6} md={4}>
                                                <div className={classes.inLineImageContainer} style={{marginTop: "40px"}}>
                                                    <Img fluid={data.plant4.childImageSharp.fluid} className={classes.inLineImage}/>
                                                    <Img fluid={data.plant4.childImageSharp.fluid} className={classes.inLineImageShadow}/>
                                                </div>
                                            </GridItem>
                                            <GridItem xs={12} sm={6} md={4}>
                                                <div className={classes.inLineImageContainer} style={{marginTop: "40px"}}>
                                                    <Img fluid={data.plant5.childImageSharp.fluid} className={classes.inLineImage}/>
                                                    <Img fluid={data.plant5.childImageSharp.fluid} className={classes.inLineImageShadow}/>
                                                </div>
                                            </GridItem>
                                            <GridItem xs={12} sm={6} md={4}>
                                                <div className={classes.inLineImageContainer} style={{marginTop: "40px"}}>
                                                    <Img fluid={data.plant6.childImageSharp.fluid} className={classes.inLineImage}/>
                                                    <Img fluid={data.plant6.childImageSharp.fluid} className={classes.inLineImageShadow}/>
                                                </div>
                                            </GridItem>
                                        </GridContainer>
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

/*
<div style={{display: "flex", alignItems: "center", height: "100%", width: "100%", position: "relative", justifyContent: "left"}}>
                                            <div className={classes.inLineImageContainer} style={{width: "70%"}}>
                                                <Img fluid={data.map.childImageSharp.fluid} className={classes.inLineImage}/>
                                                <Img fluid={data.map.childImageSharp.fluid} className={classes.inLineImageShadow}/>
                                            </div>
                                        </div>*/

export const query = graphql`
    query {
        backgroundImage: file(relativePath: { eq: "bg1.jpg" }) {
            childImageSharp {
                fluid(maxWidth: 1920, quality: 45) {
                    ...GatsbyImageSharpFluid
                }
            }
        },
        map: file(relativePath: { eq: "map2.png" }) {
            childImageSharp {
                fluid(maxWidth: 1920) {
                    ...GatsbyImageSharpFluid
                }
            }
        },
        plant1: file(relativePath: { eq: "plant.jpg" }) {
            childImageSharp {
                fluid(maxWidth: 1920) {
                    ...GatsbyImageSharpFluid
                }
            }
        },
        plant2: file(relativePath: { eq: "plant2.jpg" }) {
            childImageSharp {
                fluid(maxWidth: 1920) {
                    ...GatsbyImageSharpFluid
                }
            }
        },
        plant3: file(relativePath: { eq: "plant3.jpg" }) {
            childImageSharp {
                fluid(maxWidth: 1920) {
                    ...GatsbyImageSharpFluid
                }
            }
        },
        plant4: file(relativePath: { eq: "plant4.jpg" }) {
            childImageSharp {
                fluid(maxWidth: 1920) {
                    ...GatsbyImageSharpFluid
                }
            }
        },
        plant5: file(relativePath: { eq: "plant5.jpg" }) {
            childImageSharp {
                fluid(maxWidth: 1920) {
                    ...GatsbyImageSharpFluid
                }
            }
        },
        plant6: file(relativePath: { eq: "plant6.jpg" }) {
            childImageSharp {
                fluid(maxWidth: 1920) {
                    ...GatsbyImageSharpFluid
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
        plantProfile: contentfulPlantProfile(scientificName: { eq: "Acacia amblygona"} ) {
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
            relatedLinks {
                childContentfulRichText {
                    html
                }
            },
            pictures {
                title,
                fluid {
                    ...GatsbyContentfulFluid
                }
            }
        }
    }
`

PlantProfile.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withRoot(withStyles(styles)(PlantProfile));