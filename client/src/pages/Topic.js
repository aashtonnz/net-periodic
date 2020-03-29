import React, { useEffect } from "react";
import PropTypes from "prop-types";
import { useParams, useHistory } from "react-router-dom";
import { connect } from "react-redux";
import { setProfile, setMyProfile } from "../actions/profile";
import { followTopic, unfollowTopic } from "../actions/topic";
import { Button, PageHeader as Header, PrimaryButton } from "../views/styled";

const Topic = ({
  setProfile,
  setMyProfile,
  followTopic,
  unfollowTopic,
  isAuthenticated,
  myProfile
}) => {
  const { topic } = useParams();
  const history = useHistory();

  useEffect(() => {
    if (isAuthenticated) {
      setMyProfile();
    }
  }, [isAuthenticated, setMyProfile, setProfile]);

  const onFollowTopic = () => {
    isAuthenticated ? followTopic(topic) : history.push("/login");
  };

  return (
    <>
      <Header>{topic}</Header>
      {myProfile && myProfile.followedTopics.includes(topic) ? (
        <Button onClick={() => unfollowTopic(topic)}>Unfollow topic</Button>
      ) : (
        <PrimaryButton onClick={onFollowTopic}>Follow topic</PrimaryButton>
      )}
    </>
  );
};

Topic.propTypes = {
  setProfile: PropTypes.func.isRequired,
  setMyProfile: PropTypes.func.isRequired,
  followTopic: PropTypes.func.isRequired,
  unfollowTopic: PropTypes.func.isRequired,
  isAuthenticated: PropTypes.bool.isRequired,
  myProfile: PropTypes.object
};

const mapStateToProps = state => ({
  myProfile: state.profile.myProfile,
  isAuthenticated: state.auth.isAuthenticated
});

export default connect(mapStateToProps, {
  setProfile,
  setMyProfile,
  followTopic,
  unfollowTopic
})(Topic);
