/* eslint-disable jsx-a11y/anchor-is-valid */

import React from 'react';
// nodejs library that concatenates classes

import classNames from "classnames";
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Layout from 'components/Layout.jsx';

// core components
import Parallax from "components/Parallax/Parallax.jsx";
// sections for this page
import landingPageStyle from "assets/views/landingPage.jsx";

import ProductSection from "../sections/ProductSection.jsx";

class AboutPage extends React.Component {
    render() {
        const { classes, ...rest } = this.props;
        return (
            <Layout>
                <Parallax small filter image={require("assets/img/landing-bg.jpg")} />
                <div className={classNames(classes.main, classes.mainRaised)}>
                    <div className={classes.container}>
                        <ProductSection />
                    </div>
                </div>
            </Layout>
        );
    }
}

AboutPage.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(landingPageStyle)(AboutPage);