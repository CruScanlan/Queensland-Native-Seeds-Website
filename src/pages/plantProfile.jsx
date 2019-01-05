/* eslint-disable jsx-a11y/anchor-is-valid */

import React from 'react';
// nodejs library that concatenates classes
import classNames from "classnames";
import PropTypes from 'prop-types';
import {withStyles} from '@material-ui/core/styles';
import { Link, graphql } from "gatsby";
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
import withRoot from 'withRoot'

const styles = {
    cardTitle,
    ...landingPageStyle,
    ...plantProfileStyle
}

/*
<Link to="/" >
    <h5 style={{color: '#047DB8', textDecoration: 'underline'}}>
        Another Acacia
    </h5>
</Link>
<Link to="/" >
    <h5 style={{color: '#047DB8', textDecoration: 'underline'}}>
        Another Acacia
    </h5>
</Link>
*/

const links = [
    {
        name: 'Acacias dasdasdasdasdasdasdasdasdasdadad',
        url: '/'
    },
    {
        name: 'Acacia',
        url: '/'
    },
    {
        name: 'Acacia',
        url: '/'
    },
    {
        name: 'Acacia',
        url: '/'
    },
    {
        name: 'Acacia',
        url: '/'
    },
    {
        name: 'Acacia',
        url: '/'
    },
    {
        name: 'Acacia',
        url: '/'
    },
    {
        name: 'Acacia',
        url: '/'
    },
    {
        name: 'Acacia',
        url: '/'
    },
    {
        name: 'Acacia',
        url: '/'
    },
    {
        name: 'Acacia',
        url: '/'
    },
    {
        name: 'Acacia',
        url: '/'
    },
    {
        name: 'Acacia',
        url: '/'
    },
    {
        name: 'Acacia',
        url: '/'
    },
    {
        name: 'Acacia',
        url: '/'
    },
    {
        name: 'Acacia',
        url: '/'
    },
    {
        name: 'Acacia',
        url: '/'
    },
    {
        name: 'Acacia',
        url: '/'
    }
]


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
                                        <CollabsibleLinkList headerText="Plant Categories" minShown={10} links={links}/>
                                        <hr />
                                        <CollabsibleLinkList headerText="Genuses" minShown={10} links={links}/>
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
                                        {this.createBadges(data.plantProfile.categories, 'gray')}
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
                                        {this.createBadges(data.plantProfile.regions, 'gray')}
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
    query {
        backgroundImage: file(relativePath: { eq: "bg1.jpg" }) {
            childImageSharp {
                fluid(maxWidth: 1920, quality: 45) {
                    ...GatsbyImageSharpFluid
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