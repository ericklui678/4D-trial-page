import React, { Component } from "react";
import Header from "./Header";
import CreateAccountForm from "./CreateAccountForm";
import LoginAccountForm from "./LoginAccountForm";

class LoginPage extends Component {
  state = {
    displayLogin: true
  };

  componentDidMount() {
    if (sessionStorage.getItem("JWT") !== null) {
      this.props.history.push("/trial");
    }
  }

  toggleForm = () => {
    this.setState({ displayLogin: !this.state.displayLogin });
  };

  render() {
    const { displayLogin } = this.state;
    const title = "4D v17 TRIAL DOWNLOAD REQUEST";

    return (
      <div>
        <Header title={title} />
        {displayLogin ? (
          <LoginAccountForm toggleForm={this.toggleForm} />
        ) : (
          <CreateAccountForm toggleForm={this.toggleForm} />
        )}
      </div>
    );
  }
}

export default LoginPage;
