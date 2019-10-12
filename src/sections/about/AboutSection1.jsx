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
import aboutSectionStyle from "assets/views/aboutSectionStyle.jsx";

const styles = {
    ...generalStyle,
    ...aboutSectionStyle
}

class AboutSection1 extends React.Component {
    render() {
        const { classes, content } = this.props;
        return (
            <StaticQuery
                query={graphql`
                    query {
                        image: file(relativePath: { eq: "bg51.jpg" }) {
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
                                <GridItem xs={12} sm={12} md={12}>
                                    <h2 className={classes.title}>About Us</h2>
                                </GridItem>
                                <GridItem xs={12} sm={12} md={8} className={classes.content} dangerouslySetInnerHTML={{ __html: content }} />
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

export default withStyles(styles)(AboutSection1);
