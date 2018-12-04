import React from "react";
// nodejs library that concatenates classes
import classNames from "classnames";
// nodejs library to set properties for components
import PropTypes from "prop-types";
// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";

import Img from 'gatsby-image'

// core components
import parallaxHeaderStyle from "assets/components/parallaxHeaderStyle.jsx";

class ParallaxHeader extends React.Component {
    constructor(props) {
        super(props);
        var windowScrollTop = typeof window !== 'undefined' && window.pageYOffset / 3;
        this.state = {
            transform: "translate3d(0," + windowScrollTop + "px,0)"
        };
        this.resetTransform = this.resetTransform.bind(this);
    }

    componentDidMount() {
        var windowScrollTop = typeof window !== 'undefined' && window.pageYOffset / 3;
        this.setState({
            transform: "translate3d(0," + windowScrollTop + "px,0)"
        });
        window.addEventListener("scroll", this.resetTransform);
    }

    componentWillUnmount() {
        window.removeEventListener("scroll", this.resetTransform);
    }

    resetTransform() {
        var windowScrollTop = typeof window !== 'undefined' && window.pageYOffset / 3;
        this.setState({
            transform: "translate3d(0," + windowScrollTop + "px,0)"
        });
    }

    render() {
        const {
            classes,
            filter,
            className,
            children,
            style,
            image,
            small,
            medium
        } = this.props;
        const parallaxClasses = classNames({
            [classes.parallax]: true,
            [classes.filter]: filter,
            [classes.small]: small,
            [classes.medium]: medium,
            [className]: className !== undefined
        });
        /*return (
          <div
            className={parallaxClasses}
            style={{
              ...style,
              backgroundImage: "url(" + require('/assets/img/bg1.jpg') + ")",
              ...this.state
            }}
            ref="parallax"
          >
            {children}
          </div>
        );*/
        return (
            <div className={parallaxClasses} style={{...style, ...this.state}}  ref="parallax">
                <Img fluid={image}
                     style={{
                         position: "absolute",
                         left: 0,
                         top: 0,
                         width: "100%",
                         height: "100%",
                     }}/>
                {children}
            </div>
        )
    }
}

ParallaxHeader.propTypes = {
    classes: PropTypes.object.isRequired,
    className: PropTypes.string,
    filter: PropTypes.bool,
    children: PropTypes.node,
    style: PropTypes.string,
    image: PropTypes.object
};

export default withStyles(parallaxHeaderStyle)(ParallaxHeader);
