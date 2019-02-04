import React from "react";
import classNames from "classnames";
// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";
import Img from 'gatsby-image';
import { StaticQuery, graphql, Link } from 'gatsby'
// @material-ui/icons

// core components
import GridContainer from "components/Grid/GridContainer.jsx";
import GridItem from "components/Grid/GridItem.jsx";
import Button from "components/CustomButtons/Button.jsx";
import generalStyle from "assets/views/generalStyle.jsx";

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
                                <GridItem xs={12} sm={12} md={12} className={classes.centerText}>
                                    <Link to="/contact-us">
                                        <Button color="primary" size="lg" round style={{marginTop: "40px"}}>Contact Us</Button>
                                    </Link>
                                </GridItem>
                            </GridContainer>
                        </div>
                    </>
                )}
            />
        );
    }
}

export default withStyles(generalStyle)(AboutSection3);
