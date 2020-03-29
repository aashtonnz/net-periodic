import React from "react";
import { PageHeader as Header, Link } from "../views/styled";

const NotFound = () => (
  <>
    <Header>Page Not Found</Header>
    <p>
      <Link to="/home">Click here</Link> to return home
    </p>
  </>
);

export default NotFound;
