import React from "react";
// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";

// @material-ui/icons
// core components
import GridContainer from "components/Grid/GridContainer.jsx";
import GridItem from "components/Grid/GridItem.jsx";
import Button from "components/CustomButtons/Button";
import CustomInput from "components/CustomInput/CustomInput";
import CustomSnackbar from "components/CustomSnackbar/CustomSnackbar";
import Recaptcha from "react-google-recaptcha";
import productStyle from "assets/views/landingPageSections/productStyle.jsx";
import { Snackbar } from "@material-ui/core";

class ContactSection extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            errorNotification: false,
            form: {}
        };

        this.recaptchaRef = React.createRef();
        this.handleChange = this.handleChange.bind(this);
        this.handleRecaptcha = this.handleRecaptcha.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleCloseErrorNotification = this.handleCloseErrorNotification.bind(this);
    }

    handleChange(e) {
        let form = Object.assign({}, this.state.form);
        form[e.target.name] = e.target.value;
        this.setState({form});
    }

    handleRecaptcha(value) {
        let form = Object.assign({}, this.state.form);
        form["g-recaptcha-response"] = value;
        this.setState({ form });
    }

    handleCloseErrorNotification() {
        this.setState({errorNotification: false});
    }

    handleSubmit(e) {
        e.preventDefault();
        const form = e.target;
        if(!this.state.form['g-recaptcha-response']) return this.setState({errorNotification: true});
        fetch("/", {
          method: "POST",
          headers: { "Content-Type": "application/x-www-form-urlencoded" },
          body: this.encode({
            "form-name": form.getAttribute("name"),
            ...this.state.form
          })
        })
          .then(() => {})
          .catch(error => alert(error));
    };

    encode(data) {
        return Object.keys(data)
          .map(key => encodeURIComponent(key) + "=" + encodeURIComponent(data[key]))
          .join("&");
    }

    render() {
        const {classes} = this.props;
        return (
            <div className={classes.section}>
                <CustomSnackbar 
                    handleClose={this.handleCloseErrorNotification}
                    message="Complete Captcha"
                    type="error"
                    open={this.state.errorNotification} 
                />
                <GridContainer justify="center">
                    <GridItem xs={12} sm={12} md={12}>
                        <h2 className={classes.title}>Contact Us</h2>
                    </GridItem>
                    <GridItem xs={12} sm={12} md={6}>
                        <form
                            name="contact"
                            method="post"
                            action="/"
                            data-netlify="true"
                            data-netlify-recaptcha="true"
                            onSubmit={this.handleSubmit}
                        >
                        <noscript>
                            <p>This form won’t work with Javascript disabled</p>
                        </noscript>
                            <GridContainer>
                                <GridItem xs={12} sm={12} md={12}>
                                    <CustomInput
                                        labelText="Name (required)"
                                        name="name"
                                        formControlProps={{
                                            fullWidth: true
                                        }}
                                        required
                                        onChange={this.handleChange}
                                    />
                                </GridItem>
                                <GridItem xs={12} sm={12} md={12}>
                                    <CustomInput
                                        labelText="Company/Business Name"
                                        name="cName"
                                        formControlProps={{
                                            fullWidth: true
                                        }}
                                        onChange={this.handleChange}
                                    />
                                </GridItem>
                                <GridItem xs={12} sm={12} md={12}>
                                    <CustomInput
                                        labelText="Phone Number (required)"
                                        name="phone"
                                        formControlProps={{
                                            fullWidth: true
                                        }}
                                        required
                                        onChange={this.handleChange}
                                    />
                                </GridItem>
                                <GridItem xs={12} sm={12} md={12}>
                                    <CustomInput
                                        labelText="Email Address (required)"
                                        name="email"
                                        formControlProps={{
                                            fullWidth: true
                                        }}
                                        required
                                        onChange={this.handleChange}
                                    />
                                </GridItem>
                                <GridItem xs={12} sm={12} md={12}>
                                    <CustomInput
                                        labelText="Your Message (required)"
                                        name="message"
                                        required
                                        formControlProps={{
                                            fullWidth: true,
                                            className: classes.textArea
                                        }}
                                        inputProps={{
                                            multiline: true,
                                            rows: 8
                                        }}
                                        onChange={this.handleChange}
                                    />
                                </GridItem>
                                 <GridItem
                                    xs={6}
                                    sm={6}
                                    md={6}
                                    style={{height: 76}}
                                >
                                    <Recaptcha
                                        ref={this.recaptchaRef}
                                        sitekey="6LdxUowUAAAAAP-uNbY7T7pGnOCq32rdnF7KazbL"
                                        onChange={this.handleRecaptcha}
                                    />
                                </GridItem>
                                <GridItem
                                    xs={6}
                                    sm={6}
                                    md={6}
                                >
                                    <Button color="primary" type="submit">Send Message</Button>
                                </GridItem>
                            </GridContainer>
                        </form>
                    </GridItem>
                </GridContainer>
            </div>
        );
    }
}

export default withStyles(productStyle)(ContactSection);
