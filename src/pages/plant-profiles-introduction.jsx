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
import Button from "components/CustomButtons/Button.jsx";
// sections for this page
import generalStyle from "assets/views/generalStyle.jsx";
import landingPageStyle from "assets/views/landingPage.jsx";
import plantProfileIntroStyle from "assets/views/plantProfileIntroStyle.jsx";
import withRoot from "withRoot";
import { graphql, Link } from 'gatsby';


const styles = {
    ...landingPageStyle,
    ...generalStyle,
    ...plantProfileIntroStyle
}

class PlantProfileIntro extends React.Component {
    render() {
        const { classes, data } = this.props;
        return (
            <>
                <SEO 
                    pathname="/plant-profiles-introduction"
                    title="Plant Profiles Introduction"
                    breadCrumbs={[{name: 'Plant Profiles Introduction', url: '/plant-profiles-introduction'}]}
                    image={data.backgroundImage.childImageSharp.fluid.src}/>
                <Layout>
                    <Parallax filter image={data.backgroundImage.childImageSharp.fluid} medium />
                    <div className={classNames(classes.main, classes.mainRaised)}>
                        <div className={classes.container}>
                            <div className={classes.section}>
                                <GridContainer justify="center">
                                    <GridItem xs={12} sm={12} md={12}>
                                        <h2 className={classes.title}>Plant Profiles Introduction</h2>
                                    </GridItem>
                                    <GridItem xs={12} sm={12} md={12} className={classes.content} dangerouslySetInnerHTML={{ __html: data.content.childContentfulRichText.html }}>
                                    </GridItem>
                                    <GridItem xs={12} sm={12} md={12} className={classes.centerText}>
                                        <Link to="/plant-profiles">
                                            <Button color="primary" size="lg" round style={{marginTop: "40px"}}>Plant Profiles</Button>
                                        </Link>
                                    </GridItem>
                                </GridContainer>
                            </div>
                        </div>
                    </div>
                </Layout>
            </>
        );
    }
}

PlantProfileIntro.propTypes = {
    classes: PropTypes.object.isRequired,
};

export const query = graphql`
    query {
        backgroundImage: file(relativePath: { eq: "bg25.jpg" }) {
            childImageSharp {
                fluid(maxWidth: 2000, quality: 95) {
                    ...GatsbyImageSharpFluid_withWebp
                }
            }
        },
        content: contentfulPlantProfileIntroductionContentRichTextNode {
            childContentfulRichText {
              html
            }
        }
    }
`

export default withRoot(withStyles(styles)(PlantProfileIntro));