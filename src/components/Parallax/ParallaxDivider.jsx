import React from "react";
// nodejs library that concatenates classes
import classNames from "classnames";
// nodejs library to set properties for components
import PropTypes from "prop-types";
// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";

import Img from 'gatsby-image'
import { Parallax } from 'react-scroll-parallax';

// core components
import parallaxDividerStyle from "assets/components/parallaxDividerStyle.jsx";

class ParallaxDivider extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            top: 0
        };
        this.setParallax = this.setParallax.bind(this);
        this.setParallax();
    }

    componentDidMount() {
        this.setParallax();
        window.addEventListener("scroll", this.setParallax);
    }

    componentWillUnmount() {
        window.removeEventListener("scroll", this.setParallax);
    }

    setParallax() {
        var windowScrollTop = typeof window !== 'undefined' && -this.props.offset + (window.scrollY * (this.speed || 0.5));
        this.setState({
            top: windowScrollTop+"px"
        });
    }


    render() {
        const {
            image,
            classes,
            height
        } = this.props;
        return (
            <div className={classes.parallax} style={{height: height+"px"}}>
                <Img className={classes.image} style={{...this.state}} fluid={image} />
            </div>
        )
    }
}

ParallaxDivider.propTypes = {
    classes: PropTypes.object.isRequired,
    image: PropTypes.object.isRequired,
    height: PropTypes.number.isRequired,
    offset: PropTypes.number.isRequired,
    speed: PropTypes.number
};

export default withStyles(parallaxDividerStyle)(ParallaxDivider);
