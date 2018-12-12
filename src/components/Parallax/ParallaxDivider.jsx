import React from "react";
// nodejs library that concatenates classes
import classNames from "classnames";
// nodejs library to set properties for components
import PropTypes from "prop-types";
// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";
import { Parallax } from 'react-scroll-parallax';
import Img from 'gatsby-image'

// core components
import parallaxDividerStyle from "assets/components/parallaxDividerStyle.jsx";

class ParallaxDivider extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        const {
            image,
            classes,
            height
        } = this.props;
        const styles = {height: "100%", width: "100%"};
        return (
            <div className={classes.parallax} style={{height: height+"px"}}>
                <Parallax
                    offsetYMax={-100}
                    offsetYMin={100}
                    tag="div"
                    styleOuter={styles}
                    styleInner={styles}
                    //slowerScrollRate
                >
                    <Img fluid={image} className={classes.image}/>
                </Parallax>
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
