import React, { useState } from "react";
import PropTypes from "prop-types";
import { Redirect } from "react-router-dom";
import { connect } from "react-redux";
import { setAlert } from "../../actions/page";
import { login } from "../../actions/auth";
import { PageHeader as Header, Input, Button, Link } from "../../views/styled";
import { Wrapper, SubHeader } from "../SignUp/styled";
import { trimValues } from "../../utils";
import { checkLogin } from "../../utils/validation";

const LogIn = ({ setAlert, login, isAuthenticated }) => {
  const [formData, setFormData] = useState({
    username: "",
    password: ""
  });
  const { username, password } = formData;

  const updateForm = event =>
    setFormData({ ...formData, [event.target.name]: event.target.value });

  const submitForm = () => {
    trimValues(formData);
    const invalidMsg = checkLogin(username, password);

    if (invalidMsg) {
      setAlert(invalidMsg, "danger");
    } else {
      login(username, password);
    }
  };

  if (isAuthenticated) {
    return <Redirect to="/home" />;
  }

  return (
    <Wrapper>
      <Header>Log In</Header>
      <SubHeader>
        or <Link to="/signup">sign up</Link>
      </SubHeader>
      <Input
        name="username"
        value={username}
        type="text"
        placeholder="Username"
        onChange={updateForm}
      />
      <Input
        name="password"
        value={password}
        type="password"
        placeholder="Password"
        onChange={updateForm}
      />
      <Button onClick={submitForm}>Submit</Button>
    </Wrapper>
  );
};

LogIn.propTypes = {
  setAlert: PropTypes.func.isRequired,
  login: PropTypes.func.isRequired,
  isAuthenticated: PropTypes.bool.isRequired
};

const mapStateToProps = state => ({
  isAuthenticated: state.auth.isAuthenticated
});

export default connect(mapStateToProps, { setAlert, login })(LogIn);
