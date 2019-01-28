import React from "react";
// nodejs library to set properties for components
import PropTypes from "prop-types";
// nodejs library that concatenates classes
import classNames from "classnames";
// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";
import customSnackbarStyles from "assets/components/customSnackbarStyle.jsx";

import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import ErrorIcon from '@material-ui/icons/Error';
import Snackbar from '@material-ui/core/Snackbar';
import SnackbarContent from '@material-ui/core/SnackbarContent';


const variantIcon = {
    error: ErrorIcon
};
  

function CustomSnackbar({ ...props }) {
    const {
        classes,
        open,
        handleClose,
        type,
        message
      } = props;

    const Icon = variantIcon[type];
      
    return (
        <Snackbar
          anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'left',
          }}
          open={open}
          autoHideDuration={3000}
          onClose={handleClose}
        >
          <SnackbarContent
            className={classNames(classes[type], classes.content)}
            aria-describedby="client-snackbar"
            message = {
                <span id="client-snackbar" className={classes.message}>
                <Icon className={classNames(classes.icon, classes.iconVariant)} />
                    {message}
                </span>
            }
            action={[
                <IconButton
                key="close"
                aria-label="Close"
                color="inherit"
                className={classes.close}
                onClick={handleClose}
                >
                <CloseIcon className={classes.icon} />
                </IconButton>,
            ]}
            />
        </Snackbar>
    )
}

export default withStyles(customSnackbarStyles)(CustomSnackbar);