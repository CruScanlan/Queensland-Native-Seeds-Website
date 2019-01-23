import React from "react";
// nodejs library to set properties for components
import PropTypes from "prop-types";
// nodejs library that concatenates classes
import classNames from "classnames";
// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";
import FormControl from "@material-ui/core/FormControl";
import MenuItem from '@material-ui/core/MenuItem';
import Input from '@material-ui/core/Input';
import InputLabel from "@material-ui/core/InputLabel";
import Select from "@material-ui/core/Select";

import customSelectStyle from "assets/components/customSelectStyle.jsx";

function CustomMultiSelect({ ...props }) {
  const {
    classes,
    formControlProps,
    labelText,
    id,
    value,
    onChange,
    menuItems
  } = props;

  var formControlClasses;
  if (formControlProps !== undefined) {
    formControlClasses = classNames(
      formControlProps.className,
      classes.formControl
    );
  } else {
    formControlClasses = classes.formControl;
  }

  return (
    <FormControl {...formControlProps} className={formControlClasses}>
      {labelText !== undefined ? (
        <InputLabel
          className={classes.labelRoot}
          htmlFor={id}
        >
          {labelText}
        </InputLabel>
      ) : null}
      <Select
        multiple
        value={value}
        onChange={onChange}
        input={<Input id={id} classes={{input: classes.input, underline: classes.underline}}/>}
      >
        {menuItems.map(menuItem => {
            return (
              <MenuItem key={menuItem} value={menuItem}>
                {menuItem}
              </MenuItem>
            )
        })}
      </Select>
    </FormControl>
  );
}

CustomMultiSelect.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(customSelectStyle)(CustomMultiSelect);
