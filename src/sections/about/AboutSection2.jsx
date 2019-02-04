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

class AboutSection2 extends React.Component {
    render() {
        const { classes } = this.props;
        return (
            <StaticQuery
                query={graphql`
                    query {
                        image: file(relativePath: { eq: "bg2.jpg" }) {
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
                                        The final products sold are either complex seed mixes bagged and sold to customers (mainly mines) or seed sold by species name to our trade allies who will then construct and sell mixtures to the same market and to road projects and others. A complex seed mix varies widely in diversity and species composition. However, where coal mining is concerned it may consist on average about five to six Eucalypt/Corymbia species, five or six Acacia or N-fixer shrubs, five to eight native grass species and a smaller number of dry-rainforest taxa. In some cases, exotic pasture grasses are used because they are already naturalised in an area, and local grazing interests are taken into consideration by miners.
                                    </h5>
                                    <br />
                                    <h5 className={classes.text}>
                                        Queensland Native Seeds works closely with local engineers, fabricators and materials suppliers, so they become familiar with our goals, thereby anticipating how we might innovate and solve problems. In recent years projects have been the development of specialised grass seed harvesters, transport equipment, seed cleaning machinery, IT, the construction of shedding and now native pasture research and development as we progress toward managed sources of grass seed.
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

export default withStyles(generalStyle)(AboutSection2);
