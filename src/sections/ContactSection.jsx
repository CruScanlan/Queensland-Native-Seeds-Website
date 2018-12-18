import React from "react";
// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";

// @material-ui/icons
// core components
import GridContainer from "components/Grid/GridContainer.jsx";
import GridItem from "components/Grid/GridItem.jsx";
import Button from "components/CustomButtons/Button";
import CustomInput from "components/CustomInput/CustomInput";

import productStyle from "assets/views/landingPageSections/productStyle.jsx";

class HomeSection extends React.Component {
    render() {
        const {classes} = this.props;
        return (
            <div className={classes.section}>
                <GridContainer justify="center">
                    <GridItem xs={12} sm={12} md={12}>
                        <h2 className={classes.title}>Contact Us</h2>
                    </GridItem>
                    <GridItem xs={12} sm={12} md={6}>
                        <form>
                            <GridContainer>
                                <GridItem xs={12} sm={12} md={12}>
                                    <CustomInput
                                        labelText="Name"
                                        id="name"
                                        formControlProps={{
                                            fullWidth: true
                                        }}
                                    />
                                </GridItem>
                                <GridItem xs={12} sm={12} md={12}>
                                    <CustomInput
                                        labelText="Company/Business Name"
                                        id="cName"
                                        formControlProps={{
                                            fullWidth: true
                                        }}
                                    />
                                </GridItem>
                                <GridItem xs={12} sm={12} md={12}>
                                    <CustomInput
                                        labelText="Phone Number"
                                        id="phone"
                                        formControlProps={{
                                            fullWidth: true
                                        }}
                                    />
                                </GridItem>
                                <GridItem xs={12} sm={12} md={12}>
                                    <CustomInput
                                        labelText="Email Address"
                                        id="email"
                                        formControlProps={{
                                            fullWidth: true
                                        }}
                                    />
                                </GridItem>
                                <GridItem xs={12} sm={12} md={12}>
                                    <CustomInput
                                        labelText="Your Message"
                                        id="message"
                                        formControlProps={{
                                            fullWidth: true,
                                            className: classes.textArea
                                        }}
                                        inputProps={{
                                            multiline: true,
                                            rows: 8
                                        }}
                                    />
                                </GridItem>
                                <GridItem
                                    xs={12}
                                    sm={12}
                                    md={12}
                                >
                                    <Button color="primary">Send Message</Button>
                                </GridItem>
                            </GridContainer>
                        </form>
                    </GridItem>
                </GridContainer>
            </div>
        );
    }
}

export default withStyles(productStyle)(HomeSection);
