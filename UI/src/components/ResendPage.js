import React, { Component } from "react";
import Header from "./Header";
import EmailContent from "./EmailContent";
import axios from "axios";
import { withRouter } from "react-router-dom";
import { Button, Container, Grid } from "semantic-ui-react";

class ResendPage extends Component {
  componentDidMount() {
    // sessionStorage.clear();
    if (sessionStorage.getItem("JWT") === null) {
      this.props.history.push("/");
    }
  }

  sendEmail = () => {
    axios.post("/api/email", { content: EmailContent }).then(res => {
      console.log(res.data);
    });
  };

  render() {
    const title = "THANK YOU FOR YOUR INTEREST IN 4D PRODUCTS";

    return (
      <div>
        <Header title={title} />
        <Container textAlign="center">
          <Grid columns={16} centered>
            <Grid.Row>
              <Grid.Column
                tablet={16}
                computer={10}
                largeScreen={8}
                widescreen={8}
                textAlign="center"
              >
                <p>
                  You have previously requested a trial license on [DATE HERE].
                </p>
                <p>Trial license status: [DATE HERE]</p>
                <Button color="teal" onClick={this.sendEmail}>
                  <span style={{ fontWeight: 100 }}>
                    Please resend me my trial license
                  </span>
                </Button>
              </Grid.Column>
            </Grid.Row>
          </Grid>
        </Container>
      </div>
    );
  }
}

export default withRouter(ResendPage);
