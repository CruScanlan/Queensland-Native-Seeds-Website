import React from "react";
import classNames from "classnames";
import { Link } from "gatsby";
import Img from 'gatsby-image';
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
    const { classes, data } = this.props;
    return (
      <div className={classNames(classes.section, classes.centerText)}>
        <h4 className={classes.heavyText}>Designers and suppliers of native seed mixtures. Servicing mine, government and private rehabilitation works in Queensland and neighbouring states where overlapping plant distributions occur.</h4>
        <GridContainer justify="center" style={{marginTop: '60px', marginBottom: '10px'}}>
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
        <hr />
        <GridContainer justify="center" style={{marginTop: "10px", marginBottom: '50px'}}>
            <GridItem xs={12} sm={12} md={12} className={classes.centerText}>
                <h2 className={classes.title}>Featured Clients</h2>
            </GridItem>
            <GridItem xs={6} sm={4} md={2} style={{marginTop: '40px'}}>
                <Img fluid={data.downerLogo.childImageSharp.fluid} />
            </GridItem>
            <GridItem xs={6} sm={4} md={2} style={{display: 'flex', alignItems: 'center', marginTop: '40px'}}>
                <div style={{width: '100%', height: 'auto'}}>
                    <Img fluid={data.glencoreLogo.childImageSharp.fluid}/>
                </div>
            </GridItem>
            <GridItem xs={6} sm={4} md={2} style={{marginTop: '40px'}}>
                <Img fluid={data.stanwellLogo.childImageSharp.fluid} />
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
