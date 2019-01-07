import React from "react";
import { Link } from "gatsby";
// nodejs library to set properties for components
import PropTypes from "prop-types";
// nodejs library that concatenates classes
import classNames from "classnames";
// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";
// @material-ui/icons
import ChevronRight from "@material-ui/icons/ChevronRight";
// core components
import Badge from "components/Badge/Badge.jsx";
import collabsibleLinkListStyle from "assets/components/collabsibleLinkListStyle.jsx";

class CollabsibleLinkList extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            expanded: false,
            minNoLinksShown: (this.props.links.length < this.props.minShown) ? this.props.links.length : this.props.minShown, //Do not count more than the minimum
            minHeight: null,
            maxHeight: null
        }

        this.onFooterClicked = this.onFooterClicked.bind(this);
        this.updateMinMaxHeight = this.updateMinMaxHeight.bind(this);
    }

    componentDidMount() {
        if(this.state.minHeight === null) { 
            this.updateMinMaxHeight();
            window.addEventListener("resize", this.updateMinMaxHeight);
        }
    }

    componentWillUnmount() {
        window.removeEventListener("resize", this.updateMinMaxHeight);
    }

    updateMinMaxHeight() {//Calculate the min and max height for the minumum number of links
        if(this.linkTextRef0 !== null) {
            let minHeight = 0;
            let maxHeight = 0;
            for(let i=0; i<this.props.links.length; i++) {
                const elementHeight = this[`linkTextRef${i}`].getBoundingClientRect().height + 10;
                maxHeight += elementHeight;
                if(i < this.state.minNoLinksShown) minHeight += elementHeight;
            }
            this.setState({
                minHeight,
                maxHeight
            })
        }
    }

    onFooterClicked() {
        this.setState({
            expanded: !this.state.expanded
        })
    }

    renderLinks() {
        return this.props.links.map((link, index) => (
            <Link to={link.url} key={index}>
                <h5 ref={(linkText) => {this[`linkTextRef${index}`] = linkText}} className={this.props.classes.linkText}>
                    {link.name}
                </h5>
            </Link>
        ))
    }

    render() {
        const {classes, headerText} = this.props;
        const {expanded, maxHeight, minHeight} = this.state;
        
        const bodyAreaClasses = classNames(classes.bodyArea, {
            [classes.bodyAreaExpanded]: expanded
        });

        return (
            <div className={classes.container}>
                <div className={classes.headerArea}>
                    <h5 className={classes.headerText}>
                        {headerText}
                    </h5>
                </div>
                <div className={bodyAreaClasses} style={{height: expanded ? maxHeight : minHeight}}>
                    {this.renderLinks()}
                </div>
                <div className={classes.footerArea} onClick={this.onFooterClicked}>
                    <h4 className={classes.footerText}>
                        {expanded ? "Show Less" : "Show All"} 
                    </h4>
                    <Badge color="info" small>{this.props.links.length}</Badge>
                    <ChevronRight className={classNames(classes.arrow, {
                        [classes.arrowFlipped]: expanded
                    })} />
                </div>
            </div>
        )
    }
}

CollabsibleLinkList.propTypes = {
    headerText: PropTypes.string.isRequired,
    minShown: PropTypes.number.isRequired,
    links: PropTypes.array.isRequired
}

export default withStyles(collabsibleLinkListStyle)(CollabsibleLinkList);