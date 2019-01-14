import React, { Component } from "react";
import { Button, Container, Grid, Form, Label } from "semantic-ui-react";
import EmailContent from "./EmailContent";
import PropTypes from "prop-types";
import axios from "axios";

class LoginAccountForm extends Component {
  state = {
    email: "",
    password: "",
    serverError: {
      email: "",
      password: ""
    }
  };

  handleChange = (e, { name, value }) => this.setState({ [name]: value });

  onSubmit = () => {
    // axios.post("/api/email", { content: EmailContent }).then(res => {
    //   console.log(res.data);
    // });
    // this.setState({
    //   serverError: {
    //     email: "Email does not match any account. Please create an account."
    //   }
    // });
    // this.setState({
    //   serverError: {
    //     password: "Incorrect password"
    //   }
    // });
  };

  render() {
    const { email, password, serverError } = this.state;

    const displayServerError = name => {
      return serverError[name] ? true : false;
    };

    return (
      <Container textAlign="center" style={{ paddingTop: "25px" }}>
        <Grid columns={16} centered>
          <Grid.Row>
            <h1 className="title">Sign in</h1>
          </Grid.Row>
          <Grid.Row>
            <Grid.Column
              tablet={16}
              computer={10}
              largeScreen={8}
              widescreen={8}
            >
              <Form>
                {displayServerError("email") && (
                  <Label
                    color="red"
                    pointing="below"
                    content={serverError.email}
                  />
                )}
                <Form.Input
                  name="email"
                  placeholder="Email"
                  value={email}
                  fluid
                  onBlur={this.handleBlur}
                  onChange={this.handleChange}
                  error={displayServerError("email")}
                />
                {displayServerError("password") && (
                  <Label
                    color="red"
                    pointing="below"
                    content={serverError.password}
                  />
                )}
                <Form.Input
                  name="password"
                  placeholder="Password"
                  type="password"
                  value={password}
                  fluid
                  onBlur={this.handleBlur}
                  onChange={this.handleChange}
                  error={displayServerError("password")}
                />
                <Button
                  type="submit"
                  fluid
                  color="teal"
                  onClick={this.onSubmit}
                >
                  NEXT
                </Button>
              </Form>
            </Grid.Column>
          </Grid.Row>
          <Grid.Row style={{ padding: "5px 0" }}>
            NEW TO 4D?
            <span onClick={this.props.toggleForm} className="cursorPointer">
              CREATE ACCOUNT
            </span>
          </Grid.Row>
        </Grid>
      </Container>
    );
  }
}

LoginAccountForm.propTypes = {
  toggleForm: PropTypes.func.isRequired
};

export default LoginAccountForm;
