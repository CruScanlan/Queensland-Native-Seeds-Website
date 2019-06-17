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
import ParallaxHeader from "components/Parallax/ParallaxHeader.jsx";
// sections for this page
import landingPageStyle from "assets/views/landingPage.jsx";
import ContactSection from "../sections/ContactSection";
import withRoot from "withRoot";
import { StaticQuery, graphql } from 'gatsby'

class Contact extends React.Component {
    render() {
        const { classes } = this.props;
        return (
            <>
                <SEO 
                    pathname="/contact-us"
                    title="Contact Us"/>
                <Layout whiteHeader>
                    <ParallaxHeader map medium />
                    <div className={classNames(classes.main, classes.mainRaised)}>
                        <div className={classes.container}>
                            <ContactSection />
                        </div>
                    </div>
                </Layout>
            </>
        );
    }
}

Contact.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withRoot(withStyles(landingPageStyle)(Contact));