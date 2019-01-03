import React from "react";
import { Email, Item, Image, renderEmail } from "react-html-email";
import { Button, Label, Segment } from "semantic-ui-react";

const EmailPage = renderEmail(
  <Email title="Trial license installation">
    <Item align="center">
      <Image
        src="https://us.4d.com/sites/all/themes/bactency/logo.png"
        alt="4D logo"
        height={70}
        width={50}
      />
    </Item>
    <Item>
      Dear [INSERT NAME HERE],
      <br />
      <br />
    </Item>
    <Item>
      Thank you for your interest in 4D products. Here is your trial license
      number, installer download links, and production installation
      instructions.
      <br />
      <br />
    </Item>
    <Item>Trial License Number:</Item>
    <Item>
      4DDE17U00USS12SMER
      <br />
      <br />
    </Item>
    <Item>Download installer:</Item>
    <Item>
      <Button color="blue">Mac</Button>
      <Button color="blue">Windows</Button>
      <br />
      <br />
    </Item>
    <Item>Minimum System Requirements:</Item>
    <Item>
      <Segment
        style={{
          border: "1px solid black",
          borderRadius: "3px",
          padding: "0 5px"
        }}
      >
        <p>
          Windows 7 - Windows 10 (64-bit versions) Windows Server 2008 R2 -
          Windows Server 2016
          <br />
          (Latest release of major version is required, such as Windows 8.1, not
          Windows 8)
        </p>
        <p>
          OS X El Capitan 10.11 - macOS High Sierra 10.13
          <br />
          (Latest release of major version is required, such as 10.11.6)
        </p>
        <p>
          4GB RAM minimum (8GB or more recommended)
          <br />
          1280x1024 resolution for development environment
        </p>
      </Segment>
      <br />
    </Item>
    <Item>Installation and activation:</Item>
    <Item>
      <Segment
        style={{
          border: "1px solid black",
          borderRadius: "3px",
          padding: "0 5px"
        }}
      >
        <p>
          To install 4D, simply launch the installer and follow the instruction
          on the screen. Once 4D product has been instsalled, follow the steps
          below to complete 4D product activation for your trial period.
        </p>
        <p>To activate your license</p>
        <ol>
          <li>Launch 4D</li>
          <li>Select License Manager from Help menu</li>
          <li>Sign in using the same account you created for trial download</li>
          <li>
            Enter the trial license number and click Next to complete activation
          </li>
        </ol>
      </Segment>
    </Item>
  </Email>
);

export default EmailPage;
