import React, { Component } from "react";
import { Button, Container, Grid, Form, Message } from "semantic-ui-react";
import { withRouter } from "react-router-dom";
import PropTypes from "prop-types";
import axios from "axios";

class LoginAccountForm extends Component {
  state = {
    email: "",
    password: "",
    statusCode: null,
    errorMessage: null
  };

  handleChange = (e, { name, value }) => this.setState({ [name]: value });

  onSubmit = () => {
    const user = {
      email: this.state.email,
      password: this.state.password
    };

    axios
      .post("/api/session", { credentials: user })
      .then(res => {
        // set sessionStorage to JWT (JSON Web Token)
        sessionStorage.setItem("JWT", res.data.user.token);
        this.props.history.push("/trial");
      })
      .catch(err => {
        console.log(err.response);
        this.setState({
          statusCode: err.response.data.status,
          errorMessage: err.response.data.errors
        });
      });
  };

  render() {
    const { email, password, statusCode, errorMessage } = this.state;

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
                <Form.Input
                  name="email"
                  placeholder="Email"
                  value={email}
                  fluid
                  onBlur={this.handleBlur}
                  onChange={this.handleChange}
                />
                <Form.Input
                  name="password"
                  placeholder="Password"
                  type="password"
                  value={password}
                  fluid
                  onBlur={this.handleBlur}
                  onChange={this.handleChange}
                />
                <Button
                  type="submit"
                  fluid
                  color="teal"
                  onClick={this.onSubmit}
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

export default withRouter(LoginAccountForm);
