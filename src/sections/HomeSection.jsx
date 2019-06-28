import React from "react";
import classNames from "classnames";
import { Link } from "gatsby";
// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";

// @material-ui/icons
import Icon from "@material-ui/icons/Done";
// core components
import GridContainer from "components/Grid/GridContainer.jsx";
import GridItem from "components/Grid/GridItem.jsx";
import Button from "components/CustomButtons/Button.jsx";

import generalStyle from "assets/views/generalStyle.jsx";

class HomeSection extends React.Component {
  render() {
    const { classes } = this.props;
    return (
      <div className={classNames(classes.section, classes.centerText)}>
        <h4 className={classes.heavyText}>Designers and suppliers of native seed mixtures. Servicing mine, government and private rehabilitation works in Queensland and neighbouring states where overlapping plant distributions occur.</h4>
        <GridContainer justify="center" style={{marginTop: "60px"}}>
          <GridItem xs={6} sm={4} md={3}>
            <Icon style={{fontSize: "48px"}} />
            <h4 className={classes.smallTitle}>Grasses</h4>
          </GridItem>
          <GridItem xs={6} sm={4} md={3}>
            <Icon style={{fontSize: "48px"}} />
            <h4 className={classes.smallTitle}>Trees</h4>
          </GridItem>
          <GridItem xs={6} sm={4} md={3}>
            <Icon style={{fontSize: "48px"}} />
            <h4 className={classes.smallTitle}>Shrubs</h4>
          </GridItem>
          <GridItem xs={6} sm={4} md={3}>
            <Icon style={{fontSize: "48px"}} />
            <h4 className={classes.smallTitle}>Forbs</h4>
          </GridItem>
        </GridContainer>
        <Link to="/about-us">
          <Button color="primary" size="lg" round style={{marginTop: "40px"}}>About Us</Button>
        </Link>
      </div>
    );
  }
}

export default withStyles(generalStyle)(HomeSection);
