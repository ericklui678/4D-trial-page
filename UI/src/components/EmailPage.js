import React from "react";
import EmailContent from "./EmailContent";

const createMarkup = () => ({ __html: EmailContent });

const EmailPage = () => <div dangerouslySetInnerHTML={createMarkup()} />;

export default EmailPage;
