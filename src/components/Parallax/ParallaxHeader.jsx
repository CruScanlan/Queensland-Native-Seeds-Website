import React from "react";
// nodejs library that concatenates classes
import classNames from "classnames";
// nodejs library to set properties for components
import PropTypes from "prop-types";
// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";
import GoogleMap from 'google-map-react';
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

    createMapOptions(maps) {
        return {
            zoomControlOptions: {
                position: maps.ControlPosition.RIGHT_CENTER,
                style: maps.ZoomControlStyle.SMALL
            },
            mapTypeControlOptions: {
                position: maps.ControlPosition.LEFT_CENTER
            },
            mapTypeControl: true,
            fullscreenControl: false,
            gestureHandling: 'cooperative'
        };
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
            medium,
            map
        } = this.props;

        const parallaxClasses = classNames({
            [classes.parallax]: true,
            [classes.filter]: filter,
            [classes.small]: small,
            [classes.medium]: medium,
            [className]: className !== undefined
        });

        const gatsbyImageClasses = classNames({
            [classes.gatsbyImage]: true,
            [classes.gatsbyImageMedium]: medium
        })

        if(map && !image) {
            return (
                <div className={parallaxClasses} style={{...style, ...this.state}}>
                    <GoogleMap
                        bootstrapURLKeys={{key:"AIzaSyDvNBRiU65GQ7AuU7IgOlcZz73I87xERIM"}} // set if you need stats etc ...
                        center={[-26.2684405,151.8112038]}
                        zoom={9}
                        options={this.createMapOptions}>
                    </GoogleMap>
                </div>
            )
        }
        return (
            <div className={parallaxClasses} style={{...style, ...this.state}}>
                <Img className={gatsbyImageClasses}
                     fluid={image}
                     critical={true}
                     loading="eager"
                     style={{
                         position: "absolute",
                         left: 0,
                         top: 0,
                         width: "100%"
                     }}
                     alt="Queensland Native Seeds" title="Queensland Native Seeds"
                     />
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
