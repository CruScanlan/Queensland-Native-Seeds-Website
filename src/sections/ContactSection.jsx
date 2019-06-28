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

class ContactSection extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            error: {
                errorNotification: false,
                errorMessage: ''
            },
            submitted: false,
            form: {}
        };

        this.recaptchaRef = React.createRef();
        this.handleChange = this.handleChange.bind(this);
        this.handleRecaptcha = this.handleRecaptcha.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleCloseErrorNotification = this.handleCloseErrorNotification.bind(this);
        this.handleCloseSuccessNotification = this.handleCloseSuccessNotification.bind(this);
    }

    handleChange(e) {
        let form = Object.assign({}, this.state.form);
        form[e.target.name] = e.target.value;
        console.log(e.target.name)
        this.setState({form});
    }

    handleRecaptcha(value) {
        let form = Object.assign({}, this.state.form);
        form["g-recaptcha-response"] = value;
        this.setState({ form });
    }

    handleCloseErrorNotification() {
        this.setState({error:{errorNotification: false}});
    }

    handleCloseSuccessNotification() {
        this.setState({submitted:false});
    }

    handleSubmit(e) {
        e.preventDefault();
        const form = e.target;
        if(!this.state.form['g-recaptcha-response']) return this.setState({error:{errorNotification: true, errorMessage: 'Complete the Captcha to continue'}});
        fetch("/?no-cache=1", {
          method: "POST",
          headers: { "Content-Type": "application/x-www-form-urlencoded" },
          body: this.encode({
            "form-name": form.getAttribute("name"),
            ...this.state.form
          })
        })
          .then(() => {this.setState({submitted: true})})
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
                    message={this.state.error.errorMessage} 
                    type="error"
                    open={this.state.error.errorNotification} 
                />
                <CustomSnackbar 
                    handleClose={this.handleCloseSuccessNotification}
                    message="Your enquiry has been sucessfully submitted" 
                    type="success"
                    open={this.state.submitted} 
                />
                <GridContainer justify="center">
                    <GridItem xs={12} sm={12} md={12}>
                        <h2 className={classes.title}>Contact Us</h2>
                    </GridItem>
                    <GridItem xs={12} sm={12} md={6}>
                        <form
                            name="contact"
                            method="post"
                            data-netlify-recaptcha="true"
                            data-netlify="true"
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
                                        value={this.state.form.name}
                                        required
                                        onChange={this.handleChange}
                                    />
                                </GridItem>
                                <GridItem xs={12} sm={12} md={12}>
                                    <CustomInput
                                        labelText="Company/Business Name"
                                        name="Company Name"
                                        formControlProps={{
                                            fullWidth: true
                                        }}
                                        value={this.state.form['Company Name']}
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
                                        value={this.state.form.phone}
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
                                        value={this.state.form.email}
                                        onChange={this.handleChange}
                                    />
                                </GridItem>
                                <GridItem xs={12} sm={12} md={12}>
                                    <CustomInput
                                        labelText="Your Message (required)"
                                        name="message"
                                        required
                                        value={this.state.form.message}
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
