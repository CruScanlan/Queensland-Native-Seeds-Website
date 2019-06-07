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
import aboutSectionStyle from "assets/views/aboutSectionStyle.jsx";

const styles = {
    ...generalStyle,
    ...aboutSectionStyle
}

class AboutSection3 extends React.Component {
    render() {
        const { classes, content } = this.props;
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
                                <GridItem xs={12} sm={12} md={8} className={classes.content} dangerouslySetInnerHTML={{ __html: content }} />
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

export default withStyles(styles)(AboutSection3);
