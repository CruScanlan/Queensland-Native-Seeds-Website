import React from "react";
// nodejs library to set properties for components
import PropTypes from "prop-types";
import classNames from "classNames";
// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";

import badgeStyle from "assets/components/badgeStyle.jsx";

function Badge({ ...props }) {
  const { classes, color, children, small } = props;
  return (
    <span className={classNames(classes.badge, { 
      [classes.small]: small,
      [classes[color]]: true
    })} >{children}</span>
  );
}

Badge.defaultProps = {
  color: "gray"
};

Badge.propTypes = {
  classes: PropTypes.object.isRequired,
  color: PropTypes.oneOf([
    "primary",
    "warning",
    "danger",
    "success",
    "info",
    "rose",
    "gray",
    "green"
  ]),
  small: PropTypes.bool
};

export default withStyles(badgeStyle)(Badge);
