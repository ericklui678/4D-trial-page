import React, { Component } from "react";
import { Button, Container, Grid, Form, Label } from "semantic-ui-react";
import PropTypes from "prop-types";
import Validator from "validator";

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
    }
  };

  onSubmit = () => {
    const {
      first_name,
      last_name,
      email,
      password,
      confirm,
      phone
    } = this.state;

    const errors = this.validate({
      first_name,
      last_name,
      email,
      password,
      confirm,
      phone
    });

    if (Object.keys(errors).length === 0) {
      console.log("no errors");
    }
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
      touched
    } = this.state;

    const errors = this.validate(this.state);

    const displayError = name => {
      const fieldTouched = touched[name];
      const hasError = errors[name] ? true : false;
      return fieldTouched && hasError ? true : false;
    };

    console.log(errors);

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
                >
                  NEXT
                </Button>
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

export default CreateAccountForm;
