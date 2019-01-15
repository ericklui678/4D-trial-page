import React, { Component } from "react";
import {
  Button,
  Container,
  Grid,
  Form,
  Label,
  Message
} from "semantic-ui-react";
import { withRouter } from "react-router-dom";
import EmailContent from "./EmailContent";
import PropTypes from "prop-types";
import Validator from "validator";
import axios from "axios";

class CreateAccountForm extends Component {
  state = {
    first_name: "",
    last_name: "",
    email: "",
    password: "",
    confirm: "",
    phone: "",
    touched: {
      first_name: false,
      last_name: false,
      email: false,
      password: false,
      confirm: false,
      phone: false
    },
    statusCode: null,
    errorMessage: null
  };

  onSubmit = () => {
    const errors = this.validate(this.state);

    this.props.history.push("/confirmation");

    // ADD THIS WHEN SERVER IS RUNNING
    // if (Object.keys(errors).length === 0) {
    //   const user = {
    //     first_name: this.state.first_name,
    //     last_name: this.state.last_name,
    //     email: this.state.email,
    //     password: this.state.password,
    //     phone: this.state.phone
    //   };
    //
    //   axios
    //     .post("/api/users", { credentials: user })
    //     .then(res => {
    //       // if user successfully created, reroute to confirmation
    //       if (res.data.user) {
    //         console.log(res.data.user);
    //         sessionStorage.setItem("JWT", res.data.user.token);
    //         // send email html to server route "/api/email"
    //         axios.post("/api/email", { content: EmailContent }).then(res => {
    //           console.log(res.data);
    //           this.props.history.push("/confirmation");
    //         });
    //       }
    //     })
    //     .catch(err => {
    //       console.log(err.response);
    //       this.setState({
    //         statusCode: err.response.status,
    //         errorMessage: err.response.data.errors
    //       });
    //     });
    // }
  };

  handleChange = (e, { name, value }) => this.setState({ [name]: value });

  handleBlur = ({ target: { name } }) => {
    this.setState({ touched: { ...this.state.touched, [name]: true } });
  };

  validate = ({ first_name, last_name, email, password, confirm, phone }) => {
    let errors = {};

    if (!first_name) errors.first_name = "First name cannot be empty";
    if (!last_name) errors.last_name = "Last name cannot be empty";
    if (!Validator.isEmail(email)) errors.email = "Invalid email format";
    if (password.length < 8)
      errors.password = "Password must be at least 8 characters";
    if (confirm.length < 8)
      errors.confirm = "Password must be at least 8 characters";
    else if (confirm !== password) errors.confirm = "Passwords must match";
    if (phone.length < 6) errors.phone = "Invalid phone number";

    return errors;
  };

  render() {
    const {
      first_name,
      last_name,
      email,
      password,
      confirm,
      phone,
      touched,
      statusCode,
      errorMessage
    } = this.state;

    const errors = this.validate(this.state);

    const displayError = name => {
      const fieldTouched = touched[name];
      const hasError = errors[name] ? true : false;
      return fieldTouched && hasError ? true : false;
    };

    return (
      <Container textAlign="center" style={{ paddingTop: "25px" }}>
        <Grid columns={16} centered>
          <Grid.Row>
            <h1 className="title">Create an account</h1>
          </Grid.Row>
          <Grid.Row>
            <Grid.Column
              tablet={16}
              computer={10}
              largeScreen={8}
              widescreen={8}
            >
              <Form>
                <Form.Group widths="equal">
                  <Form.Input
                    name="first_name"
                    placeholder="First name"
                    value={first_name}
                    fluid
                    onBlur={this.handleBlur}
                    onChange={this.handleChange}
                    error={displayError("first_name")}
                  />
                  <Form.Input
                    name="last_name"
                    placeholder="Last name"
                    value={last_name}
                    fluid
                    onBlur={this.handleBlur}
                    onChange={this.handleChange}
                    error={displayError("last_name")}
                  />
                </Form.Group>
                {displayError("email") && (
                  <Label color="red" pointing="below" content={errors.email} />
                )}
                <Form.Input
                  name="email"
                  placeholder="Email"
                  value={email}
                  fluid
                  onBlur={this.handleBlur}
                  onChange={this.handleChange}
                  error={displayError("email")}
                />
                {displayError("password") && (
                  <Label
                    color="red"
                    pointing="below"
                    content={errors.password}
                  />
                )}
                <Form.Input
                  name="password"
                  placeholder="Password"
                  value={password}
                  type="password"
                  fluid
                  onBlur={this.handleBlur}
                  onChange={this.handleChange}
                  error={displayError("password")}
                />
                {displayError("confirm") && (
                  <Label
                    color="red"
                    pointing="below"
                    content={errors.confirm}
                  />
                )}
                <Form.Input
                  name="confirm"
                  placeholder="Confirm password"
                  value={confirm}
                  type="password"
                  fluid
                  onBlur={this.handleBlur}
                  onChange={this.handleChange}
                  error={displayError("confirm")}
                />
                {displayError("phone") && (
                  <Label color="red" pointing="below" content={errors.phone} />
                )}
                <Form.Input
                  name="phone"
                  placeholder="Phone number"
                  value={phone}
                  fluid
                  onBlur={this.handleBlur}
                  onChange={this.handleChange}
                  error={displayError("phone")}
                />
                <Button
                  type="submit"
                  fluid
                  color="teal"
                  disabled={!!Object.keys(errors).length}
                  onClick={() => this.onSubmit()}
                >
                  NEXT
                </Button>
                {errorMessage && (
                  <Message negative>
                    <Message.Header>Error {statusCode}</Message.Header>
                    <p>{errorMessage}</p>
                  </Message>
                )}
              </Form>
            </Grid.Column>
          </Grid.Row>
          <Grid.Row style={{ padding: "5px 0" }}>
            ALREADY HAVE A 4D ACCOUNT?
            <span onClick={this.props.toggleForm} className="cursorPointer">
              SIGN IN
            </span>
          </Grid.Row>
        </Grid>
      </Container>
    );
  }
}

CreateAccountForm.propTypes = {
  toggleForm: PropTypes.func.isRequired
};

export default withRouter(CreateAccountForm);
