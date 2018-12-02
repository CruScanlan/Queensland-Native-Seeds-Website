/* eslint-disable jsx-a11y/anchor-is-valid */

import React from 'react';
// nodejs library that concatenates classes
import classNames from "classnames";
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Layout from 'components/Layout.jsx';

// core components
import GridContainer from "components/Grid/GridContainer.jsx";
import GridItem from "components/Grid/GridItem.jsx";
import Button from "components/CustomButtons/Button.jsx";
import Parallax from "components/Parallax/Parallax.jsx";
// sections for this page
import landingPageStyle from "assets/views/landingPage.jsx";
import ProductSection from "../sections/ProductSection.jsx";
import withRoot from "withRoot";

class LandingPage extends React.Component {
    render() {
        const { classes, ...rest } = this.props;
        return (
            <Layout>
                <Parallax filter image={require("assets/img/landing-bg.jpg")}>
                    <div className={classes.container}>
                        <GridContainer>
                            <GridItem xs={12} sm={12} md={6}>
                                <h1 className={classes.title}>Your Story Starts With Us.</h1>
                                <h4>
                                    Every landing page needs a small description after the big
                                    bold title, that's why we added this text here. Add here all
                                    the information that can make you or your product create the
                                    first impression.
                                </h4>
                                <br />
                                <Button
                                    color="danger"
                                    size="lg"
                                    href="https://www.youtube.com/watch?v=dQw4w9WgXcQ"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    <i className="fas fa-play" />Watch video
                                </Button>
                            </GridItem>
                        </GridContainer>
                    </div>
                </Parallax>
                <div className={classNames(classes.main, classes.mainRaised)}>
                    <div className={classes.container}>
                        <ProductSection />
                    </div>
                </div>
            </Layout>
        );
    }
}

LandingPage.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withRoot(withStyles(landingPageStyle)(LandingPage));