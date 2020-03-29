import React from "react";
import { Route, Switch } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import Landing from "../pages/Landing";
import About from "../pages/About";
import LogIn from "../pages/LogIn";
import SignUp from "../pages/SignUp";
import Home from "../pages/Home";
import MyUser from "../pages/MyUser";
import MyUserEdit from "../pages/MyUserEdit";
import User from "../pages/User";
import Topic from "../pages/Topic";
import Topics from "../pages/Topics";
import NotFound from "../pages/NotFound";

const Routes = ({ user }) => {
  return (
    <Switch>
      <Route exact path="/" component={Landing} />
      <Route exact path="/about" component={About} />
      <Route exact path="/login" component={LogIn} />
      <Route exact path="/signup" component={SignUp} />
      <Route exact path="/home" component={Home} />
      {user && (
        <Route exact path={`/user/${user.username}`} component={MyUser} />
      )}
      <Route exact path="/edit" component={MyUserEdit} />
      <Route exact path="/user/:username" component={User} />
      <Route exact path="/topic/:topic" component={Topic} />
      <Route exact path="/topics" component={Topics} />
      <Route component={NotFound} />
    </Switch>
  );
};

MyUser.propTypes = {
  user: PropTypes.object
};

const mapStateToProps = state => ({
  user: state.auth.user
});

export default connect(mapStateToProps, {})(Routes);
