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
                <Link  to="/about" className={classes.navLink} activeClassName={classes.navLinkActive}>
                    <Button
                        color="transparent"
                        target="_blank"
                    >
                        About Us
                    </Button>
                </Link>
            </ListItem>
        </List>
    );
}

export default withStyles(headerLinksStyle)(HeaderLinks);
