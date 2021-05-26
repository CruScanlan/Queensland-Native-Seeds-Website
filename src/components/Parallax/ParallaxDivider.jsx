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


        let offset = 20;
        if(typeof window !== 'undefined') {
            if(window.innerWidth > 1300)  offset = 30;
            if(window.innerWidth > 1600)  offset = 50;
        }

        return (
            <div className={classes.parallax} style={{height: height+"px"}}>
                <Parallax
                    y={[offset, -offset]}
                    tag="div"
                    styleOuter={styles}
                    styleInner={styles}
                    //slowerScrollRate
                >
                    <Img fluid={image} style={{top: `-${height/2}px`, height: `${height*2.2}px`}} className={classes.image} alt="Queensland Native Seeds" title="Queensland Native Seeds"/>
                </Parallax>
            </div>
        )
    }
}

ParallaxDivider.propTypes = {
    classes: PropTypes.object.isRequired,
    image: PropTypes.object.isRequired,
    height: PropTypes.number.isRequired
};

export default withStyles(parallaxDividerStyle)(ParallaxDivider);
