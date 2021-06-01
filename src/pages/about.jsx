/* eslint-disable jsx-a11y/anchor-is-valid */

import React from 'react';
// nodejs library that concatenates classes
import classNames from "classnames";
import PropTypes from 'prop-types';
import {withStyles} from '@material-ui/core/styles';
import Layout from 'components/Layout.jsx';
import SEO from 'components/SEO/SEO.jsx';
import { documentToHtmlString } from '@contentful/rich-text-html-renderer';

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
import {graphql} from 'gatsby'


class AboutPage extends React.Component {
    render() {
        const {classes, data} = this.props;
        const section1Content = documentToHtmlString(JSON.parse(data.contentfulAboutUs.section1.raw)).split('<p></p>').join('<p style="height:24px"></p>');
        const section2Content = documentToHtmlString(JSON.parse(data.contentfulAboutUs.section2.raw)).split('<p></p>').join('<p style="height:24px"></p>');
        const section3Content = documentToHtmlString(JSON.parse(data.contentfulAboutUs.section3.raw)).split('<p></p>').join('<p style="height:24px"></p>');

        return (
            <>
                <SEO 
                    pathname="/about-us"
                    title="About Us"
                    breadCrumbs={[{name: 'About Us', url: '/about-us'}]}
                    image={data.backgroundImage.childImageSharp.fluid.src}/>
                <Layout>
                    <ParallaxHeader filter medium image={data.backgroundImage.childImageSharp.fluid}/>
                    <ParallaxProvider>
                        <div className={classNames(classes.main, classes.mainRaised)}>
                            <div className={classes.container}>
                                <AboutSection1 content={section1Content}/>
                            </div>
                            <ParallaxDivider height={350} image={data.parallaxImage1.childImageSharp.fluid}/>
                            <div className={classes.container}>
                                <AboutSection2 content={section2Content} />
                            </div>
                            <ParallaxDivider height={350} image={data.parallaxImage2.childImageSharp.fluid}/>
                            <div className={classes.container}>
                                <AboutSection3 content={section3Content} />
                            </div>
                        </div>
                    </ParallaxProvider>
                </Layout>
            </>
        );
    }
}

export const query = graphql`
    query {
        backgroundImage: file(relativePath: { eq: "bg25.jpg" }) {
            childImageSharp {
                fluid(maxWidth: 1920, quality: 95) {
                    ...GatsbyImageSharpFluid_withWebp
                }
            }
        },
        parallaxImage1: file(relativePath: { eq: "bg44-2.jpg" }) {
            childImageSharp {
                fluid(maxWidth: 1920, quality: 80) {
                    ...GatsbyImageSharpFluid_withWebp
                }
            }
        },
        parallaxImage2: file(relativePath: { eq: "bg41-2.jpg" }) {
            childImageSharp {
                fluid(maxWidth: 1920, quality: 80) {
                    ...GatsbyImageSharpFluid_withWebp
                }
            }
        },
        contentfulAboutUs {
            section1 {
                raw
            },
            section2 {
                raw
            },
            section3 {
                raw
            }
        }
    }
`

AboutPage.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withRoot(withStyles(landingPageStyle)(AboutPage));