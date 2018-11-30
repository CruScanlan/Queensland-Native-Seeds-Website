/*eslint-disable*/
import React from "react";
// react components for routing our app without refresh
import { Link } from "gatsby";

// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import Tooltip from "@material-ui/core/Tooltip";

// @material-ui/icons
import {CloudDownload } from "@material-ui/icons";

// core components
import Button from "../CustomButton/Button.js";

import headerLinksStyle from "../../assets/components/headerLinksStyle.js";

function HeaderLinks({ ...props }) {
    const { classes } = props;
    return (
        <List className={classes.list}>
            <ListItem className={classes.listItem}>
                <Button
                    href="https://www.creative-tim.com/product/material-kit-react"
                    color="transparent"
                    target="_blank"
                    className={classes.navLink}
                >
                    <CloudDownload className={classes.icons} /> Download
                </Button>
            </ListItem>
        </List>
    );
}

export default withStyles(headerLinksStyle)(HeaderLinks);
