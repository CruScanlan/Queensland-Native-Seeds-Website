/* eslint-disable jsx-a11y/anchor-is-valid */

import React from 'react';
// nodejs library that concatenates classes
import classNames from "classnames";
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Layout from 'components/Layout.jsx';
import SEO from 'components/SEO/SEO.jsx';

// core components
import GridContainer from "components/Grid/GridContainer.jsx";
import GridItem from "components/Grid/GridItem.jsx";
import Parallax from "components/Parallax/ParallaxHeader.jsx";
// sections for this page
import landingPageStyle from "assets/views/landingPage.jsx";
import HomeSection from "../sections/HomeSection.jsx";
import withRoot from "withRoot";
import { graphql } from 'gatsby'

class Homepage extends React.Component {
    render() {
        const { classes, data } = this.props;
        return (
            <>
                <SEO 
                    pathname="/"
                    title="Queensland Native Seeds - Australian Native Seed Supplier"
                    description="Queensland Native Seeds produce bulk Australian native plant seed including native grass, Eucalyptus and Acacia, dry-rainforest and understory plant seeds primarily as seed mixtures for mining rehabilitation."
                    breadCrumbs={[{name: 'Home', url: '/'}]}
                    image={data.backgroundImage.childImageSharp.fluid.src}/>
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
                            <HomeSection data={data}/>
                        </div>
                    </div>
                </Layout>
            </>
        );
    }
}

Homepage.propTypes = {
    classes: PropTypes.object.isRequired,
};

export const query = graphql`
    query {
        backgroundImage: file(relativePath: { eq: "bg30.jpg" }) {
            childImageSharp {
                fluid(maxWidth: 2000, quality: 95) {
                    ...GatsbyImageSharpFluid_withWebp
                }
            }
        },
        downerLogo: file(relativePath: { eq: "downer.png" }) {
            childImageSharp {
                fluid(maxWidth: 500) {
                    ...GatsbyImageSharpFluid
                }
            }
        },
        glencoreLogo: file(relativePath: { eq: "glencore.png" }) {
            childImageSharp {
                fluid(maxWidth: 500) {
                    ...GatsbyImageSharpFluid
                }
            }
        },
        stanwellLogo: file(relativePath: { eq: "stanwell.png" }) {
            childImageSharp {
                fluid(maxWidth: 500) {
                    ...GatsbyImageSharpFluid
                }
            }
        }
    }
`

export default withRoot(withStyles(landingPageStyle)(Homepage));