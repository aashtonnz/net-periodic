import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import {
  faChevronDown as downArrow,
  faChevronUp as upArrow
} from "@fortawesome/free-solid-svg-icons";
import logo from "../../assets/logo.png";
import {
  Wrapper,
  NavWrapper,
  Logo,
  Header,
  H1,
  Time,
  Icon,
  Nav,
  NavLink,
  UserLink,
  Link
} from "./styled";
import Alert from "../Alert";
import { publishDate } from "../../utils";

const AppBar = ({ hasNav, onToggleNav, user }) => {
  const closeNav = () => {
    if (hasNav) {
      onToggleNav();
    }
  };

  return (
    <Wrapper>
      <NavWrapper>
        <div>
          <Link onClick={closeNav} to="/">
            <Logo src={logo} alt="logo" />
            <Header>
              <H1>Net Periodic</H1>
              <Time id="time">{publishDate().format("MMM D")}</Time>
            </Header>
          </Link>
          <Icon icon={hasNav ? upArrow : downArrow} onClick={onToggleNav} />
        </div>
        <Nav show={hasNav}>
          <NavLink onClick={closeNav} to="/home">
            Home
          </NavLink>
          <NavLink onClick={closeNav} to="/about">
            About
          </NavLink>
          <NavLink onClick={closeNav} to="/topics">
            Topics
          </NavLink>
          {user ? (
            <>
              <UserLink onClick={closeNav} to={`/user/${user.username}`}>
                {user.name}
              </UserLink>
            </>
          ) : (
            <>
              <NavLink onClick={closeNav} to="/login">
                Log In
              </NavLink>
              <NavLink onClick={closeNav} to="/signup">
                Sign Up
              </NavLink>
            </>
          )}
        </Nav>
      </NavWrapper>
      <Alert />
    </Wrapper>
  );
};

AppBar.propTypes = {
  hasNav: PropTypes.bool.isRequired,
  onToggleNav: PropTypes.func.isRequired,
  user: PropTypes.object
};

const mapStateToProps = state => ({
  user: state.auth.user
});

export default connect(mapStateToProps)(AppBar);
