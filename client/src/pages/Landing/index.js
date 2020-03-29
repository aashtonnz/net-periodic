import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { Redirect } from "react-router-dom";
import { connect } from "react-redux";
import moment from "moment";
import { Heading, Divider, P, Countdown, Wrapper } from "./styled";
import { Link } from "../../views/styled";
import { nextPublishDate } from "../../utils";

const Landing = ({ isAuthenticated }) => {
  const [countSec, setCountSec] = useState(
    nextPublishDate().diff(moment().utc(), "seconds")
  );

  useEffect(() => {
    const timer = setTimeout(() => {
      const newCountSec = nextPublishDate().diff(moment().utc(), "seconds");
      if (countSec > newCountSec) {
        setCountSec(newCountSec);
      }
    }, 1000);
    return () => clearTimeout(timer);
  }, [countSec, setCountSec]);

  const duration = moment.duration(countSec, "seconds");

  if (isAuthenticated) {
    return <Redirect to="/home" />;
  }

  return (
    <Wrapper>
      <div>
        <Heading>A periodical for the internet</Heading>
        <Divider />
        <Countdown>
          {duration.days() * 24 + duration.hours()} hr{" "}
          {duration.minutes() + " "} min {duration.seconds() + " "}
          sec
        </Countdown>
        <P>Share content each week</P>
        <P>Subscribe to contributors</P>
        <P>
          Published on <strong>Fridays at midnight GMT</strong>
        </P>
        <Divider />
        <P>
          See the <Link to="/home">latest edition</Link>,{" "}
          <Link to="/about">learn more</Link>, or{" "}
          <Link to="/signup">sign up</Link>
        </P>
      </div>
    </Wrapper>
  );
};

Landing.propTypes = {
  isAuthenticated: PropTypes.bool.isRequired
};

const mapStateToProps = state => ({
  isAuthenticated: state.auth.isAuthenticated
});

export default connect(mapStateToProps, null)(Landing);
