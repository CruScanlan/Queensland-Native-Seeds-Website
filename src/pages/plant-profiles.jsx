import React from 'react';
// nodejs library that concatenates classes
import classNames from "classnames";
import {withStyles} from '@material-ui/core/styles';
import { graphql } from "gatsby";
import Layout from 'components/Layout.jsx';
import withRoot from '../withRoot';

import ParallaxHeader from "components/Parallax/ParallaxHeader.jsx";
import GridContainer from "components/Grid/GridContainer.jsx";
import GridItem from "components/Grid/GridItem.jsx";

import { cardTitle } from "assets/material-kit-react.jsx";
import landingPageStyle from "assets/views/landingPage.jsx";
import plantProfileIndexStyle from "assets/views/plantProfileIndexStyle.jsx";

const styles = {
    cardTitle,
    ...landingPageStyle,
    ...plantProfileIndexStyle
}

class PlantProfiles extends React.Component {
    constructor(props) {
        super(props);


    }

    render() {
        const {classes, data} = this.props;

        return (
            <Layout>
                <ParallaxHeader filter medium image={data.backgroundImage.childImageSharp.fluid}/>
                <div className={classNames(classes.main, classes.mainRaised)}>
                    <div className={classes.pageContainer}>
                        <div className={classes.section}>
                            <GridContainer justify="center">
                                <GridItem xs={12} sm={12} md={12}>
                                    <h2 className={classes.pageTitle}>Plant Profiles</h2>
                                </GridItem>
                                <GridItem xs={12} sm={12} md={12}>
                                    <table>
                                        <thead>
                                            <th>
                                                Scientific Name
                                            </th>
                                            <th>
                                                Common Name
                                            </th>
                                            <th>
                                                Categories
                                            </th>
                                            <th>
                                                Regions
                                            </th>
                                        </thead>
                                    </table>
                                </GridItem>
                            </GridContainer>
                        </div>
                    </div>
                </div>
            </Layout>
        )
    }
}

export const query = graphql`
    query PlantProfileIndexQuery {
        backgroundImage: file(relativePath: { eq: "bg1.jpg" }) {
            childImageSharp {
                fluid(maxWidth: 1920, quality: 45) {
                    ...GatsbyImageSharpFluid_withWebp
                }
            }
        }
    }
`;

export default withRoot(withStyles(styles)(PlantProfiles));