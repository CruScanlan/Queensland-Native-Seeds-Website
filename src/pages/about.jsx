/* eslint-disable jsx-a11y/anchor-is-valid */

import React from 'react';
// nodejs library that concatenates classes
import classNames from "classnames";
import PropTypes from 'prop-types';
import {withStyles} from '@material-ui/core/styles';
import Layout from 'components/Layout.jsx';

// core components
import ParallaxHeader from "components/Parallax/ParallaxHeader.jsx";
import ParallaxDivider from "components/Parallax/ParallaxDivider.jsx";
import {ParallaxProvider} from 'react-scroll-parallax';
// sections for this page
import AboutSection1 from 'sections/about/AboutSection1';
import AboutSection2 from 'sections/about/AboutSection2';
import AboutSection3 from 'sections/about/AboutSection3';
import landingPageStyle from "assets/views/landingPage.jsx";
import withRoot from 'withRoot'
import {StaticQuery, graphql} from 'gatsby'


class AboutPage extends React.Component {
    render() {
        const {classes} = this.props;
        return (
            <StaticQuery
                query={graphql`
                    query {
                        backgroundImage: file(relativePath: { eq: "bg1.jpg" }) {
                            childImageSharp {
                                fluid(maxWidth: 1920, quality: 45) {
                                    ...GatsbyImageSharpFluid
                                }
                            }
                        },
                        parallaxImage: file(relativePath: { eq: "paddock.jpg" }) {
                            childImageSharp {
                                fluid(maxWidth: 1920, quality: 70) {
                                    ...GatsbyImageSharpFluid
                                }
                            }
                        }
                    }
                `}
                render={data => (
                    <>
                        <Layout>
                            <ParallaxHeader filter medium image={data.backgroundImage.childImageSharp.fluid}/>
                            <ParallaxProvider>
                                <div className={classNames(classes.main, classes.mainRaised)}>
                                    <div className={classes.container}>
                                        <AboutSection1/>
                                    </div>
                                    <ParallaxDivider height={350} image={data.parallaxImage.childImageSharp.fluid}/>
                                    <div id="test" className={classes.container}>
                                        <AboutSection2/>
                                    </div>
                                    <ParallaxDivider height={350} image={data.parallaxImage.childImageSharp.fluid}/>
                                    <div className={classes.container}>
                                        <AboutSection3/>
                                    </div>
                                </div>
                            </ParallaxProvider>
                        </Layout>
                    </>
                )}
            />
        );
    }
}

AboutPage.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withRoot(withStyles(landingPageStyle)(AboutPage));