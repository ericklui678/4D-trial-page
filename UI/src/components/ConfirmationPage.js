import React from "react";
import Header from "./Header";
import { Column, Container, Grid } from "semantic-ui-react";

const title = "THANK YOU FOR YOUR INTEREST IN 4D PRODUCTS";

const ConfirmationPage = () => (
  <div>
    <Header title={title} />
    <Container textAlign="center">
      <Grid columns={16} centered>
        <Grid.Row>
          <Grid.Column tablet={16} computer={10} largeScreen={8} widescreen={8}>
            <p style={{ textAlign: "center" }}>
              You will receive an email with a trial license number, download
              links and installation instruction shortly.
            </p>
          </Grid.Column>
        </Grid.Row>
      </Grid>
    </Container>
  </div>
);

export default ConfirmationPage;
