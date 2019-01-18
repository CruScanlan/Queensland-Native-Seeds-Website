/*eslint-disable*/
import React from "react";
// react components for routing our app without refresh
import { Link } from "gatsby";

// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";

// @material-ui/icons

// core components
import Button from "components/CustomButtons/Button.jsx";
import headerLinksStyle from "assets/components/headerLinksStyle.jsx";

function HeaderLinks({ ...props }) {
    const { classes } = props;
    return (
        <List className={classes.list}>
            <ListItem className={classes.listItem}>
                <Link  to="/" className={classes.navLink} activeClassName={classes.navLinkActive}>
                    <Button
                        color="transparent"
                        target="_blank"
                    >
                        Home
                    </Button>
                </Link>
            </ListItem>
            <ListItem className={classes.listItem}>
                <Link  to="/about-us" className={classes.navLink} activeClassName={classes.navLinkActive}>
                    <Button
                        color="transparent"
                        target="_blank"
                    >
                        About Us
                    </Button>
                </Link>
            </ListItem>
            <ListItem className={classes.listItem}>
                <Link  to="/contact-us" className={classes.navLink} activeClassName={classes.navLinkActive}>
                    <Button
                        color="transparent"
                        target="_blank"
                    >
                        Contact Us
                    </Button>
                </Link>
            </ListItem>
            <ListItem className={classes.listItem}>
                <a href="https://cloud.qldnativeseeds.com.au" target="_blank" rel="noreferrer" className={classes.navLink}>
                    <Button
                        color="transparent"
                        target="_blank"
                    >
                        QA Log In
                    </Button>
                </a>
            </ListItem>
        </List>
    );
}

export default withStyles(headerLinksStyle)(HeaderLinks);
