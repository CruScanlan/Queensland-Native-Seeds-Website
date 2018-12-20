import React from "react";
// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";
import Img from 'gatsby-image';
import { StaticQuery, graphql } from 'gatsby'
// @material-ui/icons

// core components
import GridContainer from "components/Grid/GridContainer.jsx";
import GridItem from "components/Grid/GridItem.jsx";
import aboutSection1Style from "assets/views/aboutSection1Style.jsx";

class AboutSection3 extends React.Component {
    render() {
        const { classes } = this.props;
        return (
            <StaticQuery
                query={graphql`
                    query {
                        image: file(relativePath: { eq: "bg3.jpg" }) {
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
                                    <h5 className={classes.text}>
                                        Queensland Native Seeds is situated on several properties in the South Burnett district although seed is harvested over much of the state. Producing a comprehensive offering of native seeds in volume is a task requiring substantial planning, organisation and travelling. Coordinating with the few other production-shop front entities and with the few reliable, independent seed collectors that have forged their position in this field is also necessary to bringing the quantities of native seed to market, our customer base requires. We also continue to help new and existing seed collectors to develop methods and locate resources. An assumption implicit in our strategy has been that the market will grow as the products improve in quality, volume and reliability. This has been verified by results in Queensland to date.
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

export default withStyles(aboutSection1Style)(AboutSection3);
