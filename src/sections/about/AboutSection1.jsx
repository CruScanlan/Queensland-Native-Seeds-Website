import React from "react";
// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";

import Img from 'gatsby-image';
import { StaticQuery, graphql } from 'gatsby'
// @material-ui/icons

// core components
import GridContainer from "components/Grid/GridContainer.jsx";
import GridItem from "components/Grid/GridItem.jsx";
import generalStyle from "assets/views/generalStyle.jsx";

class AboutSection1 extends React.Component {
    render() {
        const { classes } = this.props;
        return (
            <StaticQuery
                query={graphql`
                    query {
                        image: file(relativePath: { eq: "bg7.jpg" }) {
                            childImageSharp {
                                fluid(maxWidth: 500) {
                                    ...GatsbyImageSharpFluid
                                }
                            }
                        }
                    }
                `}
                render={data => (
                    <>
                        <div className={classes.section}>
                            <GridContainer justify="center">
                                <GridItem xs={12} sm={12} md={8}>
                                    <h2 className={classes.title}>About Us</h2>
                                </GridItem>
                                <GridItem xs={12} sm={12} md={8}>
                                    <h5 className={classes.text}>
                                        Queensland Native Seeds is owned and managed by Lachlan Scanlan and his son Cru Scanlan. We produce native grass, tree and shrub seed for rehabilitation in mines across Queensland and NSW.
                                    </h5>
                                    <br />
                                    <h5 className={classes.text}>
                                        The supply of native plant seed has been tightly limited in the decades since native plant rehabilitation began. This is for several reasons. Native plants rely on very particular weather sequences besides their own trait tendencies to set seed in a commercially viable way and it is common for viable crops of trees and shrubs to only appear every five to ten years. There are large knowledge barriers to entry. There’s considerable risk in holding relatively high cost products reliant on a relatively small market.
                                    </h5>
                                </GridItem>
                                <GridItem xs={12} sm={12} md={4}>
                                    <div className={classes.inLineImageContainer}>
                                        <Img fluid={data.image.childImageSharp.fluid} className={classes.inLineImage} />
                                        <Img fluid={data.image.childImageSharp.fluid} className={classes.inLineImageShadow} />
                                    </div>
                                </GridItem>
                            </GridContainer>
                        </div>
                    </>
                )}
            />
        );
    }
}

export default withStyles(generalStyle)(AboutSection1);
