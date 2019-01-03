import React from "react";
import { Container, Grid, Image } from "semantic-ui-react";
import PropTypes from "prop-types";

const Header = ({ title }) => (
  <Container textAlign="center">
    <Grid columns={16} centered>
      <Grid.Row>
        <Grid.Column tablet={16} computer={10} largeScreen={8} widescreen={8}>
          <Image src="/images/logo.png" alt="4D logo" centered height="70px" />
        </Grid.Column>
      </Grid.Row>
      <Grid.Row>
        <Grid.Column
          tablet={16}
          computer={10}
          largeScreen={8}
          widescreen={8}
          textAlign="center"
        >
          <h1 className="title">{title}</h1>
        </Grid.Column>
      </Grid.Row>
      <Grid.Row>
        <Grid.Column
          className="bannerArea"
          tablet={16}
          computer={10}
          largeScreen={8}
          widescreen={8}
        >
          <Image className="banner" src="/images/banner.png" alt="4D logo" />
        </Grid.Column>
      </Grid.Row>
    </Grid>
  </Container>
);

Header.propTypes = {
  title: PropTypes.string.isRequired
};

export default Header;
