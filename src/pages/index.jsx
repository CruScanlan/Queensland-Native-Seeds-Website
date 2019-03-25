/* eslint-disable jsx-a11y/anchor-is-valid */

import React from 'react';
// nodejs library that concatenates classes
import classNames from "classnames";
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Layout from 'components/Layout.jsx';

// core components
import GridContainer from "components/Grid/GridContainer.jsx";
import GridItem from "components/Grid/GridItem.jsx";
import Parallax from "components/Parallax/ParallaxHeader.jsx";
// sections for this page
import landingPageStyle from "assets/views/landingPage.jsx";
import HomeSection from "../sections/HomeSection.jsx";
import withRoot from "withRoot";
import { StaticQuery, graphql } from 'gatsby'

class Homepage extends React.Component {
    render() {
        const { classes } = this.props;
        return (
            <StaticQuery
                query={graphql`
                    query {
                        backgroundImage: file(relativePath: { eq: "bg10.jpg" }) {
                            childImageSharp {
                                fluid(maxWidth: 1920, quality: 95) {
                                    ...GatsbyImageSharpFluid_withWebp
                                }
                            }
                        }
                    }
                `}
                render={data => (
                    <>
                        <Layout>
                            <Parallax filter image={data.backgroundImage.childImageSharp.fluid}>
                                <div className={classes.container}>
                                    <GridContainer>
                                        <GridItem xs={12} sm={12} md={6}>
                                            <h1 className={classes.title}>Leaders in Australian Native Seed</h1>
                                        </GridItem>
                                    </GridContainer>
                                </div>
                            </Parallax>
                            <div className={classNames(classes.main, classes.mainRaised)}>
                                <div className={classes.container}>
                                    <HomeSection />
                                </div>
                            </div>
                        </Layout>
                    </>
                )}
            />
        );
    }
}

Homepage.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withRoot(withStyles(landingPageStyle)(Homepage));