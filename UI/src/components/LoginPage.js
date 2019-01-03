import React, { Component } from "react";
import Header from "./Header";
import CreateAccountForm from "./CreateAccountForm";
import LoginAccountForm from "./LoginAccountForm";
import EmailPage from "./EmailPage";

class LoginPage extends Component {
  state = {
    displayLogin: false
  };

  toggleForm = () => {
    this.setState({ displayLogin: !this.state.displayLogin });
  };

  createMarkup() {
    return { __html: EmailPage };
  }

  render() {
    const { displayLogin } = this.state;
    const title = "4D v17 TRIAL DOWNLOAD REQUEST";

    console.log(EmailPage);

    return (
      <div dangerouslySetInnerHTML={this.createMarkup()}>
        {/* <Header title={title} />
        {displayLogin ? (
          <LoginAccountForm toggleForm={this.toggleForm} />
        ) : (
          <CreateAccountForm toggleForm={this.toggleForm} />
        )} */}
      </div>
    );
  }
}

export default LoginPage;
