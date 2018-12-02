/* eslint-disable jsx-a11y/anchor-is-valid */

import React from 'react';
// nodejs library that concatenates classes

import classNames from "classnames";
import PropTypes from 'prop-types';
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core/styles';
import { Link } from "gatsby"
import withRoot from 'withRoot';
import "assets/scss/material-kit-react.css?v=1.3.0";

// core components
import Header from "components/Header/Header.jsx";
import Footer from "components/Footer/Footer.jsx";
import GridContainer from "components/Grid/GridContainer.jsx";
import GridItem from "components/Grid/GridItem.jsx";
import Button from "components/CustomButtons/Button.jsx";
import Parallax from "components/Parallax/Parallax.jsx";
import Hidden from '@material-ui/core/Hidden';
// sections for this page
import HeaderLinks from "components/Header/HeaderLinks.jsx";
import landingPageStyle from "assets/jss/material-kit-react/views/landingPage.jsx";

import ProductSection from "../sections/ProductSection.jsx";
import TeamSection from "../sections/TeamSection.jsx";
import WorkSection from "../sections/WorkSection.jsx";
const dashboardRoutes = [];

class LandingPage extends React.Component {
    render() {
        const { classes, ...rest } = this.props;
        return (
            <div>
                <Header
                    color="transparent"
                    routes={dashboardRoutes}
                    brand="Material Kit React"
                    rightLinks={<HeaderLinks />}
                    fixed
                    changeColorOnScroll={{
                        height: 200,
                        color: "dark"
                    }}
                    {...rest}
                />
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
                        <TeamSection />
                        <WorkSection />
                    </div>
                </div>
                <Footer />
            </div>
        );
    }
}

LandingPage.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withRoot(withStyles(landingPageStyle)(LandingPage));