import React, { useState } from "react";
import { Redirect } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import {
  PageHeader as Header,
  Input,
  Button,
  Link,
  CheckBox
} from "../../views/styled";
import { Wrapper, SubHeader, SubscribeBox } from "./styled";
import { setAlert } from "../../actions/page";
import { signup } from "../../actions/auth";
import { trimValues } from "../../utils";
import { checkSignUp } from "../../utils/validation";

const SignUp = ({ setAlert, signup, isAuthenticated }) => {
  const [formData, setFormData] = useState({
    username: "",
    name: "",
    email: "",
    mailSub: false,
    password: "",
    password2: ""
  });
  const { username, name, email, mailSub, password, password2 } = formData;

  const updateForm = event =>
    setFormData({ ...formData, [event.target.name]: event.target.value });

  const onToggleMailSub = () => {
    setFormData({ ...formData, mailSub: !mailSub });
  };

  const submitForm = () => {
    trimValues(formData);
    const invalidMsg = checkSignUp(username, name, email, password, password2);

    if (invalidMsg) {
      setAlert(invalidMsg, "danger");
    } else {
      signup(formData);
    }
  };

  if (isAuthenticated) {
    return <Redirect to="/home" />;
  }

  return (
    <Wrapper>
      <Header>Sign Up</Header>
      <SubHeader>
        or <Link to="/login">log in</Link>
      </SubHeader>
      <Input
        name="username"
        value={username}
        type="text"
        placeholder="Username"
        onChange={updateForm}
      />
      <Input
        name="name"
        value={name}
        type="text"
        placeholder="Name (optional)"
        onChange={updateForm}
      />
      <Input
        name="email"
        value={email}
        type="email"
        placeholder="Email (optional)"
        onChange={updateForm}
      />
      <Input
        name="password"
        value={password}
        type="password"
        placeholder="Password"
        onChange={updateForm}
      />
      <Input
        name="password2"
        value={password2}
        type="password"
        placeholder="Confirm password"
        onChange={updateForm}
      />
      <SubscribeBox>
        Send me a weekly email{" "}
        <CheckBox
          name="mailSub"
          type="checkbox"
          checked={mailSub}
          onChange={onToggleMailSub}
        />
      </SubscribeBox>
      <Button onClick={submitForm}>Submit</Button>
    </Wrapper>
  );
};

SignUp.propTypes = {
  setAlert: PropTypes.func.isRequired,
  signup: PropTypes.func.isRequired,
  isAuthenticated: PropTypes.bool.isRequired
};

const mapStateToProps = state => ({
  isAuthenticated: state.auth.isAuthenticated
});

export default connect(mapStateToProps, { setAlert, signup })(SignUp);
